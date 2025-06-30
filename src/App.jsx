import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";

import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import { refreshUserThunk } from "./redux/auth/operations";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { selectIsRefreshing } from "./redux/auth/selectors";

const Registration = lazy(() => import("./pages/Registration/Registration"));
const Login = lazy(() => import("./pages/Login/Login"));
const Contacts = lazy(() => import("./pages/Contacts/Contacts"));
const Home = lazy(() => import("./pages/Home/Home"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<Registration />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={<Login />} redirectTo="/contacts" />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Routes>

        <ToastContainer />
      </Suspense>
    </Layout>
  );
}

export default App;
