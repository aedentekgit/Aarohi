import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Collections from './components/Collections';
import Process from './components/Process';
import Stats from './components/Stats';
import Products from './components/Products';
import GlobalPresence from './components/GlobalPresence';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Login from './pages/Login';
import Contact from './pages/Contact';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import AdminCollections from './pages/AdminCollections';
import AdminProducts from './pages/AdminProducts';
import AdminProductVariants from './pages/AdminProductVariants';
import AdminGallery from './pages/AdminGallery';
import ProductsPage from './pages/ProductsPage';
import GalleryPage from './pages/GalleryPage';

const Layout = ({ children }) => (
    <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        {children}
        <Footer />
    </div>
);

const MainContent = () => {
    React.useEffect(() => {
        document.title = "Aarohi Exports | Premium Natural Stone & Marble";
    }, []);

    return (
        <>
            <Home />
            <About />
            <Features />
            <Services />
            <Collections />
            <Stats />
            <Process />
            <Products />
            <GlobalPresence />
            <Testimonials />
        </>
    );
};

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            {/* Public Pages wrapped in Layout */}
            <Route path="/" element={<Layout><MainContent /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
            <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />

            {/* Login Page (No Navbar usually) */}
            <Route path="/login" element={<Login />} />

            {/* Admin Pages (Use their own Sidebar) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/collections" element={<AdminCollections />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/product-variants" element={<AdminProductVariants />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
