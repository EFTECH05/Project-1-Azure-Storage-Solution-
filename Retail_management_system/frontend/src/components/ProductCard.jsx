function ProductCard({
    image,
    name,
    description,
    price,
    category,
    stockQuantity
}) {

    return (

        <div className="product-card">

            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}

            <div className="product-image-container">

                {image ? (

                    <img
                        src={image}
                        alt={name}
                        className="product-image"

                        onLoad={() => {

                            console.log(
                                "Image loaded:",
                                name
                            );

                        }}

                        onError={(event) => {

                            console.error(
                                "Image failed to load:",
                                image
                            );

                            event.currentTarget.style.display =
                                "none";

                        }}
                    />

                ) : (

                    <div className="no-product-image">

                        No Image

                    </div>

                )}

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="product-card-content">

                {/* CATEGORY */}

                <span className="product-category">

                    {category}

                </span>


                {/* NAME */}

                <h3>

                    {name}

                </h3>


                {/* DESCRIPTION */}

                <p className="product-description">

                    {description}

                </p>


                {/* PRICE */}

                <p className="product-price">

                    R
                    {Number(price).toLocaleString(
                        "en-ZA",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    )}

                </p>


                {/* STOCK */}

                <p className="product-stock">

                    {stockQuantity > 0
                        ? `${stockQuantity} available`
                        : "Out of stock"}

                </p>


                {/* BUTTON */}

                <button
                    className="product-button"
                    disabled={stockQuantity <= 0}
                >

                    {stockQuantity > 0
                        ? "View Product"
                        : "Out of Stock"}

                </button>

            </div>

        </div>
    );
}

export default ProductCard;