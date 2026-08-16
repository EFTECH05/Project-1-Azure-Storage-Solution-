// =====================================================
// PRODUCT API SERVICE
// =====================================================

const API_URL = "http://localhost:5277/Products/api";


// =====================================================
// GET ALL PRODUCTS
// =====================================================

export async function getProducts() {

    console.log("Calling API:", API_URL);

    try {

        const response = await fetch(API_URL);

        console.log("Response status:", response.status);
        console.log("Response OK:", response.ok);

        if (!response.ok) {
            throw new Error(
                `API returned status ${response.status}`
            );
        }

        const data = await response.json();

        console.log("Products received:", data);

        return data;

    } catch (error) {

        console.error("FETCH ERROR:", error);

        throw error;
    }
}


// =====================================================
// GET SINGLE PRODUCT
// =====================================================

export async function getProduct(id) {

    try {

        const response = await fetch(
            `${API_URL}/${id}`
        );

        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("Product not found.");
            }

            throw new Error(
                `API returned status ${response.status}`
            );
        }

        const product = await response.json();

        console.log("Product received:", product);

        return product;

    } catch (error) {

        console.error("FETCH PRODUCT ERROR:", error);

        throw error;
    }
}