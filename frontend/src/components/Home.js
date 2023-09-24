import {React,useEffect} from "react";
import { useDispatch, useSelector, } from "react-redux";
import { loadHomeProducts,selectfeatured,selectgender,selecteverydaySneakers,selectforRunners } from "../slices/homeSlice";
import { Link } from "react-router-dom";
import Banner from "./banner";


function Home() {

    const dispatch = useDispatch();
    const featuredProducts = useSelector(selectfeatured);
    const gender = useSelector(selectgender);
    const everydaySneakers = useSelector(selecteverydaySneakers);
    const forRunners = useSelector(selectforRunners)


    useEffect(() => {
        dispatch(loadHomeProducts());
    }, 
    []);

    return(
    <>
        <Banner/>

        <div className="row my-4 mx-3 product_line">

        <h1 id="featured">Featured</h1>

            {featuredProducts.map(product => {
                return (
                <div className="col">
                    <Link to={`product/${product.id}`}> <img src={process.env.PUBLIC_URL + product.image_path} className="img-fluid" alt="..."/> </Link>
                    <h3>{product.brand} {product.name}</h3>
                </div>
                )}
            )}
        </div>

        {gender.length > 0 && 
        
        <div className="row my-5 gender">

            <h1>Step into Style:</h1>
            <h4>Men's and Women's Shoe Collection</h4>

            <div className="col-4 offset-2">
                <img src={process.env.PUBLIC_URL + gender[0].image_path}  className="img-fluid" alt="..."/>
                <Link to={'/gender/men/products'} className="btn btn-outline-dark text-decoration-none" href="category.html">Shop Men</Link>
            </div>

            <div className="col-4">
                <img src={process.env.PUBLIC_URL + gender[1].image_path}  className="img-fluid" alt="..."/>
                <Link to={'/gender/women/products'} className="btn btn-outline-dark text-decoration-none" href="category.html">Shop Women</Link>
            </div>

        </div>
        }

        <div className="row my-4 mx-3 product_line">

            <h1>Everyday Sneakers</h1>
            <div className="view-all">
                <Link to={'/category/sneakers/products'} className="btn btn-outline-dark" href="category.html">view all</Link>
            </div>

            {everydaySneakers.map(product => {
                return (
                <div className="col">
                    <Link to={`product/${product.id}`}> <img src={process.env.PUBLIC_URL + product.image_path} className="img-fluid" alt="..."/> </Link>
                    <h3>{product.brand} {product.name}</h3>
                </div>
                )}
            )}

        </div>


        <div className="row my-4 mx-3 product_line">

            <h1>For Runners</h1>
            <div className="view-all">
                <Link to={'/category/runners/products'} className="btn btn-outline-dark" href="category.html">view all</Link>
            </div>

            {forRunners.map(product => {
                return (
                <div className="col">
                    <Link to={`product/${product.id}`}> <img src={process.env.PUBLIC_URL + product.image_path} className="img-fluid" alt="..."/> </Link>
                    <h3>{product.brand} {product.name}</h3>
                </div>
                )}
            )}

        </div>

        <div className="row iconic">
            <h1>
                Always Iconic
            </h1>
            <div className="col-6 offset-3">
                <h5>Each step in a pair of these legendary footwear feels like a stride through the annals of style. Their design, a testament to 
                    innovation and craftsmanship, has left an indelible mark on culture.
                </h5>
            </div>

            <div className="col-12 p-0 d-flex justify-content-center align-items-center flex-column image">
            </div>

            <div className="col text-center">
                <a className="btn btn-outline-dark text-decoration-none" href="category.html">View collection</a>
            </div>
            
        </div>
        


    </>
    )
}



export default Home;