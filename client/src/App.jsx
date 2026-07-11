import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserDashboard from "@/pages/UserDashboard";
import OwnerDashboard from "@/pages/OwnerDashboard";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import ManageHouses from "@/pages/Admin/ManageHouses";
import ManageUsers from "@/pages/Admin/ManageUsers";
import ManageRequests from "@/pages/Admin/ManageRequests";
import ManageReports from "@/pages/Admin/ManageReports";
import HouseDetails from "@/pages/HouseDetails";
import SearchResults from "@/pages/SearchResults";
import Favorites from "@/pages/Favorites";
import AddHouse from "@/pages/AddHouse";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/protected/ProtectedRoute";
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/house/:id"
          element={<HouseDetails />}
        />
        <Route
          path="/search"
          element={<SearchResults />}
        />
        {/* USER ROUTES */}
<Route
  path="/dashboard"
  element={
    <ProtectedRoute role="user">
      <UserDashboard />
    </ProtectedRoute>
  }
/>
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        {/* OWNER ROUTES */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-house"
          element={
            <ProtectedRoute role="owner">
              <AddHouse />
            </ProtectedRoute>
          }
        />
        {/* ADMIN ROUTES */}
       {/* ADMIN ROUTES */}

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/houses"
  element={
    <ProtectedRoute role="admin">
      <ManageHouses />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedRoute role="admin">
      <ManageUsers />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/requests"
  element={
    <ProtectedRoute role="admin">
      <ManageRequests />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/reports"
  element={
    <ProtectedRoute role="admin">
      <ManageReports />
    </ProtectedRoute>
  }
/>
        {/* NOT FOUND */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}
