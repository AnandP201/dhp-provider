import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { admin, clinician, loggedIn, login } from "./components/user/UserSlice";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProviderRegistration from "./pages/registration/ProviderRegistration";
import UserRegistration from "./pages/registration/UserRegistration";

function App() {
  const isLoggedIn = useSelector(loggedIn);
  const isClinician = useSelector(clinician);
  const isAdmin = useSelector(admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectToNextStep = (userData, roles) => {
    console.log("Redirecting");
    if (!roles) {
      // Error later
    } else {
      if (userData.userProfileExists === "true") {
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/admin");
        } else if (roles.includes("ROLE_USER")) {
          navigate("/dashboard");
        }
      } else {
        let firstName = "";
        let lastName = "";
        const userNames = userData.userName ? userData.userName.split(" ") : [];
        if (userNames.length > 0) {
          firstName = userNames[0];
        }
        if (userNames.length > 1) {
          lastName = userNames[1];
        }
        navigate("/registration", {
          state: {
            id: userData.id,
            email: userData.email,
            firstName: firstName,
            lastName: lastName,
          },
        });
      }
    }
  };

  const handleLoginSuccess = (token, userData, roles) => {
    dispatch(
      login({
        name: userData.userName,
        token: token,
        roles: roles,
      })
    );
    redirectToNextStep(userData, roles);
  };

  return (
    <main>
      {!isLoggedIn && (
        <Routes>
          <Route
            exact
            path="/"
            element={<Login loginSuccess={handleLoginSuccess} />}
          />
          <Route exact path="/registration" element={<UserRegistration />} />
        </Routes>
      )}
      {isLoggedIn && isAdmin && (
        <Routes>
          <Route exact path="/admin" element={<Admin />} />
          <Route
            exact
            path="/registration"
            element={<ProviderRegistration />}
          />
        </Routes>
      )}
      {isLoggedIn && isClinician && (
        <Routes>
          <Route
            exact
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            exact
            path="/registration"
            element={<ProviderRegistration />}
          />
        </Routes>
      )}
    </main>
  );
}

export default App;
