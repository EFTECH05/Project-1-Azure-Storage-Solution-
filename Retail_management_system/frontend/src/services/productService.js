const API_URL = "https://localhost:7185/Products/api";


// =====================================================
// GET ALL PRODUCTS
// =====================================================

export async function getProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch products. Status: ${response.status}`
            );
        }

        const products = await response.json();

        return products;

    } catch (error) {

        console.error("Error fetching products:", error);

        throw error;
    }
}


// =====================================================
// GET SINGLE PRODUCT
// =====================================================

export async function getProduct(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("Product not found.");
            }

            throw new Error(
                `Failed to fetch product. Status: ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error("Error fetching product:", error);

        throw error;
    }
}