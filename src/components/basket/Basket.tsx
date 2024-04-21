import { Button, message } from 'antd';
import { AiFillShopping } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import BasketItem from './BasketItem';
import { emptyBasket } from '../../redux/features/BasketSlice';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  // @ts-ignore
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const handleEmptyBasket = () => {
    dispatch(emptyBasket());
    message.success('Sepet temizlendi!');
  };
  const navigate = useNavigate();

  return (
    <>
      <div className='cart flex h-full max-h-[calc(100vh_-_190px)] flex-col justify-center align-middle'>
        <h2 className='shadow-md text-black text-center font-bold tracking-wide p-6 underline underline-offset-6 text-3xl'>
          Sepet
        </h2>
        <ul className='cart-items p-2 flex flex-col gap-y-6 overflow-y-auto'>
          {basket.basketItems.map((item: any) => (
            <BasketItem item={item} key={item._id} />
          ))}
        </ul>
        <div className='cart-totals mt-auto'>
          <div className='border-t border-b'>
            <div className='flex justify-between p-4'>
              <b className='text-xl'>Sepet Toplamı</b>
              <span className='text-xl'>{basket.total.toFixed(2)}₺</span>
            </div>
            <div className='p-4 flex flex-col gap-4'>
              <div>
                <Button
                  onClick={() => navigate('/cart')}
                  type='text'
                  icon={<AiFillShopping />}
                  size='large'
                  className='flex items-center justify-center w-full text-white font-semibold hover:text-green-900 py-2 px-4 rounded bg-green-900'
                >
                  Sepeti Onayla
                </Button>
              </div>
              <div>
                <Button
                  type='text'
                  size='large'
                  onClick={handleEmptyBasket}
                  className='
                 flex items-center justify-center w-full bg-red-900 text-white font-semibold hover:text-red-900 py-2 px-4 rounded'
                >
                  Sepeti Temizle
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basket;
