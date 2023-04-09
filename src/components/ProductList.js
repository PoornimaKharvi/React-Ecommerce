import { useEffect } from 'react';
import '../App.css';

function ProductList({ product,addToCart,setshowCartValue }) {


    useEffect(() => {
       setshowCartValue(true)
    }, [])
    return (
        <div className='flex'>
        
            {
                product.map((productItem, productIndex) => {
                    return (
                        <div style={{ width: '29%',border:"1px solid grey",margin: '5px',}}>
                            <div className='product-item'>
                                <img src={productItem.url} width="100%" />
                                <p>{productItem.name} | {productItem.category} </p>
                                <p> {productItem.seller} </p>
                                <p> Rs. {productItem.price} /-</p>
                                <button className='btn btn-primary'
                                    onClick={() => addToCart(productItem)}
                                >Add To Cart</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductList