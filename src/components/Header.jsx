import { ShoppingBag, ShoppingCart, Sparkles, UserRound } from "lucide-react";
import { INK, MINT, MUTE, TEAL, TEAL_DARK, money } from "../theme.js";

export default function Header({ persona, setPersona, step, cartCount, cartTotal, onCartClick }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md px-5 sm:px-10 py-4 flex items-center justify-between" style={{ borderColor: "#EAF2F1" }}>
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
          style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
        >
          <ShoppingBag size={18} color="white" />
        </div>
        <span style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-xl font-bold tracking-tight">
          ClearCart
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 bg-slate-50 rounded-full p-1 border border-slate-200">
          <button
            onClick={() => setPersona("new")}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            style={{
              backgroundColor: persona === "new" ? TEAL : "transparent",
              color: persona === "new" ? "white" : MUTE,
            }}
          >
            <Sparkles size={13} /> New shopper
          </button>
          <button
            onClick={() => setPersona("returning")}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            style={{
              backgroundColor: persona === "returning" ? TEAL : "transparent",
              color: persona === "returning" ? "white" : MUTE,
            }}
          >
            <UserRound size={13} /> Returning shopper
          </button>
        </div>

        {step !== "confirmed" && (
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 text-xs font-semibold transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
            style={{ color: INK }}
          >
            <ShoppingCart size={15} />
            {money(cartTotal)}
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
                style={{ backgroundColor: MINT }}
              >
                {cartCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
