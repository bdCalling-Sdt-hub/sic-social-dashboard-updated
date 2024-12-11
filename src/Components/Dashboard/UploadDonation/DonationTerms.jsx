import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { toast } from 'sonner';
import { useAddDonationMutation, useGetDonationQuery } from '../../../redux/api/donationApi';

const DonationTerms = () => {
      const [addDonation, { isLoading }] = useAddDonationMutation();
      const { data: donationData } = useGetDonationQuery({});

      const editor = useRef(null);
      const [content, setContent] = useState(''); // Initialize with termsData

      useEffect(() => {
            if (donationData?.data?.length > 0) {
                  const donationDetails = donationData.data[0].termsAndConditions;
                  setContent(donationDetails?.content || '');
            }
      }, [donationData]);

      const config = {
            readonly: false,
            placeholder: 'Typing terms...',
            style: {
                  height: 300,
                  background: '#FBF5EB',
            },
      };
      const handleAddDonation = async () => {
            try {
                  const formData = new FormData();
                  const updatedData = {
                        termsAndConditions: {
                              content,
                        },
                  };
                  formData.append('data', JSON.stringify(updatedData));

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
                  <p className="text-[#A1A1A1] font-semibold text-lg py-4">Terms & conditions</p>
                  <div>
                        <div>
                              <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    tabIndex={1}
                                    onChange={() => {}} // Capture content on change
                                    onBlur={(newContent) => setContent(newContent)} // Capture on blur as well
                              />
                        </div>
                        <div
                              style={{
                                    marginTop: 24,
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                    gap: 2,
                              }}
                        >
                              <button
                                    onClick={handleAddDonation}
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
                                    Submit
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default DonationTerms;
