import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home"
import Error404 from "../components/pages/Error404";
import Products from "../components/pages/Products";
import App from "../components/template/App";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Form from "../components/pages/admin/products/Form";

// Nuevas importaciones
import SobreNosotrosPage from "../components/pages/AboutUsPage";
import OurHistoryPage from "../components/pages/OurHistoryPage";
import TeamPage from "../components/pages/TeamPage";
import CareersPage from "../components/pages/CareersPage";
import CareerOpportunitiesPage from "../components/pages/CareerOpportunitiesPage";
import ProductComparisonPage from "../components/pages/ProductComparisonPage";
import WishlistPage from "../components/pages/WishlistPage";
import CustomerReviewsPage from "../components/pages/CustomerReviewsPage";
import LoyaltyProgramPage from "../components/pages/LoyaltyProgramPage";
import SizeGuidePage from "../components/pages/SizeGuidePage";
import SustainabilityPage from "../components/pages/SustainabilityPage";
import CategoriesPage from "../components/pages/CategoriesPage";
import NewArrivalsPage from "../components/pages/NewArrivalsPage";
import BestSellersPage from "../components/pages/BestSellersPage";
import FAQPage from "../components/pages/FAQPage";
import ContactPage from "../components/pages/ContactPage";
import ReturnsPage from "../components/pages/ReturnsPage";
import TermsAndConditionsPage from "../components/pages/TermsAndConditionsPage";

const router = createBrowserRouter([
    { 
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
        children: [
            { 
                index: true,
                element: <Home />,
            },
            { 
                path: "/productos",
                element: <Products />,
            },
            {
                path: "/sobre-nosotros",
                element: <SobreNosotrosPage />,
            },
            {
                path: "/sobre-nosotros/historia",
                element: <OurHistoryPage />,
            },
            {
                path: "/sobre-nosotros/equipo",
                element: <TeamPage />,
            },
            {
                path: "/sobre-nosotros/carreras",
                element: <CareersPage />,
            },
            {
                path: "/oportunidades-carrera",
                element: <CareerOpportunitiesPage />,
            },
            {
                path: "/comparacion-productos",
                element: <ProductComparisonPage />,
            },
            {
                path: "/lista-deseos",
                element: <WishlistPage />,
            },
            {
                path: "/resenas",
                element: <CustomerReviewsPage />,
            },
            {
                path: "/programa-fidelidad",
                element: <LoyaltyProgramPage />,
            },
            {
                path: "/guia-tallas",
                element: <SizeGuidePage />,
            },
            {
                path: "/sostenibilidad",
                element: <SustainabilityPage />,
            },
            {
                path: "/categorias",
                element: <CategoriesPage />,
            },
            {
                path: "/nuevas-llegadas",
                element: <NewArrivalsPage />,
            },
            {
                path: "/mas-vendidos",
                element: <BestSellersPage />,
            },
            {
                path: "/faq",
                element: <FAQPage />,
            },
            {
                path: "/contacto",
                element: <ContactPage />,
            },
            {
                path: "/devoluciones",
                element: <ReturnsPage />,
            },
            {
                path: "/terminos-y-condiciones",
                element: <TermsAndConditionsPage />,
            },
        ]
    },
    { 
        path: "/login",
        element: <Login />
    },
    { 
        path: "/register",
        element: <Register />
    },
    { 
        path: "/admin/productos/crear",
        element: <Form />
    }
]);

export default router;