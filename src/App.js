import React, { useEffect, useState } from 'react';
import { Container, Button, AppBar, Typography, Grid } from '@material-ui/core';
import ProductCardList from './ProductCardList';
import ShoppingCart from './ShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const firebaseConfig = {
  apiKey: "AIzaSyDyZwHISHyXc-bb5FteyOjYCQauZ3tkHyA",
  authDomain: "new-react-shopping-car.firebaseapp.com",
  databaseURL: "https://new-react-shopping-car.firebaseio.com/",
  projectId: "new-react-shopping-car"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("/");

function Header(props) {
  console.log(props.user);
  return (
    <AppBar position="static">
      <Typography>Welcome {props.user.displayName}</Typography>
      <Button onClick={() => {firebase.auth().signOut()}}>Signout</Button>
    </AppBar>
  )
}

const App = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  var [inventory, setInventory] = useState({});
  const [shoppingCartOpen, setShoppingCartOpen] = useState(true);
  var [shoppingCartItems, setShoppingCartItems] = useState([]);
  
  
  function addItem(item, size) {
    
    item.quantity = 1;
    item.size = size;
    var currentItems = [...shoppingCartItems];
    
    for (var i = 0; i < currentItems.length; i++) {
      if (item.sku === currentItems[i].sku && size === currentItems[i].size) {
        
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
      if (newItems[i].sku === sku && newItems[i].size === size) {
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
    firebase.auth().onAuthStateChanged(setUser);
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
    db.on('value', function(snapshot){
      console.log(snapshot.val());
      setInventory(snapshot.val());
    })
    db.once('value').then(function(snapshot) {
      console.log(snapshot.val());
      setInventory(snapshot.val());
    })
    fetchProducts();
  }, []);

  function completePurchase() {
    var newInventory = {}
    for (var i in inventory)
      newInventory[i] = inventory[i];

    var cost = 0;
    for (var i = 0; i < shoppingCartItems.length; i++){
      cost += shoppingCartItems[i].price * shoppingCartItems[i].quantity;
    }
    setShoppingCartItems([]);
    alert('The total cost was $' + cost.toFixed(2).toString())
    db.set(newInventory);
  }

  return (
    <Container>
      {!user && <SignIn/>}
      {user && <Header user={user}/>}
      <ProductCardList data={products} addItem={addItem} inventory={inventory} />
      <ShoppingCart saveTransaction={completePurchase} items={shoppingCartItems} isOpen={shoppingCartOpen} setIsOpen={setShoppingCartOpen} delItem={removeItem}/>
      <Button onClick={()=>{setShoppingCartOpen(true)}} style={{position: 'absolute', top: 0, 'right': 0}}>
        <ShoppingCartIcon />
      </Button>

    </Container>
    
  );
};

export default App;