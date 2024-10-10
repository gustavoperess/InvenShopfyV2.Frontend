"use client"
import Link from 'next/link';
import React from 'react';

interface Data {
    sl: string;
    name: string;
    quantity: number;
    batch: string;
}
const TopSales = () => {

    const sampleData: Data[] = [
        { sl: '01', name: 'Laptop', quantity: 22, batch: "[D-8752021]" },
        { sl: '02', name: 'Desktop', quantity: 45, batch: "[D-8752022]" },
        { sl: '03', name: 'Printer', quantity: 18, batch: "[D-8752023]" },
        { sl: '04', name: 'Mouse', quantity: 52, batch: "[D-8752024]" },
        { sl: '05', name: 'CC Camera', quantity: 24, batch: "[D-8752025]" },
    ]

    return (
        <>
            <div className=" custom-boxshadow inventual-dashboard-topseller-wrapper p-5 sm:p-7 bg-white rounded-8">
                <div className="inventual-dashboard-supplier-header flex gap-2.5 items-center justify-between mb-5 m-0.5">
                    <h5 className="text-[18px] text-heading font-bold">Top Sales <span className="text-[18px] text-heading font-normal">(Dec.)</span></h5>
                    <span className="common-blue-badge">
                        <Link href="trading/sales/salelist">View All</Link>
                    </span>
                </div>
                <div className="inventual-common-small-table top-sellar-table overflow-y-scroll cursor-grab sm:overflow-y-hidden">
                    <table>
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sampleData.length > 0 ? (
                                    sampleData.map((item, index) => <tr key={index}>
                                        <td>{item.sl}</td>
                                        <td>
                                            <div className="inventual-dashboard-sellar-list-name">
                                                <a className="text-[15px] font-normal block mb-3">{item.name}</a>
                                                <span className="text-[15px] font-normal block">{item.batch}</span>
                                            </div>
                                        </td>
                                        <td>{item.quantity}</td>
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





