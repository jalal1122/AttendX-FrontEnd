import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser, reset } from "../features/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isError) {
      setFormError(message);
      // Only reset on error to clear error state
      dispatch(reset());
    }

    if (isSuccess && user) {
      navigate("/");
    }

    return () => {
      setFormError("");
    };
  }, [isSuccess, isError, message, dispatch, navigate, user]);

  const { primaryText, primaryBg } = useSelector((state) => state.color.colors);

  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!userData.email) {
      formErrors.email = "Email is required";
    }
    if (!userData.password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(loginUser(userData))
        .unwrap()
        .then(() => {
          // Login successful - handled by useEffect
        })
        .catch((error) => {
          const errorMessage =
            error?.message || "Login failed. Please try again.";
          setErrors((prev) => ({ ...prev, form: errorMessage }));
        });
    } else {
      // Form validation failed - errors will be shown in UI
    }
  };

  return (
    <>
      <div
        className="register-container my-10 mx-auto flex flex-col items-center justify-center px-5 py-9"
        style={{
          backgroundColor: primaryBg,
          color: primaryText,
        }}
      >
        <div className="heading flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">Login</h1>
          <FaUser size={30} />
        </div>
        <form onSubmit={submitForm}>
          {isError ? (
            <>
              <p className="error-message">{formError}</p>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-[400px]">
                {/* Email Div */}
                <div className="relative emailDiv">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className={`w-full p-2 border rounded ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleFormChange}
                    value={userData.email}
                  />
                  <FaEnvelope
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Div */}
                <div className="relative passwordDiv">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className={`w-full p-2 border rounded ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleFormChange}
                    value={userData.password}
                  />
                  <FaLock
                    className="absolute right-2 top-3"
                    style={{
                      color: primaryText,
                    }}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-black text-white p-2 my-2 rounded hover:cursor-pointer hover:scale-105 transition duration-200"
                  style={{
                    backgroundColor: primaryText,
                    color: primaryBg,
                  }}
                >
                  Login
                </button>
              </div>
              <div className="flex justify-center">
                <p>Don't have an account? </p>
                <Link
                  to="/register/student"
                  className="text-black font-bold underline"
                >
                  Create Account
                </Link>
              </div>
              <div className="flex justify-center mt-4">
                <Link
                  to="/forgot-password"
                  className="text-black font-bold underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </>
          )}
        </form>

        {errors.form && (
          <p className="text-red-500 text-sm mt-4">{errors.form}</p>
        )}
      </div>
    </>
  );
};

export default Login;
