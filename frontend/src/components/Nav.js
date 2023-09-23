import React from "react";
import { NavLink,useParams,Link } from "react-router-dom";



function Nav() {

  const {brand} = useParams()


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

                  <ul className="navbar-nav " style={{marginRight: 10}}>

                    <li className="nav-item">
                        <a className="nav-link " aria-current="page" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg></a>
                    </li>

                    <li className="nav-item py-1 ">
                      <a className="nav-link cart_icon" href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="39" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 
                            5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                          </svg> 
                      </a>
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