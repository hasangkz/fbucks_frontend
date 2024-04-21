import React from 'react';
import Header from '../components/header/Header';
import ProductItemEdit from '../components/products/ProductItemEdit';

const ProductsSettings = () => {
  return (
    <>
      <Header />
      <div className='px-5'>
        <br />
        <h1 className='text-4xl font-bold text-center mb-4'>Ürün Detayları</h1>
        <br />
        <ProductItemEdit />
      </div>
    </>
  );
};

export default ProductsSettings;
