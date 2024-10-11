"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const NewMessage = () => {

    const dummyData = (e: any) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-add-expense-area bg-white p-7 custom-shadow rounded-8 mb-5">
                    <h4 className="text-[20px] text-heading font-bold mb-10">New Message</h4>
                    <div className="inventual-newmessage-inbox-wrapper">
                        <div className="inventual-newmessage-wrapper flex">
                            <div className="inventual-newmessage-nav">
                                <Link className='link' href="/message"><span><i className="fa-solid fa-message-lines"></i>Inbox</span><span>(7)</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-sharp fa-regular fa-paper-plane"></i>Send</span><span>(5)</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-solid fa-envelope-open"></i>Draft</span><span>(3)</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-sharp fa-solid fa-circle-exclamation"></i>Important</span><span>(2)</span></Link>
                                <Link className='link' href="/message"><span><i className="fa-solid fa-trash"></i>Trash</span><span>(1+)</span></Link>
                            </div>
                            <div className="inventual-newmessage-content">
                                <div className="grid grid-cols-12 gap-7">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='To' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='Subject' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="message-form">
                                            <div className="inventual-form-field">
                                                <textarea placeholder='Write your message'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <button type="submit" className="inventual-btn">Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewMessage;