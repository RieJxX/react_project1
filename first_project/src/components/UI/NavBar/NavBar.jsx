import React from "react";
import {Link} from "react-router-dom"

const NavBar = () =>{
    return(
        <div className="navbar">
        <div className='navbar__links'>
          <Link to='/about'>O сайте </Link>
          <Link to='/posts'>Посты</Link>
        </div>
      </div>
    )
}

export default NavBar