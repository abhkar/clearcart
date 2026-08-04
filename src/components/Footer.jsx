import { PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { INK, MUTE } from "../theme.js";

const BADGES = [
  { icon: ShieldCheck, label: "Secure payments", sub: "End-to-end encrypted" },
  { icon: Truck, label: "3–4 day delivery", sub: "Tracked, every order" },
  { icon: PackageCheck, label: "Free returns", sub: "15-day window" },
];

export default function Footer() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: "#EAF2F1" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-10 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {BADGES.map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#F1F8F7" }}>
              <b.icon size={16} color="#028090" />
            </div>
            <div>
              <div className="text-xs font-semibold" style={{ color: INK }}>{b.label}</div>
              <div className="text-xs" style={{ color: MUTE }}>{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-10 pb-8 text-xs" style={{ color: MUTE }}>
        ClearCart is a checkout-transparency prototype — no real orders are placed.
      </div>
    </footer>
  );
}
