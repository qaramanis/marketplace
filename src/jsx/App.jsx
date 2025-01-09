import '../css/App.css'
import Navbar from './NavBar'
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';

import Auth from './Auth'
import Home from './Home'
import ProductDetail from './ProductDetail';
import RegisterShop from './RegisterShop';

const AppLayout = () =>{
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth' || location.pathname === '/signup';

  return (
    <div className="app">
      {!isAuthPage && <Navbar />}
      <Routes>
            <Route path="/auth" element={<Auth defaultMode="signin" />} />
            <Route path="/signup" element={<Auth defaultMode="signup" />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/register-shop" element={<RegisterShop />} />
      </Routes>
    </div>
  );
}
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App
