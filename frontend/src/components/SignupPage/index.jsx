import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import slackLogoColor from "../../assets/images/slack-logo-colors.png";
import { NavLink } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

function SignupPage() {
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

    return dispatch(
      sessionActions.signUpUser({
        email,
        username: email.substring(0, email.indexOf("@")),
        password,
      })
    ).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  return (
    <div className="sign-in-container">
      <header className="sign-page-header">
        <NavLink to="/" className="sign-logo-cont">
          <img src={slackLogoColor} alt="logo" style={{ height: 34 }} />
          <h3>slick</h3>
        </NavLink>
      </header>
      <form onSubmit={handleSubmit} className="sign-form">
        <h1>First, enter your email</h1>
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
                <div className="error-msg">
                  <FiAlertTriangle
                    style={{ color: "red", marginRight: "5px" }}
                  />
                  <li key={error}>{error}</li>
                </div>
              ))}
            </ul>
          </div>
        )}
        <button className="sign-button">Sign Up</button>
      </form>
      <div className="signin-option">
        <p>Already using Slick?</p>
        <NavLink to={"/signin/signin"} className="signin-link">
          <p>Sign in to an existing workspace</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SignupPage;
