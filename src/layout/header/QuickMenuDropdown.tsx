import Link from 'next/link';
import React from 'react';

const QuickMenuDropdown = () => {
    return (
        <ul>
              <li><Link href="/trading/sales/possale">POS Sale</Link></li>
              <li><Link href="/trading/sales/newsale">Add New Sale</Link></li>
              <li><Link href="/trading/purchase/addpurchase">Add Purchase</Link></li>
              <li><Link href="/product/addadjustment">Add Adjustment</Link></li>
              <li><Link href="/expense/addexpense">Add Expense</Link></li>
              <li><Link href="/warehouse/addWarehouse">Add Warehouse</Link></li>
              <li><Link href="/management/addemployee">Add Employee</Link></li>
              <li><Link href="/people/addsupplier">Add Supplier</Link></li>
              <li><Link href="/people/addcustomer">Add Customer</Link></li>
        </ul>
    );
};

export default QuickMenuDropdown;