//03.09:
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const productInCart = cart.find((item) => item._id === product._id);
  const quantity = productInCart ? productInCart.quantity : 0;

  return (
    <div className="card w-72 bg-base-100 shadow-xl m-4">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>{" "}
        <p className="text-lg font-bold">${product.price}</p>{" "}
        <div className="card-actions justify-end">
          <Link to={`/category/${product.categoryId}`} className="btn btn-link">
            View Category
          </Link>
          {quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <button
                className="btn btn-secondary"
                onClick={() => removeFromCart(product)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn btn-secondary"
                onClick={() => addToCart(product)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
