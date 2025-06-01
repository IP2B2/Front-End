
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { useEffect } from "react";
import Link from "next/link";

export default function ProductCard({ id, name, availableTomorrow, faculty, image }) {
  const showNameOutside = !availableTomorrow && name === "Prelungitor 20M cu maner";
 // TODO: make this readable
  const cardClass = availableTomorrow ? styles["product-card"] + " " + styles["large"] : styles["product-card"] + " " + styles["small"];
  const wrapperClass = availableTomorrow ? styles["product-card-wrapper"] + " " + styles["large"] : styles["product-card-wrapper"] + " " + styles["small"];

  useEffect(() => {
    console.log({ id, name, availableTomorrow, faculty, image });
  }, [id, name, availableTomorrow, faculty, image]);

  console.log("image:", image);
  return (
    <div className={styles["product-card-wrapper"]}>
      <div className={styles["product-card"]}>
        <div className={styles["product-image-container"]}>
          <div className={styles["product-image-wrapper"]}>
            <Image
              src={image}
              alt={name}
              fill
              className={styles["product-image"]}
              draggable="false"
            />
            <div className={styles["faculty-label-wrapper"]}>
              {faculty ? <p className={styles["faculty-label"]}>{faculty}</p> : ''}
            </div>
          </div>
        </div>


          <>
            <h3 className={styles["product-name"]}>{name}</h3>
            <p className={styles["product-subtext"]}>
              Disponibil: <span>{availableTomorrow ? "imediat" : "nu este disponibil"}</span>
            </p>
            <Link href={"/acasa/echipamente/echipament/" + id} className={styles["details-button"]}>
              Vezi detalii
            </Link>
          </>
      </div>
    </div>
  );
}
