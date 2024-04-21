import React from 'react';
import {
  Button,
  Switch,
  Form,
  Input,
  Modal,
  Select,
  Card,
  message,
} from 'antd';
import { emptyBasket } from '../../redux/features/BasketSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateBill = ({
  isModalOpen,
  handleOk,
  handleCancel,
  subTotal,
  taxTotal,
  cartItems,
  total,
  setIsModalOpen,
}: any) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + '/api/bills/create-bill', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          tax: taxTotal,
          totalAmount: total,
          subTotal,
          cartItems,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      message.success('Sipariş başarıyla oluşturuldu.');
      form.resetFields();
      setIsModalOpen(false);
      dispatch(emptyBasket());
      navigate('/bills');
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(
      'Sipariş oluşturulurken beklenmedik bir hata oluştu!',
      errorInfo
    );
  };
  return (
    <>
      <Modal
        footer={false}
        title='Fatura Oluştur'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Müşteri Adı'
            name='customerName'
            rules={[{ required: true, message: 'Müşteri adını girin!' }]}
          >
            <Input placeholder='İsim' />
          </Form.Item>

          <Form.Item
            label='Müşteri Telefon'
            name='customerPhoneNumber'
            rules={[
              { required: true, message: 'Müşteri telefon numarasını girin!' },
            ]}
          >
            <Input placeholder='Telefon' maxLength={11} />
          </Form.Item>
          <Form.Item
            label='Müşteri Adresi'
            name='customerAddress'
            rules={[{ required: true, message: 'Müşteri adresini girin!' }]}
          >
            <Input placeholder='Adres' />
          </Form.Item>

          <Form.Item
            label='Ödeme Yöntemi'
            name='paymentMode'
            rules={[{ required: true, message: 'Ödeme Yöntemini Seçin!' }]}
          >
            <Select placeholder='Ödeme yöntemi seçin'>
              {/* @ts-ignore */}
              <Select.Option value='Nakit'>Nakit</Select.Option>
              {/* @ts-ignore */}
              <Select.Option value='Kart'>Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='Eve Servis'
            name='isForHome'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
          <br />

          {/* @ts-ignore */}
          <Card className='w-100'>
            <div className='flex justify-between'>
              <span>Ara Toplam</span>
              <span>{subTotal}₺</span>
            </div>
            <div className='flex justify-between my-2'>
              <span>KDV Toplam %8</span>
              <span className='text-red-600'>+{taxTotal}₺</span>
            </div>
            <div className='flex justify-between'>
              <b>Toplam</b>
              <b>{total}₺</b>
            </div>
            <Button
              htmlType='submit'
              className='mt-4 w-full'
              size='large'
              type='text'
              style={{
                backgroundColor: '#00704a',
                color: 'white',
              }}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBill;
