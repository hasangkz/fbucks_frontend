import React, { useState } from 'react';
import Header from '../components/header/Header';
import { Button, Card, Table, message, Popconfirm } from 'antd';
import CreateBill from '../components/basket/CreateBill';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../redux/features/BasketSlice';
import { DeleteFilled } from '@ant-design/icons';

const BasketPage = () => {
  // @ts-ignore
  const basket = useSelector((state) => state.basket);

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      key: 'title',
      width: '14%',
      render: (value: string) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '24px' }}>{value}</span>
          </div>
        );
      },
    },
    {
      title: 'Ürün Görseli',
      dataIndex: 'img',
      key: 'img',
      width: '8%',
      render: (text: string) => {
        return <img src={text} alt='' className='w-full h-24 object-cover' />;
      },
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      width: '14%',
      render: (value: string) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '24px' }}>{value}</span>
          </div>
        );
      },
    },
    {
      title: 'Ürün Adeti',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '8%',
      render: (value: number) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '24px' }}>{value}</span>
          </div>
        );
      },
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      key: 'price',
      render: (val: number, record: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '24px' }}>
              {(record.quantity * val).toFixed(2)}₺
            </span>
          </div>
        );
      },
      width: '8%',
    },
    {
      title: 'Vergi',
      dataIndex: 'price',
      key: 'price',
      render: (val: number, record: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '24px', color: 'red' }}>
              {(record.quantity * val * 0.08).toFixed(2)}₺
            </span>
          </div>
        );
      },
      width: '8%',
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (val: number, record: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '24px' }}>
              {(val * record.quantity * 0.08 + val * record.quantity).toFixed(
                2
              )}
              ₺
            </span>
          </div>
        );
      },
      width: '8%',
    },
    {
      title: 'Ürün İşlemi',
      width: '8%',
      render: (_: any, record: any) => {
        return (
          <Popconfirm
            title='Ürünü sepetten çıkartmak istiyor musunuz?'
            onConfirm={() => {
              dispatch(deleteProduct(record));
              message.success('Ürün Sepetten Silindi.');
            }}
            okText='Evet'
            cancelText='Hayır'
          >
            <div className='text-center'>
              <Button type='link' danger size='large'>
                <DeleteFilled />
              </Button>
            </div>
          </Popconfirm>
        );
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const subTotal = basket.total.toFixed(2);
  const taxTotal = ((basket.total * basket.tax) / 100).toFixed(2);
  const total = basket.total + (basket.total * basket.tax) / 100;

  return (
    <>
      <Header />
      {basket.basketItems.length > 0 ? (
        <div className='px-6'>
          <Table
            scroll={{
              x: 1200,
              y: 350,
            }}
            dataSource={basket.basketItems}
            columns={columns}
            bordered
            pagination={true}
          />
          <div className='cart-total flex justify-end mt-4'>
            {/* @ts-ignore */}
            <Card className='w-72'>
              <div className='flex justify-between'>
                <span>Ara Toplam</span>
                <span>{subTotal}₺</span>
              </div>
              <div className='flex justify-between my-2'>
                <span>KDV Toplam %8</span>
                <span className='text-red-600'>+{taxTotal}₺</span>
              </div>
              <div className='flex justify-between'>
                <b>Sipariş Toplamı</b>
                <b>{total}₺</b>
              </div>
              <Button
                className='mt-4 w-full'
                onClick={showModal}
                type='text'
                htmlType='submit'
                style={{
                  backgroundColor: '#00704a',
                  color: 'white',
                }}
                size='large'
              >
                Fatura Düzenle
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        <div className='flex justify-center align-center'>
          <img src={'images/preview.png'} alt='emptyBasket' />
        </div>
      )}

      <CreateBill
        subTotal={subTotal}
        taxTotal={taxTotal}
        total={total}
        cartItems={basket.basketItems}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default BasketPage;
