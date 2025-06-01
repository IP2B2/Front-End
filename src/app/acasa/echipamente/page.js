'use client';

import React, { useEffect, useState } from "react";

import axios from "axios";

import SearchAndFilter from "@/lib/components/home/echipamente/SearchAndFilter";
import ProductCard from '@/lib/components/home/echipamente/ProductCard';
import styles from "./echipamentePage.module.css";
import { getEquipments } from "@/lib/actions/equipmentActions";

export default function Echipamente() {
	const [data, setData] = useState({
		filterBy: {
			location: "Facultate",
			availableTomorrow: "Disponibil maine",
		},
		items: [],
	});

    useEffect(() => {
		const fetchData = async () => {
			const response = await getEquipments();
			if(!response.success) {
				console.error("Failed to fetch equipments:", response);
				return;
			} 
			setData((prevData) => ({
				...prevData,
				items: response.payload.map((item) => ({
					id: item.id,
					name: item.name,
					availableTomorrow: item.availabilityStatus === "AVAILABLE",
					faculty: "N/A",
					image: item.photo && item.photo != "" ? JSON.parse(item.photo)[0] : "/icons/Frame 1000005448.svg", // Fallback image if none provided
				})),
			}));
		}
		fetchData();
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.pageWrapper}>
				<SearchAndFilter
					collectionObject={data}
					title={"Echipamente"}
					ItemComponent={ProductCard}
				/>
			</div>
		</div>
	);
}
