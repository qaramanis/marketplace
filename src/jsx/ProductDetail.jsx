// components/ProductDetail.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState('Gray Camouflage');
  
  const product = {
    name: "Sony PlayStation 5 Pulse 3D Wireless Over Ear Gaming Headset",
    sku: "38892073",
    rating: 4.5,
    reviews: 245,
    price: 98.99,
    colors: [
      { name: 'Black', code: '#000000', price: 97.80 },
      { name: 'White', code: '#FFFFFF', price: 134.75 },
      { name: 'Gray Camouflage', code: '#808080', price: 98.99 }
    ],
    features: [
      '2x Built-in microphones',
      'Noise-canceling technology',
      '3D sound',
      'USB Type-C charging'
    ],
    stock: 3,
    installmentPrice: 25.75,
    installments: 4
  };

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
  };

  return (
    <div className="product-detail">
      <div className="product-container">
        <div className="breadcrumb">
          <a href="/">← Accessories</a>
        </div>

        <div className="product-layout">
          <div className="product-image">
            <img src="/api/placeholder/500/500" alt={product.name} />
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-meta">
              <div className="rating">
                <span className="stars">★ {product.rating}</span>
                <span className="reviews">({product.reviews})</span>
              </div>
            </div>

            <div className="features">
              <h3>Key features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="color-selection">
              <h3>Colour:</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-button ${selectedColor === color.name ? 'selected' : ''}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorChange(color.name)}
                    title={`${color.name} - ${color.price.toFixed(2)} €`}
                  />
                ))}
              </div>
            </div>

            <div className="pricing">
              <div className="main-price">
                <span className="price">
                  {product.price.toFixed(2)}€
                </span>
              </div>
            </div>

            <div className="delivery-info">
              <div className="delivery-time">
                <span className="label">Express delivery</span>
                <span className="value">Saturday, 11 January</span>
              </div>
              <div className="shipping">
                <span className="label">Free</span>
                <span className="value">shipping cost</span>
              </div>
              <div className="stock">
                <span className="label">Stock</span>
                <span className="value">{product.stock} pieces</span>
              </div>
            </div>

            <div className="actions">
              <button className="add-to-cart">Add to cart</button>
              <button className="buy-now">Buy now</button>
            </div>

            <div className="warranty-info">
              <span>Skroutz Buyers Protection</span>
              <span>&</span>
              <span>2 years warranty</span>
              <a href="#" className="learn-more">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;