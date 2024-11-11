import React from 'react';
import { useGetWarehouseQuantityQuery } from '@/services/Warehouse/Warehouse';
import { useGetSalesReturnTotalAmountQuery } from '@/services/Sales/SaleReturn';
import { useGetSPurchaseReturnTotalAmountQuery } from '@/services/Purchase/PurchaseReturn';
import { useGetExpenseTotalAmountQuery } from '@/services/Expense/Expense';
import { useGetTotalStockAmountQuery } from '@/services/Warehouse/Warehouse';

let MoneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  });

const QuickReportList = () => {
    const { data: warehouseQuantityData } = useGetWarehouseQuantityQuery();
    const { data: salesReturnTotalAmountData } = useGetSalesReturnTotalAmountQuery();
    const {data: purchaseReturnData} = useGetSPurchaseReturnTotalAmountQuery();
    const {data: expenseTotalAMount} = useGetExpenseTotalAmountQuery();
    const {data: totalInStock} = useGetTotalStockAmountQuery();


    return (
        <>
            <div className="invention-quickreport-wrapper">
                <div className="grid grid-cols-12 gap-x-5">
                    <div className="maxSm:col-span-12 md:col-span-6 lg:col-span-4 minMax2Xl:col-span-6">
                        <div className="invention-quickreport flex items-center bg-white mb-5 rounded-8 p-7 gap-y-5 minMaxXl:flex-col">
                            <div className="invention-quickreport-icon me-5">
                                <span className="invention-quickreport-icon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30.863" height="32.921" viewBox="0 0 30.863 32.921">
                                        <g id="cost" transform="translate(-16)">
                                            <path id="Path_57" data-name="Path 57" d="M318.893,233.68a.966.966,0,0,1-.964-.964H316a2.9,2.9,0,0,0,1.929,2.728v1.13h1.929v-1.13a2.893,2.893,0,0,0-.964-5.621.964.964,0,1,1,.964-.964h1.929a2.9,2.9,0,0,0-1.929-2.728V225h-1.929v1.13a2.893,2.893,0,0,0,.964,5.621.964.964,0,1,1,0,1.929Z" transform="translate(-280.711 -210.533)" fill="#235ed2" />
                                            <path id="Path_58" data-name="Path 58" d="M46.863,20.254a8.679,8.679,0,0,0-9.645-8.626V7.716a3.858,3.858,0,0,0,0-7.716H19.858A3.862,3.862,0,0,0,16,3.858V32.921H46.863V27.005H43.632A8.667,8.667,0,0,0,46.863,20.254Zm-1.929,0A6.751,6.751,0,1,1,38.183,13.5,6.759,6.759,0,0,1,44.934,20.254ZM23.2,1.929h14.02a1.929,1.929,0,0,1,0,3.858H23.2a3.852,3.852,0,0,0,0-3.858ZM17.929,30.992V3.858a1.929,1.929,0,1,1,1.929,1.929V7.716H35.289V12.07a8.676,8.676,0,0,0-2.556,14.935H29.5v3.986Zm27.005-2.058v2.058h-13.5V28.934Z" fill="#235ed2" />
                                            <path id="Path_59" data-name="Path 59" d="M76,210h7.716v1.929H76Z" transform="translate(-56.142 -196.497)" fill="#235ed2" />
                                            <path id="Path_60" data-name="Path 60" d="M76,270h7.716v1.929H76Z" transform="translate(-56.142 -252.639)" fill="#235ed2" />
                                            <path id="Path_61" data-name="Path 61" d="M76,330h7.716v1.929H76Z" transform="translate(-56.142 -308.782)" fill="#235ed2" />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className="invention-quickreport-text">
                                <span className="text-[16px] font-semibold block mb-2">Total Expense</span>
                                <h5 className="text-[20px] text-heading font-bold">{MoneyFormat.format(expenseTotalAMount?.data)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="maxSm:col-span-12 md:col-span-6 lg:col-span-4 minMax2Xl:col-span-6">
                        <div className="invention-quickreport flex items-center bg-white mb-5 rounded-8 p-7 gap-y-5 minMaxXl:flex-col">
                            <div className="invention-quickreport-icon me-5">
                                <span className="invention-quickreport-icon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="33.559" height="33.559" viewBox="0 0 33.559 33.559">
                                        <g id="money-bag" transform="translate(0 0)">
                                            <path id="Path_62" data-name="Path 62" d="M153.79,252.12a.984.984,0,0,1-.983-.983.983.983,0,0,0-1.966,0,2.954,2.954,0,0,0,1.977,2.784v.861a.983.983,0,0,0,1.966,0v-.868a2.949,2.949,0,0,0-.994-5.726.983.983,0,1,1,.983-.983.983.983,0,1,0,1.966,0,2.955,2.955,0,0,0-1.956-2.777v-1.444a.983.983,0,1,0-1.966,0v1.437a2.949,2.949,0,0,0,.973,5.734.983.983,0,1,1,0,1.966Zm0,0" transform="translate(-140.954 -226.138)" fill="#6625c7" />
                                            <path id="Path_63" data-name="Path 63" d="M4.007,31.953c2.046,1.1,4.855,1.606,8.839,1.606a21.711,21.711,0,0,0,7.578-1.05,2.944,2.944,0,0,0,2.254,1.05h7.931a2.948,2.948,0,0,0,2.2-4.916,2.942,2.942,0,0,0,0-3.933,2.942,2.942,0,0,0,0-3.933,2.948,2.948,0,0,0-2.2-4.916H22.678c-.1,0-.19,0-.284.014a13.464,13.464,0,0,0-3.417-2.966,2.946,2.946,0,0,0-.936-4.629L19.68,3.255a.983.983,0,0,0-.935-1.288H15.627a2.949,2.949,0,0,0-5.562,0H6.947a.983.983,0,0,0-.935,1.288L7.652,8.281a2.946,2.946,0,0,0-.935,4.631A14.024,14.024,0,0,0,0,24.711c0,3.382,1.348,5.819,4.007,7.243Zm27.585-9.209a.984.984,0,0,1-.983.983H22.678a.983.983,0,0,1,0-1.966h7.931A.984.984,0,0,1,31.592,22.744Zm0,3.933a.984.984,0,0,1-.983.983H22.678a.983.983,0,0,1,0-1.966h7.931A.984.984,0,0,1,31.592,26.677Zm-.983,4.916H22.678a.983.983,0,0,1,0-1.966h7.931a.983.983,0,0,1,0,1.966Zm.983-12.781a.984.984,0,0,1-.983.983H22.678a.983.983,0,0,1,0-1.966h7.931A.984.984,0,0,1,31.592,18.811ZM16.751,11.929H8.914a.983.983,0,0,1,0-1.966h7.872a.983.983,0,0,1,0,1.966h-.028Zm-5.871-8a.983.983,0,0,0,.983-.983.983.983,0,0,1,1.966,0V4.916a.983.983,0,0,0,1.966,0V3.933h1.595L16.066,8H9.627L8.3,3.933ZM9.106,13.9h7.478a11.111,11.111,0,0,1,3.977,2.865,2.942,2.942,0,0,0-.079,4.017,2.942,2.942,0,0,0,0,3.933,2.942,2.942,0,0,0,0,3.933,2.938,2.938,0,0,0-.754,1.966c0,.02,0,.04,0,.06a19.87,19.87,0,0,1-6.884.923c-3.648,0-6.162-.436-7.911-1.373-2.026-1.085-2.969-2.835-2.969-5.509A11.929,11.929,0,0,1,9.106,13.9Zm0,0" fill="#6625c7" />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className="invention-quickreport-text">
                                <span className="text-[16px] font-semibold block mb-2">Gross Profit</span>
                                <h5 className="text-[20px] text-heading font-bold">$237,813</h5>
                            </div>
                        </div>
                    </div>
                    <div className="maxSm:col-span-12 md:col-span-6 lg:col-span-4 minMax2Xl:col-span-6">
                        <div className="invention-quickreport flex items-center bg-white mb-5 rounded-8 p-7 gap-y-5 minMaxXl:flex-col">
                            <div className="invention-quickreport-icon me-5">
                                <span className="invention-quickreport-icon3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32.885" height="33.014" viewBox="0 0 32.885 33.014">
                                        <g id="cubes" transform="translate(-1 -0.001)">
                                            <path id="Path_73" data-name="Path 73" d="M33.223,16.88l-7.076-2.359V3.548a.967.967,0,0,0-.661-.918L17.748.051a.968.968,0,0,0-.612,0L9.4,2.63a.967.967,0,0,0-.661.918V14.521L1.661,16.88A.967.967,0,0,0,1,17.8V29.469a.967.967,0,0,0,.661.918L9.4,32.965a.967.967,0,0,0,.612,0l7.432-2.477,7.432,2.477a.967.967,0,0,0,.612,0l7.738-2.579a.967.967,0,0,0,.661-.918V17.8A.967.967,0,0,0,33.223,16.88ZM25.18,19.357,20.5,17.8l4.679-1.56,4.679,1.56ZM9.7,16.238l4.679,1.56L9.7,19.357,5.026,17.8Zm6.77-9.414v9.632l-5.8-1.934V4.889Zm7.738,7.7-5.8,1.934V6.824l5.8-1.934ZM10.672,21.074l5.8-1.934v9.632l-5.8,1.934Zm6.77-19.086,4.679,1.56-4.679,1.56-4.679-1.56ZM2.934,19.14l5.8,1.934v9.632l-5.8-1.934Zm15.475,0,5.8,1.934v9.632l-5.8-1.934Zm7.738,11.566V21.074l5.8-1.934v9.632Z" transform="translate(0 0)" fill="#bf8818" />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className="invention-quickreport-text">
                                <span className="text-[16px] font-semibold block mb-2">Closing Stock</span>
                                <h5 className="text-[20px] text-heading font-bold">{totalInStock?.data} p</h5>
                            </div>
                        </div>
                    </div>
                    <div className="maxSm:col-span-12 md:col-span-6 lg:col-span-4 minMax2Xl:col-span-6">
                        <div className="invention-quickreport flex items-center bg-white mb-5 rounded-8 p-7 gap-y-5 minMaxXl:flex-col">
                            <div className="invention-quickreport-icon me-5">
                                <span className="invention-quickreport-icon4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30.001" viewBox="0 0 30 30.001">
                                        <g id="warehouse" transform="translate(0 0.001)">
                                            <path id="Path_64" data-name="Path 64" d="M20.625,25.75H12.188a.938.938,0,0,1-.937-.937V17.938A.938.938,0,0,1,12.188,17h8.438a.938.938,0,0,1,.938.938v6.875A.938.938,0,0,1,20.625,25.75Zm-7.5-1.875h6.563v-5H13.125Z" transform="translate(2.813 4.25)" fill="#14c281" />
                                            <path id="Path_65" data-name="Path 65" d="M17.063,20.375H8.938A.938.938,0,0,1,8,19.438v-7.5A.938.938,0,0,1,8.938,11h8.125a.938.938,0,0,1,.938.938v7.5A.938.938,0,0,1,17.063,20.375ZM9.875,18.5h6.25V12.875H9.875Z" transform="translate(2 2.75)" fill="#14c281" />
                                            <path id="Path_66" data-name="Path 66" d="M13.875,25.75H5.438a.938.938,0,0,1-.937-.937V17.938A.938.938,0,0,1,5.438,17h8.438a.938.938,0,0,1,.938.938v6.875A.938.938,0,0,1,13.875,25.75Zm-7.5-1.875h6.563v-5H6.375Z" transform="translate(1.125 4.25)" fill="#14c281" />
                                            <path id="Path_67" data-name="Path 67" d="M12.188,14.75a.938.938,0,0,1-.937-.937V11.938a.938.938,0,0,1,1.875,0v1.875A.938.938,0,0,1,12.188,14.75Z" transform="translate(2.813 2.75)" fill="#14c281" />
                                            <path id="Path_68" data-name="Path 68" d="M8.938,20.75A.938.938,0,0,1,8,19.813V17.938a.938.938,0,0,1,1.875,0v1.875A.938.938,0,0,1,8.938,20.75Z" transform="translate(2 4.25)" fill="#14c281" />
                                            <path id="Path_69" data-name="Path 69" d="M15.438,20.75a.938.938,0,0,1-.937-.937V17.938a.938.938,0,0,1,1.875,0v1.875A.938.938,0,0,1,15.438,20.75Z" transform="translate(3.625 4.25)" fill="#14c281" />
                                            <path id="Path_70" data-name="Path 70" d="M27.813,30H2.188A2.19,2.19,0,0,1,0,27.813V10.625a.939.939,0,0,1,.406-.773L14.469.165a.935.935,0,0,1,1.064,0L29.595,9.853a.941.941,0,0,1,.405.773V27.813A2.19,2.19,0,0,1,27.812,30ZM1.875,11.118V27.813a.313.313,0,0,0,.313.313H27.813a.313.313,0,0,0,.313-.312V11.118L15,2.076Z" fill="#14c281" />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className="invention-quickreport-text">
                                <span className="text-[16px] font-semibold block mb-2">Warehouse</span>
                                <h5 className="text-[20px] text-heading font-bold">{warehouseQuantityData?.data}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="maxSm:col-span-12 md:col-span-6 lg:col-span-4 minMax2Xl:col-span-6">
                        <div className="invention-quickreport flex items-center bg-white mb-5 rounded-8 p-7 gap-y-5 minMaxXl:flex-col">
                            <div className="invention-quickreport-icon me-5">
                                <span className="invention-quickreport-icon5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26.897" height="26.898" viewBox="0 0 26.897 26.898">
                                        <g id="back-arrow_1_" data-name="back-arrow (1)" transform="translate(-0.007)">
                                            <g id="Group_45" data-name="Group 45" transform="translate(0.007 0)">
                                                <path id="Path_71" data-name="Path 71" d="M10.573,5.79V.96A.961.961,0,0,0,8.9.318L.253,9.924a.961.961,0,0,0-.03,1.249L8.869,21.74a.961.961,0,0,0,1.7-.606V16.347c7.589.247,12.325,3.491,14.46,9.895a.961.961,0,0,0,.911.656.931.931,0,0,0,.155-.012.961.961,0,0,0,.806-.948C26.9,14.625,20.094,6.314,10.573,5.79Zm-.961,8.62a.961.961,0,0,0-.961.961v3.074L2.232,10.6l6.42-7.133v3.26a.961.961,0,0,0,.961.961c7.551,0,13.2,5.225,14.867,13.2C21.387,16.582,16.408,14.409,9.612,14.409Z" transform="translate(-0.007 0)" fill="#c4346a" />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className="invention-quickreport-text">
                                <span className="text-[16px] font-semibold block mb-2">Sales Returns</span>
                                <h5 className="text-[20px] text-heading font-bold">{MoneyFormat.format(salesReturnTotalAmountData?.data)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="maxSm:col-span-12 md:col-span-6 lg:col-span-4 minMax2Xl:col-span-6">
                        <div className="invention-quickreport flex items-center bg-white mb-5 rounded-8 p-7 gap-y-5 minMaxXl:flex-col">
                            <div className="invention-quickreport-icon me-5">
                                <span className="invention-quickreport-icon6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28.591" height="28.592" viewBox="0 0 28.591 28.592">
                                        <g id="back-arrow_1_" data-name="back-arrow (1)" transform="translate(-0.007)">
                                            <g id="Group_46" data-name="Group 46" transform="translate(0.007 0)">
                                                <path id="Path_72" data-name="Path 72" d="M11.238,6.154V1.021A1.021,1.021,0,0,0,9.458.338L.268,10.549a1.021,1.021,0,0,0-.032,1.327l9.19,11.232a1.021,1.021,0,0,0,1.811-.644V17.376c8.067.262,13.1,3.711,15.37,10.518a1.021,1.021,0,0,0,.968.7.989.989,0,0,0,.164-.013A1.021,1.021,0,0,0,28.6,27.57C28.6,15.545,21.359,6.712,11.238,6.154Zm-1.021,9.163A1.021,1.021,0,0,0,9.2,16.338v3.268L2.372,11.264,9.2,3.682V7.148a1.021,1.021,0,0,0,1.021,1.021c8.026,0,14.032,5.554,15.8,14.028C22.733,17.627,17.441,15.317,10.217,15.317Z" transform="translate(-0.007 0)" fill="#239ecc" />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className="invention-quickreport-text">
                                <span className="text-[16px] font-semibold block mb-2">Purchase Returns</span>
                                <h5 className="text-[20px] text-heading font-bold">{MoneyFormat.format(purchaseReturnData?.data)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickReportList;