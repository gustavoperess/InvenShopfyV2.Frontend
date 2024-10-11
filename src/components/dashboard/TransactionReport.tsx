"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

// Define the structure of the data
interface Data {
    id: number;
    date: string;
    reference?: string;
    customer?: string;
    supplier?: string;
    biller?: string;
    payment?: string;
    paymentType?: string;
    voucher?: string;
    name?: string;
    category?: string;
    mode?: string;
    status?: string;
    remark?: string;
    amount?: string;
    grandTotal?: string;
}

// Sale rows data
const saleRows: Data[] = [
    { id: 1, date: '27/12/2023', reference: 'S-920873850390', customer: 'Walk - in - customer', payment: 'Bank', status: 'Completed', grandTotal: '$1,282' },
    { id: 2, date: '28/12/2023', reference: 'S-920873850391', customer: 'Mitchel Stark', payment: 'Cash', status: 'Unpaid', grandTotal: '$1,382' },
    { id: 3, date: '29/12/2023', reference: 'S-920873850392', customer: 'Walk - in - customer', payment: 'Cash', status: 'Completed', grandTotal: '$1,482' },
    { id: 4, date: '30/12/2023', reference: 'S-920873850393', customer: 'David Warner', payment: '----', status: 'Partial', grandTotal: '$1,582' },
    { id: 5, date: '31/12/2023', reference: 'S-920873850394', customer: 'Walk - in - customer', payment: 'Bank', status: 'Unpaid', grandTotal: '$1,582' },
    { id: 6, date: '22/12/2023', reference: 'S-920873850394', customer: 'David Miller', payment: 'Bank', status: 'Partial', grandTotal: '$1,582' },
    { id: 7, date: '23/12/2023', reference: 'S-920873850394', customer: 'Walk - in - customer', payment: 'Bank', status: 'Completed', grandTotal: '$1,582' },
    { id: 8, date: '14/12/2023', reference: 'S-920873850394', customer: 'Walk - in - customer', payment: 'Bank', status: 'Unpaid', grandTotal: '$1,582' },
];

// Purchase rows data
const purchaseRows: Data[] = [
    { id: 1, date: '26/12/2023', reference: 'S-220873850490', supplier: 'Peter', payment: 'Bank', status: 'Completed', grandTotal: '$2,182' },
    { id: 2, date: '27/12/2023', reference: 'S-220873850491', supplier: 'Melinda', payment: 'Bank', status: 'Partial', grandTotal: '$2,282' },
    { id: 3, date: '28/12/2023', reference: 'S-220873850492', supplier: 'Sunaina', payment: 'Cash', status: 'Unpaid', grandTotal: '$2,382' },
    { id: 4, date: '29/12/2023', reference: 'S-220873850493', supplier: 'David Warner', payment: '----', status: 'Unpaid', grandTotal: '$2,482' },
    { id: 5, date: '30/12/2023', reference: 'S-220873850494', supplier: 'Evarton', payment: 'Cash', status: 'Completed', grandTotal: '$2,582' },
    { id: 6, date: '26/12/2023', reference: 'S-220873850494', supplier: 'Evarton', payment: 'Cash', status: 'Completed', grandTotal: '$2,582' },
    { id: 7, date: '25/12/2023', reference: 'S-220873850494', supplier: 'Evarton', payment: 'Cash', status: 'Unpaid', grandTotal: '$2,582' },
    { id: 8, date: '23/12/2023', reference: 'S-220873850494', supplier: 'Evarton', payment: 'Cash', status: 'Completed', grandTotal: '$2,582' },
];
// Purchase rows data
const paymentRows: Data[] = [
    { id: 1, date: '10/12/2023', voucher: '3850390', paymentType: 'Bank', status: 'Completed', amount: '$3,182' },
    { id: 2, date: '18/12/2023', voucher: '3850391', paymentType: 'Cash', status: 'Unpaid', amount: '$3,282' },
    { id: 3, date: '15/12/2023', voucher: '3850392', paymentType: 'Cash', status: 'Completed', amount: '$3,382' },
    { id: 4, date: '10/12/2023', voucher: '3850393', paymentType: '----', status: 'Partial', amount: '$3,482' },
    { id: 5, date: '17/12/2023', voucher: '3850394', paymentType: 'Bank', status: 'Unpaid', amount: '$3,582' },
    { id: 6, date: '13/12/2023', voucher: '3850394', paymentType: 'Bank', status: 'Unpaid', amount: '$3,582' },
    { id: 7, date: '23/12/2023', voucher: '3850394', paymentType: 'Bank', status: 'Completed', amount: '$3,582' },
    { id: 8, date: '22/12/2023', voucher: '3850394', paymentType: 'Bank', status: 'Completed', amount: '$3,582' },
];
// returnRows rows data
const returnRows: Data[] = [
    { id: 1, date: '11/12/2023', voucher: 'S-525473850490', biller: 'Peter', customer: 'Walk - in - customer', grandTotal: '$8,182', status: 'Quality less', },
    { id: 2, date: '12/12/2023', voucher: 'S-525473850491', biller: 'Dr. Banner', customer: 'Cristopher Stark', grandTotal: '$8,282', status: 'Date Expired', },
    { id: 3, date: '13/12/2023', voucher: 'S-525473850492', biller: 'Steve', customer: 'Walk - in - customer', grandTotal: '$3,382', status: 'Duplicate', },
    { id: 4, date: '14/12/2023', voucher: 'S-525473850493', biller: 'Joseph Amarho', customer: 'Witch Warner', grandTotal: '$8,482', status: 'N/A', },
    { id: 5, date: '15/12/2023', voucher: 'S-525473850494', biller: 'Dean Richards', customer: 'Walk - in - customer', grandTotal: '$8,582', status: 'Date Expired', },
    { id: 6, date: '16/12/2023', voucher: 'S-525473850494', biller: 'Weli William', customer: 'Shane Watson', grandTotal: '$8,582', status: 'Date Expired', },
    { id: 7, date: '24/12/2023', voucher: 'S-525473850494', biller: 'Dean Richards', customer: 'Walk - in - customer', grandTotal: '$8,582', status: 'Date Expired', },
    { id: 8, date: '22/12/2023', voucher: 'S-525473850494', biller: 'Dean Richards', customer: 'David Miller', grandTotal: '$8,582', status: 'Date Expired', },
];
// expenseRows rows data
const expenseRows: Data[] = [
    { id: 1, date: '21/12/2023', voucher: '850390', name: 'Stationery purchase', status: 'Completed', amount: '$6,182', category: 'Training' },
    { id: 2, date: '22/12/2023', voucher: '850391', name: 'Furniture purchase', status: 'Unpaid', amount: '$6,282', category: 'Construction' },
    { id: 3, date: '23/12/2023', voucher: '850392', name: 'Computer equipment', status: 'Unpaid', amount: '$3,382', category: 'Cleaning' },
    { id: 4, date: '24/12/2023', voucher: '850393', name: 'Cleaning supplies', status: 'Completed', amount: '$6,482', category: 'Electronics' },
    { id: 5, date: '25/12/2023', voucher: '850394', name: 'Office renovation', status: 'Partial', amount: '$6,582', category: 'Office Furniture' },
    { id: 6, date: '26/12/2023', voucher: '850394', name: 'Computer equipment', status: 'Partial', amount: '$6,582', category: 'Office Furniture' },
    { id: 7, date: '29/12/2023', voucher: '850394', name: 'Office renovation', status: 'Completed', amount: '$6,582', category: 'Office Furniture' },
    { id: 8, date: '28/12/2023', voucher: '850394', name: 'Furniture purchase', status: 'Completed', amount: '$6,582', category: 'Office Furniture' },
];

