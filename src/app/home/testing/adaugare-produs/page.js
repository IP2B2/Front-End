"use client";

import { useState } from "react";
import ProductAddedSucc from "@/lib/components/popups/ProductAddedSucc";
import styles from "./page.module.css";

export default function Page() {
  const [showProdAdSuc, setShowProdAdSuc] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <button className={styles.prodAdSucButton} onClick={() => setShowProdAdSuc(true)}>
        Produs adăugat cu succes
      </button>

      <ProductAddedSucc open={showProdAdSuc} onClose={() => setShowProdAdSuc(false)} />
    </div>
  );
}
