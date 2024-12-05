import Link from 'next/link';
import React from 'react';

const ButtonElement = () => {
    return (
        <div className="invenShopfy-common-card mb-5">
            <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                <div className="col-span-2">
                    <Link className='invenShopfy-btn primary-btn' href="/somewhere">Modern Button</Link>
                </div>
                <div className="col-span-2">
                    <Link className='invenShopfy-btn secondary-btn' href="/somewhere">Modern Button</Link>
                </div>
                <div className="col-span-2">
                    <Link className='invenShopfy-btn primary-btn' href="/somewhere"><span><i className="fa-regular fa-circle-plus"></i></span>Modern Button</Link>
                </div>
                <div className="col-span-2">
                    <Link className='invenShopfy-btn secondary-btn' href="/somewhere"><span><i className="fa-regular fa-folder-arrow-up"></i></span>Modern Button</Link>
                </div>
                <div className="col-span-2">
                    <button className='invenShopfy-btn' type="submit">Modern Button</button>
                </div>
                <div className="col-span-2">
                    <button className='invenShopfy-btn secondary-btn' type="submit">Modern Button</button>
                </div>

                <div className="col-span-2">
                    <button className='invenShopfy-btn outline-btn' type="submit">Modern Button</button>
                </div>
                <div className="col-span-2">
                    <button className='invenShopfy-btn outline-btn secondary-btn' type="submit">Modern Button</button>
                </div>
                <div className="col-span-2">
                    <button className='invenShopfy-btn outline-btn h-38' type="submit"><span><i className="fa-sharp fa-solid fa-reply"></i></span>Reply</button>
                </div>
                <div className="col-span-2">
                    <button className='invenShopfy-btn outline-btn h-38' type="submit"><span><i className="fa-solid fa-right-long"></i></span>Forward</button>
                </div>
                <div className="col-span-2">
                    <button className='invenShopfy-btn outline-btn h-38' type="submit"><span><i className="fa-light fa-trash-can"></i></span>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ButtonElement;