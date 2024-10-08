import React, { useState } from 'react';
import { logoutUser } from '../utils/auth';

const user = {
  name: 'Saloni Mittal',
  email: 'sm@example.com',
};

const initialNavigation = [
  { name: 'Holdings', href: '/dashboard/holdings', current: true },
  { name: 'Mutual Funds', href: '#', current: false, disabled: true }, // Add a 'disabled' property
];

const userNavigation = [
  { name: 'Sign out', href: '/' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserNavbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navigation, setNavigation] = useState(initialNavigation);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigationClick = (itemName) => {
    const updatedNavigation = navigation.map((item) =>
      item.name === itemName ? { ...item, current: true } : { ...item, current: false }
    );
    setNavigation(updatedNavigation);
  };

  const handleLogout = () => {
    logoutUser();
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-full ">
      <nav className=" bg-slate-100 border-b shadow z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
          <div className="relative flex items-center justify-between h-16">
            {/* Company logo and name */}
            <div className="flex items-center">
              <img
                className="h-5 w-5"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <span className="ml-2 text-md font-bold text-gray-700">Company</span>
            </div>

            {/* Main navigation - Horizontal layout */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <span key={item.name} className={item.disabled ? 'cursor-not-allowed text-gray-400' : ''}>
                  <a
                    href={item.disabled ? undefined : item.href} // Prevent click if disabled
                    onClick={() => item.disabled ? null : handleNavigationClick(item.name)}
                    className={classNames(
                      item.current ? 'border-indigo-500 text-gray-900' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                </span>
              ))}
            </div>

            {/* Right side - Bell Icon and User Dropdown */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-black focus:outline-none"
                >
                  <span>{user.name}</span>
                  <svg className="ml-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown items */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) =>
                      item.name === 'Sign out' ? (
                        <button
                          key={item.name}
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
