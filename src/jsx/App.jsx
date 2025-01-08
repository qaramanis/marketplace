import '../css/App.css'
import Navbar from './NavBar'
import CategoryBar from './CategoryBar'
import OrderHistory from './OrderHistory'
import ItemList from './ItemList'

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="content-container">
          <CategoryBar />
          <ItemList />
        </div>
        <OrderHistory />
      </div>
    </div>
  )
}

export default App
