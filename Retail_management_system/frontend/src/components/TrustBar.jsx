function TrustBar() {
    const benefits = [
        {
            icon: "🚚",
            title: "Fast Delivery",
            text: "Quick & reliable shipping"
        },
        {
            icon: "🔒",
            title: "Secure Shopping",
            text: "Your data is protected"
        },
        {
            icon: "↩️",
            title: "Easy Returns",
            text: "Simple return process"
        },
        {
            icon: "💬",
            title: "Customer Support",
            text: "We're here to help"
        }
    ];

    return (
        <section className="trust-bar">

            <div className="trust-container">

                {benefits.map((benefit) => (

                    <div
                        className="trust-item"
                        key={benefit.title}
                    >

                        <span>
                            {benefit.icon}
                        </span>

                        <div>

                            <strong>
                                {benefit.title}
                            </strong>

                            <small>
                                {benefit.text}
                            </small>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default TrustBar;