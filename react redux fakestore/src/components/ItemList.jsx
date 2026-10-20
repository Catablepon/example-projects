import { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import OneItem from './OneItem.jsx'
import Cart from './Cart.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/ItemsSlice.jsx'

function Items() {

  //const [itemList, setItemList] = useState([])
  const dispatch = useDispatch()
  const products = useSelector((state) => state.items.products)

  const loadItems = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products')
      //setItemList(response.data)
      dispatch(setProducts(response.data))
    } catch (error) {
      console.error("Error loading items: ", error)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  console.log(products)

  return (
    <div className='storeLayout'>
        <div className='items'>
            {products.map(item => (
                <OneItem key={item.id} item={item}/>
            ))}
        </div>
        <div className='cart'>
            <Cart />
        </div>
    </div>

  )
}

export default Items