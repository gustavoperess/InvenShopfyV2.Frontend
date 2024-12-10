"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useGetSalesDashBoardQuery } from '@/services/Sales/Sales';
import { useGetPurchaseDashboardQuery } from '@/services/Purchase/Purchase';
import { useGetSalesReturnDashBoardQuery } from '@/services/Sales/SaleReturn';
import { useGetExpenseDashBoardQuery } from '@/services/Expense/Expense';
import { MoneyFormat } from '@/interFace/interFace';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    <div>{children}</div>
                </div>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const TransactionReport = () => {
    const { data: salesData, isLoading: salesDataLoading } = useGetSalesDashBoardQuery();
    const { data: purchaseData, isLoading: purchaseDataLoading } = useGetPurchaseDashboardQuery();
    const { data: salesReturnData, isLoading: salesReturnDataLoading } = useGetSalesReturnDashBoardQuery();
    const { data: expenseData, isLoading: expenseDataLoading } = useGetExpenseDashBoardQuery();

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const rows = value === 0 ? salesData?.data : (value === 1 ? purchaseData?.data : (value === 2 ? salesReturnData?.data : (value === 3 ? expenseData?.data : expenseData?.data)));
    
    return (
        <div className=" custom-boxshadow invenShopfy-dashboard-transaction-wrapper p-5 sm:p-7 bg-white rounded-8">
            <div className='invenShopfy-common-tab-menus mb-5'>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons allowScrollButtonsMobile aria-label="basic tabs example">
                    <Tab label="Sale" {...a11yProps(0)} />
                    <Tab label="Purchase" {...a11yProps(1)} />
                    <Tab label="Returns" {...a11yProps(2)} />
                    <Tab label="Expense" {...a11yProps(3)} />
                </Tabs>
            </div>
            <CustomTabPanel value={value} index={0}>
                <div className="invenShopfy-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Reference</th>
                                <th>Customer</th>
                                <th>Nº P.Sold</th>
                                <th>Status</th>
                                <th>Grand Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesDataLoading ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="invenShopfy-loading-container">
                                            <span className="invenShopfy-loading"></span>
                                        </div>
                                    </td>
                                </tr>
                            ) : rows?.length > 0 ? (
                                salesData?.data?.map((sales: any) => (
                                    <tr key={sales.id}>
                                        <td>{sales.saleDate}</td>
                                        <td>{sales.referenceNumber}</td>
                                        <td>{sales.customer}</td>
                                        <td>{sales.totalQuantitySold}</td>
                                        {sales.saleStatus && (
                                            <td>
                                                {sales.saleStatus.toLowerCase() === "paid" ? (
                                                    <span className='badge badge-success'>{sales.saleStatus}</span>
                                                ) : (sales.saleStatus.toLowerCase() === "unpaid" ? (
                                                    <span className='badge badge-danger'>{sales.saleStatus}</span>
                                                ) : (<span className='badge badge-teal'>{sales.saleStatus}</span>)
                                                )}
                                            </td>
                                        )}

                                        <td>{MoneyFormat.format(sales.totalAmount)}</td>
                                    </tr>
                                ))
                            ) : <tr>
                                <td colSpan={6}>Data not found</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="invenShopfy-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Reference</th>
                                <th>Supplier</th>
                                <th>Nº P.bought</th>
                                <th>Status</th>
                                <th>Grand Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseDataLoading ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="invenShopfy-loading-container">
                                            <span className="invenShopfy-loading"></span>
                                        </div>
                                    </td>
                                </tr>
                            ) :
                                rows?.length > 0 ? (
                                    purchaseData?.data?.map((purchase: any) => (
                                        <tr key={purchase.id}>
                                            <td>{purchase.purchaseDate}</td>
                                            <td>{purchase.referenceNumber}</td>
                                            <td>{purchase.supplier}</td>
                                            <td>{purchase.totalNumberOfProductsBought}</td>
                                            {purchase.purchaseStatus && (
                                                <td>
                                                    {purchase.purchaseStatus.toLowerCase() === "completed" ? (
                                                        <span className='badge badge-success'>{purchase.purchaseStatus}</span>
                                                    ) : (purchase.purchaseStatus.toLowerCase() === "partial" ? (
                                                        <span className='badge badge-teal'>{purchase.purchaseStatus}</span>
                                                    ) : (<span className='badge badge-danger'>{purchase.purchaseStatus}</span>)
                                                    )
                                                    }
                                                </td>
                                            )}
                                            <td>{MoneyFormat.format(purchase.totalAmountBought)}</td>
                                        </tr>
                                    ))
                                ) : <tr>
                                    <td colSpan={6}>Data not found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <div className="invenShopfy-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Return Date</th>
                                <th>Reference Number</th>
                                <th>Customer</th>
                                <th>Biller</th>
                                <th>Status</th>
                                <th>Grand Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesReturnDataLoading ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="invenShopfy-loading-container">
                                            <span className="invenShopfy-loading"></span>
                                        </div>
                                    </td>
                                </tr>
                            ) :
                                rows?.length > 0 ? (
                                    salesReturnData?.data?.map((salesReturn: any) => (
                                        <tr key={salesReturn.id}>
                                            <td>{salesReturn.returnDate}</td>
                                            <td>{salesReturn.referenceNumber}</td>
                                            <td>{salesReturn.customerName}</td>
                                            <td>{salesReturn.billerName}</td>
                                            <td>{salesReturn.remarkStatus}</td>
                                            <td>{MoneyFormat.format(salesReturn.returnTotalAmount)}</td>
                                        </tr>
                                    ))
                                ) : <tr>
                                    <td colSpan={6}>Data not found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <div className="invenShopfy-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Voucher</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Payment</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseDataLoading ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="invenShopfy-loading-container">
                                            <span className="invenShopfy-loading"></span>
                                        </div>
                                    </td>
                                </tr>
                            ) :
                                rows?.length > 0 ? (
                                    expenseData?.data?.map((expense: any) => (
                                        <tr key={expense.id}>
                                            <td>{expense.date}</td>
                                            <td>{expense.voucherNumber}</td>
                                            <td>{expense.expenseDescription}</td>
                                            <td>{expense.expenseCategory}</td>
                                            {expense.expenseStatus && (
                                                <td>
                                                    {expense.expenseStatus.toLowerCase() === "paid" ? (
                                                        <span className='badge badge-success'>{expense.expenseStatus}</span>
                                                    ) : (expense.expenseStatus.toLowerCase() === "unpaid" ? (
                                                        <span className='badge badge-danger'>{expense.expenseStatus}</span>
                                                    ) : (<span className='badge badge-teal'>{expense.expenseStatus}</span>)
                                                    )
                                                    }
                                                </td>
                                            )}
                                            <td>{MoneyFormat.format(expense.expenseCost)}</td>
                                        </tr>
                                    ))
                                ) : <tr>
                                    <td colSpan={6}>Data not found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </CustomTabPanel>
        </div>
    );
};

export default TransactionReport;