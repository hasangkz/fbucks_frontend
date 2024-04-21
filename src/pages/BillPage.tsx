import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import PrintBill from '../components/bills/PrintBill';
import Header from '../components/header/Header';

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [record, setRecord] = useState();
  const getBills = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + '/api/bills/get-all'
      );

      const data = await res.json();
      setBillItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '20px' }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      render: (text: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '20px' }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: 'İşlem Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '20px' }}>{text.substring(0, 10)}</span>
          </div>
        );
      },
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
      render: (text: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '20px' }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text: any) => {
        return (
          <div className='text-center'>
            <span style={{ fontSize: '20px' }}>{text}₺</span>
          </div>
        );
      },
    },
    {
      title: 'Fatura İşlemleri',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <div className='text-center'>
            <Button
              type='link'
              className='pl-0'
              style={{ fontSize: '20px' }}
              onClick={() => {
                setRecord(record);
                setIsModalOpen(true);
              }}
            >
              Yazdır
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className='px-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>Faturalar</h1>
        <Table
          scroll={{
            x: 1000,
            y: 500,
          }}
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
          rowKey='_id'
        />
      </div>
      <PrintBill
        customer={record}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default BillPage;
