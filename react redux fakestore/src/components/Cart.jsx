import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../redux/ItemsSlice";

function Cart() {
    const items = useSelector((state) => state.items.items)
    const dispatch = useDispatch()

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id))
    }
    const total = useSelector((state) => state.items.total)

    return (
        <div className="shoppingCart">
            <h2 className="cartTitle">Shopping cart</h2>
            {items.map(item => (
                <div className="cartItem" key={item.id}>
                    <img src={item.image} width="50" height="50" className="imageCart"></img>
                    <p>{item.title}</p>
                    <p>{item.price} € x {item.quantity}</p>
                    <button onClick={() => handleRemoveItem(item.id)}>
                        X
                    </button>
                </div>

            ))}
            <h3 className="cartTotal">Total: {total.toFixed(2)} €</h3>
        </div>

    )
}
export default Cart