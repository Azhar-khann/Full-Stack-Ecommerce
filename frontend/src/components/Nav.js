import React, { useState, useEffect }  from "react";
import { NavLink,Link } from "react-router-dom";
import { selectstatus,loginstatus } from "../slices/loginstatus";
import { useDispatch, useSelector } from "react-redux";
import { selectdata,loadcart } from "../slices/cartSlice";



function Nav() {

  const dispatch = useDispatch();
  const {LoggedIn,firstname} = useSelector(selectstatus);
  const cartItems = useSelector(selectdata).length
  console.log(cartItems)
  const [vibrate, setVibrate] = useState(false);
  const [loginStatusFinished, setLoginStatusFinished] = useState(false);

  useEffect(() => {
    dispatch(loginstatus())
      .then(() => {
        setLoginStatusFinished(true);
      })
  }, []);

  useEffect(() => {
    if (loginStatusFinished && LoggedIn === true) {
      dispatch(loadcart());
    }
  }, [loginStatusFinished]);
  

  useEffect(() => {
    // Trigger vibrate effect whenever cartItems changes
    setVibrate(true);
    const timeout = setTimeout(() => setVibrate(false), 300); // Duration of vibrate effect
    return () => clearTimeout(timeout);
  }, [cartItems]);

  return (

      <div className="row navigation">

        <div className="col ">

          <nav className="navbar navbar-expand-lg bg-body-tertiary">

            <div className="container-fluid ">
    
              <a className="navbar-brand" href="#">StockX</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                   </button>

              <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
    
                  <ul className="navbar-nav">
    
                    <li className="nav-item">
                      <NavLink to={'/'}  className="nav-link" aria-current="page">Home</NavLink>
                    </li>
    
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Brands
                      </Link>

                    <ul className="dropdown-menu">
                      <li><Link to={'/brand/Nike/products'} className="dropdown-item">Nike</Link></li>
                      <li><Link to={'/brand/Adidas/products'} className="dropdown-item" href="#">Addidas</Link></li>
                      <li><Link to={'/brand/Allbirds/products'} className="dropdown-item" href="#">All birds</Link></li>
                    </ul>
                      
                    </li>
    
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link to={'/category/sneakers/products'} className="dropdown-item" href="#">Sneakers</Link></li>
                        <li><Link to={'/category/runners/products'} className="dropdown-item" href="#">Runners</Link></li>
                        <li><Link to={'/category/casual/products'} className="dropdown-item" href="#">Casual</Link></li>
                      </ul>
                    </li>
                          
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Gender
                      </a>
                      <ul className="dropdown-menu">
                        <li><Link to={'/gender/men/products'} className="dropdown-item" href="#">Men</Link></li>
                        <li><Link to={'/gender/women/products'} className="dropdown-item" href="#">Women</Link></li>
                      </ul>
                    </li>

                          

                  </ul>

                  <ul className="navbar-nav " style={{marginRight: '1%'}}>
                    
                    <li className="nav-item">
                      {LoggedIn ? (
                        <Link to={'/profile'} style={{ textDecoration: 'none' }} className="nav-link" aria-current="page">
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill profileIcon" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                          </svg> <span id="userfirstname"> {firstname}</span>
                        </Link>) : 
                        (<NavLink to={'/register'} className="nav-link" aria-current="page">
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill profileIcon" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                          </svg>
                        </NavLink>)
                      }
                    </li>                            

                    <li className="nav-item py-1 ">
                      <NavLink to={'/cart'} className="nav-link cart_icon" href="#">
                        <i class={`fa fa-shopping-cart mt-2 ${vibrate ? 'vibrate' : ''}`} style={{ fontSize:'18px' }}> </i><span>  {cartItems}</span>
                      </NavLink>
                    </li>

                  </ul>


              </div>
    
            </div>
                    
          </nav>

        </div>

      </div>

  )
}

export default Nav;