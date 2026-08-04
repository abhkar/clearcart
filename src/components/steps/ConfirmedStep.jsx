import { PackageCheck, Truck } from "lucide-react";
import { CLOUD, INK, MINT, MUTE, TEAL, money } from "../../theme.js";

export default function ConfirmedStep({ orderNo, total, itemCount, startNewOrder }) {
  return (
    <div className="step-enter py-8 sm:py-12">
      <div className="max-w-md mx-auto sm:mx-0 text-center sm:text-left">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto sm:mx-0 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${MINT}, ${TEAL})` }}
        >
          <PackageCheck size={28} color="white" />
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-2xl sm:text-3xl font-bold mb-2">
          Order confirmed
        </h1>
        <p className="text-sm mb-6" style={{ color: MUTE }}>
          A confirmation has been sent to you. Here's everything, exactly as promised — nothing more.
        </p>

        <div className="rounded-2xl p-5 border text-left" style={{ backgroundColor: CLOUD, borderColor: "#DCEBEA" }}>
          <div className="flex items-center justify-between text-sm mb-3">
            <span style={{ color: MUTE }}>Order number</span>
            <span className="font-bold" style={{ color: INK }}>{orderNo}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <span style={{ color: MUTE }}>Items</span>
            <span className="font-semibold" style={{ color: INK }}>{itemCount}</span>
          </div>
          <div className="flex items-center gap-2 text-sm pt-3" style={{ borderTop: "1px dashed #B9D3D1", color: INK }}>
            <Truck size={15} color={TEAL} /> Arriving in 3–4 business days
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 font-bold text-base" style={{ borderTop: "1px dashed #B9D3D1", color: INK }}>
            <span>Total paid</span>
            <span>{money(total)}</span>
          </div>
        </div>

        <button
          onClick={startNewOrder}
          className="mt-6 px-6 py-2.5 rounded-full font-semibold text-sm text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          style={{ backgroundColor: TEAL }}
        >
          Start a new order
        </button>
      </div>
    </div>
  );
}
