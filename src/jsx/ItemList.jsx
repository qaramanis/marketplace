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
    },
    {
      id: 7,
      title: "Apple Watch Series 9 45mm GPS",
      thumbnail: "/api/placeholder/200/200",
      price: 429.99,
      category: "Smartwatches"
    },
    {
      id: 8,
      title: "Samsung Galaxy Watch 6 Classic 47mm",
      thumbnail: "/api/placeholder/200/200",
      price: 369.99,
      category: "Smartwatches"
    },
    {
      id: 9,
      title: "LG 65-inch C3 OLED evo 4K TV",
      thumbnail: "/api/placeholder/200/200",
      price: 1799.99,
      category: "TVs"
    },
    {
      id: 10,
      title: "Samsung 75-inch Neo QLED 4K Smart TV",
      thumbnail: "/api/placeholder/200/200",
      price: 2499.99,
      category: "TVs"
    },
    {
      id: 11,
      title: "MacBook Pro 16-inch M3 Max",
      thumbnail: "/api/placeholder/200/200",
      price: 2499.99,
      category: "Laptops"
    },
    {
      id: 12,
      title: "Dell XPS 15 (2024) - i9, RTX 4070",
      thumbnail: "/api/placeholder/200/200",
      price: 2199.99,
      category: "Laptops"
    }
  ];

  const categories = ["Smartphones", "Smartwatches", "TVs", "Laptops", "Accessories"];
  
  const truncateTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
  };

  return (
    <div className="item-list">
      {categories.map(category => {
        const categoryProducts = products.filter(product => product.category === category);
        
        if (categoryProducts.length === 0) return null;

        return (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="items-grid">
              {categoryProducts.map((product) => (
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
      })}
    </div>
  );
};

export default ItemList;