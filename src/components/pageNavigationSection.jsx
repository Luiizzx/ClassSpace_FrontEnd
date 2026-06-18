import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PageNavigationSection({ sectionTitle, leftRoute, rightRoute }){
  return(
    <div className="w-10/12 lg:w-3/4 border-b border-gray-600 flex flex-row items-center justify-center text-gray-900">
      <Link to={leftRoute}>
        <ChevronLeft size={32} strokeWidth={1}/>
      </Link>

      <div className="flex flex-1 items-center justify-center py-1">
        <h2 className="text-2xl">{sectionTitle}</h2>
      </div>

      <Link to={rightRoute}>
        <ChevronRight size={32} strokeWidth={1}/>
      </Link>
    </div>
  )
}