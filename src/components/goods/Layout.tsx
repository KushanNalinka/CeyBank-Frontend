import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import Header from './HeaderWithRequest';
import CartTab from './GoodRequestTab';


const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  //const statusTabCart = useSelector(store => store.cart.statusTab);

  return (
    <div className='bg-white flex'>


      <Sidebar setSelectedCategory={setSelectedCategory} /> 
      <div className={`flex-1 transition-transform duration-500 ml-56 mr-96`}>
        <main className='w-full m-auto p-1'>
          <Header />
          <Outlet context={{ selectedCategory }} />
        </main>
      </div>
      <CartTab />
    </div>
  );
};

export default Layout;





