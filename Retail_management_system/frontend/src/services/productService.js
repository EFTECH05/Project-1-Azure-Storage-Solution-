// =====================================================
// PRODUCT API SERVICE
// =====================================================

// Azure ASP.NET Core API
const API_URL =
    "https://retailmanagementsystem20260813213958-geeffwavcrbrfjhc.southafricanorth-01.azurewebsites.net/Products/api";


// =====================================================
// GET ALL PRODUCTS
// =====================================================

export async function getProducts() {

    console.log("======================================");
    console.log("GET PRODUCTS");
    console.log("======================================");

    console.log("Frontend URL:", window.location.origin);
    console.log("Calling Azure API:", API_URL);

    try {

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        console.log("API Status:", response.status);
        console.log("API Status Text:", response.statusText);

        if (!response.ok) {

            throw new Error(
                `API returned HTTP ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        console.log("Products received:", data);

        if (!Array.isArray(data)) {

            console.error(
                "API did not return an array:",
                data
            );

            throw new Error(
                "The API returned an invalid product list."
            );
        }

        console.log(
            `Successfully loaded ${data.length} products.`
        );

        return data;

    }
    catch (error) {

        console.error("======================================");
        console.error("GET PRODUCTS ERROR");
        console.error("======================================");

        console.error("API:", API_URL);
        console.error("Frontend:", window.location.origin);
        console.error("Error:", error);
        console.error("Message:", error?.message);

        throw error;
    }
}


// =====================================================
// GET SINGLE PRODUCT
// =====================================================

export async function getProduct(id) {

    const url = `${API_URL}/${id}`;

    console.log("======================================");
    console.log("GET SINGLE PRODUCT");
    console.log("======================================");

    console.log("Calling:", url);

    try {

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        console.log(
            "Product API status:",
            response.status
        );

        if (response.status === 404) {

            throw new Error(
                "Product not found."
            );
        }

        if (!response.ok) {

            throw new Error(
                `API returned HTTP ${response.status} ${response.statusText}`
            );
        }

        const product = await response.json();

        console.log(
            "Product received:",
            product
        );

        return product;

    }
    catch (error) {

        console.error(
            "GET PRODUCT ERROR:",
            error
        );

        throw error;
    }
}