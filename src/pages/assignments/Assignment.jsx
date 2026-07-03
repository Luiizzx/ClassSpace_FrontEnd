import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/AuthContext"
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchBuilder } from "../../services/fetchBuilder";
import toast from "react-hot-toast";
import { Loader2, X } from "lucide-react";
import { NoContentWarning } from "../../components/noContentWarning";
import { PageTitleCard } from "../../components/cards/pageTitleCard";
import { formatDate } from "../../utils/formatDate";
import { roles } from "../../constants/roles";
import { formatFileName } from "../../utils/formatName";
import { FilePreview } from "../../components/filePreview/filePreview";
import { uploadFiles } from "../../services/uploadFiles";
import { FileItem } from "../../components/fileItem";
import DeleteAssignment from "../../components/dialogs/DeleteDialog";
import { downloads } from "../../constants/downloadType";

export function Assignment(){
  const { user, loading: loadingUser } = useAuth();
  const { classId, assignmentId } = useParams();

  const navigate = useNavigate();

  const [assignment, setAssignment] = useState({ className: "", info: {} });

  // uploadedFiles contém arquivos submetidos
  // enquanto newFiles contém arquivos adicionados pelo usuário
  const [delivery, setDelivery] = useState({ info: {}, uploadedFiles: [], newFiles: [] });

  // toAdd contém arquivos a serem adicionados na entrega
  // enquanto toRemove contém arquivos removidos na entrega
  const [update, setUpdate] = useState({ toAdd: [], toRemove: [] })

  const deliveryFiles = [
    ...delivery.uploadedFiles,
    ...delivery.newFiles
  ];

  const totalFiles = deliveryFiles.length;

  // para abrir edição de tarefas
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // arquivo selecionado para prévia
  const [preview, setPreview] = useState({ open: false, file: null, type: "" });

  // lida com a seleção dos arquivos no PC
  function removeFile(index) {
    if (index < delivery.uploadedFiles.length) {
      const removedFile = delivery.uploadedFiles[index];

      setUpdate(prev => ({
        ...prev,
        toRemove: [...prev.toRemove, removedFile]
      }));

      setDelivery(prev => ({
        ...prev,
        uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
      }));

      return;
    }

    const newIndex = index - delivery.uploadedFiles.length;

    setDelivery(prev => ({
      ...prev,
      newFiles: prev.newFiles.filter((_, i) => i !== newIndex)
    }));

    setUpdate(prev => ({
      ...prev,
      toAdd: prev.toAdd.filter((_, i) => i !== newIndex)
    }));
  }

  function onFileSelection(e) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setDelivery(prev => ({
      ...prev,
      newFiles: [...prev.newFiles, selectedFile]
    }));

    setUpdate(prev => ({
      ...prev,
      toAdd: [...prev.toAdd, selectedFile]
    }));

    e.target.value = "";
  }

  async function triggetBottomAction(){
    if(user.role == roles.TEACHER){
      setOpen(true);
      return;
    }

    let success;

    // se estiver como entregue e clicar no botão
    // então cancela a entrega (delivered = false)
    if(delivery.info?.delivered){
      success = await updateAssignment(false);

      if(success){
        setDelivery(prev => ({ ...prev, info: { ...prev.info, delivered: false } }));
      }
      return;
    }

    // se estiver como não entregue, mas existe uma entrega (já foi entregue antes)
    if(!delivery.info?.delivered && delivery.info?.id){
      success = await updateAssignment(true);
      
      if(success){ 
        setDelivery(prev => ({ ...prev, info: { ...prev.info, delivered: true } })); 
      }
      return;
    }

    // isso cria uma nova entrega (primeiro envio)
    success = await submitAssignment();

    if(success){
      setDelivery(prev => ({ ...prev, info: { ...prev.info, delivered: true } }));
    }
  }
  
  async function updateAssignment(status) {
    setLoading(true);

    try {
      let uploadedNewFiles = [];

      if (status && update.toAdd.length > 0) {
        uploadedNewFiles = await uploadFiles(update.toAdd, user.id);

        if (!uploadedNewFiles) return false;
      }

      // no cancelamento da entrega (ou confirmação sem edição), toAdd e toRemove são ambos
      // vetores vazios, então só o status e data de entrega mudam
      const result = await fetchBuilder(
        "PUT",
        `/delivery/updateDelivery/${assignmentId}`,
        {
          userId: user.id,
          status,
          toAdd: uploadedNewFiles,
          toRemove: update.toRemove
        }
      );

      if (!result.ok || result.status !== 204) {
        toast.error("Erro ao tentar atualizar tarefa");
        return false;
      }
      else {
        setUpdate({
          toAdd: [],
          toRemove: []
        });

        toast.success("Atividade atualizada com sucesso");
        return true;
      }
    } 
    catch {
      toast.error("Erro ao tentar atualizar tarefa");
      return false;
    } 
    finally {
      setLoading(false);
    }
  }

  async function submitAssignment() {
    setLoading(true);

    try {
      let uploadedFiles = [];

      if (totalFiles > 0) {
        const result = await uploadFiles(delivery.newFiles, user.id);

        if (!result) return false;

        uploadedFiles = result;
      }

      const result = await fetchBuilder(
        "POST",
        `/delivery/createDelivery/${assignmentId}`,
        {
          userId: user.id,
          files: uploadedFiles
        }
      );

      if (result.status !== 201 || !result.ok) {
        toast.error("Erro ao tentar submeter tarefa");
        return false;
      }

      toast.success("Atividade enviada com sucesso");

      setDelivery(prev => ({
        ...prev,
        info: { ...prev.info, delivered: true }
      }));

      return true;
    } 
    catch {
      toast.error("Erro ao tentar submeter tarefa");
      return false;
    } 
    finally {
      setLoading(false);
    }
  }

  async function deleteAssignment(){
    setDeleting(true);

    try{
      const result = await fetchBuilder("DELETE", `/assignment/deleteAssignment/${assignmentId}?userId=${user.id}`);

      if(!result.ok ||result.status !== 204){
        setDeleting(false);

        toast.error("Erro ao tentar remover tarefa");
        return;
      }

      navigate(`/assignments/${classId}`);
    }
    catch{
      toast.error("Erro ao tentar remover tarefa");
    }
    finally{
      setDeleting(false);
    }
  }

  useEffect(() => {
    async function loadAssignment(){
      try{
        let result = await fetchBuilder("GET", `/assignment/getAssignment/${classId}/${assignmentId}`);
        
        if(!result.ok){
          toast.error("Erro ao tentar recuperar tarefa");

          setLoading(false);
          return;
        }

        let data = await result.json();
        setAssignment(prev => ({ ...prev, className: data.className, info: data.assignment }));

        // se for aluno, recuperar também dados da entrega
        if(user.role == roles.STUDENT){
          result = await fetchBuilder("GET", `/delivery/getDelivery/${data.assignment.id}/${user.id}`);
          
          if(!result.ok){
            toast.error("Erro ao tentar recuperar tarefa");

            setLoading(false);
            return;
          }

          if(result.status == 204){ return; }

          data = await result.json();
          setDelivery({ info: data.delivery, uploadedFiles: data.files, newFiles: [] });
        }        
      }
      catch{
        toast.error("Erro ao tentar recuperar tarefa");
      }
      finally{
        setLoading(false);
      }
    }

    loadAssignment();
  }, []);

  const assignmentNotFound = !loading && assignment.className == "";

  const isDisabled =
    new Date() > new Date(assignment.info.dueDate) &&
    user.role === roles.STUDENT;

  return(
    <div className="w-10/12 lg:w-3/4 min-h-full flex flex-col items-center">
      {open &&
        <DeleteAssignment 
          message={"Tem certeza de que deseja deletar essa tarefa ?"}
          deleting={deleting}
          onCancel={() => setOpen(false)}
          onDelete={deleteAssignment}
        />
      }

      {preview.open &&
        <FilePreview 
          file={preview.file}
          type={preview.type}
          onClose={() => setPreview({ open: false, file: null })}
        />
      }

      {(loading || loadingUser) && !assignment.className ?
        (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 size={256} strokeWidth={1} className="animate-spin text-blue-600" />
          </div>
        )
        : assignmentNotFound ?
        (
          <section className="w-full flex flex-1 items-center justify-center">
            <NoContentWarning
              backTo={`/assignments/${classId}`}
              title={"Tarefa não encontrada"}
              subText={"Não existe tarefa com esse ID"}
            />
          </section>
        )
        :
        (
          <>
            <PageTitleCard title={assignment.className} backTo={`/assignments/${classId}`} />

            <section className="flex flex-col items-start justify-center w-full border-b border-gray-900 pb-2 mt-4">
              <span className="w-full flex flex-row text-gray-800 text-lg lg:text-xl font-medium">
                <p>{assignment.info.name}</p>

                { user.role == roles.STUDENT &&
                  <span className="flex flex-1 justify-end">
                    <p className="">{delivery.info?.score || "?"}/10</p>
                  </span>
                }
              </span>

              <p className="text-gray-800 font-medium text-lg lg:text-xl">
                {formatDate(assignment.info.startDate)} - {formatDate(assignment.info.dueDate)}
              </p>
            </section>

            <section className="flex min-h-20 lg:min-h-30 text-normal lg:text-lg items-start w-full border border-gray-700 
              rounded-xl mt-2 p-2"
            >
              <p className="text-lg md:text-xl text-gray-800">
                {assignment.info.description || "Essa atividade não contém descrição adicional"}
              </p>
            </section>
            
            {assignment.info.files.length > 0 &&
              <>
                <span className="w-full mt-1">
                  <label className="text-gray-800 font-medium">Anexos do professor:</label>
                </span>

                <section className={`w-full grid grid-cols-2 md:grid-cols-3 ${totalFiles > 2 ? "grid-rows-2 md:grid-rows-none" : ""} 
                  gap-2 mt-2`}
                >
                  {assignment.info.files.map((file, index) => (
                    <button
                      key={index}
                      onClick={() => setPreview({ open: true, file: file, type: downloads.ASSIGNMENT })}
                      className="flex flex-row items-center gap-2 py-2 pl-2 rounded-xl bg-gray-300 font-medium text-gray-800 text-sm"
                    >
                      {formatFileName(file.fileName)}
                    </button>
                  ))}
                </section>
              </>
            }
            
            {totalFiles > 0 &&
              <div className="w-full xl:w-[60%] flex flex-1 justify-center items-end mb-4">
                <section className={`w-full grid grid-cols-2 md:grid-cols-3 ${totalFiles > 2 ? "grid-rows-2 md:grid-rows-none" : ""} 
                  gap-2`}
                >
                  {deliveryFiles.map((file, index) => (
                    <FileItem
                      key={index}
                      file={file}
                      delivered={delivery.info.delivered}
                      setPreview={setPreview}
                      onRemove={() => removeFile(index)}
                    />
                  ))}
                </section>
              </div>
            }
            <section className={`${totalFiles == 0 ? "flex-1" : ""} flex flex-col w-full gap-2 items-center justify-end mb-4`}>
              {user.role == roles.TEACHER ?
                (
                  <Link
                    to={`/deliveries/${classId}/${assignment.info.id}`}
                    className="bg-gray-500 rounded-xl text-white font-medium w-full xl:w-[75%] h-12 lg:h-14 flex items-center 
                      justify-center text-xl lg:text-2xl disabled:bg-gray-700"
                  >
                    Visualizar entregas
                  </Link>
                )
                :
                (
                  <label className={`rounded-xl text-white font-medium w-full xl:w-[75%] h-12 lg:h-14 
                    flex items-center justify-center text-xl lg:text-2xl 
                    ${isDisabled || totalFiles == 3 || loading
                      || delivery.info.delivered ? "bg-gray-700" : "bg-gray-500 hover:cursor-pointer"}`}
                  >
                    Anexar arquivos

                    <input
                      type="file"
                      disabled={isDisabled || totalFiles == 3 || loading || delivery.info.delivered}
                      className="hidden"
                      onChange={(e) => onFileSelection(e)}
                    />
                  </label>
                )
              }

              <button 
                disabled={isDisabled || loading}
                onClick={triggetBottomAction}
                className={`rounded-xl text-white font-medium w-[95%] xl:w-[70%] h-12 lg:h-14 text-xl lg:text-2xl
                  hover:cursor-pointer disabled:bg-gray-800 disabled:cursor-auto
                  ${user.role == roles.TEACHER ? "bg-red-700" : "bg-blue-700"}`}
              >
                {user.role == roles.TEACHER ? "Deletar atividade" : 
                  delivery.info?.delivered ? "Cancelar envio" : "Confirmar envio"}
              </button>
            </section>
          </>
        )
      }
    </div>
  )
}