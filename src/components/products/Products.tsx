import React, { useState } from 'react';
import './products.css';
import ProductItem from './ProductItem';
import ProductItemAdd from './ProductItemAdd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

const Products = ({
  productsData,
  setProductsData,
  categoriesData,
  filtered,
  search,
}: any) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='product-wrapper grid gap-8 grid-cols-[repeat(auto-fill,_300px)] justify-center align-middle '>
      {filtered
        .filter(
          (item: any) =>
            item.title?.toLowerCase().includes(search) ||
            item.desc?.toLowerCase().includes(search)
        )
        .sort((a: any, b: any) => a.title.localeCompare(b.title))
        .map((product: any) => (
          <ProductItem product={product} key={product._id} />
        ))}
      <div className='flex flex-col items-center justify-between align-middle'>
        <div>
          <button onClick={() => setIsAddModalOpen(true)}>
            <ProductItemAdd
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              productsData={productsData}
              categoriesData={categoriesData}
              setProductsData={setProductsData}
            />
          </button>
        </div>
        <div>
          <button onClick={() => navigate('/products')}>
            <div className='product-item shadow-lg hover:shadow-2xl select-none transform motion-safe:hover:-translate-y-2 motion-safe:hover:scale-80 transition ease-in-out duration-500 border border-gray-200 bg-white rounded-lg flex justify-center items-center cursor-pointer'>
              <EditOutlined className='text-6xl ' />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
