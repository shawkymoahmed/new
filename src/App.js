import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Cart';
import { commerce } from './Ecommerce';
import Home from './Home';
import NavBar from './NavBar';
import Shop from './Shop';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const App = () => {

  const[products , setProducts ] = useState([]);

  const [cart, SetCart] = useState([]);


  const fetchProducts = async () =>{
    const { data } = await commerce.products.list();
    setProducts(data)
  };

  const fetchCart = async () =>{
    SetCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) =>{
    const item = await commerce.cart.add(productId, quantity)
    SetCart(item.cart);
  }

  const handleUpdateCartQty = async (lineItemId, quantity) =>{
    const response = await commerce.cart.update(lineItemId, {quantity});
    SetCart(response.cart);
  }

  const handleRemoveFromCart =async (lineItemId) =>{
    const response = await commerce.cart.remove(lineItemId);
    SetCart(response.cart);

  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    SetCart(response.cart)
  }
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(products);
  console.log(cart);

  return (
   <BrowserRouter>
      <div className='App'>
      <NavBar  totalItems={cart.total_items}/>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Shop' element={<Shop products={products} onAddToCart={handleAddToCart}/>} />
           <Route path='/Cart' element={<Cart  cart={cart} onUpdateCartQty={handleUpdateCartQty}  onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />}  />

        </Routes>
      </div>
   </BrowserRouter>
  )
}

export default App