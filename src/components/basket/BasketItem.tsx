import {
  AiFillPlusSquare,
  AiFillMinusSquare,
  AiFillDelete,
} from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import {
  deleteProduct,
  minusProduct,
  plusProduct,
} from '../../redux/features/BasketSlice';
import { message } from 'antd';
import './index.css';

const BasketItem = ({ item }: any) => {
  const dispatch = useDispatch();

  const handleMinusItem = () => {
    if (item.quantity === 1) {
      dispatch(deleteProduct(item));
      message.success('Ürün sepetten başarıyla çıkartıldı!');
    } else {
      dispatch(minusProduct(item));
    }
  };

  const handlePlusItem = () => {
    dispatch(plusProduct(item));
  };

  return (
    <>
      <li className='cart-item'>
        <div className='flex justify-center'>
          <div className='flex flex-col rounded-lg  shadow-lg dark:bg-green-900 md:max-w-xl md:flex-row'>
            <img
              className='h-64 w-full rounded-t-lg object-cover md:h-auto md:w-32 md:rounded-none md:rounded-l-lg'
              src={item.img}
              alt='img'
            />
            <div className='flex flex-col justify-start p-6 gap-8 text-center'>
              <h5 className=' text-2xl font-medium text-neutral-800 dark:text-neutral-50 '>
                {item.title}
              </h5>
              <div className='flex flex-row gap-x-4 items-center justify-between'>
                <div className='flex flex-row gap-x-4 justify-start items-center'>
                  <div
                    className='text-2xl cursor-pointer dark:text-white basketButton'
                    onClick={handleMinusItem}
                  >
                    {item.quantity === 1 ? (
                      <AiFillDelete style={{ color: '#d83232' }} />
                    ) : (
                      <AiFillMinusSquare />
                    )}
                  </div>
                  <div>
                    <span className='text-xl text-neutral-500 dark:text-white'>
                      {item.quantity}
                    </span>
                  </div>
                  <div
                    className='text-2xl cursor-pointer dark:text-white basketButton'
                    onClick={handlePlusItem}
                  >
                    <AiFillPlusSquare />
                  </div>
                </div>
                <div className='flex flex-row gap-x-2 text-xl justify-start items-center dark:text-white'>
                  <div>
                    <span>x</span>
                  </div>
                  <div>
                    <span>{item.price}₺</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default BasketItem;
