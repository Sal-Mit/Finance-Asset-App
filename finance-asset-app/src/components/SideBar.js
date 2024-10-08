import React, { useState, useEffect } from 'react';
import { ArrowDownUp} from 'lucide-react';
import { data as assetData } from '../assets/data'; 


const SideBar = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [sortOrder, setSortOrder] = useState({ name: 'asc', ltp: 'asc' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleDataClick = (data) => {
    setSelectedData(data);
  };

  const sortData = (type) => {
    const sortedData = [...data].sort((a, b) => {
      if (type === 'name') {
        return sortOrder.name === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (type === 'ltp') {
        return sortOrder.ltp === 'asc' ? a.ltp - b.ltp : b.ltp - a.ltp;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrder((prev) => ({
      ...prev,
      [type]: prev[type] === 'asc' ? 'desc' : 'asc',
    }));
    setDropdownOpen(false);
  };

  return (
    <div className="w-1/5 bg-white shadow-lg h-screen fixed">
        <div className="flex justify-between items-center h-16 p-4 bg-slate-100  shadow">
          <h3>Today's Market</h3>
          <div className="relative">
            <div 
              onClick={() => setDropdownOpen((prev) => !prev)} 
              className="cursor-pointer"
            >
              <ArrowDownUp className="text-gray-600 size-4" />
            </div>
            {dropdownOpen && (
              <div className="absolute flex flex-col right-0 bg-white shadow-lg rounded-lg mt-2 w-40 transition-all duration-200 transform scale-95 opacity-100">
                <div 
                  className="px-4 py-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer rounded-lg"
                  onClick={() => sortData('name')}
                >
                  Sort by Name
                </div>
                <div 
                  className="px-4 py-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer rounded-lg"
                  onClick={() => sortData('ltp')}
                >
                  Sort by LTP
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="realtive flex flex-col h-screen overflow-y-auto divide-slate-300 shadow p-2">
          <ul role="list" className="divide-y divide-slate-200">
            {loading ? (
              <div>Loading...</div> 
            ) : (
              data.map((asset) => (
                <li
                  key={asset.id}
                  onClick={() => handleDataClick(asset)}
                  className="m-2 flex justify-between items-center hover:bg-gray-200 p-2 rounded transition"
                >
                  <div>
                    <p className="text-sm ">{asset.name}</p>
                    <p className="text-sm text-gray-500">{asset.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm ">{asset.ltp}</p>
                    <p className={`text-sm ${asset.overallPercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {asset.overallPercent.toFixed(2)}%
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
    </div>
  );
};

export default SideBar;
