import React from 'react';
import Item from './Item.js';

export default function Main(props){
    const {items, onAdd} = props;
    return (
    <main className="block col-2">
        <h2>Books</h2>
        <div className="row">
            {items.map((item)=>(
              <Item key={item.id} item={item} onAdd={onAdd}></Item> 
              ))}
        </div>
        </main>
    );
}

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <h3>{this.state.content}</h3>
//         </header>
//       </div>
//     );
//   }
// }