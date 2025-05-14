
import Image from "next/image";
import "./ProductCard.css";

export default function ProductCard({ id, name, availableTomorrow, faculty, image }) {
  const showNameOutside = !availableTomorrow && name === "Prelungitor 20M cu maner";

  const cardClass = availableTomorrow ? "product-card large" : "product-card small";
  const wrapperClass = availableTomorrow ? "product-card-wrapper large" : "product-card-wrapper small";

  return (
    <div className={wrapperClass}>
      <div className={cardClass}>
        <div className="product-image-wrapper">
          <Image
            src={image}
            alt={name}
            width={availableTomorrow ? 255 : 220}
            height={availableTomorrow ? 150 : 120}
            className="product-image"
          />
        </div>
        <p className="faculty-label">{faculty}</p>

        {!availableTomorrow && (
          <p className="product-name-outside">{name}</p>
        )}

        {availableTomorrow && (
          <>
            <h3 className="product-name">{name}</h3>
            <p className="product-subtext">
              Disponibil: <span>imediat</span>
            </p>
            <a
              href="https://www.google.com"
              className="details-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vezi detalii
            </a>
          </>
        )}
      </div>
    </div>
  );
}
