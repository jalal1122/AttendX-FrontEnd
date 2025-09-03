import { BrowserRouter as Routes, Route } from "react-router-dom";
import RegisterAdmin from "../pages/RegisterAdmin";
import RegisterTeacher from "../pages/RegisterTeacher";
import RegisterStudent from "../pages/RegisterStudent";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/register/admin" element={<RegisterAdmin />} />

      <Route path="/register/teacher" element={<RegisterTeacher />} />

      <Route path="/register/student" element={<RegisterStudent />} />

      <Route path="/login" element={<Login />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
};

export default AppRouter;
