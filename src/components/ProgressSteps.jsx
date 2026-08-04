import { Check } from "lucide-react";
import { INK, LINE, MUTE, TEAL } from "../theme.js";

const LABELS = ["Browse", "Cart", "Details", "Payment"];

export default function ProgressSteps({ stepIndex }) {
  return (
    <div className="px-5 sm:px-10 pt-5">
      <div className="flex items-center max-w-lg">
        {LABELS.map((label, i) => {
          const done = i < stepIndex;
          const active = i === stepIndex;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 shrink-0"
                  style={{
                    backgroundColor: done || active ? TEAL : "white",
                    color: done || active ? "white" : MUTE,
                    border: done || active ? "none" : `1.5px solid ${LINE}`,
                  }}
                >
                  {done ? <Check size={12} /> : i + 1}
                </div>
                <span
                  className="text-xs font-semibold hidden sm:inline whitespace-nowrap"
                  style={{ color: done || active ? INK : MUTE }}
                >
                  {label}
                </span>
              </div>
              {i < LABELS.length - 1 && (
                <div className="flex-1 h-px mx-2 sm:mx-3 min-w-4" style={{ backgroundColor: done ? TEAL : LINE }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
