import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    name: "Gaming Laptop",
    price: "R15 999",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    name: "iPhone",
    price: "R18 999",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    name: "Sony Headphones",
    price: "R2 499",
  },
];

function Products() {
  return (
    <section className="products">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default Products;