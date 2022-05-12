
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
// Admin
import AdminLoginAndRegistration from './components/Admin/AdminLoginAndRegistration';
import Dashboard from './components/Admin/Dashboard';
import CreateProduct from './components/Products/CreateProduct';
import AdminStore from './components/Admin/AdminStore';
import AdminViewProduct from './components/Admin/AdminViewProduct';
// USERS
import UserRegistration from './UserView/UserRegistration';
import Home from './UserView/Home';
import Store from './UserView/Store';
import ViewProduct from './UserView/ViewProduct';
import Cart from './UserView/Cart';
// LOGGED USERS
import Profile from './UserView/Profile';
// useContext
import {CartProvider} from './CartContext';
import GymNavbar from './UserView/GymNavbar';
import Checkout from './UserView/Checkout';
import UpdateProduct from './components/Products/UpdateProduct';
function App() {
  return (
    <div className="App">
      <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* ADMIN */}
          <Route element={<AdminLoginAndRegistration/>} path="/admin"/>
          <Route element={<Dashboard/>} path="/admin/dashboard"/>
          <Route element={<AdminViewProduct/>} path="admin/store/:product_name"/>
          <Route element={<CreateProduct/>} path="/admin/store/add"/>
          <Route element={<UpdateProduct/>} path="/admin/store/update/:productId"/>
          <Route element={<AdminStore/>} path="/admin/store"/>

          {/* USERS*/}
          <Route element={<UserRegistration/>} path="/users/"/>
          <Route element={<Home/>} path="/" default/>
          <Route element={<Store/>} path="/store"/>
          <Route element={<ViewProduct/>} path="/store/:product_name"/>
          <Route element={<Cart/>} path="/cart"/>
          <Route element={<Checkout/>} path="/store/checkout"/>
          {/* LOGGED USERS */}
          <Route element={<Profile/>} path="/profile/:id"/>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
