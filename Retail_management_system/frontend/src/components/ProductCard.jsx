
function ProductCard({
    image,
    name,
    description,
    price,
    category,
    stockQuantity
}) {

    console.log(
        "ProductCard rendering:",
        name
    );


    return (

        <div className="product-card">

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="product-image-container">

                {image ? (

                    <img
                        src={image}
                        alt={name || "Product"}
                        className="product-image"

                        onLoad={() => {

                            console.log(
                                "IMAGE LOADED:",
                                name
                            );

                        }}

                        onError={(event) => {

                            console.error(
                                "IMAGE FAILED:",
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

                <span className="product-category">
                    {category}
                </span>


                <h3>
                    {name}
                </h3>


                <p className="product-description">
                    {description}
                </p>


                <p className="product-price">

                    R
                    {Number(price || 0).toLocaleString(
                        "en-ZA",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    )}

                </p>


                <p className="product-stock">

                    {Number(stockQuantity) > 0
                        ? `${ stockQuantity } available`
                        : "Out of stock"}

                </p>


                <button
                    className="product-button"
                    disabled={Number(stockQuantity) <= 0}
                >

                    {Number(stockQuantity) > 0
                        ? "View Product"
                        : "Out of Stock"}

                </button>

            </div>

        </div>

    );

}


export default ProductCard;

