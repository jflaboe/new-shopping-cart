import React, { useEffect, useState } from 'react';
import ProductCardList from './ProductCardList';

const App = () => {
  const [data, setData] = useState({});
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
    <ProductCardList data={products} />
  );
};

export default App;