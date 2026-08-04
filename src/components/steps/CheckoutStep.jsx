import { ArrowLeft, ShieldCheck, Truck, Zap } from "lucide-react";
import { CLOUD, INK, MINT, MUTE, SEAFOAM, TEAL } from "../../theme.js";

export default function CheckoutStep({ persona, saveDetails, setSaveDetails, goNext, goBack, requestExit }) {
  return (
    <div className="step-enter">
      <button onClick={goBack} className="text-xs font-semibold flex items-center gap-1 mb-4 transition-colors hover:text-slate-700" style={{ color: MUTE }}>
        <ArrowLeft size={13} /> Back to cart
      </button>
      <div className="flex items-center justify-between mb-1">
        <h1 style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-2xl sm:text-3xl font-bold">
          {persona === "returning" ? "Welcome back" : "Delivery details"}
        </h1>
        <button onClick={requestExit} className="text-xs underline shrink-0" style={{ color: MUTE }}>
          Leave checkout
        </button>
      </div>

      {persona === "returning" ? (
        <div className="mt-5">
          <div className="border rounded-xl p-5 flex items-start justify-between" style={{ borderColor: "#EDF2F2" }}>
            <div>
              <div className="text-xs font-bold tracking-wide mb-1" style={{ color: SEAFOAM }}>SAVED ADDRESS</div>
              <div className="text-sm font-semibold" style={{ color: INK }}>Aarav Mehta</div>
              <div className="text-sm" style={{ color: MUTE }}>402, Willow Residency, Sector 62<br />Noida, UP 201301</div>
            </div>
            <button className="text-xs font-semibold underline shrink-0" style={{ color: TEAL }}>Change</button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: MUTE }}>
            <Zap size={14} color={MINT} /> Saved details mean this order skips straight to payment.
          </div>
          <button
            onClick={goNext}
            className="mt-6 w-full py-3.5 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: TEAL }}
          >
            <Zap size={16} /> One-click checkout
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Full name" className="border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "#E1EAEA" }} />
            <input placeholder="Phone number" className="border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "#E1EAEA" }} />
          </div>
          <input placeholder="Address" className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "#E1EAEA" }} />
          <div className="grid grid-cols-3 gap-3">
            <input placeholder="City" className="border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "#E1EAEA" }} />
            <input placeholder="State" className="border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "#E1EAEA" }} />
            <input placeholder="PIN code" className="border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:border-teal-500" style={{ borderColor: "#E1EAEA" }} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs rounded-lg p-3" style={{ backgroundColor: CLOUD, color: INK }}>
              <Truck size={15} color={TEAL} /> Arrives in 3–4 business days
            </div>
            <div className="flex items-center gap-2 text-xs rounded-lg p-3" style={{ backgroundColor: CLOUD, color: INK }}>
              <ShieldCheck size={15} color={TEAL} /> Free returns within 15 days
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs pt-2 cursor-pointer" style={{ color: MUTE }}>
            <input type="checkbox" checked={saveDetails} onChange={(e) => setSaveDetails(e.target.checked)} />
            Save these details for faster checkout next time (optional — no account required)
          </label>

          <button
            onClick={goNext}
            className="mt-3 w-full py-3.5 rounded-full font-semibold text-white text-sm shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: TEAL }}
          >
            Continue to payment
          </button>
        </div>
      )}
    </div>
  );
}
