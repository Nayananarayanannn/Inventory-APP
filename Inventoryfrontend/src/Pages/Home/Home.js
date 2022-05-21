import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import SideNav from './SideNav';
import { UserState } from '../../Context/UserProvider';
import Inventory from '../Inventory/Inventory';
import Purchase from '../Purchase/Purchase';
import Dashboard from '../Dashboard';
import Sales from '../sales/Sales';

function Home() {
    const { user } = UserState();
    
  return (
    <>
      <Header />
      <SideNav />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/inventory/*" element={<Inventory />} />
        <Route path= "/purchase/*" element={<Purchase/>}/>
        <Route path="/sales/*" element={<Sales/>}/>
      </Routes>
    </>
  );
}

export default Home