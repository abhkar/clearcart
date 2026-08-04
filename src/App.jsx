import React, { useState, useMemo } from "react";
import {
  ShoppingBag, ShoppingCart, Truck, ShieldCheck, CreditCard, ArrowLeft, Check,
  X, Star, Tag, PackageCheck, UserRound, Zap, Wallet, Landmark,
  ChevronRight, Sparkles, Plus
} from "lucide-react";

const TEAL = "#028090";
const SEAFOAM = "#00A896";
const MINT = "#02C39A";
const INK = "#12262A";
const MUTE = "#5C7477";
const CLOUD = "#F1F8F7";

const PRODUCTS = [
  { id: 1, name: "Everyday Canvas Tote", detail: "Sand · Medium", price: 899 },
  { id: 2, name: "Ceramic Pour-Over Mug Set", detail: "Set of 2 · Slate", price: 1249 },
  { id: 3, name: "Walnut Desk Lamp", detail: "Warm White · USB-C", price: 2199 },
  { id: 4, name: "Linen Table Runner", detail: "Natural · 72\"", price: 649 },
  { id: 5, name: "Recycled Glass Tumbler Set", detail: "Set of 4 · Clear", price: 999 },
];

const REASONS = [
  {
    id: "payment",
    label: "Payment worry",
    icon: CreditCard,
    title: "Your payment is protected",
    body: "UPI, cards and net banking are all accepted, secured end to end. Nothing is charged until the very last step.",
  },
  {
    id: "price",
    label: "Price concern",
    icon: Tag,
    title: "What you see is the final price",
    body: "The total on the right already includes delivery and taxes — it will not change at payment. Use CLEAR10 for 10% off, applied automatically.",
    badge: "CLEAR10 applied",
  },
  {
    id: "delivery",
    label: "Delivery timing",
    icon: Truck,
    title: "Here's exactly when it lands",
    body: "Your order arrives in 3–4 business days, with tracking from the moment it ships. Free returns for 15 days if it's not right.",
  },
  {
    id: "trust",
    label: "Not sure yet",
    icon: Star,
    title: "You're not the first to wonder",
    body: "4.8★ from 2,300 verified buyers this quarter. Full refund, no questions, within the return window.",
  },
];

function money(n) {
  return "\u20B9" + n.toLocaleString("en-IN");
}

