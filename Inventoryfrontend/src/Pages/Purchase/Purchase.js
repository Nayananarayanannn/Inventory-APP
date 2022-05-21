import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SubNav from '../../Components/SubNav';
import BillsAndPayments from './BillsAndPaments/BillsAndPayments';
import PurchaseOrdersAdd from './PurchaseOrders/PurchaseOrderAdd';
import PurchaseOrders from './PurchaseOrders/PurchaseOrders';
import VendorCreditAdd from './VendorCredits/VendorCreditAdd';
import VendorCredits from './VendorCredits/VendorCredits';
import VendorAdd from './Vendors/VendorAdd';
import Vendors from './Vendors/Vendors';

function Purchase() {
    const components = ["Vendors", "Purchase Orders", "Bills and Payments", "Vendor Credit"]
  return (
    <>
      <SubNav components={components} page={"purchase"} />
      <Routes>
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/Purchase%20Orders" element={<PurchaseOrders/>}/>
        <Route path="/Bills%20and%20Payments" element={<BillsAndPayments/>}/>
        <Route path="/Vendor%20Credit" element={<VendorCredits/>}/>
        <Route path="/vendor-add" element={<VendorAdd/>}/>
        <Route path="/credits-add" element = {<VendorCreditAdd/>}/>
        <Route path="/order-add" element = {<PurchaseOrdersAdd/>}/>
      </Routes>
    </>
  );
}

export default Purchase