import { Outlet } from "react-router-dom";
import MainHeader from "@/components/organisms/MainHeader";
import Footer from "@/components/template/Footer";

const AdminLayout = () => {
  return (
    <div>
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
