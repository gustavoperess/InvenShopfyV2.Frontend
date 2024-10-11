import Link from 'next/link';
import React from 'react';

interface Data {
    sl: string;
    name: string;
    amount: string;
    phone: string;
}
const TopSuppliers = () => {

    const sampleData: Data[] = [
        { sl: '01', name: 'Steve Smith', amount: "325,712", phone: "01711-52523" },
        { sl: '02', name: 'Jhon Doe', amount: "425,712", phone: "01711-52523" },
        { sl: '03', name: 'David Warner', amount: "555,712", phone: "01711-52523" },
        { sl: '04', name: 'Shane Watson', amount: "125,712", phone: "01711-52523" },
        { sl: '05', name: 'Mitchel Stark', amount: "725,712", phone: "01711-52523" },
    ]
    return (
        <>
            <div className=" custom-boxshadow inventual-dashboard-topseller-wrapper p-5 sm:p-7 bg-white rounded-8 mb-5">
                <div className="inventual-dashboard-supplier-header flex gap-2.5 flex-wrap items-center justify-between mb-5 m-0.5">
                    <h5 className="text-[18px] text-heading font-bold">Top Suppliers <span className="text-[18px] text-heading font-normal">(Dec.)</span></h5>
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
                            {
                                sampleData.length > 0 ? (
                                    sampleData.map((item, index) => <tr key={index}>
                                        <td>{item.sl}</td>
                                        <td>
                                            <div className="inventual-dashboard-supplier-list-name">
                                                <a className="text-[15px] font-normal block mb-3">{item.name}</a>
                                                <Link href="tel:01711-525236" className="text-[15px] font-normal block">{item.phone}</Link>
                                            </div>
                                        </td>
                                        <td>${item.amount}</td>
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