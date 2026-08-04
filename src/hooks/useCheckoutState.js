import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products.js";

export const STEPS = ["products", "cart", "checkout", "payment", "confirmed"];

function randomOrderNo() {
  return "CC-" + Math.floor(10000 + Math.random() * 89999);
}

export function useCheckoutState() {
  const [persona, setPersona] = useState("returning");
  const [step, setStep] = useState("products");
  const [selected, setSelected] = useState([1, 2, 3]);
  const [payMethod, setPayMethod] = useState("upi");
  const [saveDetails, setSaveDetails] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [reasonPicked, setReasonPicked] = useState(null);
  const [orderNo, setOrderNo] = useState(randomOrderNo);

  const cartProducts = useMemo(() => PRODUCTS.filter((p) => selected.includes(p.id)), [selected]);
  const subtotal = useMemo(() => cartProducts.reduce((s, p) => s + p.price, 0), [cartProducts]);
  const delivery = cartProducts.length ? 79 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const discount = reasonPicked === "price" ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + delivery + taxes - discount;

  const stepIndex = STEPS.indexOf(step);

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

  function startNewOrder() {
    setStep("products");
    setReasonPicked(null);
    setSelected([1, 2, 3]);
    setOrderNo(randomOrderNo());
  }

  return {
    persona, setPersona,
    step, setStep,
    stepIndex,
    selected, toggleSelect,
    payMethod, setPayMethod,
    saveDetails, setSaveDetails,
    showExit, requestExit, continueCheckout, leaveAnyway,
    reasonPicked, setReasonPicked,
    orderNo,
    cartProducts, subtotal, delivery, taxes, discount, total,
    goNext, startNewOrder,
  };
}
