import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useAddDonationMutation, useGetDonationQuery } from '../../../redux/api/donationApi';
import { toast } from 'sonner';
import { getImageUrl } from '../../../utils/getImageUrl';

const Details = () => {
      const [addDonation, { isLoading }] = useAddDonationMutation();
      const { data: donationData } = useGetDonationQuery({});

      const editor = useRef(null);
      const [content, setContent] = useState('');
      const [title, setTitle] = useState('');
      const [image, setImage] = useState(null);

      useEffect(() => {
            if (donationData?.data?.length > 0) {
                  const donationDetails = donationData.data[0].details;
                  setContent(donationDetails?.content || '');
                  setTitle(donationDetails?.title || '');
                  setImage(getImageUrl(donationData.data[0].image));
            }
      }, [donationData]);

      const config = {
            readonly: false,
            placeholder: 'Type your description...',
            style: {
                  height: 300,
                  background: '#FBF5EB',
            },
      };

      const handleTitleChange = (e) => {
            setTitle(e.target.value);
      };

      const handleImageChange = (e) => {
            const file = e.target.files[0]; // Access the first file uploaded
            setImage(file);
      };

      const handleAddDonation = async () => {
            try {
                  const formData = new FormData();
                  const updatedData = {
                        details: {
                              title,
                              content,
                        },
                  };
                  formData.append('data', JSON.stringify(updatedData));

                  formData.append('image', image);
                  const res = await addDonation(formData).unwrap();
                  if (res.success) {
                        toast.success(res.message);
                  }
            } catch (error) {
                  toast.error(error.message);
            }
      };

      return (
            <div>
                  <div className="flex gap-5">
                        <div className="w-full">
                              <label className="text-[#A1A1A1] text-lg py-2">Name</label>
                              <input
                                    type="text"
                                    value={title || ''}
                                    onChange={handleTitleChange}
                                    className="p-3 w-full bg-[#FBF5EB] rounded-md"
                                    placeholder="Enter donation title"
                                    required
                              />
                        </div>

                        <div className="w-full">
                              <label className="text-[#A1A1A1] text-lg p-3">Image</label>
                              <input
                                    type="file"
                                    // value={donation?.details?.title || ""}
                                    onChange={handleImageChange}
                                    className="py-2 w-full bg-[#FBF5EB] rounded"
                                    accept="image/*"
                                    required
                              />
                        </div>
                  </div>

                  <p className="text-[#A1A1A1] font-semibold text-lg pb-4 mt-4">Donation Details</p>
                  <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onChange={() => {}}
                        onBlur={(newContent) => setContent(newContent)}
                  />

                  <div
                        style={{
                              marginTop: 24,
                              display: 'flex',
                              justifyContent: 'end',
                              alignItems: 'center',
                        }}
                  >
                        <button
                              onClick={handleAddDonation}
                              disabled={isLoading}
                              style={{
                                    height: 44,
                                    width: 150,
                                    backgroundColor: '#D29E3B',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontWeight: 500,
                                    fontSize: 14,
                              }}
                        >
                              {isLoading ? 'Updating...' : 'Update'}
                        </button>
                  </div>
            </div>
      );
};

export default Details;
