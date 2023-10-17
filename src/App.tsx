import { Routes, Route, Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from './contex/ShoppingCartContext.tsx';
import Home from './pages/Home.tsx';
import Store from './pages/Store.tsx';
import Category from './pages/Category.tsx';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutPage from './components/CartItem.tsx.tsx';

function App() {
    return (
        <ShoppingCartProvider>
            <Navbar/>
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Outlet/>}>
                        <Route index element={<Home/>}/>
                        <Route path="store" element={<Store/>}/>
                        <Route path="about" element={<Category/>}/>
                        {/* Add the checkout route here */}
                        <Route path="checkout" element={<CheckoutPage/>}/>
                    </Route>
                </Routes>
            </Container>
        </ShoppingCartProvider>
    )
}

export default App
