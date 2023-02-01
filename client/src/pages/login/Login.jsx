
import axios from "axios";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import  { useContext } from "react";
import Authcontext from "../../context/Authcontext";

//context api call



const Login = () => {
  const {dispatch} = useContext(Authcontext)

  const [email, setEmail] = useState(" ");
  const [id, setId] = useState();
  const [password, setPassword] = useState("");
  const [mandatoryfields, setMandatoryFields] = useState(false);
  const [warning, setWarning] = useState("");

  //Submit
  // const navigate = useNavigate(); Not used




  const handleSubmit = async (e,props) => {
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
          console.log("from login");
           dispatch({
            data:res.data
           })
   
        } else {
          setWarning(res.data);
          setEmail(" ");
          setPassword(" ");
        }
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data&&error.response.data);
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





