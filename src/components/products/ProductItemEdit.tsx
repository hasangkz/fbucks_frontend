import React, { useEffect, useState } from 'react';
import { Button, Form, message, Table, Select, Input, Modal } from 'antd';

const ProductItemEdit = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState({});

  const [form] = Form.useForm();

  const handleRecord = (record: any) => {
    setIsEditModalOpen(true);
    setEditingRecord(record);
  };

  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      width: '8%',
      render: (_: any, record: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '28px' }}>{record.title}</span>
          </div>
        );
      },
    },
    {
      title: 'Ürün Açıklaması',
      dataIndex: 'desc',
      width: '8%',
      render: (_: any, record: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '18px' }}>
              {record.desc ? record.desc : '-----'}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Ürün Görseli',
      dataIndex: 'img',
      width: '5%',
      render: (_: any, record: any) => {
        return (
          <img
            src={record.img}
            alt='productImage'
            className='w-full h-20 object-cover'
            style={{ height: '10rem' }}
          />
        );
      },
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      render: (_: any, record: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '20px' }}>{record.price}₺</span>
          </div>
        );
      },
      width: '8%',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      render: (_: any, record: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '20px' }}>{record.category}</span>
          </div>
        );
      },
      width: '8%',
    },
    {
      title: 'Ürün İşlemi',
      dataIndex: 'action',
      width: '8%',
      render: (_: any, record: any) => {
        return (
          <div className='flex justify-around text-center'>
            <div>
              <Button
                type='dashed'
                size='large'
                onClick={() => handleRecord(record)}
              >
                Düzenle
              </Button>
            </div>
            <div>
              <Button
                type='dashed'
                danger
                size='large'
                onClick={() => deleteProduct(record._id)}
              >
                Sil
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const deleteProduct = (id: any) => {
    if (window.confirm('Emin misiniz?')) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL + '/api/products/delete-product',
          {
            method: 'DELETE',
            body: JSON.stringify({ productId: id }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          }
        );
        message.success('Ürün başarıyla silindi!');
        setProducts(products.filter((item: any) => item._id !== id));
      } catch (error) {
        message.error('Bir şeyler yanlış gitti.');
        console.log(error);
      }
    }
  };

  const onFinish = (values: any) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + '/api/products/update-product', {
        method: 'PUT',
        // @ts-ignore
        body: JSON.stringify({ ...values, productId: editingRecord._id }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      message.success('Ürün başarıyla güncellendi.');
      setProducts(
        products.map((item: any) => {
          // @ts-ignore
          if (item._id === editingRecord._id) {
            return values;
          } else {
            return item;
          }
        })
      );
      setIsEditModalOpen(false);
    } catch (error) {
      message.error('Bir şeyler yanlış gitti.');
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + '/api/products/get-all-products'
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + '/api/categories/get-all-categories'
      );
      const data = await res.json();
      data &&
        setCategories(
          data.map((item: any) => {
            return { ...item, value: item.title };
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={'_id'}
        scroll={{
          x: 1200,
          y: 350,
        }}
      />
      <Modal
        title='Ürün Güncelleme'
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <br />
        <Form
          layout='vertical'
          onFinish={onFinish}
          form={form}
          initialValues={editingRecord}
        >
          <Form.Item
            name='title'
            label='Ürün İsmi'
            rules={[{ required: true, message: 'Ürün İsmi Boş Geçilemez!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='desc' label='Ürün Açıklaması'>
            <Input />
          </Form.Item>
          <Form.Item
            name='img'
            label='Ürün Resmi'
            rules={[{ required: true, message: 'Ürün Resmi Boş Geçilemez!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='price'
            label='Ürün Fiyatı'
            rules={[{ required: true, message: 'Ürün Fiyatı Boş Geçilemez!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='category'
            label='Kategori Seç'
            rules={[
              { required: true, message: 'Kategori Alanı Boş Geçilemez!' },
            ]}
          >
            <Select
              showSearch
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.title ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? '').toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className='flex justify-end mb-0'>
            <Button
              type='text'
              htmlType='submit'
              style={{
                backgroundColor: '#00704a',
                color: 'white',
              }}
              size='large'
            >
              Ürünü Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductItemEdit;
