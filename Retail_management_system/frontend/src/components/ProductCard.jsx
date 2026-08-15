function ProductCard({ image, name, price }) {
  return (
    <div className="product-card">
      <img
        src={image}
        alt={name}
        className="product-image"
      />

      <h3>{name}</h3>

      <p>{price}</p>

      <button>Buy Now</button>
    </div>
  );
}

export default ProductCard;