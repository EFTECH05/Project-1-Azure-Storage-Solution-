import { Link } from "react-router-dom";

function Cart() {

    return (
        <section className="page">

            <span className="eyebrow">
                SHOPPING CART
            </span>

            <h1>
                Your Cart
            </h1>

            <div className="empty-cart">

                <div>
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Start shopping and add products
                    to your cart.
                </p>

                <Link
                    to="/products"
                    className="primary-button"
                >
                    Start Shopping
                </Link>

            </div>

        </section>
    );
}

export default Cart;