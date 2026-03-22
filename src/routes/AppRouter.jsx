import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard";
import AuthRedirect from "./AuthRedirect";
import ProtectedRoute from "./ProtectedRoute";
import CreateFolder from "../pages/CreateFolder";
import FileUpload from "../pages/FileUpload";
import SearchFiles from "../pages/SearchFiles";
// import { useEffect } from "react";

const AppRouter = () => {
  // useEffect(()=>{
  //   localStorage.removeItem("token")

  // },[])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />

        <Route
          path="/register"
          element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          }
        />

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} /> */}
        <Route
          path="/folder"
          element={
            <ProtectedRoute>
              <CreateFolder />
            </ProtectedRoute>} />
        <Route
          path="/files/:folderId"
          element={
            <ProtectedRoute>
              <FileUpload />
            </ProtectedRoute>} />
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <FileUpload/>
            </ProtectedRoute>} />
        <Route
          path="/searchfiles"
          element={
            <ProtectedRoute>
              <SearchFiles />
            </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
