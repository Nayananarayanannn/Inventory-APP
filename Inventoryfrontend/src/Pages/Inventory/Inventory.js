import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SubNav from '../../Components/SubNav';
import InventoryAdjustmentsAdd from './InventoryAdjustments/InventoryAdjustmentsAdd';
import InventotyAdjustments from './InventoryAdjustments/InventotyAdjustments';
import ItemGroupAdd from './ItemGroup/ItemGroupAdd';
import ItemGroups from './ItemGroup/ItemGroups';
import ItemAdd from './Items/ItemAdd';
import Items from './Items/Items';

function Inventory() {
    const components = ["Items", "Item Groups", "Inventory Adjustments"]
  return (
    <>
      <SubNav components = {components} page={"inventory"}/>
      <Routes>
        <Route path='/items' element ={<Items/>}/>
        <Route path='/item%20Groups' element ={<ItemGroups/>}/>
        <Route path='/inventory%20Adjustments' element={<InventotyAdjustments/>}/>
        <Route path='/item-add' element={<ItemAdd/>}/>
        <Route path='/group-add' element={<ItemGroupAdd/>}/>
        <Route path='/adjustment-add' element={<InventoryAdjustmentsAdd/>}/>
      </Routes>
    </>
  );
}

export default Inventory