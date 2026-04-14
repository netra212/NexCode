import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import { checkAuth } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  // Either the user is authenticated or not
  // We can check here.

  const dispath = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispath]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <HomePage></HomePage> : <Navigate to="/signup" />
        }
      ></Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Login></Login> : <Navigate to="/" />}
      ></Route>
      <Route
        path="/signup"
        element={isAuthenticated ? <Signup></Signup> : <Navigate to="/" />}
      ></Route>
    </Routes>
  );
}

export default App;
