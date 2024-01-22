// SearchComponent.tsx

import React, { useState, ChangeEvent } from 'react';
import styles from './Search.module.css';
import Input from '@/components/ui/Input/Input';
// import SearchIcon from '@mui/icons-material/Search';
interface SearchComponentProps {
  data: any; // Replace with your actual data type
  onSearch: (filteredData:any) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter data based on the search term
    const filteredData =Array.isArray(data)? data.filter(
      item =>
      (item.firstName && item.firstName.toLowerCase().includes(term.toLowerCase())) ||
      (item.lastName && item.lastName.toLowerCase().includes(term.toLowerCase()))||
      ((item.firstName &&item.lastName) && (item.firstName+" "+item.lastName).toLowerCase().includes(term.toLowerCase()))
      ):"no users";

    // Pass the filtered data to the parent component
    onSearch(filteredData);
  };

  return (
    <div className={styles.searchContainer}>
      {/* <label htmlFor="search" className={styles.label}><SearchIcon/></label> */}
      <Input
        type='text'
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Type to search"
      />
    </div>
  );
};

export default SearchComponent;
