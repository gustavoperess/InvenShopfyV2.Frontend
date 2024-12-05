"use client"
import Link from 'next/link';
import React from 'react';
import { useGetBestSellerQuery } from '@/services/Sales/Sales';



const TopSales = () => {
    const { data, isLoading } = useGetBestSellerQuery();
    const d = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[d.getMonth()];

    return (
        <>
            <div className=" custom-boxshadow invenShopfy-dashboard-topseller-wrapper p-5 sm:p-7 bg-white rounded-8">
                <div className="invenShopfy-dashboard-supplier-header flex gap-2.5 items-center justify-between mb-5 m-0.5">
                    <h5 className="text-[18px] text-heading font-bold">Top Sales <span className="text-[18px] text-heading font-normal">({monthName})</span></h5>
                    <span className="common-blue-badge">
                        <Link href="trading/sales/salelist">View All</Link>
                    </span>
                </div>
                <div className="invenShopfy-common-small-table top-sellar-table overflow-y-scroll cursor-grab sm:overflow-y-hidden">
                    <table>
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3}>
                                        <div className="invenShopfy-loading-container">
                                            <span className="invenShopfy-loading"></span>
                                        </div>
                                    </td>
                                </tr>
                            ) : data?.data.length > 0 ? (
                                data?.data.map((item: any, index: any) => <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        <div className="invenShopfy-dashboard-sellar-list-name">
                                            <a className="text-[15px] font-normal block mb-3">{item.productName}</a>
                                            <span className="text-[15px] font-normal block">{item.productCode}</span>
                                        </div>
                                    </td>
                                    <td>{item.totalQuantitySoldPerProduct}</td>
                                </tr>)
                            ) : <tr>
                                <td colSpan={3}>Data not found</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TopSales;





