function Newsletter() {
    return (
        <section className="newsletter">

            <div className="newsletter-container">

                <div>

                    <span className="eyebrow">
                        STAY IN THE LOOP
                    </span>

                    <h2>
                        Get the latest from us.
                    </h2>

                    <p>
                        New products, special offers and
                        exclusive deals delivered to your inbox.
                    </p>

                </div>

                <form className="newsletter-form">

                    <input
                        type="email"
                        placeholder="Enter your email address"
                    />

                    <button type="submit">
                        Subscribe
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Newsletter;