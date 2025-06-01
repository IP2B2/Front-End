"use client";

import { createContext, useState, useEffect, useContext } from "react";
import Image from "next/image";



import styles from "./SearchAndFilter.module.css";
import "@/app/globals.css";

export const SearchAndFilterContext = createContext({});

export const SearchAndFilter = ({ ItemComponent, title, collectionObject, HeaderComponent}) => {
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
			<div className={styles.searchAndFilterContainer}>
				<FiltersColumn />
				<div className={styles.queryAndDataColumn}>
					<div className={styles.searchHeader}>
						<div className={styles.componentTitle}>{title}</div>
						<SearchBar />
					</div>
					<div className={styles.dataContainer}>
						{HeaderComponent && <HeaderComponent key={-1} />}
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
						}).map((item,index) => (
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
	const { filters, selectedFilters } = useContext(
		SearchAndFilterContext
	);

	/* useEffect(() => {
		console.log("Selected filters changed up: ", selectedFilters);
	}, [selectedFilters]);
 */
	return (
		<div className={styles.filtersColumn}>
			<div className={styles.filterSection} key={-1}>
				<div>Filtre</div>
			</div>
			{Object.keys(filters).map((filterKey) => (
				<FilterItem key={filterKey} filterKey={filterKey} />
			))}
		</div>
	);
};

const FilterItem = ({ filterKey }) => {
	const [open, setOpen] = useState(false);

	const { filters, selectedFilters } = useContext(
		SearchAndFilterContext
	);

	/* useEffect(() => {
		console.log("Selected filters changed: ", selectedFilters);
	}, [open]); */
	return (
		<div className={styles.filterSection} key={filterKey}>
			<div
				className={styles.filterTitleBox}
				onClick={() => setOpen(!open)}
			>
				<div>{filters[filterKey].name}</div>
				<span
					className={`${styles.dropdownArrow} ${
						open ? styles.rotated : ""
					}`}
				>
					⌄
				</span>
			</div>
			{open && (
				<div className={styles.filterOptions}>
					{filters[filterKey].options.map((option, index) => (
						<FilterOptionItem
							key={index}
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
		<label key={option} className={styles.filterOption}>
			<input
				type="checkbox"
				checked={selected || false}
				onChange={handleChange}
			/>
			{typeof option === "boolean" ? option ? "Da" : "Nu" : option}
		</label>
	);
};

const SearchBar = () => {
	const { searchQuery, setSearchQuery } = useContext(SearchAndFilterContext);

	const [query, setQuery] = useState(searchQuery);

	useEffect(() => {
		const handler = setTimeout(() => {
			setSearchQuery(query);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [query]);

	const handleSearch = (e) => {
		e.preventDefault();
	};



	return (
		<form className={styles.searchBar} onSubmit={handleSearch}>
			<input
				type="text"
				placeholder="Cautare"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className={styles.input}
			/>
			<button type="submit" className={styles.iconButton}>
				<Image
					src="/icons/SearchIcon.png"
					alt="Caută"
					width={18}
					height={18}
					className={styles.iconImage}
				/>
			</button>
		</form>
	);
};
export default SearchAndFilter;
