import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function LoginAPI() {
  const { errMsg, loginUser } = useAuth();
  const [fields, setFields] = useState({});

  function onSubmitForm(e) {
    e.preventDefault();
    loginUser(fields);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });
  }
  return (
    <>
      <div className="container mt-4">
        <div className="text-center text-danger">
          <h5> {errMsg} </h5>
        </div>

        <div className="text-center">
          <h2>Login</h2>
        </div>
        <form onSubmit={onSubmitForm}>
          <div className="form-group mb-2">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="example@gmail.com"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
