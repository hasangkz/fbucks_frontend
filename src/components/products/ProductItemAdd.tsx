import { AiFillPlusSquare } from 'react-icons/ai';
import { Button, Form, Input, message, Modal, Select } from 'antd';
const ProductItemAdd = ({
  isAddModalOpen,
  setIsAddModalOpen,
  productsData,
  setProductsData,
  categoriesData,
}: any) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + '/api/products/add-product', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      message.success('Ürün başarıyla oluşturuldu.');
      form.resetFields();
      setProductsData([...productsData, values]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='product-item shadow-lg hover:shadow-2xl select-none transform motion-safe:hover:-translate-y-2 motion-safe:hover:scale-80 transition ease-in-out duration-500 border border-gray-200 bg-white rounded-lg flex justify-center items-center cursor-pointer'>
        <AiFillPlusSquare className='text-6xl ' />
      </div>
      <Modal
        title='Yeni Ürün Ekle'
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <br />
        <Form layout='vertical' onFinish={onFinish} form={form}>
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
              placeholder='Kategori Seçin'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option?.title ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? '').toLowerCase())
              }
              options={categoriesData}
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
              Yeni Ürün Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductItemAdd;
