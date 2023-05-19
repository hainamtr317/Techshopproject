import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/admin/adminModalSlide";
import { Modal, Button } from "flowbite-react";
import { checkout } from "../../features/shop/orderSlice";
import { clearCart, resetAmount } from "../../features/shop/cartSlice";
import CheckoutCard from "./CheckoutCard";
import { useNavigate } from "react-router-dom";
function ModalCheckout({ dataModal }) {
  const navigate = useNavigate();
  const { cart, totalAmount } = useSelector((state) => state.cart);
  const { open } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.auth);

  const order = dataModal.order;

  const checkoutHandler = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      checkout({
        ...order,
        user_id: loggedUser._id,
        products: cart.map((product) => {
          return {
            product_id: product._id,
            productName: product.name,
            quantity: product.quantity,
            subTotal: product.quantity * product.price,
          };
        }),
        total: totalAmount,
      })
    ).unwrap();

    if (response) {
      dispatch(resetAmount());
      dispatch(clearCart());
      alert("Order success");
      navigate("/");
    }
  };
  return (
    <>
      <Modal
        show={open}
        onClose={() => dispatch(closeModal())}
        className="fixed"
      >
        <Modal.Header>Check your Order </Modal.Header>
        <Modal.Body>
          <article className="h-[auto] overflow-auto mx-3 mt-4">
            {cart &&
              cart.map((product) => (
                <CheckoutCard key={product._id} data={product} />
              ))}
          </article>
          <div>
            <p>
              Full Name : {dataModal.order.firstName} {dataModal.order.lastName}
            </p>
            <p>Email : {dataModal.order.email} </p>
            <p>Phone : {dataModal.order.phone} </p>
            <p>
              Address : {dataModal.order.address} , {dataModal.order.ward},
              {dataModal.order.district},{dataModal.order.city}{" "}
            </p>
            <p>Payment Type : {dataModal.order.paymentType}</p>

            <p>Order Value: {totalAmount}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={checkoutHandler}>
            Accept
          </Button>
          <Button color="gray" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCheckout;
