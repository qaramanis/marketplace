import { useState } from 'react';
import '../css/OrderHistory.css';

const OrderHistory = () => {
  // Sample data - in a real app, this would come from props or an API
  const [orders] = useState([
    {
      id: 1,
      product: "Apple EarPods Earbuds Handsfree with Lightning Port",
      status: "Delivered",
      date: "2024-01-05"
    },
    {
      id: 2,
      product: "Samsung Galaxy S24 Ultra",
      status: "InTransit",
      date: "2024-01-07"
    },
    {
      id: 3,
      product: "MacBook Pro M3",
      status: "Cancelled",
      date: "2024-01-02"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'green';
      case 'Cancelled':
        return 'red';
      case 'InTransit':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <div className="order-history">
      <h2 className="order-history-title">Orders</h2>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-details">
              <p className="order-product">{order.product}</p>
              <div className="order-status-container">
                <span 
                  className="order-status"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      backgroundColor: getStatusColor(order.status),
                      width: order.status === 'Delivered' ? '100%' : 
                            order.status === 'InTransit' ? '50%' : '100%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;