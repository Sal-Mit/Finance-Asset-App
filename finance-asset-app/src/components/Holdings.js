import React, { useState } from 'react';
import { holdingAssetData as data} from '../assets/holding_asset_data';
import '../index.css';
import { useFilter } from '../hooks/useFilter';

const sectors = ['Technology', 'Finance', 'Healthcare', 'Consumer Services', 'Miscellaneous'];

export default function Holdings() {
    const {
        search, setSearch, selectedSectors, handleSectorChange, setShowFilters, showFilters,
        filter, setFilter, minPL, setMinPL, maxPL, setMaxPL, filteredData
      } = useFilter(data);

    return (
            <div className="flex-1 p-4 bg-gray-50"> 
                <div className="flex-1 flex flex-col bg-white shadow">
                <div className="px-4 py-6 sm:px-6 lg:px-8 h-full">
                    {/* Search and Filters */}
                    <div className="flex justify-between items-center mb-4">
                        <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-md">
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by symbol or name"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                aria-label="Search by symbol or name"
                            />
                            <button
                                type="submit"
                                className="absolute left-2 top-2 bottom-2 text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a6 6 0 100 12 6 6 0 000-12zM3.293 3.293a8 8 0 1111.414 11.414 8 8 0 01-11.414-11.414z" clipRule="evenodd" />
                                    <path d="M13.293 13.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </form>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="ml-4 text-indigo-600 hover:underline"
                        >
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filters section */}
                    {showFilters && (
                        <div className="mb-4 border p-4 rounded-lg shadow">
                           <div className="mb-4">
                                <h4 className="font-semibold">P&L Filter:</h4>
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        value="All"
                                        checked={filter === 'All'}
                                        onChange={() => setFilter('All')}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">All</span>
                                </label>
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        value="Profit"
                                        checked={filter === 'Profit'}
                                        onChange={() => setFilter('Profit')}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Profit</span>
                                </label>
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        value="Loss"
                                        checked={filter === 'Loss'}
                                        onChange={() => setFilter('Loss')}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">Loss</span>
                                </label>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold">Overall P&L % Range:</h4>
                                <div className="flex space-x-2">
                                    <input
                                        type="number"
                                        value={minPL}
                                        onChange={(e) => setMinPL(e.target.value)}
                                        placeholder="Min"
                                        className="border rounded-lg py-1 px-2"
                                    />
                                    <input
                                        type="number"
                                        value={maxPL}
                                        onChange={(e) => setMaxPL(e.target.value)}
                                        placeholder="Max"
                                        className="border rounded-lg py-1 px-2"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold">Sector:</h4>
                                <div className="max-h-32 overflow-y-auto">
                                    {sectors.map((sector) => (
                                        <label key={sector} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={selectedSectors.has(sector)}
                                                onChange={() => handleSectorChange(sector)}
                                            />
                                            <span className="ml-2">{sector}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Your Assets Table */}
                    <div className="overflow-auto flex-grow h-3/4">
                    <h3 className="bold text-md py-4">Your Assets</h3>
                    <div className="overflow-auto h-3/4">
                        <table className="min-w-full text-left table-auto border-collapse border border-gray-300">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300">Symbol</th>
                                    <th className="px-4 py-2 border border-gray-300">LTP</th>
                                    <th className="px-4 py-2 border border-gray-300">Current Value</th>
                                    <th className="px-4 py-2 border border-gray-300">Overall P&L</th>
                                    <th className="px-4 py-2 border border-gray-300">Overall P&L%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                                        <td className="px-4 py-2 border border-gray-300">{item.symbol}</td>
                                        <td className="px-4 py-2 border border-gray-300">{item.ltp}</td>
                                        <td className="px-4 py-2 border border-gray-300">{item.currentValue}</td>
                                        <td className={`px-4 py-2 border border-gray-300 ${item.overallPercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {item["overallp&l"]}
                                        </td>
                                        <td className={`px-4 py-2 border border-gray-300 ${item.overallPercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {item.overallPercent.toFixed(2)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                </div>
            </div> 
    );
}
