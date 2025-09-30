import { Routes, Route } from "react-router-dom";
import RegisterAdmin from "../pages/RegisterAdmin";
import RegisterTeacher from "../pages/RegisterTeacher";
import RegisterStudent from "../pages/RegisterStudent";
import Login from "../pages/Login";
import Class from "../pages/Class";
import LandingPage from "../pages/LandingPage";
import { useSelector } from "react-redux";
import  Session  from "../pages/Session";

const Router = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={user ? <LandingPage /> : <RegisterStudent />} />

      <Route path="/register/admin" element={!user && <RegisterAdmin />} />

      <Route path="/register/teacher" element={!user && <RegisterTeacher />} />

      <Route path="/register/student" element={!user && <RegisterStudent />} />

      <Route path="/login" element={!user && <Login />} />

      <Route path="/class/:classCode" element={user ? <Class /> : <Login />} />

      <Route path="/class/:classCode/session" element={user ? <Session /> : <Login />} />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
