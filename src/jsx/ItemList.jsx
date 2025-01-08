import '../css/ItemList.css';

const ItemList = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      title: "Samsung Galaxy S24 Ultra 512GB - Titanium Black (12GB RAM)",
      thumbnail: "/api/placeholder/200/200",
      price: 1299.99,
      category: "Smartphones"
    },
    {
      id: 2,
      title: "iPhone 15 Pro Max 256GB - Natural Titanium",
      thumbnail: "/api/placeholder/200/200",
      price: 1199.99,
      category: "Smartphones"
    },
    {
      id: 3,
      title: "Google Pixel 8 Pro 256GB - Obsidian",
      thumbnail: "/api/placeholder/200/200",
      price: 999.99,
      category: "Smartphones"
    },
    {
      id: 4,
      title: "Samsung Galaxy S24+ 256GB - Cobalt Violet",
      thumbnail: "/api/placeholder/200/200",
      price: 999.99,
      category: "Smartphones"
    },
    {
      id: 5,
      title: "Original Samsung 45W Super Fast Charging Adapter USB-C",
      thumbnail: "/api/placeholder/200/200",
      price: 39.99,
      category: "Accessories"
    },
    {
      id: 6,
      title: "Spigen Ultra Hybrid Zero One Case for iPhone 15 Pro Max with MagSafe",
      thumbnail: "/api/placeholder/200/200",
      price: 24.99,
      category: "Accessories"
    }
  ];

  const truncateTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
  };

  return (
    <div className="item-list">
      <div className="items-grid">
        {products.map((product) => (
          <div key={product.id} className="item-card">
            <div className="item-thumbnail">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="item-info">
              <h3 title={product.title}>{truncateTitle(product.title)}</h3>
              <p className="item-price">
                <span className="price-from">from </span>
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;