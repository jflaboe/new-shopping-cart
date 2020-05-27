import React, { useEffect, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import ProductCardList from './ProductCardList';
import ShoppingCart from './ShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const App = () => {
  const [data, setData] = useState({});
  const [shoppingCartOpen, setShoppingCartOpen] = useState(true);
  var [shoppingCartItems, setShoppingCartItems] = useState([]);
  function addItem(item) {
    for (var i = 0; i < shoppingCartItems.length; i++) {
      if (item.sku === shoppingCartItems[i] && item.size === shoppingCartItems[i].size) {
        shoppingCartItems[i].quantity = shoppingCartItems[i].quantity + 1;
        setShoppingCartItems(shoppingCartItems);
        return 
      }

      shoppingCartItems.push(item);
      setShoppingCartItems(shoppingCartItems);

    }
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
      
      <ProductCardList data={products} />
      <ShoppingCart items={[]} isOpen={shoppingCartOpen} setIsOpen={setShoppingCartOpen}/>
      <Button onClick={()=>{setShoppingCartOpen(true)}} style={{position: 'absolute', top: 0, 'right': 0}}>
        <ShoppingCartIcon />
      </Button>
    </Container>
    
  );
};

export default App;