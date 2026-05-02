import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const CategoryPage = lazy(() => import("../pages/CategoryPage.jsx"));
const Bookmarks = lazy(() => import("../pages/Bookmarks.jsx"));
const ArticleDetail = lazy(() => import("../pages/ArticleDetail.jsx"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="/categories/:type" element={<CategoryPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
