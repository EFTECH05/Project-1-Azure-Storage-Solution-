const API_URL = "https://localhost:7000/api/products";

export async function getProducts() {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to load products.");
    }

    return await response.json();
}


export async function getProduct(id) {

    const response = await fetch(
        `${API_URL}/${id}`
    );

    if (!response.ok) {
        throw new Error("Product not found.");
    }

    return await response.json();
}