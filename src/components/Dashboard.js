import React from 'react';
import UserNavbar from './UserNavbar';
import Holdings from './Holdings';
import Sidebar from './SideBar';

const Dashboard = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-y-auto"> 
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <UserNavbar />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/4 md:w-1/5 bg-white shadow-lg overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Holdings />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;