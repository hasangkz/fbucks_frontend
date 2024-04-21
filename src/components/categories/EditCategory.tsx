import { Button, Form, Input, message, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { AiFillSave, AiFillDelete, AiFillEdit } from 'react-icons/ai';

const EditCategory = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categoriesData,
  setCategoriesData,
}: any) => {
  const [editingRow, setEditingRow] = useState({});
  const [deleteRow, setDeleteRow] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showModal = () => {
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    if (Object.keys(deleteRow).length !== 0) {
      showModal();
    }
  }, [deleteRow]);

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOk = () => {
    try {
      fetch(
        process.env.REACT_APP_SERVER_URL + '/api/categories/delete-category',
        {
          method: 'DELETE',
          // @ts-ignore
          body: JSON.stringify({ categoryId: deleteRow._id }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }
      );
      message.success('Kategori başarıyla silindi.');
      setCategoriesData(
        // @ts-ignore
        categoriesData.filter((item: any) => item._id !== deleteRow._id)
      );
      handleCancel();
    } catch (error) {
      message.error('Bir şeyler yanlış gitti.');
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Kategori İsmi',
      dataIndex: 'title',
      render: (_: any, record: any) => {
        // @ts-ignore
        if (record._id === editingRow._id) {
          return (
            <Form.Item className='mb-0' name='title'>
              <Input
                //   @ts-ignore
                defaultValue={editingRow ? editingRow?.title : record.title}
              />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: 'Ayarlar',
      dataIndex: 'action',
      render: (_: any, record: any) => {
        return (
          <div className='flex justify-start space-x-1.5 ml-5'>
            <Button type='link' onClick={() => setEditingRow(record)}>
              <AiFillEdit style={{ fontSize: '24px' }} />
            </Button>
            <Button htmlType='submit' type='link'>
              <AiFillSave style={{ fontSize: '24px', color: 'green' }} />
            </Button>
            <Button danger type='link' onClick={() => setDeleteRow(record)}>
              <AiFillDelete style={{ fontSize: '24px' }} />
            </Button>
          </div>
        );
      },
    },
  ];

  const onFinish = (values: any) => {
    try {
      fetch(
        process.env.REACT_APP_SERVER_URL + '/api/categories/update-category',
        {
          method: 'PUT',
          // @ts-ignore
          body: JSON.stringify({ ...values, categoryId: editingRow._id }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }
      );
      message.success('Kategori başarıyla güncellendi.');
      setCategoriesData(
        categoriesData.map((item: any) => {
          // @ts-ignore
          if (item._id === editingRow._id) {
            // title özelliği hariç itemin hepsini aynı kalsın sadece title değiştiriyoruz
            return { ...item, title: values.title };
          }
          return item;
        })
      );
      setIsEditModalOpen(false);
    } catch (error) {
      message.success('Bir şeyler yanlış gitti.');
      console.log(error);
    }
  };

  return (
    <Modal
      open={isEditModalOpen}
      title='Kategori İşlemleri'
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categoriesData}
          columns={columns}
          rowKey={'_id'}
        />
      </Form>
      <Modal
        open={isDeleteModalOpen}
        title='Kategori Silme İşlemi'
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {deleteRow && (
          <h1>
            <span className='thick' style={{ fontSize: '18px' }}>
              {/* @ts-ignore */}
              {deleteRow.title}{' '}
            </span>
            kategorisini silmek istediğinizden emin misiniz?
          </h1>
        )}
      </Modal>
    </Modal>
  );
};

export default EditCategory;
