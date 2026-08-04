import { ArrowLeft, Check, CreditCard, Landmark, ShieldCheck, Wallet } from "lucide-react";
import { CLOUD, INK, MUTE, SEAFOAM, TEAL, money } from "../../theme.js";

export default function PaymentStep({ persona, payMethod, setPayMethod, total, goNext, goBack, requestExit }) {
  const methods = [
    { id: "upi", label: "UPI", sub: "Google Pay, PhonePe, Paytm", icon: Wallet },
    { id: "card", label: persona === "returning" ? "Card ending 4821" : "Debit / Credit card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
    { id: "cod", label: "Cash on delivery", sub: "Pay when it arrives", icon: Landmark },
  ];

  return (
    <div className="step-enter">
      <button onClick={goBack} className="text-xs font-semibold flex items-center gap-1 mb-4 transition-colors hover:text-slate-700" style={{ color: MUTE }}>
        <ArrowLeft size={13} /> Back
      </button>
      <div className="flex items-center justify-between mb-5">
        <h1 style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-2xl sm:text-3xl font-bold">
          Payment
        </h1>
        <button onClick={requestExit} className="text-xs underline shrink-0" style={{ color: MUTE }}>
          Leave checkout
        </button>
      </div>

      <div className="space-y-2">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setPayMethod(m.id)}
            className="w-full flex items-center justify-between border rounded-xl p-4 text-left transition-all duration-200 hover:shadow-sm"
            style={{ borderColor: payMethod === m.id ? TEAL : "#E5EAEA", backgroundColor: payMethod === m.id ? CLOUD : "white" }}
          >
            <div className="flex items-center gap-3">
              <m.icon size={18} color={payMethod === m.id ? TEAL : MUTE} />
              <div>
                <div className="text-sm font-semibold" style={{ color: INK }}>{m.label}</div>
                <div className="text-xs" style={{ color: MUTE }}>{m.sub}</div>
              </div>
            </div>
            {payMethod === m.id && <Check size={16} color={TEAL} />}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: MUTE }}>
        <ShieldCheck size={14} color={SEAFOAM} /> The total below is exactly what you saw in your cart — nothing has been added.
      </div>

      <button
        onClick={goNext}
        className="mt-6 w-full py-3.5 rounded-full font-semibold text-white text-sm shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
        style={{ backgroundColor: TEAL }}
      >
        Pay {money(total)}
      </button>
    </div>
  );
}
