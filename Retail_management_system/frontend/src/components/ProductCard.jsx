function ProductCard({ image, name, price }) {
    return (
        <div className="product-card">

            <div className="product-image-container">
                <img
                    src={image}
                    alt={name}
                    className="product-image"
                />
            </div>

            <div className="product-card-content">

                <h3>{name}</h3>

                <p className="product-price">
                    R{Number(price).toLocaleString("en-ZA")}
                </p>

                <button className="product-button">
                    View Product
                </button>

            </div>

        </div>
    );
}

export default ProductCard;