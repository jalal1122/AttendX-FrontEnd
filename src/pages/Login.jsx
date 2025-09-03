import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <>
          <> 
               <div className="register-container my-10 mx-auto flex flex-col items-center justify-center p-10">
                <div>
                  {/* Heading */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <h1 className="text-4xl font-bold">Login</h1>
                    <FaUser size={30} />
                  </div>
          
                  {/* Form */}
                  <form>
                    <div className="flex flex-col gap-4 w-[300px]">
          
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
          
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="mt-4 p-2 border font-bold text-lg rounded hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                      >
                        Login
                      </button>
                    </div>
                  </form>
          
                </div>
              </div>
             </>  
        </>
  )
}

export default Login