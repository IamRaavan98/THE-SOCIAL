// import axios from "axios";
// import { useState } from "react";
// import { Navigate, redirect } from "react-router-dom";
// import "./login.css";

// export default function Login() {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [login,setLogin] = useState(null)

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     //checking email and password

//   try {
//     axios.defaults.withCredentials = true
//     const res = await axios.post(`api/users/login`,{
//       email: "Rohanagrawal1798@gmail.com",
//       password: "123456",
//     })
//     console.log(res);
//       if(res){
//         console.log(res);
//         redirect("/profile")

//       }
//   }   
//   catch (error) {
//     console.log(error.response);
//   }

//   };
//   return (
//     <div className="login">
//       <div className="loginWrapper">
//         <div className="loginLeft">
//           <h3 className="loginLogo">Lamasocial</h3>
//           <span className="loginDesc">
//             Connect with friends and the world around you on Lamasocial.
//           </span>
//         </div>
//         <div className="loginRight">
//           <div className="loginBox">
//             <form onSubmit={handleSubmit}>
//               <label htmlFor="email">
//                 <input 
//                   id="email" 
//                   placeholder="Email" 
//                   className="loginInput"
//                   value={email} 
//                   onChange={e=>setEmail(e.target.value)}
//                   />
//               </label>

//               <label htmlFor="password">
//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="Password"
//                   className="loginInput"
//                   value={password}
//                   onChange={e=>setPassword(e.target.value)}
//                 />
//               </label>
//               <button type="submit" className="loginButton">
//                   Log In
//                      </button>

             
//             </form>
//             <span className="loginForgot">Forgot Password?</span>
//             <button className="loginRegisterButton">
//               Create 
//               a New Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















import React from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
// import Cookies from 'universal-cookie';
const Login = () => {

  const [email, setEmail] = useState(" ");
  const [id, setId] = useState();
  const [password, setPassword] = useState("");
  const [mandatoryfields, setMandatoryFields] = useState(false);
  const [warning, setWarning] = useState("");

  //Submit
  // const navigate = useNavigate(); Not used

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMandatoryFields("All fields are mandatory");
    } else {
      try {
    axios.defaults.withCredentials = true
        const res = await axios.post("/api/users/login", {
          email: email,
          password: password,
        });
        console.log(res);
        if (typeof res.data != "string" && res) {
          setId(res.data.user._id);
          
          // const options = {
          //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          // };
          // const cookies = new Cookies();
          // cookies.set("token", res.data.token, options)

          //  navigate(`/home?id=${res.data.user._id}`, { state: res.config.data });
        } else {
          setWarning(res.data);
          setEmail(" ");
          setPassword(" ");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  function handleEmail(e) {
    setEmail(e);
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col">
            <p className="mt-6 text-center text-3xl font-bold">THE SOCIAL</p>
            <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
              WELCOME, Please login
            </h2>
            <NavLink className="btn btn-primary" to={"/signup"}>
              Signup
            </NavLink>
          </div>

          {/* for registerd users */}
          <div>
            <h1 className="text-red-600">{warning}</h1>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                {mandatoryfields !== false ? (
                  <p className="text-red-600">*{mandatoryfields}</p>
                ) : null}
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(event) => handleEmail(event.target.value)}
                  onClick={() => setWarning("")}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />

                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {id != null ? (
                  <Link to={`/home`}>Login</Link>
                ) : (
                  <p>LOGIN</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;





