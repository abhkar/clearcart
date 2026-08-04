import { ArrowLeft, X } from "lucide-react";
import { INK, MUTE, TEAL, money } from "../../theme.js";

export default function CartStep({ cartProducts, toggleSelect, goNext, goBack }) {
  return (
    <div className="step-enter">
      <button onClick={goBack} className="text-xs font-semibold flex items-center gap-1 mb-4 transition-colors hover:text-slate-700" style={{ color: MUTE }}>
        <ArrowLeft size={13} /> Back to products
      </button>
      <h1 style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-2xl sm:text-3xl font-bold mb-1.5">
        Your cart
      </h1>
      <p className="text-sm mb-6" style={{ color: MUTE }}>
        Everything below — including delivery and taxes — is already reflected in your total. Nothing new gets added later.
      </p>
      <div className="space-y-3">
        {cartProducts.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="flex items-center justify-between border rounded-xl p-4 transition-shadow hover:shadow-sm" style={{ borderColor: "#EDF2F2" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: p.gradient }}>
                  <Icon size={20} color={p.accent} strokeWidth={1.6} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: INK }}>{p.name}</div>
                  <div className="text-xs" style={{ color: MUTE }}>{p.detail}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-semibold text-sm" style={{ color: INK }}>{money(p.price)}</div>
                <button onClick={() => toggleSelect(p.id)} className="p-1 rounded-full transition-colors hover:bg-slate-100" style={{ color: MUTE }} aria-label={`Remove ${p.name}`}>
                  <X size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={goNext}
        className="mt-6 w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white text-sm shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
        style={{ backgroundColor: TEAL }}
      >
        Continue to checkout
      </button>
    </div>
  );
}
