"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useGetAllBillersNewQuery } from '@/services/User/User';
import { MenuItem, TextField } from '@mui/material';
import { TBillerInterfaceTwo } from '@/interFace/interFace';
import { useCreateMessageMutation } from '@/services/Messages/Messages';
import { useGetTotalAmountOfInboxMessagesQuery, useGetTotalAmountOfSentMessagesQuery } from '@/services/Messages/Messages';



const NewMessage = () => {
    const { data: billerDataNew } = useGetAllBillersNewQuery();
    const [selectBiller, setSelectBiller] = useState('')
    const [subject, setSubject] = useState('')
    const [title, setTitle] = useState('')
    const [messageBody, setMessageBody] = useState('')
    const [createMessage] = useCreateMessageMutation();
    const { data: totalAmountInboxMessages } = useGetTotalAmountOfInboxMessagesQuery();
    const { data: totalAmountSentMessages } = useGetTotalAmountOfSentMessagesQuery();


    const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const messageData = { toUserId: selectBiller, subject, title, messageBody };
        e.preventDefault();
        try {
            await createMessage(messageData).unwrap();
            setSelectBiller("");
            setSubject("")
            setTitle("")
            setMessageBody("")
            toast.success("Message sent successfully!");

        } 
        catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to send Message. Please try again later.");
            }
        }
    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-add-expense-area bg-white p-7 custom-shadow rounded-8 mb-5">
                    <h4 className="text-[20px] text-heading font-bold mb-10">New Message</h4>
                    <div className="inventual-newmessage-inbox-wrapper">
                        <div className="inventual-newmessage-wrapper flex">
                            <div className="inventual-newmessage-nav">
                                <Link className='link' href="/message"><span><i className="fa-solid fa-message-lines"></i>Inbox</span><span>({totalAmountInboxMessages?.data})</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-sharp fa-regular fa-paper-plane"></i>Send</span><span>({totalAmountSentMessages?.data})</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-solid fa-envelope-open"></i>Draft</span><span>(3)</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-sharp fa-solid fa-circle-exclamation"></i>Important</span><span>(2)</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-solid fa-trash"></i>Trash</span><span>(1+)</span></Link>
                            </div>
                            <div className="inventual-newmessage-content">
                                <form onSubmit={handleMessageSubmit}>
                                    <div className="grid grid-cols-12 gap-7">
                                        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                            <div className="inventual-select-field">
                                                <div className="inventual-form-field">
                                                    <div className="inventual-select-field-style">
                                                        <TextField
                                                            select
                                                            label="Select"
                                                            value={selectBiller}
                                                            onChange={(e) => setSelectBiller(e.target.value)}
                                                            SelectProps={{
                                                                displayEmpty: true,
                                                                renderValue: (value: any) => {
                                                                    const selectedBiller = billerDataNew?.find((biller: TBillerInterfaceTwo) => biller.userId === value);
                                                                    return selectedBiller ? selectedBiller.userName : <em>To</em>;
                                                                },
                                                            }}>
                                                            {billerDataNew && billerDataNew?.length > 0 ? (
                                                                billerDataNew.map((biller: TBillerInterfaceTwo) => (
                                                                    <MenuItem key={biller.userId} value={biller.userId}>
                                                                        {biller.userName}
                                                                    </MenuItem>
                                                                ))
                                                            ) : (
                                                                <MenuItem value="">
                                                                    <em>No User Available</em>
                                                                </MenuItem>
                                                            )}
                                                        </TextField>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-9">
                                            <div className="inventual-form-field">
                                                <div className="inventual-input-field-style">
                                                    <TextField
                                                        fullWidth
                                                        type="text"
                                                        value={title}
                                                        placeholder="Title"
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 80 }}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-9">
                                            <div className="inventual-form-field">
                                                <div className="inventual-input-field-style">
                                                    <TextField
                                                        fullWidth
                                                        type="text"
                                                        value={subject}
                                                        placeholder="Subject"
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 80 }}
                                                        onChange={(e) => setSubject(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="message-form">
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={10} 
                                                    value={messageBody}
                                                    placeholder="Message...."
                                                    inputProps={{ maxLength: 500 }}
                                                    onChange={(e) => setMessageBody(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <button type="submit" className="inventual-btn">Send</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewMessage;