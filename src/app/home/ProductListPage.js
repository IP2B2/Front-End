"use client";

import React, { useState, useEffect } from "react";
import "./ProductListPage.css";
import ProductCard from "./ProductCard";

const mockProducts = [
  {
    id: 1,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Info economică",
    availableTomorrow: true, 
    type: "Simplu",
    image: "/icons/prelungitor.jpg",
  },
  {
    id: 2,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Facultate 2",
    availableTomorrow: false, 
    type: "Simplu",
    image: "/icons/prelungitor.jpg",
  },
  {
    id: 3,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Informatică",
    availableTomorrow: true, 
    type: "Complex",
    image: "/icons/prelungitor.jpg",
  },
  {
    id: 4,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Matematică-Informatică",
    availableTomorrow: false, 
    type: "Complex",
    image: "/icons/prelungitor.jpg",
  },
  {
    id: 5,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Info economică",
    availableTomorrow: true,  
    type: "Simplu",
    image: "/icons/prelungitor.jpg",
  },
  {
    id: 6,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Informatică",
    availableTomorrow: false,  
    type: "Simplu",
    image: "/icons/prelungitor.jpg",
  },
  {
    id: 7,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Facultate 2",
    availableTomorrow: true,
    type: "Simplu",
    image: "/icons/prelungitor.jpg",
  },
  {
    id: 8,
    name: "Prelungitor 20M cu maner",
    faculty: "FEAA",
    subfaculty: "Matematică-Informatică",
    availableTomorrow: false,  
    type: "Simplu",
    image: "/icons/prelungitor.jpg",
  },
];

const facultyOptions = {
  FEAA: ["Toate", "Info economică", "Facultate 2"],
  FII: ["Toate", "Informatică", "Matematică-Informatică"]
};

function ProductListPage() {
  const [showTypeFilter, setShowTypeFilter] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState({ FEAA: [], FII: [] });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [openFaculty, setOpenFaculty] = useState("FEAA");
  const [availabilityFilter, setAvailabilityFilter] = useState({ Disponibil: false, Indisponibil: false });
  const [showAvailability, setShowAvailability] = useState(false);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const toggleSubfaculty = (faculty, sub) => {
    const allSubs = facultyOptions[faculty].filter((s) => s !== "Toate");
    setSelectedFaculties((prev) => {
      const current = prev[faculty] || [];
      if (sub === "Toate") {
        const allSelected = current.length === allSubs.length;
        return { ...prev, [faculty]: allSelected ? [] : [...allSubs] };
      } else {
        const updated = current.includes(sub)
          ? current.filter((s) => s !== sub)
          : [...current, sub];
        return { ...prev, [faculty]: updated };
      }
    });
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAvailability = (type) => {
    setAvailabilityFilter((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const filteredProducts = products.filter((product) => {
  const facultySubs = selectedFaculties[product.faculty] || [];
  const isSimpleLocation = !facultyOptions[product.faculty] || facultyOptions[product.faculty].length === 0;
  const matchesFaculty = isSimpleLocation || facultySubs.includes(product.subfaculty);
  const availabilityOk =
    (!availabilityFilter.Disponibil && !availabilityFilter.Indisponibil) ||
    (availabilityFilter.Disponibil && product.availableTomorrow) ||
    (availabilityFilter.Indisponibil && !product.availableTomorrow);
  const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
  return matchesFaculty && availabilityOk && matchesType;
});


  return (
    <div className="pageWrapper">
      <div className="layoutContainer">
        <div className="filtersColumn">
          <div className="filterSection">
            <div className="filterTitleWithLine">
              <div className="titleLine" />
              <h3 className="filterTitle">Locație</h3>
            </div>
            {Object.keys(facultyOptions).map((faculty) => (
              <div className="accordionSection" key={faculty}>
                {facultyOptions[faculty].length > 0 ? (
                  <>
                    <div
                      className="accordionHeader"
                      onClick={() => setOpenFaculty(prev => (prev === faculty ? null : faculty))}
                    >
                      {faculty}
                      <span className={`dropdownArrow ${openFaculty === faculty ? "rotated" : ""}`}>⌄</span>
                    </div>
                    {openFaculty === faculty && (
                      <div className="checkboxContainer">
                        {facultyOptions[faculty].map((sub) => (
                          <label key={sub}>
                            <input
                              type="checkbox"
                              checked={sub === "Toate"
                                ? selectedFaculties[faculty]?.length ===
                                  facultyOptions[faculty].filter((s) => s !== "Toate").length
                                : selectedFaculties[faculty]?.includes(sub)}
                              onChange={() => toggleSubfaculty(faculty, sub)}
                            />
                            {sub}
                          </label>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="accordionHeader disabled">
                    {faculty}
                    <span className="dropdownArrow">⌄</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="filterSection">
            <div className="filterTitleWithLine">
              <div className="titleLine" />
              <h3 className="filterTitle">Disponibilitate</h3>
              <button className="facultyDropdownIcon" onClick={() => setShowAvailability(prev => !prev)}>
                <span className={`dropdownArrow ${showAvailability ? "rotated" : ""}`}>⌄</span>
              </button>
            </div>
            {showAvailability && (
              <div className="checkboxContainer">
                {["Disponibil", "Indisponibil"].map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={availabilityFilter[type]}
                      onChange={() => toggleAvailability(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filterSection">
            <div className="filterTitleWithLine">
              <div className="titleLine" />
              <h3 className="filterTitle">Tip obiect</h3>
              <button className="facultyDropdownIcon" onClick={() => setShowTypeFilter(prev => !prev)}>
                <span className={`dropdownArrow ${showTypeFilter ? "rotated" : ""}`}>⌄</span>
              </button>
            </div>
            {showTypeFilter && (
              <div className="checkboxContainer">
                {["Simplu", "Complex"].map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="contentColumn">
          <h1 className="echipamenteTitle">Echipamente</h1>
         <div className="productGrid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p className="no-products">Nu există produse care corespund filtrelor selectate.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
