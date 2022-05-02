
import { createContext,useState } from 'react';

const CartContext = createContext();

export function CartProvider({children}) {
    const [cart,setCart] = useState([]);
    const [cartQty,setQty] = useState(0);
    const itemsPrice = cart.reduce((a,c)=> a+c.price * c.qty, 0);
    const taxPrice = itemsPrice * .0725;
    const taxPriceParsed = parseFloat(itemsPrice * .0725).toFixed(2);
    const shippingPrice = itemsPrice > 200 || itemsPrice === 0? 20:0;
    const totalPrice = parseFloat(itemsPrice + taxPrice + shippingPrice).toFixed(2);
    const addToCart = (productObject) => {

        // is our product already in the cart?
        const exist = cart.find((product)=>product._id === productObject._id)
        // if true, add 1 to quantity key value pair for every time it exist/added
        if(exist) {
            setCart(cart.map((product)=>
            //find the matching added product from the cart and increment the qty
                product._id === productObject._id? {...exist,qty: exist.qty + 1}:product

                /* 
                go into the product object and increment qty
                    product : {
                        name : name,
                        etc : etc,
                        qty: qty + 1 (added 1)
                    }
                */
            ))
            console.log(cart)
        }
        // else, add to cart and iniate item quantity key value pair
        else {
            setCart([...cart,{...productObject,qty: 1}])
            /* 
                go into the product object
                    product : {
                        name : name,
                        etc : etc,
                        qty: 1 (newly created)
                    }
                */
            console.log(cart)
            
        }
        
        setQty(cartQty+1)
        // setTotalPrice(productObject.qty * productObject.price)
    }
    const removeFromCart = (productObject) => {
        const exist = cart.find((product)=>product._id === productObject._id)
        // if qty equals 0 stop decrementing
        if(exist.qty === 1) {
            setCart(cart.filter((product)=>
            //find the matching added product from the cart and increment the qty
                product._id !== productObject._id
                /* 
                go into the product object
                    product : {
                        name : name,
                        etc : etc,
                        qty: qty + 1 (added 1)
                    }
                */
            ))
        console.log(cart)
        } else {
            // map into cart and find matching object
            setCart(cart.map((product)=>
                product._id === productObject._id? 
                {...product,qty: product.qty-1}:product
                ))
            console.log(cart)
        }
        setQty(cartQty-1)
    }

    return (
        <CartContext.Provider value={{item:1,cart,addToCart,removeFromCart,cartQty,totalPrice,itemsPrice,shippingPrice,taxPriceParsed}}>{children}</CartContext.Provider>
    )
}

export default CartContext;
