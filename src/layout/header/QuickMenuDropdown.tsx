import Link from 'next/link';
import React from 'react';

const QuickMenuDropdown = () => {
    return (
        <ul>
              <li><Link href="/trading/sales/possale">POS Sale</Link></li>
              <li><Link href="/trading/sales/newsale">Add New Sale</Link></li>
              <li><Link href="/trading/purchase/addpurchase">Add Purchase</Link></li>
              <li><Link href="/product/adjustment">Add Adjustment</Link></li>
              <li><Link href="/expense/addexpense">Add Expense</Link></li>
              <li><Link href="/warehouselist">Warehouse</Link></li>
              <li><Link href="/client/adduser">Add User</Link></li>
              <li><Link href="/people/addsupplier">Add Supplier</Link></li>
              <li><Link href="/people/addcustomer">Add Customer</Link></li>
        </ul>
    );
};

export default QuickMenuDropdown;