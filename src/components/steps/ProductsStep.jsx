import { PRODUCTS } from "../../data/products.js";
import { INK, MUTE, TEAL } from "../../theme.js";
import ProductCard from "../ProductCard.jsx";

export default function ProductsStep({ selected, toggleSelect, goNext }) {
  return (
    <div className="step-enter">
      <h1 style={{ fontFamily: "var(--font-serif)", color: INK }} className="text-2xl sm:text-3xl font-bold mb-1.5">
        Shop the collection
      </h1>
      <p className="text-sm mb-6" style={{ color: MUTE }}>
        Every price you see here is the price you pay — nothing is added later at checkout.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isSelected={selected.includes(p.id)}
            onToggle={() => toggleSelect(p.id)}
          />
        ))}
      </div>

      <button
        onClick={goNext}
        disabled={selected.length === 0}
        className="mt-6 w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white text-sm shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
        style={{ backgroundColor: TEAL }}
      >
        {selected.length === 0 ? "Add an item to continue" : `Go to cart (${selected.length})`}
      </button>
    </div>
  );
}
