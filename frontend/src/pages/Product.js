import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function Product(props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
        };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return(
        <div>
            <div className="back-to-result">
                <Link to="/">Back to results</Link>
            </div>
            {loading? <div>Loading...</div>:
            error? <div>{error}</div> :
            (
            <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product" />
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} stars ({product.numReviews} reviews)
                        </li>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>
                        <li>
                            Status: {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.status}
                        </li>
                        <li>
                            Qty: <select value={qty} onChange= { (e) => { setQty(e.target.value)}} >
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x + 1}</option>
                                    )}
                            </select>
                        </li>
                        <li>
                            {product.countInStock > 0 &&
                            <button className="button" onClick={handleAddToCart} >Add to cart</button>
                            }
                            </li>
                    </ul>
                </div>
            </div>
            )}
        </div>
    )
}

export default Product