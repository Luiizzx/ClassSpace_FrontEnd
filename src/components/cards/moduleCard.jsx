import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ModuleCard({moduleName, moduleContent, route}){
  return(
    <AnimatePresence initial={false}>
      
        <motion.div className="w-full md:w-1/3 h-full shadow-gray-400 shadow-2xl border-gray-400 border 
          rounded-3xl flex flex-col hover:scale-[1.01] transition"
        >
          <Link to={route}>
            <div className="bg-inherit w-full h-1/6 flex flex-row md:items-center gap-1 sm:gap-2 mt-4">
              <div className="bg-gray-700 border-gray-700 rounded-3xl h-4 w-4 ml-2 md:ml-4"/>
              <h1 className="text-base text-gray-700">{moduleName}</h1>
            </div>

            {/* {moduleContent} */}
          </Link>
        </motion.div> 
    </AnimatePresence>
  )
}