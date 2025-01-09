import { useAuth } from './AuthContext';
import CategoryBar from './CategoryBar';
import OrderHistory from './OrderHistory';
import RegisterStore from './RegisterStore';
import ItemList from './ItemList';

const Home = () => {
  const { user, profile } = useAuth();
  const isRegisteredSeller = profile?.isSeller; // Adjust based on your profile data structure

  return (
    <div className="main-content">
      <div className="content-container">
        <CategoryBar />
        <ItemList />
      </div>
      <div className="side-container">
        <OrderHistory />
        <RegisterStore />
      </div>
    </div>
  );
};

export default Home;