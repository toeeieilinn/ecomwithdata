import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  // const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const addToCart = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) {
      setCartItems([...cartItems, { id, count: 1 }]);
    } else {
      const updatedCart = cartItems.map((eachItem) => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            count: eachItem.count + 1,
          };
        }
        return eachItem;
      });
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      let updatedCart;
      if (item.count === 1) {
        updatedCart = cartItems.filter((item) => item.id !== id);
      } else {
        updatedCart = cartItems.map((eachItem) => {
          return {
            ...eachItem,
            count: eachItem.count - 1,
          };
          return eachItem;
        });
      }
      setCartItems(updatedCart);
    }
  };

  const updatedCartItemCount = (count, id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      let updatedCart;
      if (count === 0) {
        updatedCart = cartItems.filter((item) => item.id !== id);
      } else {
        updatedCart = cartItems.map((eachItem) => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              count: count,
            };
          }
          return eachItem;
        });
      }
      setCartItems(updatedCart);
    }
  };

  const getTotalAmount = () => {
    const totalAmount = cartItems.reduce((sum, item) => {
      const product = PRODUCTS.find((product) => product.id === item.id);
      if (item.count === 1) {
        sum += product.price;
      } else {
        sum += product.price * item.count;
      }
      return sum;
    }, 0);
    return totalAmount.toFixed(2);
  };

  const toggleFavorite = (id) => {
    const favoriteId = favoriteIds.find((fid) => fid === id);
    if (favoriteId) {
      const updateIds = favoriteIds.filter((fid) => fid !== id);
      setFavoriteIds(updateIds);
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    getTotalAmount,
    removeFromCart,
    updatedCartItemCount,
    favoriteIds,
    toggleFavorite,
    // search,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

<div className="container my-3 bg-light">
  <form>
    <input
      type="text"
      className="form-control"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by Name"
    />
  </form>
</div>;

// {
//   PRODUCTS.filter((item) => {
//     return search.toLowerCase() === ""
//       ? item
//       : item.name.toLowerCase().includes(search);
//   }).map((item) => (
//     <tr>
//       <td>{id}</td>
//       <td>{productName}</td>
//       <td>{productImage}</td>
//       <td>${price}</td>
//     </tr>
//   ));
// }
