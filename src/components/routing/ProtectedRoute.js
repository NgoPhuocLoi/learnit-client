import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import NavbarMenu from "../layout/Navbar";

function ProtectedRoute({ children }) {
  const {
    authState: { isAuthenticated, isLoading },
  } = useContext(authContext);

  if (isLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;

  return (
    <>
      <NavbarMenu />
      {children}
    </>
  );
}

export default ProtectedRoute;
