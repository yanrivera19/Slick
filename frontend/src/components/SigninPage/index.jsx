import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import slackLogoColor from "../../assets/images/slack-logo-colors.png";
import { FiAlertTriangle } from "react-icons/fi";

function SigninPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser)
    return <Redirect to={`/client/${sessionUser.id}/get-started/landing`} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.loginUser({ email, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  return (
    <div className="sign-in-container">
      <header className="sign-page-header">
        <NavLink to="/" className="sign-logo-cont">
          <img src={slackLogoColor} alt="logo" style={{ height: 34 }} />
          <h3>slick</h3>
        </NavLink>
        <div className="create-option">
          <p>New to Slick?</p>
          <NavLink to={"/get-started/createnew"} className="create-link">
            <p>Create an account</p>
          </NavLink>
        </div>
      </header>
      <form onSubmit={handleSubmit} className="sign-form">
        <h1>Sign in to Slick</h1>
        <p>
          We suggest using the <strong>email address you use at work.</strong>
        </p>
        <hr />
        <input
          type="text"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@work-email.com"
          required
          autoComplete="off"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="password-input"
          placeholder="password"
          autoComplete="off"
        />
        {errors.length > 0 && (
          <div className="error-box">
            <ul>
              {errors.map((error) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <FiAlertTriangle
                    style={{ color: "red", marginRight: "5px" }}
                  />
                  <li key={error}>{error}</li>
                </div>
              ))}
            </ul>
          </div>
        )}
        <button className="sign-button">Sign In With Email</button>
      </form>
    </div>
  );
}

export default SigninPage;
