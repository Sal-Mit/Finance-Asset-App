import React from 'react';
import UserNavbar from '../components/UserNavbar';
import Holdings from '../components/Holdings';
import Sidebar from '../components/SideBar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md">
          <UserNavbar />
        </header>

        {/* Holdings Section */}
        <main className="flex-1 p-4 bg-gray-50">
          <Holdings />
        </main>
      </div>
    </div>
  );
}