export default function ClearCartPrototype() {
  const [persona, setPersona] = useState("returning");
  const [step, setStep] = useState("products");
  const [selected, setSelected] = useState([1, 2, 3]);
  const [payMethod, setPayMethod] = useState("upi");
  const [saveDetails, setSaveDetails] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [reasonPicked, setReasonPicked] = useState(null);
  const [orderNo] = useState(() => "CC-" + Math.floor(10000 + Math.random() * 89999));

  const cartProducts = useMemo(() => PRODUCTS.filter((p) => selected.includes(p.id)), [selected]);
  const subtotal = useMemo(() => cartProducts.reduce((s, p) => s + p.price, 0), [cartProducts]);
  const delivery = cartProducts.length ? 79 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const discount = reasonPicked === "price" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + delivery + taxes - discount;

  const steps = ["products", "cart", "checkout", "payment", "confirmed"];
  const stepIndex = steps.indexOf(step);

  function toggleSelect(id) {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  function goNext() {
    if (step === "products") setStep("cart");
    else if (step === "cart") setStep("checkout");
    else if (step === "checkout") setStep("payment");
    else if (step === "payment") setStep("confirmed");
  }

  function requestExit() {
    setShowExit(true);
  }

  function continueCheckout() {
    setShowExit(false);
  }

  function leaveAnyway() {
    setShowExit(false);
    setReasonPicked(null);
    setStep("cart");
  }

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }} className="min-h-screen w-full bg-white">
      <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
        {/* Top bar */}
        <header className="border-b border-slate-100 px-5 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: TEAL }}
            >
              <ShoppingBag size={18} color="white" />
            </div>
            <span style={{ fontFamily: "Georgia, serif", color: INK }} className="text-xl font-bold">
              ClearCart
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Persona switch */}
            <div className="flex items-center gap-2 bg-slate-50 rounded-full p-1 border border-slate-200">
              <button
                onClick={() => setPersona("new")}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: persona === "new" ? TEAL : "transparent",
                  color: persona === "new" ? "white" : MUTE,
                }}
              >
                <Sparkles size={13} /> New shopper
              </button>
              <button
                onClick={() => setPersona("returning")}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
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
                onClick={() => setStep(cartProducts.length ? "cart" : "products")}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 text-xs font-semibold"
                style={{ color: INK }}
              >
                <ShoppingCart size={15} />
                {money(subtotal)}
                {cartProducts.length > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center"
                    style={{ backgroundColor: MINT }}
                  >
                    {cartProducts.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </header>

        {/* Progress */}
        {step !== "confirmed" && (
          <div className="px-5 sm:px-10 pt-5 flex items-center gap-2 text-xs font-semibold" style={{ color: MUTE }}>
            {["Browse", "Cart", "Details", "Payment"].map((label, i) => (
              <React.Fragment key={label}>
                <span style={{ color: i <= stepIndex ? TEAL : MUTE }}>{label}</span>
                {i < 3 && <ChevronRight size={13} />}
              </React.Fragment>
            ))}
          </div>
        )}

        <main className="px-5 sm:px-10 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-6xl mx-auto">
          {/* LEFT: flow */}
          <div>
            {step === "products" && (
              <div>
                <h1 style={{ fontFamily: "Georgia, serif", color: INK }} className="text-2xl font-bold mb-1">
                  Shop the collection
                </h1>
                <p className="text-sm mb-6" style={{ color: MUTE }}>
                  Every price you see here is the price you pay — nothing is added later at checkout.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {PRODUCTS.map((p) => {
                    const isIn = selected.includes(p.id);
                    return (
                      <div key={p.id} className="border border-slate-100 rounded-xl p-4">
                        <div className="w-full h-28 rounded-lg mb-3" style={{ backgroundColor: CLOUD }} />
                        <div className="font-semibold text-sm mb-0.5" style={{ color: INK }}>{p.name}</div>
                        <div className="text-xs mb-3" style={{ color: MUTE }}>{p.detail}</div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-base" style={{ color: INK }}>{money(p.price)}</span>
                          <button
                            onClick={() => toggleSelect(p.id)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                            style={{
                              backgroundColor: isIn ? CLOUD : TEAL,
                              color: isIn ? SEAFOAM : "white",
                              border: isIn ? `1.5px solid ${SEAFOAM}` : "none",
                            }}
                          >
                            {isIn ? <Check size={13} /> : <Plus size={13} />}
                            {isIn ? "Added" : "Add to cart"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={goNext}
                  disabled={selected.length === 0}
                  className="mt-6 w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white text-sm disabled:opacity-40"
                  style={{ backgroundColor: TEAL }}
                >
                  {selected.length === 0 ? "Add an item to continue" : `Go to cart (${selected.length})`}
                </button>
              </div>
            )}

            {step === "cart" && (
              <div>
                <button onClick={() => setStep("products")} className="text-xs font-semibold flex items-center gap-1 mb-4" style={{ color: MUTE }}>
                  <ArrowLeft size={13} /> Back to products
                </button>
                <h1 style={{ fontFamily: "Georgia, serif", color: INK }} className="text-2xl font-bold mb-1">
                  Your cart
                </h1>
                <p className="text-sm mb-6" style={{ color: MUTE }}>
                  Everything below — including delivery and taxes — is already reflected in your total. Nothing new gets added later.
                </p>
                <div className="space-y-3">
                  {cartProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between border border-slate-100 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: CLOUD }} />
                        <div>
                          <div className="font-semibold text-sm" style={{ color: INK }}>{p.name}</div>
                          <div className="text-xs" style={{ color: MUTE }}>{p.detail}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-sm" style={{ color: INK }}>{money(p.price)}</div>
                        <button onClick={() => toggleSelect(p.id)} style={{ color: MUTE }}>
                          <X size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={goNext}
                  className="mt-6 w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white text-sm"
                  style={{ backgroundColor: TEAL }}
                >
                  Continue to checkout
                </button>
              </div>
            )}

            {step === "checkout" && (
              <div>
                <button onClick={() => setStep("cart")} className="text-xs font-semibold flex items-center gap-1 mb-4" style={{ color: MUTE }}>
                  <ArrowLeft size={13} /> Back to cart
                </button>
                <div className="flex items-center justify-between mb-1">
                  <h1 style={{ fontFamily: "Georgia, serif", color: INK }} className="text-2xl font-bold">
                    {persona === "returning" ? "Welcome back" : "Delivery details"}
                  </h1>
                  <button onClick={requestExit} className="text-xs underline" style={{ color: MUTE }}>
                    Leave checkout
                  </button>
                </div>

                {persona === "returning" ? (
                  <div className="mt-5">
                    <div className="border border-slate-100 rounded-xl p-5 flex items-start justify-between">
                      <div>
                        <div className="text-xs font-semibold mb-1" style={{ color: SEAFOAM }}>SAVED ADDRESS</div>
                        <div className="text-sm font-semibold" style={{ color: INK }}>Aarav Mehta</div>
                        <div className="text-sm" style={{ color: MUTE }}>402, Willow Residency, Sector 62<br />Noida, UP 201301</div>
                      </div>
                      <button className="text-xs font-semibold underline" style={{ color: TEAL }}>Change</button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: MUTE }}>
                      <Zap size={14} color={MINT} /> Saved details mean this order skips straight to payment.
                    </div>
                    <button
                      onClick={goNext}
                      className="mt-6 w-full py-3.5 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2"
                      style={{ backgroundColor: TEAL }}
                    >
                      <Zap size={16} /> One-click checkout
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="Full name" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-500" />
                      <input placeholder="Phone number" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-500" />
                    </div>
                    <input placeholder="Address" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-500" />
                    <div className="grid grid-cols-3 gap-3">
                      <input placeholder="City" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-500" />
                      <input placeholder="State" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-500" />
                      <input placeholder="PIN code" className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-teal-500" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs rounded-lg p-3" style={{ backgroundColor: CLOUD, color: INK }}>
                        <Truck size={15} color={TEAL} /> Arrives in 3–4 business days
                      </div>
                      <div className="flex items-center gap-2 text-xs rounded-lg p-3" style={{ backgroundColor: CLOUD, color: INK }}>
                        <ShieldCheck size={15} color={TEAL} /> Free returns within 15 days
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-xs pt-2" style={{ color: MUTE }}>
                      <input type="checkbox" checked={saveDetails} onChange={(e) => setSaveDetails(e.target.checked)} />
                      Save these details for faster checkout next time (optional — no account required)
                    </label>

                    <button
                      onClick={goNext}
                      className="mt-3 w-full py-3.5 rounded-full font-semibold text-white text-sm"
                      style={{ backgroundColor: TEAL }}
                    >
                      Continue to payment
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === "payment" && (
              <div>
                <button onClick={() => setStep("checkout")} className="text-xs font-semibold flex items-center gap-1 mb-4" style={{ color: MUTE }}>
                  <ArrowLeft size={13} /> Back
                </button>
                <div className="flex items-center justify-between mb-5">
                  <h1 style={{ fontFamily: "Georgia, serif", color: INK }} className="text-2xl font-bold">
                    Payment
                  </h1>
                  <button onClick={requestExit} className="text-xs underline" style={{ color: MUTE }}>
                    Leave checkout
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    { id: "upi", label: "UPI", sub: "Google Pay, PhonePe, Paytm", icon: Wallet },
                    { id: "card", label: persona === "returning" ? "Card ending 4821" : "Debit / Credit card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
                    { id: "cod", label: "Cash on delivery", sub: "Pay when it arrives", icon: Landmark },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      className="w-full flex items-center justify-between border rounded-xl p-4 text-left"
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
                  className="mt-6 w-full py-3.5 rounded-full font-semibold text-white text-sm"
                  style={{ backgroundColor: TEAL }}
                >
                  Pay {money(total)}
                </button>
              </div>
            )}

            {step === "confirmed" && (
              <div className="py-10 text-center sm:text-left">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 mx-auto sm:mx-0"
                  style={{ backgroundColor: MINT }}
                >
                  <PackageCheck size={26} color="white" />
                </div>
                <h1 style={{ fontFamily: "Georgia, serif", color: INK }} className="text-2xl font-bold mb-2">
                  Order confirmed
                </h1>
                <p className="text-sm mb-6" style={{ color: MUTE }}>
                  {orderNo} · Arriving in 3–4 business days · A confirmation has been sent to you.
                </p>
                <button
                  onClick={() => { setStep("products"); setReasonPicked(null); setSelected([1, 2, 3]); }}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm text-white"
                  style={{ backgroundColor: TEAL }}
                >
                  Start a new order
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: transparent ledger, sticky, always visible */}
          {step !== "confirmed" && (
            <aside className="lg:sticky lg:top-6 h-fit">
              <div
                className="rounded-2xl p-5 border"
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
                    <div className="flex justify-between" style={{ color: SEAFOAM }}>
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

              <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: TEAL }}>
                <div className="text-xs font-bold mb-1" style={{ color: MINT }}>WHY IT'S DIFFERENT</div>
                <p className="text-sm text-white leading-relaxed">
                  {persona === "returning"
                    ? "Your saved details mean payment is one tap away — no re-entering anything."
                    : "No forced account, no surprise fees. What you see now is what you'll pay."}
                </p>
              </div>
            </aside>
          )}
        </main>
      </div>

      {/* Exit-intent: reason-based recovery */}
      {showExit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={continueCheckout} className="absolute top-4 right-4" style={{ color: MUTE }}>
              <X size={18} />
            </button>

            {!reasonPicked ? (
              <>
                <h2 style={{ fontFamily: "Georgia, serif", color: INK }} className="text-lg font-bold mb-1">
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
                      className="flex flex-col items-start gap-2 border border-slate-200 rounded-xl p-3 text-left hover:border-teal-500"
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
                    <h2 style={{ fontFamily: "Georgia, serif", color: INK }} className="text-lg font-bold mb-2">
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
                        className="flex-1 py-2.5 rounded-full font-semibold text-white text-sm"
                        style={{ backgroundColor: TEAL }}
                      >
                        Continue checkout
                      </button>
                      <button onClick={leaveAnyway} className="px-4 py-2.5 rounded-full text-sm font-semibold" style={{ color: MUTE }}>
                        Leave anyway
                      </button>
                    </div>
                  </>
                );
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
}
