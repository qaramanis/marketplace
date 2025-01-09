import { useState } from 'react';
import '../css/RegisterStore.css';

const RegisterStore = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleRegisterClick = () => {
    // Handle registration logic or navigation
    console.log('Register store clicked');
  };

  return (
    <div className="register-store">
      <h2 className="register-store-title">Become a Seller</h2>
      <div className="register-content">
        <img 
          src="/api/placeholder/200/200" 
          alt="Store registration illustration" 
          className="register-illustration"
        />
        <h3 className="register-heading">Do you have a store? Join Skroutz!</h3>
        <p className="register-description">
          Start selling online and watch your business's performance skyrocket!
        </p>
        <button 
          className="register-button"
          onClick={handleRegisterClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Become a partner
        </button>
      </div>
    </div>
  );
};

export default RegisterStore;