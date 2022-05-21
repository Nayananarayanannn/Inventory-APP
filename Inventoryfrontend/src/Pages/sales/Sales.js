import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SubNav from '../../Components/SubNav';
import Vendors from '../Purchase/Vendors/Vendors';
import CustomerAdd from './customers/CustomerAdd';
import Customers from './customers/Customers';
import Invoices from './invoices/Invoices';
import SalesOrders from './salesOrders/SalesOrders';

function Sales() {
    const components = [
      "Customers",
      "Invoices",
      "Sales Order",
    ];
  return (
    <>
      <SubNav components={components} page={"sales"} />
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices/>}/>
        <Route path="/Sales%20Order" element={<SalesOrders/>}/>
        <Route path="/customer-add" element={<CustomerAdd/>}/>
      </Routes>
    </>
  );
}

export default Sales