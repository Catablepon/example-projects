import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../redux/ItemsSlice'

function OneItem({ item }) {

    const items = useSelector((state) => state.items.items)
    const dispatch = useDispatch()

    const handleAddItem = () => {
        dispatch(addItem(item))
    }

    return (
        <div className="itemCard">
            <div className="topRow">
                <img src={item.image} width="100" height="100" className="image"></img>
                <button onClick={handleAddItem}className="button">Buy</button>
            </div>

            <h3 className="title">{item.title}</h3>
            <p className="price">{item.price} €</p>
            <p className="desc">{item.description}</p>
            <i><p className="category">{item.category}</p></i>
        </div>
    )
}

export default OneItem