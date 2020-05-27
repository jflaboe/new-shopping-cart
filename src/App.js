import React, { useEffect, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import ProductCardList from './ProductCardList';
import ShoppingCart from './ShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const App = () => {
  const [data, setData] = useState({});
  const [shoppingCartOpen, setShoppingCartOpen] = useState(true);
  var [shoppingCartItems, setShoppingCartItems] = useState([]);
  console.log(shoppingCartItems);
  function addItem(item, size) {
    console.log('add item')
    item.quantity = 1;
    item.size = size;
    console.log(item);
    console.log(shoppingCartItems)
    var currentItems = [...shoppingCartItems];
    
    console.log(currentItems);
    for (var i = 0; i < currentItems.length; i++) {
      console.log("items")
      console.log(currentItems[i]);
      console.log(item)
      if (item.sku == currentItems[i].sku && size == currentItems[i].size) {
        console.log('add to existing item')
        
        item.quantity = currentItems[i].quantity + 1;
        currentItems[i] = item;
        setShoppingCartItems(currentItems);
        return 
      }
    }
    console.log('adding new item');
    setShoppingCartItems(currentItems.concat([item]));
    return
  }
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      
      <ProductCardList data={products} addItem={addItem} />
      <ShoppingCart items={shoppingCartItems} isOpen={shoppingCartOpen} setIsOpen={setShoppingCartOpen}/>
      <Button onClick={()=>{setShoppingCartOpen(true)}} style={{position: 'absolute', top: 0, 'right': 0}}>
        <ShoppingCartIcon />
      </Button>
    </Container>
    
  );
};

export default App;