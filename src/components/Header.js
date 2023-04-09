import '../App.css';
import { Link } from 'react-router-dom';



function Header(props) {
    return (
        <div className='flex shopping-card'  >
            <div  > <Link style={{fontSize:"18px",fontWeight:"bold",color:"black",textDecoration: 'none'}} to="/products">FlipMart </Link></div>
           <div className="flex">
           {props.showcart && <div > <Link style={{fontSize:"18px",fontWeight:"bold",color:"black",textDecoration: 'none'}} to="/cart">Cart</Link>
                <sup> {props.count} </sup>
            </div> }
           <div  > <button onClick={()=>{
            localStorage.removeItem('user');
           }} className="btn btn-danger" style={{marginLeft:"30px",}}> <Link style={{textDecoration: 'none',color:"black"}} to="/">LogOut</Link></button></div>
        </div>
           </div>
    );
}

export default Header;