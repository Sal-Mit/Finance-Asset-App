import { useState } from 'react';
import { holdingAssetData as data} from '../assets/holding_asset_data';

export function useFilter(initialData) {
    const [search, setSearch] = useState('');
    const [selectedSectors, setSelectedSectors] = useState(new Set());
    const [filter, setFilter] = useState('All');
    const [minPL, setMinPL] = useState('');
    const [maxPL, setMaxPL] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleSectorChange = (sector) => {
        const newSelectedSectors = new Set(selectedSectors);
        if (newSelectedSectors.has(sector)) {
            newSelectedSectors.delete(sector);
        } else {
            newSelectedSectors.add(sector);
        }
        setSelectedSectors(newSelectedSectors);
    };

    const filteredData = data.filter((item) => {
        const isInSelectedSectors = selectedSectors.size === 0 || selectedSectors.has(item.sector);
        const matchesSearch = search.toLowerCase() === ''
            ? true
            : item.name.toLowerCase().includes(search) || item.symbol.toLowerCase().includes(search);

        const isGainer = filter === 'Profit' && item.overallPercent > 0;
        const isLoser = filter === 'Loss' && item.overallPercent < 0;

        const inPLRange = (minPL === '' || item.overallPercent >= Number(minPL)) &&
                          (maxPL === '' || item.overallPercent <= Number(maxPL));

        return isInSelectedSectors && matchesSearch && 
               (filter === 'All' || isGainer || isLoser) && inPLRange;
    });

  return {
    search,
    setSearch,
    selectedSectors,
    setSelectedSectors,
    handleSectorChange,
    filter,
    setFilter,
    minPL,
    setMinPL,
    maxPL,
    setMaxPL,
    showFilters,
    setShowFilters,
    filteredData
  };
}
