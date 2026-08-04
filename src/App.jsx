import ExitIntentModal from "./components/ExitIntentModal.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import OrderSummary from "./components/OrderSummary.jsx";
import ProgressSteps from "./components/ProgressSteps.jsx";
import CartStep from "./components/steps/CartStep.jsx";
import CheckoutStep from "./components/steps/CheckoutStep.jsx";
import ConfirmedStep from "./components/steps/ConfirmedStep.jsx";
import PaymentStep from "./components/steps/PaymentStep.jsx";
import ProductsStep from "./components/steps/ProductsStep.jsx";
import { useCheckoutState } from "./hooks/useCheckoutState.js";

export default function ClearCartPrototype() {
  const cc = useCheckoutState();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
      <Header
        persona={cc.persona}
        setPersona={cc.setPersona}
        step={cc.step}
        cartCount={cc.cartProducts.length}
        cartTotal={cc.subtotal}
        onCartClick={() => cc.setStep(cc.cartProducts.length ? "cart" : "products")}
      />

      {cc.step !== "confirmed" && <ProgressSteps stepIndex={cc.stepIndex} />}

      <main className="flex-1 px-5 sm:px-10 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-6xl mx-auto w-full">
        <div>
          {cc.step === "products" && (
            <ProductsStep selected={cc.selected} toggleSelect={cc.toggleSelect} goNext={cc.goNext} />
          )}

          {cc.step === "cart" && (
            <CartStep
              cartProducts={cc.cartProducts}
              toggleSelect={cc.toggleSelect}
              goNext={cc.goNext}
              goBack={() => cc.setStep("products")}
            />
          )}

          {cc.step === "checkout" && (
            <CheckoutStep
              persona={cc.persona}
              saveDetails={cc.saveDetails}
              setSaveDetails={cc.setSaveDetails}
              goNext={cc.goNext}
              goBack={() => cc.setStep("cart")}
              requestExit={cc.requestExit}
            />
          )}

          {cc.step === "payment" && (
            <PaymentStep
              persona={cc.persona}
              payMethod={cc.payMethod}
              setPayMethod={cc.setPayMethod}
              total={cc.total}
              goNext={cc.goNext}
              goBack={() => cc.setStep("checkout")}
              requestExit={cc.requestExit}
            />
          )}

          {cc.step === "confirmed" && (
            <ConfirmedStep
              orderNo={cc.orderNo}
              total={cc.total}
              itemCount={cc.cartProducts.length}
              startNewOrder={cc.startNewOrder}
            />
          )}
        </div>

        {cc.step !== "confirmed" && (
          <OrderSummary
            cartProducts={cc.cartProducts}
            subtotal={cc.subtotal}
            delivery={cc.delivery}
            taxes={cc.taxes}
            discount={cc.discount}
            total={cc.total}
            persona={cc.persona}
          />
        )}
      </main>

      <Footer />

      {cc.showExit && (
        <ExitIntentModal
          reasonPicked={cc.reasonPicked}
          setReasonPicked={cc.setReasonPicked}
          continueCheckout={cc.continueCheckout}
          leaveAnyway={cc.leaveAnyway}
        />
      )}
    </div>
  );
}
