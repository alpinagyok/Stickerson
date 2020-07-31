import { LOAD_CART } from "./types";

// also increse quantity
export const addToCart = (product) => (dispatch) => {
  // localStorage.removeItem("cart");
  if (localStorage.getItem("cart") === null) {
    product.quantity = 1;
    localStorage.setItem("cart", JSON.stringify([product]));
  } else {
    const items = JSON.parse(localStorage.getItem("cart"));

    for (let i in items) {
      if (items[i].id === product.id) {
        items[i].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(items));
        dispatch({
          type: LOAD_CART,
        });
        return;
      }
    }

    product.quantity = 1;
    localStorage.setItem(
      "cart",
      JSON.stringify([...JSON.parse(localStorage.getItem("cart")), product])
    );
  }

  dispatch({
    type: LOAD_CART,
  });
};

export const removeFromCart = (id) => (dispatch) => {
  const items = JSON.parse(localStorage.getItem("cart"));

  let newItems = [];
  for (let i in items) {
    if (items[i].id !== id) {
      newItems.push(items[i]);
    }
  }

  localStorage.setItem("cart", JSON.stringify(newItems));

  dispatch({
    type: LOAD_CART,
  });
};

export const decreaseQuantityInCart = (id) => (dispatch) => {
  const items = JSON.parse(localStorage.getItem("cart"));

  let newItems = [];
  for (let i in items) {
    if (items[i].id === id) {
      // decrease quantity, leave in cart
      // if === 1, don't leave in cart
      if (items[i].quantity > 1) {
        items[i].quantity -= 1;
        newItems.push(items[i]);
      }
    } else {
      newItems.push(items[i]);
    }
  }

  localStorage.setItem("cart", JSON.stringify(newItems));

  dispatch({
    type: LOAD_CART,
  });
};
