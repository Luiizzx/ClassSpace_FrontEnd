import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import CalendarPicker from "./calendar";

export function DateField({ label, value, onChange, minDate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatted = value
    ? value.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "Selecionar data";

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`
          w-full h-10 px-3 rounded-lg border bg-gray-50 text-sm text-left flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
          ${open ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"}
          ${value ? "text-gray-800" : "text-gray-400"}
        `}
      >
        {formatted}
        <Calendar size={15} className="text-gray-400 shrink-0" />
      </button>
      {open && (
        <CalendarPicker
          value={value}
          onChange={onChange}
          minDate={minDate}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
