import { addProduct } from '../../redux/features/BasketSlice';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

const ProductItem = ({ product }: any) => {
  // @ts-ignore
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addProduct(product));
    message.success('Ürün sepete başarıyla eklendi!');
  };

  return (
    <div className='product-item shadow-lg hover:shadow-2xl select-none transform motion-safe:hover:-translate-y-2 motion-safe:hover:scale-80 transition ease-in-out duration-500 border border-gray-200 bg-white rounded-lg'>
      <div>
        <img
          className='p-8 rounded-full object-cover w-full'
          src={product.img}
          alt='@hasangkz'
        />
      </div>
      <div className='px-5 pb-5'>
        <h3 className='text-3xl font-semibold tracking-tight text-gray-900 text-center hover-underline-animation'>
          {product.title}
        </h3>
        <br />
        {product.desc ? (
          <h6 className='text-l italic hover:not-italic tracking-tight text-gray-900 text-center'>
            {product.desc}
          </h6>
        ) : (
          <br />
        )}
        <br />
        <div className='flex items-center justify-between'>
          <span className='text-3xl text-gray-900 '>{product.price}₺</span>
          <button
            className='bg-green-900 hover:bg-white text-white text-l hover:text-green-900 font-bold py-4 px-6 rounded'
            onClick={handleAdd}
          >
            SEPETE EKLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
