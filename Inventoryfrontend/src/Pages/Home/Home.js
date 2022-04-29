import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import SideNav from './SideNav';
import { UserState } from '../../Context/UserProvider';
import Inventory from '../Inventory/Inventory';

function Home() {
    const { user } = UserState();
    
  return (
    <>
      <Header />
      <SideNav />
      <Routes>
        <Route path="/inventory/*" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default Home