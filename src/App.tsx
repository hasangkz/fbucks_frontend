import React, { useEffect } from 'react';
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasketPage from './pages/BasketPage';
import BillPage from './pages/BillPage';
import StatisticPage from './pages/StatisticPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ProductsSettings from './pages/ProductsSettings';
import { useSelector } from 'react-redux';
import { ErrorPage } from './pages/ErrorPage';
const App = () => {
  // @ts-ignore
  const basket = useSelector((state) => state.basket);
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/cart' element={<BasketPage />} />
          <Route path='/bills' element={<BillPage />} />
          <Route path='/statistic' element={<StatisticPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/products' element={<ProductsSettings />} />
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
