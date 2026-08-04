import { ShieldCheck } from "lucide-react";
import { CLOUD, INK, MINT, MUTE, TEAL, money } from "../theme.js";

export default function OrderSummary({ cartProducts, subtotal, delivery, taxes, discount, total, persona }) {
  return (
    <aside className="lg:sticky lg:top-24 h-fit">
      <div
        className="rounded-2xl p-5 border shadow-sm"
        style={{ backgroundColor: CLOUD, borderColor: "#DCEBEA" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={16} color={TEAL} />
          <span className="text-xs font-bold tracking-wide" style={{ color: TEAL }}>
            YOUR TOTAL — SHOWN IN FULL, EVERY STEP
          </span>
        </div>
        <div className="space-y-2 text-sm" style={{ color: INK }}>
          <div className="flex justify-between"><span style={{ color: MUTE }}>Items ({cartProducts.length})</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between"><span style={{ color: MUTE }}>Delivery</span><span>{money(delivery)}</span></div>
          <div className="flex justify-between"><span style={{ color: MUTE }}>Taxes</span><span>{money(taxes)}</span></div>
          {discount > 0 && (
            <div className="flex justify-between" style={{ color: "#00A896" }}>
              <span>CLEAR10 discount</span><span>&minus;{money(discount)}</span>
            </div>
          )}
        </div>
        <div
          className="flex justify-between items-center mt-4 pt-4 font-bold text-base"
          style={{ borderTop: "1px dashed #B9D3D1", color: INK }}
        >
          <span>Total</span>
          <span>{money(total)}</span>
        </div>
      </div>

      <div className="mt-4 rounded-2xl p-5 shadow-sm" style={{ background: `linear-gradient(135deg, ${TEAL}, #015F6B)` }}>
        <div className="text-xs font-bold mb-1 tracking-wide" style={{ color: MINT }}>WHY IT'S DIFFERENT</div>
        <p className="text-sm text-white leading-relaxed">
          {persona === "returning"
            ? "Your saved details mean payment is one tap away — no re-entering anything."
            : "No forced account, no surprise fees. What you see now is what you'll pay."}
        </p>
      </div>
    </aside>
  );
}