const TransactionReport = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // select rows with value of custom tab panel
    const rows = value === 0 ? saleRows : (value === 1 ? purchaseRows : (value === 2 ? paymentRows : (value === 3 ? returnRows : expenseRows)));

    return (
        <div className=" custom-boxshadow inventual-dashboard-transaction-wrapper p-5 sm:p-7 bg-white rounded-8">
            <div className='inventual-common-tab-menus mb-5'>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons allowScrollButtonsMobile aria-label="basic tabs example">
                    <Tab label="Sale" {...a11yProps(0)} />
                    <Tab label="Purchase" {...a11yProps(1)} />
                    <Tab label="Payment" {...a11yProps(2)} />
                    <Tab label="Returns" {...a11yProps(3)} />
                    <Tab label="Expense" {...a11yProps(4)} />
                </Tabs>
            </div>
            <CustomTabPanel value={value} index={0}>
                <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Reference</th>
                                <th>Customer</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Grand Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.length > 0 ? (
                                    rows.map(row => (
                                        <tr key={row.id}>
                                            <td>{row.date}</td>
                                            <td>{row.reference}</td>
                                            <td>{row.customer}</td>
                                            <td>{row.payment}</td>
                                            {row.status && (
                                                <td>
                                                    {row.status.toLowerCase() === "completed" ? (
                                                        <span className='badge badge-success'>{row.status}</span>
                                                    ) : (row.status.toLowerCase() === "partial" ? (
                                                        <span className='badge badge-teal'>{row.status}</span>
                                                    ) : (<span className='badge badge-danger'>{row.status}</span>)
                                                    )}
                                                </td>
                                            )}

                                            <td>{row.grandTotal}</td>
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
                <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Reference</th>
                                <th>Supplier</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Grand Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.length > 0 ? (
                                    rows.map(row => (
                                        <tr key={row.id}>
                                            <td>{row.date}</td>
                                            <td>{row.reference}</td>
                                            <td>{row.supplier}</td>
                                            <td>{row.payment}</td>
                                            {row.status && (
                                                <td>
                                                    {row.status.toLowerCase() === "completed" ? (
                                                        <span className='badge badge-success'>{row.status}</span>
                                                    ) : (row.status.toLowerCase() === "partial" ? (
                                                        <span className='badge badge-teal'>{row.status}</span>
                                                    ) : (<span className='badge badge-danger'>{row.status}</span>)
                                                    )
                                                    }
                                                </td>
                                            )}
                                            <td>{row.grandTotal}</td>
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
                <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Voucher No</th>
                                <th>Payment Type</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.length > 0 ? (
                                    rows.map(row => (
                                        <tr key={row.id}>
                                            <td>{row.date}</td>
                                            <td>{row.voucher}</td>
                                            <td>{row.paymentType}</td>
                                            {row.status && (
                                                <td>
                                                    {row.status.toLowerCase() === "completed" ? (
                                                        <span className='badge badge-success'>{row.status}</span>
                                                    ) : (row.status.toLowerCase() === "partial" ? (
                                                        <span className='badge badge-teal'>{row.status}</span>
                                                    ) : (<span className='badge badge-danger'>{row.status}</span>)
                                                    )
                                                    }
                                                </td>
                                            )}
                                            <td>{row.amount}</td>
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
                <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Voucher</th>
                                <th>Customer</th>
                                <th>Biller</th>
                                <th>Remark</th>
                                <th>Grand Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.length > 0 ? (
                                    rows.map(row => (
                                        <tr key={row.id}>
                                            <td>{row.date}</td>
                                            <td>{row.voucher}</td>
                                            <td>{row.customer}</td>
                                            <td>{row.biller}</td>
                                            <td>{row.status}</td>
                                            <td>{row.grandTotal}</td>
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
            <CustomTabPanel value={value} index={4}>
                <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto whitespace-nowrap">
                    <table>
                        <thead>
                            <tr className='bg-lightest'>
                                <th>Date</th>
                                <th>Voucher</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Payment</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.length > 0 ? (
                                    rows.map(row => (
                                        <tr key={row.id}>
                                            <td>{row.date}</td>
                                            <td>{row.voucher}</td>
                                            <td>{row.name}</td>
                                            <td>{row.category}</td>
                                            {row.status && (
                                                <td>
                                                    {row.status.toLowerCase() === "completed" ? (
                                                        <span className='badge badge-success'>{row.status}</span>
                                                    ) : (row.status.toLowerCase() === "partial" ? (
                                                        <span className='badge badge-teal'>{row.status}</span>
                                                    ) : (<span className='badge badge-danger'>{row.status}</span>)
                                                    )
                                                    }
                                                </td>
                                            )}
                                            <td>{row.amount}</td>
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