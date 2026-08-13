function Checkout() {

    return (
        <section className="page">

            <span className="eyebrow">
                CHECKOUT
            </span>

            <h1>
                Complete your order
            </h1>

            <div className="checkout-container">

                <div className="checkout-form">

                    <h2>
                        Customer Information
                    </h2>

                    <input
                        type="text"
                        placeholder="Full Name"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                    />

                    <textarea
                        placeholder="Delivery Address"
                        rows="5"
                    ></textarea>

                    <button className="primary-button">
                        Place Order
                    </button>

                </div>

                <div className="checkout-summary">

                    <h2>
                        Order Summary
                    </h2>

                    <p>
                        Your cart items will appear here.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default Checkout;