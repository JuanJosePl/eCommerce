import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Loader from "@/components/atoms/Loader";


// Lazy loading de componentes
const HomePage = lazy(() => import("../components/pages/public/Home"));
const Error404 = lazy(() => import("../components/pages/public/Error404"));
const Products = lazy(() => import("../components/pages/public/Products"));
const ProductDetails = lazy(() => import("../components/molecules/product/ProductDetails"));


const App = lazy(() => import("../components/template/App"));
const Login = lazy(() => import("../components/pages/public/Login"));
const Register = lazy(() => import("../components/pages/public/Register"));
const SobreNosotrosPage = lazy(() => import("../components/pages/public/AboutUsPage"));
const OurHistoryPage = lazy(() => import("../components/pages/public/OurHistoryPage"));
const TeamPage = lazy(() => import("../components/pages/public/TeamPage"));
const CareersPage = lazy(() => import("../components/pages/public/CareersPage"));
const CareerOpportunitiesPage = lazy(() => import("../components/pages/public/CareerOpportunitiesPage"));
const ProductComparisonPage = lazy(() => import("../components/pages/public/ProductComparisonPage"));
const WishlistPage = lazy(() => import("../components/pages/public/WishlistPage"));
const CustomerReviewsPage = lazy(() => import("../components/pages/public/CustomerReviewsPage"));
const LoyaltyProgramPage = lazy(() => import("../components/pages/public/LoyaltyProgramPage"));
const SizeGuidePage = lazy(() => import("../components/pages/public/SizeGuidePage"));
const SustainabilityPage = lazy(() => import("../components/pages/public/SustainabilityPage"));
const CategoriesPage = lazy(() => import("../components/pages/public/CategoriesPage"));
const NewArrivalsPage = lazy(() => import("../components/pages/public/NewArrivalsPage"));
const BestSellersPage = lazy(() => import("../components/pages/public/BestSellersPage"));
const FAQPage = lazy(() => import("../components/pages/public/FAQPage"));
const ContactPage = lazy(() => import("../components/pages/public/ContactPage"));
const ReturnsPage = lazy(() => import("../components/pages/public/ReturnsPage"));
const TermsAndConditionsPage = lazy(() => import("../components/pages/public/TermsAndConditionsPage"));
const PrivacyPolicyPage = lazy(() => import("@/components/pages/public/PrivacyPolicyPage"));
const CookiesPolicyPage = lazy(() => import("@/components/pages/public/CookiesPolicyPage"));

const AdminLayout = lazy(() => import("@/components/pages/admin/AdminLayout"));
const AdminPage = lazy(() => import("@/components/pages/admin/AdminPage"));
const ProductManagement = lazy(() => import("@/components/pages/admin/products/ProductManagement"));
const OrderManagement = lazy(() => import("@/components/pages/admin/orders/OrderManagement"));
const UserManagement = lazy(() => import("@/components/pages/admin/users/UserManagement"));
const CategoryManagement = lazy(() => import("@/components/pages/admin/products/CategoryManagement"));
const AnalyticsPage = lazy(() => import("@/components/pages/admin/dashboard/AnalyticsPage"));

const UserDashboard = lazy(() => import("@/components/pages/user/UserDashboard"));
const UserProfile = lazy(() => import("@/components/pages/user/UserProfile"));
const UserOrders = lazy(() => import("@/components/pages/user/UserOrders"));
const AccountSettings = lazy(() => import("@/components/pages/user/AccountSettings"));
const VerifyEmail = lazy(() => import("@/components/molecules/Auth/VerifyEmail"));

const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const RequestPasswordReset = lazy(() => import("@/components/molecules/Auth/RequestPasswordReset"));
const ResetPassword = lazy(() => import("@/components/molecules/Auth/ResetPassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><HomePage /></Suspense> },
      { path: "productos", element: <Suspense fallback={<Loader />}><Products /></Suspense> },
      { path: "productos/:id", element: <Suspense fallback={<Loader />}><ProductDetails /></Suspense> },
      { path: "sobre-nosotros", element: <Suspense fallback={<Loader />}><SobreNosotrosPage /></Suspense> },
      { path: "sobre-nosotros/historia", element: <Suspense fallback={<Loader />}><OurHistoryPage /></Suspense> },
      { path: "sobre-nosotros/equipo", element: <Suspense fallback={<Loader />}><TeamPage /></Suspense> },
      { path: "sobre-nosotros/carreras", element: <Suspense fallback={<Loader />}><CareersPage /></Suspense> },
      { path: "oportunidades-carrera", element: <Suspense fallback={<Loader />}><CareerOpportunitiesPage /></Suspense> },
      { path: "comparacion-productos", element: <Suspense fallback={<Loader />}><ProductComparisonPage /></Suspense> },
      { path: "resenas", element: <Suspense fallback={<Loader />}><CustomerReviewsPage /></Suspense> },
      { path: "guia-tallas", element: <Suspense fallback={<Loader />}><SizeGuidePage /></Suspense> },
      { path: "sostenibilidad", element: <Suspense fallback={<Loader />}><SustainabilityPage /></Suspense> },
      { path: "categorias", element: <Suspense fallback={<Loader />}><CategoriesPage /></Suspense> },
      { path: "nuevas-llegadas", element: <Suspense fallback={<Loader />}><NewArrivalsPage /></Suspense> },
      { path: "mas-vendidos", element: <Suspense fallback={<Loader />}><BestSellersPage /></Suspense> },
      { path: "faq", element: <Suspense fallback={<Loader />}><FAQPage /></Suspense> },
      { path: "contacto", element: <Suspense fallback={<Loader />}><ContactPage /></Suspense> },
      { path: "devoluciones", element: <Suspense fallback={<Loader />}><ReturnsPage /></Suspense> },
      { path: "terminos-y-condiciones", element: <Suspense fallback={<Loader />}><TermsAndConditionsPage /></Suspense> },
      { path: "politica-de-privacidad", element: <Suspense fallback={<Loader />}><PrivacyPolicyPage /></Suspense> },
      { path: "politica-de-cookies", element: <Suspense fallback={<Loader />}><CookiesPolicyPage /></Suspense> },
      
      // Rutas protegidas para usuarios autenticados
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "perfil",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "mis-pedidos",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "lista-deseos",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "programa-fidelidad",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <LoyaltyProgramPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "configuracion",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  { path: "/login", element: <Suspense fallback={<Loader />}><Login /></Suspense> },
  { path: "/register", element: <Suspense fallback={<Loader />}><Register /></Suspense> },
  { path: "/verificar-email", element: <Suspense fallback={<Loader />}><VerifyEmail /></Suspense> },
  { path: "/recuperar-password", element: <Suspense fallback={<Loader />}><RequestPasswordReset /></Suspense> },
  { path: "/reset-password/:token", element: <Suspense fallback={<Loader />}><ResetPassword /></Suspense> },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRoute requiredRole="admin">
          <AdminLayout>
            <AdminPage />
          </AdminLayout>
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><AnalyticsPage /></Suspense> },
      { path: "productos", element: <Suspense fallback={<Loader />}><ProductManagement /></Suspense> },
      { path: "pedidos", element: <Suspense fallback={<Loader />}><OrderManagement /></Suspense> },
      { path: "usuarios", element: <Suspense fallback={<Loader />}><UserManagement /></Suspense> },
      { path: "categorias", element: <Suspense fallback={<Loader />}><CategoryManagement /></Suspense> },
      { path: "analiticas", element: <Suspense fallback={<Loader />}><AnalyticsPage /></Suspense> },
    ],
  },
]);

export default router;