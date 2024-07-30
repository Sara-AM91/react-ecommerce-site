// src/pages/CartPage.jsx
import { useCart } from "../utils/cartUtils";

//manage the cart's state and actions.
const CartPage = () => {
  //useCart function return { cart, addToCart, removeFromCart };
  //Can I change name of them? For ex. cart, addedToCart, removedFromCart
  const { cart, addToCart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <div className="flex space-x-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-4">
        <h2 className="text-2xl">Total: ${total}</h2>
      </div>
    </div>
  );
};

export default CartPage;
