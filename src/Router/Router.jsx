import { Routes, Route } from "react-router-dom";
import RegisterAdmin from "../pages/RegisterAdmin";
import RegisterTeacher from "../pages/RegisterTeacher";
import RegisterStudent from "../pages/RegisterStudent";
import Login from "../pages/Login";
import Class from "../pages/Class";
import LandingPage from "../pages/LandingPage";

const Router = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={localStorage.getItem("user") ? <LandingPage /> : <RegisterStudent />}
      />

      <Route path="/register/admin" element={<RegisterAdmin />} />

      <Route path="/register/teacher" element={<RegisterTeacher />} />

      <Route path="/register/student" element={<RegisterStudent />} />

      <Route path="/login" element={<Login />} />

      <Route path="/class/:classCode" element={<Class />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Router;
