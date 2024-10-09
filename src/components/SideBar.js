import React, { useState, useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { data as assetData } from '../assets/data';

const SideBar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState({ name: 'asc', ltp: 'asc' });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setData(assetData);
        setLoading(false);
      }, 500);
    };
    fetchData();
  }, []);

  const sortData = (type) => {
    let sortedData = [...data];
    const currentOrder = sortOrder[type];

    if (type === 'name') {
      sortedData.sort((a, b) => {
        return currentOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      });
      setSortOrder({ ...sortOrder, name: currentOrder === 'asc' ? 'desc' : 'asc' });
    } else if (type === 'ltp') {
      sortedData.sort((a, b) => {
        return currentOrder === 'asc' ? a.ltp - b.ltp : b.ltp - a.ltp;
      });
      setSortOrder({ ...sortOrder, ltp: currentOrder === 'asc' ? 'desc' : 'asc' });
    }

    setData(sortedData);
    setDropdownOpen(false); // Close dropdown after sorting
  };

  return (
    <div className="h-screen overflow-auto bg-white shadow-lg"> {/* Ensure full height and vertical scroll */}
      <div className="p-4 flex sticky top-0 bg-white justify-between items-center">
        <h3 className="font-bold">Today's Market</h3>
        <div className="relative">
          <div 
            onClick={() => setDropdownOpen((prev) => !prev)} 
            className="cursor-pointer"
          >
            <ArrowDownUp className="text-gray-600 size-4" />
          </div>
          {dropdownOpen && (
            <div className="absolute flex flex-col right-0 bg-white shadow-lg rounded-lg mt-2 w-40 transition-all duration-200">
              <div 
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => sortData('name')}
              >
                Sort by Name
              </div>
              <div 
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => sortData('ltp')}
              >
                Sort by LTP
              </div>
            </div>
          )}
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((asset) => (
            <li key={asset.id} className="flex justify-between items-center p-2 hover:bg-gray-200 rounded">
              <div>
                <p className="text-sm">{asset.name}</p>
                <p className="text-xs text-gray-500">{asset.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{asset.ltp}</p>
                <p className={`text-sm ${asset.overallPercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {asset.overallPercent.toFixed(2)}%
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SideBar;