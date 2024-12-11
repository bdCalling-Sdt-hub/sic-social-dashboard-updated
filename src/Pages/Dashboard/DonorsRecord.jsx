import { useEffect, useRef, useState } from 'react';
import { Dropdown, Input, Modal, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { RiLoader3Fill } from 'react-icons/ri';
import { FaStar } from 'react-icons/fa';
import Logo from '../../assets/logo.png';
import { FiSearch } from 'react-icons/fi';
import { useGetDonorQuery } from '../../redux/api/donorApi';
import { render } from 'react-dom';

const DonorsRecord = () => {
      const { data: donorData } = useGetDonorQuery({});
      const donors = donorData?.data?.result;
      const meta = donorData?.data?.meta;

      const [category, setCategory] = useState('Activity');
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

      const columns = [
            {
                  title: 'S.No',
                  dataIndex: 'key',
                  key: 'key',
                  render: (text, record, index) => {
                        return <p>{index + 1}</p>;
                  },
            },

            {
                  title: 'Contact',
                  dataIndex: 'userId.phoneNumber',
                  key: 'userId.phoneNumber',
                  render: (text, record) => {
                        return <p>{record.userId.phoneNumber}</p>;
                  },
            },
            {
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
                  render: (text, record) => {
                        return <p>{record.userId.email}</p>;
                  },
            },

            {
                  title: 'Amount',
                  dataIndex: 'amount',
                  key: 'amount',
            },
      ];

      const handlePageChange = (page) => {
            setPage(page);
            const params = new URLSearchParams(window.location.search);
            params.set('page', page);
            window.history.pushState(null, '', `?${params.toString()}`);
      };

      const onClick = ({ key }) => {
            setCategory(key);
            const params = new URLSearchParams(window.location.search);
            params.set('category', key);
            window.history.pushState(null, '', `?${params.toString()}`);
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
                        <div>
                              <Table
                                    columns={columns}
                                    style={{}}
                                    dataSource={donors}
                                    pagination={{
                                          pageSize: 10,
                                          defaultCurrent: parseInt(page),
                                          onChange: handlePageChange,
                                          total: meta?.total,
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
                  <Modal open={open} onCancel={() => setOpen(false)} centered footer={false} width={700}>
                        <div>
                              <div className="flex justify-center items-center flex-col gap-4">
                                    <img
                                          className="w-full h-[150px]"
                                          src="https://i.ibb.co/CBvrNxh/Rectangle-5252.png"
                                          alt=""
                                    />
                                    <div className="flex justify-center items-center flex-col gap-2 -mt-16">
                                          <div className="w-20 h-20 rounded-full relative">
                                                <img
                                                      className="w-full h-full rounded-full"
                                                      src="https://i.ibb.co/B2xfD8H/images.png"
                                                      alt=""
                                                />
                                          </div>
                                          <p className="text-base font-semibold">Md. Mahmud</p>
                                          <div className="flex justify-start items-center gap-2">
                                                <FaStar className="text-yellow-500" />
                                                <p>4.5/5</p>
                                          </div>
                                          <p>Total earning : 2000€</p>
                                    </div>
                              </div>
                              <div className="grid grid-cols-2 justify-start items-start gap-3 p-6">
                                    <div>
                                          <p className="text-sm font-semibold mb-1">Salon Name</p>
                                          <p className=" text-xs">Mr. Mahmud</p>
                                    </div>
                                    <div>
                                          <p className="text-sm font-semibold mb-1">Email</p>
                                          <p className=" text-xs">mahmud@gmail.com</p>
                                    </div>
                                    <div>
                                          <p className="text-sm font-semibold mb-1">Location</p>
                                          <p className=" text-xs">76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris</p>
                                    </div>
                                    <div>
                                          <p className="text-sm font-semibold mb-1">Contact No</p>
                                          <p className=" text-xs">+099999</p>
                                    </div>
                                    <div>
                                          <p className="text-sm font-semibold mb-1">Experience</p>
                                          <p className=" text-xs">5 year</p>
                                    </div>
                                    <div>
                                          <p className="text-sm font-semibold mb-1">Salon type</p>
                                          <p className=" text-xs">All</p>
                                    </div>
                                    <div>
                                          <p className="text-sm font-semibold mb-1">Bank Account no.</p>
                                          <p className=" text-xs">321656295461</p>
                                    </div>
                                    <div>
                                          <p className="text-sm font-semibold mb-1">About</p>
                                          <p className=" text-xs">
                                                dui. at tortor. nisi vitae Nullam adipiscing malesuada faucibus sit
                                                lacus orci Nam ac convallis. amet, elit. Donec elit massa nisl.
                                                hendrerit lorem. nec nisi
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </Modal>
            </div>
      );
};

export default DonorsRecord;
