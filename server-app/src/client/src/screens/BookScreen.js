import "./BookScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";  

// Actions
import { getBookDetails } from "../redux/actions/bookActions";
import { addToCart } from "../redux/actions/cartActions";

const BookScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.getBookDetails);
  const { loading, error, book } = bookDetails;

  useEffect(() => {
    if (book && match.params.id !== book._id) {
      dispatch(getBookDetails(match.params.id));
    }
  }, [dispatch, match, book]);

  const addToCartHandler = () => {
    dispatch(addToCart(book._id, qty));
    history.push(`/cart`);
  };

  return (
    <div className="bookscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="bookscreen__left">
            <div className="left__image">
              <img src={book.imageUrl} alt={book.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{book.name}</p>
              <p>Price: ${book.price}</p>
              <p>Description: {book.description}</p>
            </div>
          </div>
          <div className="bookscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>${book.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {book.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(book.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookScreen;
