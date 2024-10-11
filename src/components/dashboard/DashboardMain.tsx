"use client"
import React from 'react';
import TopSuppliers from './TopSuppliers';
import TopSales from './TopSales';
import AdminUser from './AdminUser';
import QuickReportList from './QuickReportList';
import ProfitLossChart from './Charts/ProfitLossChart';
import ReportPicChart from './Charts/ReportPicChart';
import TransactionReport from './TransactionReport';

import dynamic from "next/dynamic";
import Calender from './Calender';
const StockAnalysisChart = dynamic(() => import("./Charts/StockAnalysisChart"), { ssr: false });

const DashboardMain = () => {
    return (
        <div className="inventual-content-area mt-7 px-4 sm:px-7">
            <div className="grid grid-cols-12 gap-x-5">
                <div className="maxLg:col-span-12 minMaxXl:col-span-8 minMax2Xl:col-span-8 minMax3Xl:col-span-8 col-span-9">
                    <div className="invention-quickreport-area ps-0.5">
                        <QuickReportList />
                    </div>
                    <div className="custom-boxshadow inventual-line-chart bg-white pt-7 ps-1.5 rounded-8 mb-5">
                        <ProfitLossChart />
                    </div>
                    <div className="grid grid-cols-12 gap-x-5">
                        <div className="col-span-12 lg:col-span-12 xxxl:col-span-6 minMax3Xl:col-span-12">
                            <div className="custom-boxshadow inventual-bar-chart relative bg-white p-5 rounded-8 mb-5">
                                <StockAnalysisChart />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-12 xxxl:col-span-6 minMax3Xl:col-span-12">
                            <div className="inventual-dashboard-supplier-area">
                                <TopSuppliers />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-12">
                            <div className="inventual-dashboard-transaction-area">
                                <TransactionReport />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="maxLg:col-span-12 minMaxXl:col-span-4 minMax2Xl:col-span-4 minMax3Xl:col-span-4 col-span-3">
                    <div className="grid grid-cols-12 gap-5 mt-5 xl:mt-0">
                        <div className="minMaxSm:col-span-12 minMaxMd:col-span-6 minMaxLg:col-span-6 col-span-12">
                            <div className="custom-boxshadow inventual-dashboard-piechart h-full bg-white rounded-8 pt-7 pb-4">
                                <h5 className="mb-8 text-heading text-[18px] font-bold ps-7">Overall Report Piechart </h5>
                                <div id="lineChart" className='flex justify-center'>
                                    <ReportPicChart />
                                </div>
                            </div>
                        </div>
                        <div className="minMaxSm:col-span-12 minMaxMd:col-span-6 minMaxLg:col-span-6 col-span-12">
                            <div className="inventual-dashboard-topseller-area">
                                <TopSales />
                            </div>
                        </div>
                        <div className="minMaxSm:col-span-12 minMaxMd:col-span-6 minMaxLg:col-span-6 col-span-12">
                            <div className="inventual-dashboard-user-area">
                                <AdminUser />
                            </div>
                        </div>
                        <div className="minMaxSm:col-span-12 minMaxMd:col-span-6 minMaxLg:col-span-6 col-span-12">
                            <div className="custom-boxshadow inventual-dashboard-calender-area">
                                <Calender />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;