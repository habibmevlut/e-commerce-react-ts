import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from './contex/ShoppingCartContext.tsx';
import Home from './pages/Home.tsx';
import Store from './pages/Store.tsx';
import Category from './pages/Category.tsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <ShoppingCartProvider>
            <Navbar/>
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/store" element={<Store/>}/>
                    <Route path="/about" element={<Category/>}/>
                </Routes>
            </Container>
        </ShoppingCartProvider>
    )
}

export default App
