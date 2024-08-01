import React, { useEffect, useState } from 'react';
import { Products } from '../components/Products';
import { Header } from '../../../shared/components/Header';
import { getApi } from '../../../shared/services/api-client';
import { CartView } from '../../carts/pages/CartView';
import { CartContext } from '../context/cart-context';
import { Navbar } from '../../../shared/components/NavBar';
import Loading from "../../../shared/widgets/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const addCart = (product) => {
    const existingItem = carts.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = carts.map((item) => {
        if (item.id === product.id) {
          const newPrice = (parseFloat(existingItem.price) + parseFloat(product.price)).toFixed(2);
          return { ...item, quantity: item.quantity + 1, price: newPrice };
        }
        return item;
      });
      setCarts(updatedCartItems);
    } else {
      setCarts([...carts, { ...product, quantity: 1, price: product.price }]);
    }
    toast.success('Pizza added to cart!');
  };

  const removeCart = (productId) => {
    const existingItem = carts.find((item) => item.id === productId);
    if (existingItem) {
      const productPrice = parseFloat(existingItem.price) / existingItem.quantity;
      const updatedCartItems = carts
        .map((item) => {
          if (item.id === productId) {
            const updatedPrice = (parseFloat(item.price) - productPrice).toFixed(2);
            return { ...item, quantity: item.quantity - 1, price: updatedPrice };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      setCarts(updatedCartItems);
      toast.info('Pizza removed from cart!');
    }
  };

  const getProducts = async () => {
    const data = await getApi();
    console.log('Products ', data);
    setProducts(data);
    setLoading(true); // Trigger the loading bar
  };

  return (
    <div>
      <Header />
      <Navbar onSearchResults={setSearchResults} onAddressRetrieved={setAddress} />
      <CartContext.Provider value={{ carts: carts, addCart: addCart, removeCart: removeCart }}>
        <div className='row'>
          <div className='col-8'>
            <div className='row'>
              {loading ? (
                <Loading setLoading={setLoading} />
              ) : (
                <Products products={searchResults.length ? searchResults : products} />
              )}
            </div>
          </div>
          <div className='col-4'>
            <h3 className='alert alert-success my-4'>Carts</h3>
            <CartView address={address}/>
          </div>
        </div>
      </CartContext.Provider>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};
