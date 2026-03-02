import Modal from "@/components/ui/Modal";
import Cart from "@/components/ui/Cart";

export const metadata = {
  title: "Checkout | Agora",
  description: `Complete your purchase securely on Agora. 
  Review your items, enter payment details, and confirm your order.`,
};

export default function CheckoutPage() {
  return (
    <Modal>
      <Cart />
    </Modal>
  );
}