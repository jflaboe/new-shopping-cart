import React, { useEffect, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import ProductCardList from './ProductCardList';
import ShoppingCart from './ShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const App = () => {
  const [data, setData] = useState({});
  var [inventory, setInventory] = useState({});
  const [shoppingCartOpen, setShoppingCartOpen] = useState(true);
  var [shoppingCartItems, setShoppingCartItems] = useState([]);
  
  
  function addItem(item, size) {
    
    item.quantity = 1;
    item.size = size;
    var currentItems = [...shoppingCartItems];
    
    for (var i = 0; i < currentItems.length; i++) {
      if (item.sku == currentItems[i].sku && size == currentItems[i].size) {
        
        item.quantity = currentItems[i].quantity + 1;
        currentItems[i] = item;
        inventory[item.sku][size] -= 1;
        setInventory(inventory);
        setShoppingCartItems(currentItems);
        return 
      }
    }
    inventory[item.sku][size] -= 1;
    setInventory(inventory);
    setShoppingCartItems(currentItems.concat([item]));
    return
  }

  function removeItem(sku, size){
    var newItems = [...shoppingCartItems];
    
    for (var i = 0; i < newItems.length; i++){
      if (newItems[i].sku == sku && newItems[i].size == size) {
        inventory[sku][size] += newItems[i].quantity
        setInventory(inventory);
        newItems.splice(i, 1);
        setShoppingCartItems(newItems);
        return
      }
    }
  }

  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInventory(json);
    }
    fetchInventory();
    fetchProducts();
  }, []);

  return (
    <Container>
      <ProductCardList data={products} addItem={addItem} inventory={inventory} />
      <ShoppingCart items={shoppingCartItems} isOpen={shoppingCartOpen} setIsOpen={setShoppingCartOpen} delItem={removeItem}/>
      <Button onClick={()=>{setShoppingCartOpen(true)}} style={{position: 'absolute', top: 0, 'right': 0}}>
        <ShoppingCartIcon />
      </Button>
    </Container>
    
  );
};

export default App;