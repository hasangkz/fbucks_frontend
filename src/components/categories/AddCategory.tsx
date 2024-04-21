import { Button, Form, Input, message, Modal } from 'antd';
import React from 'react';

const AddCategory = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categoriesData,
  setCategoriesData,
}: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + '/api/categories/add-category', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      message.success('Kategori başarıyla eklendi.');
      form.resetFields();
      setCategoriesData([...categoriesData, values]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title='Yeni Kategori Ekle'
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <br />
      <Form layout='vertical' onFinish={onFinish} form={form}>
        <Form.Item
          name='title'
          label='Kategori İsmi'
          rules={[{ required: true, message: 'Kategori Alanı Boş Geçilemez!' }]}
        >
          <Input />
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
            Yeni Kategori Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddCategory;
