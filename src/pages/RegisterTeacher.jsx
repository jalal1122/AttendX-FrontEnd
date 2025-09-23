import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaChalkboardTeacher,
  FaFile,
} from "react-icons/fa";
import { registerUser, reset } from "../features/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar.jsx";

export const RegisterTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const { primaryBg, primaryText } = useSelector((state) => state.color.colors);

  const [ formError, setFormError ] = useState(null);

  useEffect(() => {
    if (isError) {
      setFormError(message);
      console.log(message, "error");
    }
    if (isSuccess) {
      navigate("/login");
      setFormError(null);
      console.log(user, "User logged in successfully");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [ preview, setPreview ] = useState(null);

  const [ errors, setErrors ] = useState({});

  const [ userData, setUserData ] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "teacher",
    department: "",
    profilePicture: null,
  });

  const passwordRagex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      const file = files[0];

      // Validate file if provided
      if (file) {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
          setErrors({
            ...errors,
            profilePicture:
              "Please select a valid image file (JPEG, JPG, PNG, WebP)",
          });
          return;
        }

        if (file.size > maxSize) {
          setErrors({
            ...errors,
            profilePicture: "File size must be less than 5MB",
          });
          return;
        }

        // Clear any previous file errors
        if (errors.profilePicture) {
          setErrors({ ...errors, profilePicture: "" });
        }
      }

      setUserData({ ...userData, [name]: file });

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result);
        };
      }
    } else {
      setUserData({ ...userData, [name]: value });

      // Clear error when user starts typing
        setErrors({ ...errors, [name]: "" });
    }
  };

  const validatePassword = (password) => {
    if (!passwordRagex.test(password)) {
      return "Password must be at least 8 characters long and contain at least one letter, one digit, and one special character (@$!%*#?&)";
    }
    return "";
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newErrors = {};

    if(!userData.name){
      newErrors.name = "Name is required";
    }

    if (!userData.email) {
      newErrors.email = "Email is required";
    }

    const passwordError = validatePassword(userData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (userData.password !== userData.password2) {
      newErrors.password2 = "Passwords do not match";
    }

    if(!userData.department){
      newErrors.department = "Department is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(registerUser(userData));
  };

  return (
    <>
      <Navbar />
      <div className="register-container my-3 mx-auto flex flex-col items-center justify-center p-3">
        <div className="Section-pages flex gap-5">
          <div className="border border-black p-2 mt-4 hover:scale-95 transition-transform duration-300">
            <Link to="/register/student" className="text-xl font-bold">
            Student
          </Link>
          </div>
          <div className="border border-black p-2 mt-4 hover:scale-95 transition-transform duration-300">
            <Link to="/register/teacher" className="text-xl font-bold">
              Teacher
            </Link>
          </div>
        </div>
        <div>
          {/* Heading */}
          <div className="flex items-center justify-center gap-4 mb-6 mt-2">
            <h1 className="text-4xl font-bold">Register Teacher</h1>
            <FaChalkboardTeacher size={30} />
          </div>

         
        {/* Form */}
        <form onSubmit={(e) => submitForm(e)}>
          {isError ? (
            <>
              <p className="error-message">{formError}</p>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-[400px]">
                {/* Name Div */}
                <div className="relative nameDiv">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Full Name"
                    className={`w-full p-2 border rounded ${
                       errors?.name ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleFormChange}
                    value={userData?.name}
                  />
                  <FaUser
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Div */}
                <div className="relative emailDiv">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className={`w-full p-2 border rounded ${
                      errors?.email ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleFormChange}
                    value={userData?.email}
                  />
                  <FaEnvelope
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-sm mt-1">{errors?.email}</p>
                  )}
                </div>

                {/* Password Div */}
                <div className="relative passwordDiv">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className={`w-full p-2 border rounded ${
                      errors?.password ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleFormChange}
                    value={userData?.password}
                  />
                  <FaLock
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Div */}
                <div className="relative password2Div">
                  <input
                    type="password"
                    name="password2"
                    placeholder="Confirm your Password"
                    className={`w-full p-2 border rounded ${
                      errors?.password2 ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleFormChange}
                    value={userData?.password2}
                  />
                  <FaLock
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors?.password2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.password2}
                    </p>
                  )}
                </div>

                {/* Departments */}
                <div>
                  <select name="department" className={`w-full p-2 border rounded ${
                      errors?.department
                        ? "border-red-500"
                        : "border-gray-300"
                    }`} onChange={handleFormChange} value={userData?.department}>
                    <option value="">Select Department</option>
                    <option value="CS">Computer Science</option>
                    <option value="IT">Information Technology</option>
                    <option value="SE">Software Engineering</option>
                    <option value="DS">Data Science</option>
                  </select>
                  {errors?.department && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.department}
                    </p>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="relative ProfilePictureDiv">
                  <input
                    type="file"
                    name="profilePicture"
                    className={`w-full p-2 border rounded ${
                      errors?.profilePicture
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={handleFormChange}
                    accept="image/*"
                  />
                  <FaFile
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors?.profilePicture && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.profilePicture}
                    </p>
                  )}
                </div>

                {/* Preview Image */}
                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-4 p-2 font-bold text-lg rounded hover:scale-105 border transition-transform duration-300 hover:cursor-pointer"
                  style={{
                    backgroundColor: primaryText,
                    color: primaryBg,
                  }}
                >
                  Register
                </button>
                <p className="mt-4 text-md-bold mx-auto">
                  Already have an account?{" "}
                  <Link to="/login" className="text-black font-bold underline">
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
        </div>
      </div>
    </>
  );
};

export default RegisterTeacher;
