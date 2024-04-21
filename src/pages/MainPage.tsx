import React, { useEffect, useState } from 'react';
import Basket from '../components/basket/Basket';
import Categories from '../components/categories/Categories';
import Header from '../components/header/Header';
import Products from '../components/products/Products';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
const MainPage = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState<any>();
  const [productsData, setProductsData] = useState<any>();
  const [search, setSearch] = useState<string>('');
  const [filtered, setFiltered] = useState([]);
  // @ts-ignore
  const basket = useSelector((state) => state.basket);
  // @ts-ignore
  const { user } = useSelector((state) => state.auth);

  const getAllCategories = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + '/api/categories/get-all-categories'
      );
      const data = await res.json();
      data &&
        setCategoriesData(
          data.map((item: any) => {
            // antd select menüsünde value'ya göre seçtirdiği için title'i özel bir değere atadık
            return { ...item, value: item.title };
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + '/api/products/get-all-products'
      );
      const data = await res.json();
      setProductsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <Header setSearch={setSearch} />
      {categoriesData && productsData ? (
        <div className='home gap-8 flex justify-between p-6 md:flex-row flex-col  md:pb-0 pb-24'>
          <div className='categories overflow-auto md:pb-10 max-h-[calc(100vh_-_160px)] '>
            {categoriesData && (
              <Categories
                categoriesData={categoriesData}
                setCategoriesData={setCategoriesData}
                setFiltered={setFiltered}
                productsData={productsData}
              />
            )}
          </div>
          <div className='products flex-[4] max-h-[calc(100vh_-_160px)] overflow-y-auto pb-4 min-h-[500px]'>
            {productsData && categoriesData && (
              <Products
                categoriesData={categoriesData}
                productsData={productsData}
                setProductsData={setProductsData}
                filtered={filtered}
                setFiltered={setFiltered}
                search={search}
              />
            )}
          </div>
          {basket.basketItems.length > 0 && (
            <div className='basket min-w-[200px] max-w-[400px] border '>
              <Basket />
            </div>
          )}
        </div>
      ) : (
        <Spin
          size='large'
          className='absolute top-1/2 h-screen w-screen flex justify-center'
        />
      )}
    </>
  );
};

export default MainPage;
