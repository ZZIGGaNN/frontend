import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error with authentication:", error);
    return <div>Error during authentication</div>;
  }

  console.log("Authenticated user:", user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
