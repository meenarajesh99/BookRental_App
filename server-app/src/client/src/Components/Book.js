import "./Book.css";
import { Link } from "react-router-dom";


const Book = ({  imageUrl, title, author, price,category,  bookId }) => {
  return (
    <div className="book">
      <img src={imageUrl} alt={title} />

      <div className="book__info">
        <p className="info__title">{title}</p>
        <p className="info__author">{author}</p>
        <p className="info__price">${price}</p>
        <p className="info__imageUrl">${imageUrl}</p>
        <p className="info__category">${category}</p>
        {/* <p className="info__countInStock">${countInStock}</p> */}
        <Link to={`/book/${bookId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Book;
