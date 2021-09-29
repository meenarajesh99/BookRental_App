import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function SelectedItems({ items }) {
  var total=0;
  const itemsSelected = items.filter(item => item.checked === true);
  itemsSelected.forEach(item =>total+=item.price);
  
   const handleSubmit = async e => {
    e.preventDefault();
   }
    
  return (
    <div className="bookclass">
      <div className="subtitles">
        <h3>Selected Books</h3>
    <ul>
     {itemsSelected.map(item => <li>{item.name} ( {item.author}) = ${item.price}</li>)}   
    </ul>
    <p>Total Price:{total}</p>
    <Form>
     <Button variant="primary" type="submit" onClick={handleSubmit}>
      Checkout
    </Button> 
    </Form>   
    </div>
    </div>
  )
   }
 
SelectedItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SelectedItems;