import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import Logo from '../../assets/logo.png';
import { FiSearch } from 'react-icons/fi';
import { useGetBookCategoryQuery } from '../../redux/api/bookCategoryApi';
import { getSelectItems } from '../../utils/utils';
import AddBookModal from '../../Components/Dashboard/BookModal/AddBookModal';
import UpdateBookModal from '../../Components/Dashboard/BookModal/UpdateBookModal';
import { useDeleteBookMutation, useGetBooksQuery } from '../../redux/api/bookApi';
import { toast } from 'sonner';
import { getImageUrl } from '../../utils/getImageUrl';

const BookList = () => {
      const { data: bookCategory } = useGetBookCategoryQuery({});
      const { data: allBooks } = useGetBooksQuery({});
      const [deleteBook] = useDeleteBookMutation();

      const [openAddModel, setOpenAddModel] = useState(false);
      const [openUpdateModal, setUpdateModal] = useState(false);
      const [updateBookId, setUpdateBookId] = useState(null);
      const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);

      const booksCategoryItems = getSelectItems(bookCategory?.data);

      // get category name
      // Function to get category name from category ID
      const getCategoryName = (categoryId) => {
            const category = bookCategory?.data?.find((cat) => cat._id === categoryId);
            return category?.name || 'Unknown Category';
      };

      const handleDelete = (id) => {
            Swal.fire({
                  title: 'Are you sure?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No',
            }).then(async (result) => {
                  if (result.isConfirmed) {
                        try {
                              const res = await deleteBook(id).unwrap();
                              if (res.success) {
                                    Swal.fire({
                                          title: 'Deleted!',
                                          text: 'Your file has been deleted.',
                                          icon: 'success',
                                          showConfirmButton: false,
                                          timer: 1500,
                                    });
                              }
                        } catch (error) {
                              toast.error(error.message);
                              console.log(error.message);
                        }
                  }
            });
      };

      // useEffect(() => {
      //   const handleClickOutside = (event) => {
      //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //       setDate(false);
      //       setOpen("");
      //       setFilter(false);
      //     }
      //   };
      //   document.addEventListener("click", handleClickOutside);
      //   return () => {
      //     document.removeEventListener("click", handleClickOutside);
      //   };
      // }, []);

      const columns = [
            {
                  title: 'S.No',
                  dataIndex: '_id',
                  key: '_id',
                  render: (_text, _record, index) => {
                        return <p key={index}>{index + 1}</p>;
                  },
            },

            {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  align: 'center',
            },
            {
                  title: 'Services Photo',
                  dataIndex: 'bookImage',
                  key: 'bookImage',
                  align: 'center',

                  render: (_, record) => {
                        return (
                              <div
                                    style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          gap: 12,
                                    }}
                              >
                                    <img
                                          style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                          }}
                                          src={getImageUrl(record?.bookImage)}
                                          alt="book"
                                    />
                                    <p> {record?.service_title}</p>
                              </div>
                        );
                  },
            },
            {
                  title: 'Publisher',
                  dataIndex: 'publisher',
                  key: 'publisher',
                  align: 'center',
            },
            {
                  title: 'Category',
                  dataIndex: 'category',
                  key: 'category',
                  align: 'center',
                  render: (categoryId) => {
                        const categoryName = getCategoryName(categoryId);
                        return <p>{categoryName}</p>;
                  },
            },

            {
                  title: 'Action',
                  dataIndex: 'action',
                  key: 'action',
                  align: 'center',
                  render: (_, record) => {
                        // console.log(record);
                        return (
                              <p
                                    key={record}
                                    style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          gap: 20,
                                    }}
                              >
                                    <button
                                          onClick={() => {
                                                setUpdateBookId(record._id);
                                                setUpdateModal(true);
                                          }}
                                          style={{
                                                cursor: 'pointer',
                                                border: 'none',
                                                outline: 'none',
                                                color: '#DBB162',
                                                background: 'white',
                                          }}
                                    >
                                          <CiEdit size={25} />
                                    </button>
                                    <button
                                          onClick={() => handleDelete(record._id)}
                                          style={{
                                                cursor: 'pointer',
                                                border: 'none',
                                                outline: 'none',
                                                background: 'white',
                                                color: 'red',
                                          }}
                                    >
                                          <FaRegTrashAlt size={20} />
                                    </button>
                              </p>
                        );
                  },
            },
      ];

      const handlePageChange = (page) => {
            setPage(page);
            const params = new URLSearchParams(window.location.search);
            params.set('page', page);
            window.history.pushState(null, '', `?${params.toString()}`);
      };

      // const onClick = ({ key }) => {
      //   setCategory(key);
      //   const params = new URLSearchParams(window.location.search);
      //   params.set("category", key);
      //   window.history.pushState(null, "", `?${params.toString()}`);
      // };

      const handleFilterBookBySelect = (value) => {
            console.log(value);
      };
      return (
            <div>
                  <div
                        style={{
                              background: 'white',
                              padding: '20px',
                              borderRadius: '12px',
                        }}
                  >
                        <div
                              style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    margin: '16px 0',
                              }}
                        >
                              <div>
                                    <h3
                                          style={{
                                                color: 'black',
                                                fontSize: 24,
                                                fontWeight: '500',
                                          }}
                                    >
                                          All Book List
                                    </h3>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <Button
                                          onClick={() => setOpenAddModel(true)}
                                          style={{
                                                borderRadius: 8,
                                                background: '#DBB162',
                                                height: 40,
                                                color: 'white',
                                                fontSize: 14,
                                                fontWeight: '400',
                                          }}
                                          icon={<PlusOutlined />}
                                    >
                                          Add Book
                                    </Button>
                              </div>
                        </div>
                        <div>
                              <Table
                                    // rowSelection={rowSelection}
                                    columns={columns}
                                    style={{}}
                                    dataSource={allBooks?.data}
                                    pagination={{
                                          pageSize: 10,
                                          defaultCurrent: parseInt(page),
                                          onChange: handlePageChange,
                                          total: allBooks?.data?.result?.length,
                                          showTotal: (total, range) =>
                                                `Showing ${range[0]}-${range[1]} out of ${total}`,
                                          defaultPageSize: 20,
                                          //   defaultCurrent: 1,
                                          style: {
                                                marginBottom: 20,
                                                marginLeft: 20,
                                                marginRight: 20,
                                                width: '100%',
                                                display: 'flex',
                                                // gap: 10,
                                                // justifyContent: "space-between",
                                          },
                                    }}
                              />
                        </div>
                  </div>

                  <AddBookModal
                        openAddModel={openAddModel}
                        setOpenAddModel={setOpenAddModel}
                        booksCategoryItems={booksCategoryItems}
                  />
                  <UpdateBookModal
                        openUpdateModal={openUpdateModal}
                        setUpdateModal={setUpdateModal}
                        booksCategoryItems={booksCategoryItems}
                        updateBookId={updateBookId}
                  />
            </div>
      );
};

export default BookList;
