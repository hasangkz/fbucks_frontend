import React, { useEffect, useState } from 'react';
import { Form, Input, Carousel, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import OperationCarousel from './OperationCarousel';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { register, reset } from '../../redux/features/AuthSlice';
const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { user, isHata, isBasari, isYukleniyor, mesaj } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isHata) {
      message.error(mesaj);
    }

    if (isBasari || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isHata, isBasari, mesaj, navigate, dispatch]);

  const onFinish = (values: any) => {
    setLoading(true);
    try {
      // @ts-ignore
      dispatch(register(values));
      message.success('Kayıt İşlemi Başarılı!');
      setLoading(false);
      form.resetFields();
      // navigate('/login');
    } catch (error) {
      message.error('Kayıt İşlemi Başarısız!');
    }
  };
  if (isYukleniyor) {
    <Spinner />;
  }
  return (
    <div className='h-screen'>
      <div className='flex justify-between h-full'>
        <div className='xl:px-20 px-20 w-full flex flex-col h-full justify-center relative'>
          <img
            className='object-contain h-60 w-60 mb-2 center'
            src={'images/fbu.png'}
            alt='logo'
          />
          <Form layout='vertical' name='basic' onFinish={onFinish} form={form}>
            <Form.Item
              label='Kullanıcı Adı'
              name={'username'}
              rules={[
                {
                  required: true,
                  message: 'Kullanıcı Adı Alanı Boş Bırakılamaz!',
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item
              label='Şifre Tekrar'
              name={'passwordAgain'}
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Şifre Tekrar Alanı Boş Bırakılamaz!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                  },
                }),
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
                KAYDOL
              </button>
            </Form.Item>
          </Form>
          <br />
          <div className='flex justify-center left-0 bottom-10 w-full'>
            Bir hesabınız var mı?&nbsp;
            <Link to='/login' className='text-special'>
              Şimdi giriş yap...
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

export default RegisterPage;
