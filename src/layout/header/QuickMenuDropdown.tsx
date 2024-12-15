import Link from 'next/link';
import React from 'react';

const QuickMenuDropdown = () => {
    return (
        <ul>
              <li><Link href="/product/addproduct">Add Product</Link></li>
              <li><Link href="/trading/sales/newsale">Add New Sale</Link></li>
              <li><Link href="/trading/purchase/addpurchase">Add Purchase</Link></li>
              <li><Link href="/expense/addexpense">Add Expense</Link></li>
              <li><Link href="/transfer/addtransfer">Add Transfer</Link></li>
              <li><Link href="/warehouse/addWarehouse">Add Warehouse</Link></li>
              <li><Link href="/management/addemployee">Add Employee</Link></li>
              <li><Link href="/people/addcustomer">Add Customer</Link></li>
              <li><Link href="/people/supplierlist">Add Supplier</Link></li>

        </ul>
    );
};

export default QuickMenuDropdown;