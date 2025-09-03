import { FaUser, FaEnvelope, FaLock, FaUserGraduate } from "react-icons/fa";

const RegisterStudent = () => {
  return (
   <> 
     <div className="register-container my-10 mx-auto flex flex-col items-center justify-center p-10">
      <div>
        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <h1 className="text-4xl font-bold">Register</h1>
          <FaUserGraduate size={30} />
        </div>

        {/* Form */}
        <form>
          <div className="flex flex-col gap-4 w-[300px]">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Enter your Full Name"
                className="w-full p-2 border rounded pr-10"
              />
              <FaUser className="absolute right-2 top-3" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full p-2 border rounded pr-10"
              />
              <FaEnvelope className="absolute right-2 top-3" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="w-full p-2 border rounded pr-10"
              />
              <FaLock className="absolute right-2 top-3" />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                name="password2"
                placeholder="Confirm your Password"
                className="w-full p-2 border rounded pr-10"
              />
              <FaLock className="absolute right-2 top-3" />
            </div>

            <div>
              <select name="department" id="" className="w-full p-2 border rounded pr-10">
                <option value="">Select Department</option>
                <option value="science">Computer Science</option>
                <option value="arts">AI</option>
                <option value="commerce">IT</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 p-2 border font-bold text-lg rounded hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/admin/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
   </>
  );
};

export default RegisterStudent;
