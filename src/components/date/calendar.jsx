import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Calendar({ value, onChange, minDate, onClose }) {

  const today = new Date();
  const initial = value || today;
  const [cursor, setCursor] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  );

  const year  = cursor.getFullYear();
  const month = cursor.getMonth();

  const DAYS   = ["D", "S", "T", "Q", "Q", "S", "S"];
  const MONTHS = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
  ];

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function isDisabled(day) {
    if (!day) return true;
    if (!minDate) return false;

    const d   = new Date(year, month, day);       
    const min = new Date(                          
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    );

    return d < min;
  }

  function isSelected(day) {
    if (!day || !value) return false;
    return (
      value.getFullYear() === year &&
      value.getMonth() === month &&
      value.getDate() === day
    );
  }

  function isToday(day) {
    return (
      day &&
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  }

  return (
    <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3 w-72 select-none">

      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-gray-700">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* weekday labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <span key={i} className="text-center text-xs font-medium text-gray-400 py-1">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => (
          <button
            key={i}
            type="button"
            disabled={isDisabled(day)}
            onClick={() => {
              if (!day) return;
              onChange(new Date(year, month, day));
              onClose();
            }}
            className={`
              h-8 w-8 mx-auto rounded-lg text-sm transition-colors
              ${!day ? "invisible" : ""}
              ${isSelected(day)
                ? "bg-blue-600 text-white font-semibold"
                : isToday(day)
                ? "border border-blue-400 text-blue-600 font-semibold hover:bg-blue-50"
                : isDisabled(day)
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"}
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
