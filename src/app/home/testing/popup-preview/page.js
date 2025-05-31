"use client";

import { useState } from "react";
import ProductAddedSucc from "@/lib/components/popups/ProductAddedSucc";
import ProdustModifiedSucc from "@/lib/components/popups/ProductModifiedSucc";
import ResponseRegisteredSucc from "@/lib/components/popups/ResponseRegisteredSucc";
import DataModifiedSucc from "@/lib/components/popups/DataModifiedSucc";
import styles from "./page.module.css";

export default function Page() {
  const [showProdAdSuc, setShowProdAdSuc] = useState(false);
  const [showProdModSuc, setShowProdModSuc] = useState(false);
  const [showRespRegSuc, setShowRespRegSuc] = useState(false);
  const [showDataModSuc, setShowDataModSuc] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <button className={styles.prodAdSucButton} onClick={() => setShowProdAdSuc(true)}>
        Echipament adăugat cu succes
      </button>

      <button className={styles.prodAdSucButton} onClick={() => setShowProdModSuc(true)}>
        Echipament modificat cu succes
      </button>

      <button className={styles.prodAdSucButton} onClick={() => setShowRespRegSuc(true)}>
        Răspuns înregistrat cu succes
      </button>

      <button className={styles.prodAdSucButton} onClick={() => setShowDataModSuc(true)}>
        Date utilizator modificate cu succes
      </button>

      <ProductAddedSucc open={showProdAdSuc} onClose={() => setShowProdAdSuc(false)} />
      <ProdustModifiedSucc open={showProdModSuc} onClose={() => setShowProdModSuc(false)} />
      <ResponseRegisteredSucc open={showRespRegSuc} onClose={() => setShowRespRegSuc(false)} />
      <DataModifiedSucc open={showDataModSuc} onClose={() => setShowDataModSuc(false)} />
    </div>
  );
}
