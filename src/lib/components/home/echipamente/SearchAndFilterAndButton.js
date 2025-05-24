"use client";

import { createContext, useState, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "./SearchAndFilterAndButton.module.css";
import baseStyles from "./SearchAndFilter.module.css";
import "@/app/globals.css";

export const SearchAndFilterContext = createContext({});

export const SearchAndFilterAndButton = ({ 
  ItemComponent, 
  title, 
  collectionObject,
  buttonText = "Adăugare produs",
  onButtonClick 
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({});
    const [filters, setFilters] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(collectionObject.items);
        let filterOptions = {};
        collectionObject.items.forEach((item) => {
            Object.keys(collectionObject.filterBy).forEach((filter) => {
                if (!filterOptions[filter]) {
                    filterOptions[filter] = {
                        name: collectionObject.filterBy[filter],
                        options: [],
                    };
                }
                if (!filterOptions[filter].options.includes(item[filter])) {
                    filterOptions[filter].options.push(item[filter]);
                }
            });
        });

        setFilters(filterOptions);
    }, [collectionObject]);

    const handleButtonClick = () => {
        if (typeof onButtonClick === 'function') {
            onButtonClick();
        }
    };

    return (
        <SearchAndFilterContext.Provider
            value={{
                selectedFilters,
                setSelectedFilters,
                filters,
                setFilters,
                items,
                setItems,
                searchQuery,
                setSearchQuery,
            }}
        >
            <div className={baseStyles.searchAndFilterContainer}>
                <FiltersColumn />
                <div className={baseStyles.queryAndDataColumn}>
                    <div className={baseStyles.searchHeader}>
                        <div className={baseStyles.componentTitle}>{title}</div>
                        <div className={styles.headerControls}>
                            <SearchBar />
                            <button 
                                className={styles.addButton} 
                                onClick={handleButtonClick}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                    <div className={baseStyles.dataContainer}>
                        {items.filter((item) => {
                            return (
                                item.name
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) &&
                                Object.keys(selectedFilters).every((filterKey) => {
                                    if (!selectedFilters[filterKey].length) {
                                        return true;
                                    }
                                    return selectedFilters[filterKey].includes(
                                        item[filterKey]
                                    );
                                })
                            );
                        }).map((item, index) => (
                            <ItemComponent
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </SearchAndFilterContext.Provider>
    );
};

const FiltersColumn = () => {
    const { filters, selectedFilters } = useContext(SearchAndFilterContext);

    return (
        <div className={baseStyles.filtersColumn}>
            {Object.keys(filters).map((filterKey) => (
                <FilterItem key={filterKey} filterKey={filterKey} />
            ))}
        </div>
    );
};

const FilterItem = ({ filterKey }) => {
    const [open, setOpen] = useState(false);
    const { filters } = useContext(SearchAndFilterContext);

    return (
        <div className={baseStyles.filterSection} key={filterKey}>
            <div
                className={baseStyles.filterTitleBox}
                onClick={() => setOpen(!open)}
            >
                <div>{filters[filterKey].name}</div>
                <span
                    className={`${baseStyles.dropdownArrow} ${
                        open ? baseStyles.rotated : ""
                    }`}
                >
                    ⌄
                </span>
            </div>
            {open && (
                <div className={baseStyles.filterOptions}>
                    {filters[filterKey].options.map((option) => (
                        <FilterOptionItem
                            key={option}
                            option={option}
                            filterKey={filterKey}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const FilterOptionItem = ({ option, filterKey }) => {
    const { setSelectedFilters, selectedFilters } = useContext(
        SearchAndFilterContext
    );

    const selected =
        selectedFilters[filterKey] &&
        selectedFilters[filterKey].includes(option);

    const handleChange = (e) => {
        const checked = e.target.checked;
        setSelectedFilters((prev) => {
            const prevFilter = prev[filterKey] || [];
            let newFilter;
            if (checked) {
                newFilter = [...prevFilter, option];
            } else {
                newFilter = prevFilter.filter((o) => o !== option);
            }
            return {
                ...prev,
                [filterKey]: newFilter,
            };
        });
    };

    return (
        <label key={option} className={baseStyles.filterOption}>
            <input
                type="checkbox"
                checked={selected || false}
                onChange={handleChange}
            />
            {option}
        </label>
    );
};

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useContext(SearchAndFilterContext);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <form className={baseStyles.searchBar} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Caută un echipament"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={baseStyles.input}
            />
            <button type="submit" className={baseStyles.iconButton}>
                <Image
                    src="/icons/SearchIcon.png"
                    alt="Caută"
                    width={18}
                    height={18}
                    className={baseStyles.iconImage}
                />
            </button>
        </form>
    );
};

export default SearchAndFilterAndButton;