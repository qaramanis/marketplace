import { 
    BsPhone, 
    BsSmartwatch, 
    BsLaptop 
  } from 'react-icons/bs';
  import { 
    FiMonitor 
  } from 'react-icons/fi';
  import { 
    IoAccessibilityOutline 
  } from 'react-icons/io5';
  import '../css/CategoryBar.css';
  
  const CategoryBar = () => {
    const categories = [
      { name: 'Smartphones', icon: BsPhone },
      { name: 'Smartwatches', icon: BsSmartwatch },
      { name: 'TVs', icon: FiMonitor },
      { name: 'Laptops', icon: BsLaptop },
      { name: 'Accessories', icon: IoAccessibilityOutline }
    ];
  
    return (
      <div className="category-bar">
        <div className="category-container">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button key={category.name} className="category-button">
                <IconComponent className="category-icon" />
                <span className="category-name">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default CategoryBar;