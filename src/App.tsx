import { Route, Routes } from "react-router-dom";

import PresistLogin from "./components/PresistLogin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Layout from "./components/Layout";
import SalesPage from "./pages/sales/SalesPage";
import { MainNav } from "./components/nav/main-nav";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MainNav />
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover={false}
        theme="light"
      />

      <Routes>
        <Route element={<PresistLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              {/* <Route path="/products/:id" element={<ProductDetailsPage />} /> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
