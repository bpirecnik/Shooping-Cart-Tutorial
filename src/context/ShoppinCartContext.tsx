import { ReactNode, createContext, useContext, useState } from "react";

type ShoppingcartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppinCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

const ShoppingCartContext = createContext({} as ShoppinCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingcartProvider({ children }:ShoppingcartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        
    }
 
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}