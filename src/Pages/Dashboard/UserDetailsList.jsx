import { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, Input, Modal, Select, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { RiLoader3Fill } from 'react-icons/ri';
import Logo from '../../assets/logo.png';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import UserDetailsModal from '../../Components/Dashboard/UserDetailsModal';
import { useGetUsersQuery, useUpdateUserStatusMutation } from '../../redux/api/userApi';
import { useUpdateAdminStatusMutation } from '../../redux/api/adminApi';
import { userTypeItems } from '../../const/constant';

const UserDetailsList = () => {
      const { data: userData } = useGetUsersQuery({});
      const [updateUserStatus] = useUpdateUserStatusMutation();
      // console.log(userData);
      const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1);
      const [open, setOpen] = useState(false);

      const dropdownRef = useRef();
      const items = [
            {
                  label: 'Car',
                  key: 'Car',
            },
            {
                  label: 'Bike',
                  key: 'Bike',
            },
            {
                  label: 'Cycle',
                  key: 'Cycle',
            },
      ];

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setDate(false);
                        setOpen('');
                        setFilter(false);
                  }
            };
            document.addEventListener('click', handleClickOutside);
            return () => {
                  document.removeEventListener('click', handleClickOutside);
            };
      }, []);

      const handleUpdateUserStatus = (record) => {
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
                        let status = '';
                        if (record.status === 'active') {
                              status = 'block';
                        } else if (record.status === 'blocked') {
                              status = 'unblock';
                        }
                        const updatedUserStatus = {
                              data: {
                                    status: status,
                              },
                              id: record._id,
                        };
                        const res = await updateUserStatus(updatedUserStatus).unwrap();

                        if (res.success) {
                              Swal.fire({
                                    text: res?.message,
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                              });
                        }
                  }
            });
      };

      const columns = [
            {
                  title: 'S.No',
                  dataIndex: '_id',
                  key: '_id',
                  render: (_a, _b, index) => {
                        return <p>{index + 1}</p>;
                  },
            },
            {
                  title: 'User',
                  dataIndex: 'fullName',
                  key: 'fullName',
                  render: (_a, record) => {
                        return (
                              <div
                                    style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'start',
                                          gap: 12,
                                    }}
                              >
                                    <img
                                          style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                          }}
                                          src={record?.avatar}
                                          alt="user"
                                    />

                                    <p
                                          style={{
                                                letterSpacing: 0.4,
                                                fontSize: '#666666',
                                                fontWeight: '400',
                                          }}
                                    >
                                          {record?.fullName}
                                    </p>
                              </div>
                        );
                  },
            },
            {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
            },

            {
                  title: 'Contact',
                  dataIndex: 'phoneNumber',
                  key: 'phoneNumber',
            },
            {
                  title: 'Action',
                  dataIndex: 'action',
                  key: 'action',
                  render: (_, record) => (
                        <div
                              style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',

                                    paddingRight: 10,
                              }}
                        >
                              <button
                                    onClick={() => setOpen(true)}
                                    style={{
                                          cursor: 'pointer',
                                          border: 'none',
                                          outline: 'none',
                                    }}
                              >
                                    <FiArrowUpRight size={26} className=" text-[#DBB162]" />
                              </button>

                              <div>
                                    <button onClick={() => handleUpdateUserStatus(record)}>
                                          <BsFillPersonCheckFill
                                                size={25}
                                                className={`${
                                                      record?.status == 'active' ? ' text-[#00B047]' : 'text-red-600'
                                                }`}
                                          />
                                    </button>
                              </div>
                        </div>
                  ),
            },
      ];

      const handlePageChange = (page) => {
            setPage(page);
            const params = new URLSearchParams(window.location.search);
            params.set('page', page);
            window.history.pushState(null, '', `?${params.toString()}`);
      };

      const handleFilterByUserStatus = (value) => {
            console.log(value);
      };
      return (
            <div className="">
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
                                                fontSize: 18,
                                                fontWeight: '500',
                                          }}
                                    >
                                          All user details
                                    </h3>
                              </div>
                        </div>
                        <div>
                              <Table
                                    columns={columns}
                                    dataSource={userData?.data?.result}
                                    pagination={{
                                          pageSize: 10,
                                          defaultCurrent: parseInt(page),
                                          onChange: handlePageChange,
                                          total: userData?.data?.meta?.total,
                                          showTotal: (total, range) =>
                                                `Showing ${range[0]}-${range[1]} out of ${total}`,
                                          defaultPageSize: 20,
                                          // defaultCurrent: 1,
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
                  <UserDetailsModal open={open} setOpen={setOpen} />
            </div>
      );
};

export default UserDetailsList;
