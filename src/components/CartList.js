import { useEffect, useState } from 'react';
import '../App.css';

function CartList({ cart,setCart }) {

    const [CART, setCART] = useState([])

    useEffect(() => {
        setCART(cart)
    }, [cart])

    return (
        <div   >
        <div style={{  
          display:"flex",
          flexWrap:"wrap",
          justifyContent:"flex-start",
     
        
          }}>

            {
                CART?.map((cartItem, cartindex) => {
                    return (
                        <div style={{ backgroundColor: "lightGray", width: "250px", marginBottom: "30px", border: "1px solid grey",marginRight:"20px" }}>
                            <img src={cartItem.url} width={"100%"} height={150} /><br></br>
                            <span style={{ display: "flex", justifyContent: "center", borderBottom: "1px solid black", paddingBottom: "5px" }}> {cartItem.name} </span>

                            <div style={{ display: "flex", justifyContent: "center", paddingBottom: "5px", paddingTop: "5px" }} >
                                <div>

                                    <button
                                    className="btn btn-primary"

                                        onClick={() => {
                                            const _CART = CART.map((item, index) => {
                                                return cartindex === index ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 } : item
                                            })
                                            setCART(_CART)
                                        }}
                                    >-</button>
                                    <span style={{fontSize:"20px",fontWeight:500}} > {cartItem.quantity} </span>
                                    <button
                                    className="btn btn-primary"

                                        onClick={() => {
                                            const _CART = CART.map((item, index) => {
                                                return cartindex === index ? { ...item, quantity: item.quantity + 1 } : item
                                            })
                                            setCART(_CART)
                                        }}
                                    >+</button>
                                    <span style={{fontSize:"20px",fontWeight:600}}> Rs. {cartItem.price * cartItem.quantity} </span>

                                </div>

                            </div>
                            <button  onClick={() => {
                                console.log("cartItem",cartItem.name)
                                const updatedItems = CART.filter((item, index) => {
                                    return cartItem.name !== item.name 
                                })



                                setCart(updatedItems)

                                
                            }} style={{ width: "100%" }} className="btn btn-danger"  >Delete</button>

                        </div>
                    )
                })
            }

           
        </div>
        <div style={{ width: "100%", }}>
<p  style={{ fontSize: "20px",fontWeight:"bold",marginLeft:"10px",color:"black"}}> Total Amount &nbsp;  :  &nbsp; &nbsp; ₹
                {
                    CART.map(item => item.price * item.quantity).reduce((total, value) => total + value, 0)
                } 
            </p>

</div>
        </div>

    )
}

export default CartList
