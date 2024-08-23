import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Book from "../components/Book";

//Actions
import { getBooks as listBooks } from "../redux/actions/bookActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getBooks = useSelector((state) => state.getBooks);
  const { books, loading, error } = getBooks;

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Latest Books</h2>
      <div className="homescreen__books">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
            books.map((book) => <Book
              key={book._id}
              bookId={book._id}
              title={book.title}
              author={book.author}
              price={book.price}
              imageUrl={book.imageUrl}
              category={book.category}
              countInStock={book.countInStock}
                            
            />
          ))
        }
      </div>
    </div>
  );
};

export default HomeScreen;