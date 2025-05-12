import Image from "next/image";
import "./ProductCard.css";

export default function ProductCard({ id, name, availableTomorrow, faculty, image }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <Image
          src={image}
          alt={name}
          width={276}
          height={180}
          className="product-image"
        />
      </div>
      <p className="faculty-label">{faculty}</p>
      <h3 className="product-name">{name}</h3>
      {availableTomorrow && (
          <p className="product-subtext">
            Disponibil: <span>imediat</span>
          </p>
        )}
      {availableTomorrow && (
        <button className="details-button">
          Vezi detalii
        </button>
      )}
    </div>
  );
}
