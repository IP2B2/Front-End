"use client";

import SearchAndFilter from "@/lib/components/home/echipamente/SearchAndFilter";

const testCollectionObject = { 
    items: [{
        name: "Ech2ipament 1 rosu",
        type: "Laptop",
        status: "Available",
        location: "Laborator 1"
    }, {
        name: "Echip323ament 2 verde",
        type: "Laptop2",
        status: "In use",
        location: "Laborator 2"
    }, {
        name: "Echipa123ment 3 albastru",
        type: "Printer",
        status: "Available",
        location: "Laborator 2"
    }],
    filterBy: {
        type: "Tip",
        location: "Locatie localizare",
    }
}
const testCollectionObject2 = {
    items: [
        {
            name: "Echipament 1 rosu",
            type: "Laptop",
            status: "Available",
            location: "Laborator 1"
        }, {
            name: "Echipament 2 verde",
            type: "Laptop2",
            status: "In use",
            location: "Laborator 2"
        }, {
            name: "Echipament 3 albastru",
            type: "Printer",
            status: "Available",
            location: "Laborator 233"
        }
    ],
    filterBy: {
        type: "Tip",
        location: "Locatie localizare",
    }
}

export default function SearchAndFilterPage() {
    return (
        <div>
            <SearchAndFilter 
                title={"Testing Search and Filter"}
                ItemComponent={CustomEchipamentComponent}
                collectionObject={testCollectionObject2}
            />
        </div>
    );
}


const CustomEchipamentComponent = ({
    name,
    type,
    status,
    location
}) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>Type: {type}</p>
            <p>Status: {status}</p>
            <p>Location: {location}</p>
        </div>
    );
}