import { CreditCard, Tag, Truck, Star } from "lucide-react";

export const REASONS = [
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
