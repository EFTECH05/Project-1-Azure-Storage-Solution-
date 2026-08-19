// =====================================================
// PRODUCT API SERVICE
// =====================================================

const API_URL =
    "https://retailmanagementsystem20260813213958-geeffwavcrbrfjhc.southafricanorth-01.azurewebsites.net/Products/api";


// =====================================================
// GET ALL PRODUCTS
// =====================================================

export async function getProducts() {

    console.log(
        "Calling Azure API:",
        API_URL
    );

    try {

        const response =
            await fetch(API_URL);

        console.log(
            "Response status:",
            response.status
        );

        if (!response.ok) {

            throw new Error(
                `API returned status ${response.status}`
            );
        }

        const data =
            await response.json();

        console.log(
            "Products received:",
            data
        );

        return data;

    } catch (error) {

        console.error(
            "FETCH PRODUCTS ERROR:",
            error
        );

        throw new Error(
            "Unable to connect to the product server.",
            {
                cause: error
            }
        );
    }
}


// =====================================================
// GET SINGLE PRODUCT
// =====================================================

export async function getProduct(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );

        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    "Product not found."
                );
            }

            throw new Error(
                `API returned status ${response.status}`
            );
        }

        const product =
            await response.json();

        console.log(
            "Product received:",
            product
        );

        return product;

    } catch (error) {

        console.error(
            "FETCH PRODUCT ERROR:",
            error
        );

        throw new Error(
            "Unable to retrieve the product.",
            {
                cause: error
            }
        );
    }
}