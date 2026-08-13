import { Link } from "react-router-dom";

function CategoryCard({
    number,
    icon,
    title,
    description,
    className
}) {
    return (
        <Link
            to={`/products?category=${encodeURIComponent(title)}`}
            className={`category-card ${className}`}
        >

            <div className="category-icon">
                {icon}
            </div>

            <div>

                <span>
                    {number}
                </span>

                <h3>
                    {title}
                </h3>

                <p>
                    {description}
                </p>

            </div>

            <div className="category-arrow">
                →
            </div>

        </Link>
    );
}

export default CategoryCard;