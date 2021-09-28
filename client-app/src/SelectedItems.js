import PropTypes from "prop-types";

function SelectedItems({ items }) {
  const itemsSelected = items.filter(item => item.checked === true);

  return (
    <div className="bookclass">
      <div className="subtitles">
        <h3>Selected Books</h3>
    <ul>

     {itemsSelected.map(item => <li>{item.name} ( {item.author}) = ${item.price}</li>)}
          
    </ul>
    </div>
    </div>
  )

}

SelectedItems.propTypes = {
  items: PropTypes.array.isRequired,
};


export default SelectedItems;