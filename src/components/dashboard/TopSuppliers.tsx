import Link from 'next/link';
import React from 'react';
import { useGetTopSuppliersDasgboardQuery } from '@/services/People/Supplier';
import { MoneyFormat } from '@/interFace/interFace';

const TopSuppliers = () => {
    const { data: supplierData, isLoading } = useGetTopSuppliersDasgboardQuery();
    const d = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[d.getMonth()];

    return (
        <>
            <div className=" custom-boxshadow inventual-dashboard-topseller-wrapper p-5 sm:p-7 bg-white rounded-8 mb-5">
                <div className="inventual-dashboard-supplier-header flex gap-2.5 flex-wrap items-center justify-between mb-5 m-0.5">
                    <h5 className="text-[18px] text-heading font-bold">Top Suppliers <span className="text-[18px] text-heading font-normal">({monthName})</span></h5>
                    <span className="common-blue-badge">
                        <Link href="people/supplierlist" >View All</Link>
                    </span>
                </div>
                <div className="inventual-common-small-table top-sellar-table overflow-y-scroll sm:overflow-y-hidden">
                    <table>
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3}>
                                        <div className="inventual-loading-container">
                                            <span className="inventual-loading"></span>
                                        </div>
                                    </td>
                                </tr>
                            ) : supplierData?.data?.length > 0 ? (
                                supplierData?.data?.map((item: any, index: number) => <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        <div className="inventual-dashboard-supplier-list-name">
                                            <a className="text-[15px] font-normal block mb-3">{item.name} [{item.company}]</a>
                                            <a className="text-[15px] font-normal block mb-3">{item.supplierCode} </a>
                                        </div>
                                    </td>
                                    <td>{MoneyFormat.format(item.totalPurchase)}</td>
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

export default TopSuppliers;