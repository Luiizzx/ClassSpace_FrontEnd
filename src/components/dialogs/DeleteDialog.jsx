// pode ser usado tanto para remoção de turmas
// quanto de atividades e postagens
export default function DeleteDialog({ message, onDelete, onCancel, deleting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-10/12 max-w-md rounded-lg bg-white p-4 shadow-xl border border-gray-400">

        <p className="mt-3 text-sm text-gray-600 font-medium">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={deleting}
            className={`rounded-md border border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100
              disabled:bg-gray-300`}
          >
            Cancelar
          </button>

          <button
            onClick={onDelete}
            disabled={deleting}
            className={`rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700
              disabled:bg-gray-600`}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}