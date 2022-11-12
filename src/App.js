import "./App.css";
import Register from "./components/register.jsx";
import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import SignIn from "./components/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import UserProfile from "./components/UserProfile";
import PrivateRoute from "./components/PrivateRoutes";
import PasswordReset from "./components/PasswordReset";
import UpdateProfile from "./components/UpdateProfile.jsx";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/userProfile" element={<UserProfile />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route exact path="/UpdateProfile" element={<UpdateProfile />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<SignIn />} />
          <Route exact path="/passwordReset" element={<PasswordReset />} />
          <Route exact path="*" element={"Not Found Page"} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
