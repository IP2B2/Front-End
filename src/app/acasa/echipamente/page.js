'use client';

import React, { useState } from "react";

import SearchAndFilter from "@/lib/components/home/echipamente/SearchAndFilter";
import styles from "./echipamentePage.module.css";

export default function Echipamente() {
	const [data, setData] = useState({
		filterBy: {
			location: "Facultate",
			availableTomorrow: "Disponibil maine",
		},
		items: [],
	});

    


	return (
		<div className={styles.container}>
			<div className={styles.pageWrapper}>
				<SearchAndFilter
					collectionObject={data}
					title={"Echipamente"}
				/>
			</div>
		</div>
	);
}
