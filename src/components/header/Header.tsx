import {
  AiOutlineTeam,
  AiFillFileText,
  AiFillPieChart,
  AiOutlineLogout,
  AiOutlineSearch,
  AiFillShopping,
} from 'react-icons/ai';

import { Input } from 'antd';
import { Badge } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { logout, reset } from '../../redux/features/AuthSlice';

const Header = ({ setSearch }: any) => {
  // @ts-ignore
  const basket = useSelector((state) => state.basket);
  // @ts-ignore
  const { user } = useSelector((state) => state.auth);

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const onLogout = () => {
    // @ts-ignore
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <div className='border-b  '>
      <header className='p-6 flex justify-between items-center gap-10'>
        <div className='header-logo flex items-center gap-6'>
          <div className='header-logo-img'>
            <NavLink to='/'>
              <img
                className='object-contain h-20 w-20 '
                src={'images/fbuLogo.png'}
                alt='logo'
              />
            </NavLink>
          </div>
          <div className='header-logo-exp'>
            <NavLink to='/'>
              <h2 className='md:text-4xl text-4xl font-bold '>FBUCKS</h2>
            </NavLink>
          </div>
        </div>
        {pathname === '/' && (
          <div className='header-search flex-1'>
            <Input
              onChange={(e: any) => setSearch(e.target.value.toLowerCase())}
              placeholder='Ne aramıştınız?'
              size='large'
              prefix={<AiOutlineSearch className='text-2xl ' />}
              className='rounded-full max-w-[1200] h-14 border-b-2 border-green-600 focus-within:border-green-600'
            />
          </div>
        )}
        <div className='header-menu flex justify-between items-center gap-10 md:static fixed z-10 bottom-0 md:w-auto w-screen md:transparent bg-white left-0 md:border-t-0 border-t md:p-0 p-4'>
          <div className='mb-2'>
            <Badge
              count={basket.basketItems.length}
              offset={[0, 0]}
              style={{ backgroundColor: '#00704a' }}
            >
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? '#54399e' : '',
                    borderBottom: isActive ? '5px solid ' : '',
                  };
                }}
                to={'/cart'}
                className='menu-link flex flex-col hover:text-[#54399e] transition-all'
              >
                <AiFillShopping className='md:text-4xl text-2xl' />
                <span
                  className='md:text-[18px] text-[12px]'
                  style={{ fontSize: '20px' }}
                >
                  Sepet
                </span>
              </NavLink>
            </Badge>
          </div>
          <NavLink
            to={'/bills'}
            style={({ isActive }) => {
              return {
                color: isActive ? '#40a9ff' : '',
                borderBottom: isActive ? '5px solid ' : '',
              };
            }}
            className='menu-link flex flex-col hover:text-[#40a9ff] transition-all'
          >
            <AiFillFileText className='md:text-3xl text-xl ml-5' />
            <span className='md:text-[18px] text-[12px]'>Faturalar</span>
          </NavLink>
          <NavLink
            to={'/statistic'}
            style={({ isActive }) => {
              return {
                color: isActive ? '#cce751' : '',
                borderBottom: isActive ? '5px solid ' : '',
              };
            }}
            className='menu-link flex flex-col hover:text-[#cce751] transition-all'
          >
            <AiFillPieChart className='md:text-3xl text-xl ml-4' />
            <span className='md:text-[18px] text-[12px]'>İstatistik</span>
          </NavLink>

          {user ? (
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? '#d83232' : '',
                  borderBottom: isActive ? '5px solid ' : '',
                };
              }}
              to={'/login'}
              onClick={onLogout}
              className='menu-link flex flex-col hover:text-[#d83232] transition-all'
            >
              <AiOutlineLogout className='md:text-3xl text-xl' />
              <span className='md:text-[18px] text-[12px]'>Çıkış</span>
            </NavLink>
          ) : (
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? '#d83232' : '',
                  borderBottom: isActive ? '5px solid ' : '',
                };
              }}
              to={'/register'}
              className='menu-link flex flex-col hover:text-[#d83232] transition-all'
            >
              <AiOutlineTeam className='md:text-3xl text-xl' />
              <span className='md:text-[18px] text-[12px]'>Üye Ol</span>
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
