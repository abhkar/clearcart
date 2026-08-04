import { X } from "lucide-react";
import { REASONS } from "../data/reasons.js";
import { CLOUD, INK, MUTE, SEAFOAM, TEAL } from "../theme.js";

export default function ExitIntentModal({ reasonPicked, setReasonPicked, continueCheckout, leaveAnyway }) {
  return (
    <div
      className="overlay-enter fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="modal-enter bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        <button onClick={continueCheckout} className="absolute top-4 right-4 p-1 rounded-full transition-colors hover:bg-slate-100" style={{ color: MUTE }} aria-label="Close">
          <X size={18} />
        </button>

        {!reasonPicked ? (
          <>
            <h2 style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-lg font-bold mb-1">
              Before you go —
            </h2>
            <p className="text-sm mb-4" style={{ color: MUTE }}>
              What's making you hesitate? We'll show you the specific answer, not a generic discount.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {REASONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setReasonPicked(r.id)}
                  className="flex flex-col items-start gap-2 border border-slate-200 rounded-xl p-3 text-left transition-all duration-200 hover:border-teal-500 hover:shadow-sm hover:-translate-y-0.5"
                >
                  <r.icon size={16} color={TEAL} />
                  <span className="text-xs font-semibold" style={{ color: INK }}>{r.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          (() => {
            const r = REASONS.find((x) => x.id === reasonPicked);
            return (
              <>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: CLOUD }}>
                  <r.icon size={18} color={TEAL} />
                </div>
                <h2 style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-lg font-bold mb-2">
                  {r.title}
                </h2>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: MUTE }}>{r.body}</p>
                {r.badge && (
                  <div className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4" style={{ backgroundColor: CLOUD, color: SEAFOAM }}>
                    {r.badge}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={continueCheckout}
                    className="flex-1 py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                    style={{ backgroundColor: TEAL }}
                  >
                    Continue checkout
                  </button>
                  <button onClick={leaveAnyway} className="px-4 py-2.5 rounded-full text-sm font-semibold transition-colors hover:bg-slate-50" style={{ color: MUTE }}>
                    Leave anyway
                  </button>
                </div>
              </>
            );
          })()
        )}
      </div>
    </div>
  );
}
