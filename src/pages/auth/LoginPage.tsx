import React, { useEffect, useState } from 'react';
import { Carousel, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import OperationCarousel from './OperationCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { reset, login } from '../../redux/features/AuthSlice';
import Spinner from './Spinner';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user, isHata, isBasari, isYukleniyor, mesaj } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );

  useEffect(() => {
    if (isHata) {
      message.error(mesaj);
    }

    if (isBasari || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isHata, isBasari, mesaj, navigate, dispatch]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      // @ts-ignore
      const res = await dispatch(login(userData));
      if (res.payload === 'Request failed with status code 403') {
        message.error('Yanlış şifre!');
      } else if (res.payload === 'Request failed with status code 404') {
        message.error('Kullanıcı bulunamadı!');
      }
      setLoading(false);
    } catch (error) {
      message.error('Giriş İşlemi Başarısız!');
      setLoading(false);
    }
  };

  if (isYukleniyor) {
    <Spinner />;
  }

  return (
    <div className='h-screen'>
      <div className='flex justify-between h-full'>
        <div className='xl:px-20 px-10 w-full flex flex-col h-full justify-center relative'>
          <img
            className='object-contain h-60 w-60 mb-2 center'
            src={'images/fbu.png'}
            alt='logo'
          />
          <Form
            form={form}
            layout='vertical'
            name='basic'
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label='E-mail'
              name={'email'}
              rules={[
                {
                  type: 'email',
                  message: 'Geçersiz E-mail!',
                },
                {
                  required: true,
                  message: 'E-mail Alanı Boş Bırakılamaz!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Şifre'
              name={'password'}
              rules={[
                {
                  required: true,
                  message: 'Şifre Alanı Boş Bırakılamaz!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <button
                type='submit'
                className='w-full bg-[#00704A] button-56'
                disabled={loading}
              >
                GİRİŞ YAP
              </button>
            </Form.Item>
          </Form>
          <br />
          <div className='flex justify-center left-0 bottom-10 w-full'>
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to='/register' className='text-special'>
              Şimdi kaydol
            </Link>
          </div>
        </div>
        <div className='xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#00704A] h-full'>
          <div className='w-full h-full flex items-center'>
            <div className='w-full'>
              <Carousel className='!h-full px-6' autoplay>
                <OperationCarousel
                  img='/images/carousel1.jpg'
                  title='Güzel Sohbetlere'
                  desc='Geniş Ürün Yelpazesi İle!'
                />
                <OperationCarousel
                  img='/images/carousel2.jpg'
                  title='Sıkı Dostluklara'
                  desc='Dilediğin Vakitte!'
                />
                <OperationCarousel
                  img='/images/carousel3.jpeg'
                  title='Yeni Deneyimlere'
                  desc='Dünyanın Her Yerinde!'
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
