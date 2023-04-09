import React from 'react'
import { Link } from 'react-router-dom'

function Errorpage() {
  return (
    <>
    <div className="" id="notfound">
<div className="notfound">
<div className="notfound-404">
<h1  style={{color: 'gray'}} >
    404
</h1>


</div>
<h2>
    Sorry! Page Not Found
</h2>
<p className="mb-5">
The page you are looking for might have been removed had its content removed or temporarily unavailable
</p>
<Link to="/products">
Back To HomePage
</Link>
</div>
    </div>
      
    </>
  )
}

export default Errorpage