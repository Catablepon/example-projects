import { createSlice } from '@reduxjs/toolkit'

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        products: [],
        items: [],
        total: 0,
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        },

        addItem(state, action) {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            )

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }

            state.total += action.payload.price
        },

        removeItem(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)

            if (!existingItem) return
            state.total -= existingItem.price

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity -= 1
            }
        }
    }
})

// export actions
export const { addItem, removeItem, setProducts } = itemsSlice.actions;

// export reducer
export default itemsSlice.reducer