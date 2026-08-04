import { Check, Plus, Star } from "lucide-react";
import { CLOUD, INK, MUTE, SEAFOAM, TEAL, money } from "../theme.js";

export default function ProductCard({ product, isSelected, onToggle }) {
  const Icon = product.icon;
  return (
    <div
      className="group border rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderColor: isSelected ? SEAFOAM : "#EDF2F2",
        boxShadow: isSelected ? "0 0 0 1.5px " + SEAFOAM : "none",
      }}
    >
      <div
        className="relative w-full h-32 rounded-xl mb-3 flex items-center justify-center overflow-hidden"
        style={{ background: product.gradient }}
      >
        <Icon size={34} color={product.accent} strokeWidth={1.6} />
        <div
          className="absolute top-2 right-2 flex items-center gap-1 bg-white/85 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ color: INK }}
        >
          <Star size={10} fill="#F5B700" color="#F5B700" />
          {product.rating}
        </div>
      </div>
      <div className="font-semibold text-sm mb-0.5" style={{ color: INK }}>{product.name}</div>
      <div className="text-xs mb-3" style={{ color: MUTE }}>{product.detail}</div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-base" style={{ color: INK }}>{money(product.price)}</span>
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: isSelected ? CLOUD : TEAL,
            color: isSelected ? SEAFOAM : "white",
            border: isSelected ? `1.5px solid ${SEAFOAM}` : "none",
          }}
        >
          {isSelected ? <Check size={13} /> : <Plus size={13} />}
          {isSelected ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
