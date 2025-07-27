import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the function passed as a prop to continue shopping
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    // Implement checkout logic here
    alert("Checkout functionality is not implemented yet.");
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    // Increment the quantity of the item in the cart
    // This will trigger the updateQuantity reducer in CartSlice
    console.log(`Incremented quantity of ${item.name} to ${item.quantity + 1}`);
    // Optionally, you can also sort items by name or cost here if needed
    item.quantity += 1; // Increment the quantity directly for UI update
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
      // Decrement the quantity of the item in the cart
      // This will trigger the updateQuantity reducer in CartSlice
      console.log(
        `Decremented quantity of ${item.name} to ${item.quantity - 1}`
      );
      item.quantity -= 1; // Decrement the quantity directly for UI update
    } else {
      dispatch(removeItem({ name: item.name }));
      // If quantity is 1, remove the item from the cart
      console.log(`Removed ${item.name} from the cart`);
    }
    // Optionally, you can also sort items by name or cost here if needed
    item.quantity = Math.max(item.quantity - 1, 0); // Ensure quantity does not go below 0
    if (item.quantity === 0) {
      dispatch(removeItem({ name: item.name })); // Remove item if quantity is 0
      console.log(`Removed ${item.name} from the cart as quantity reached 0`);
    }
    item.quantity = Math.max(item.quantity, 0); // Ensure quantity does not go below 0
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
    // Remove the item from the cart
    console.log(`Removed ${item.name} from the cart`);
    // This will trigger the removeItem reducer in CartSlice
    item.quantity = 0; // Set quantity to 0 for UI update
    item.quantity = Math.max(item.quantity, 0); // Ensure quantity does not go below 0
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2); // Return total cost formatted to 2 decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
