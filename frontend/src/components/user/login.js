import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import { register } from "../../actions/userActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faFacebook,
  faInstagram,
} from "@fortawesome/fontawesome-free-brands";
import "./page.css";
//Images
import Img01 from "./images/bg1.svg";
import Img02 from "./images/bg2.svg";
import ImgEmail from "./images/email.png";
import ImgLock from "./images/lock.png";
import ImgUser from "./images/user.png";
import ImgUsers from "./images/users.png";
import ImgEye from "./images/eye.png";
import ImgEyeHide from "./images/eye-hide.png";
import Call from "./images/call.png";

function Login({ history, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialState, setInitialState] = useState();
  const [isActive, setIsActive] = useState("true");
  const [isPasswordShown, setIsPasswordShown] = useState("false");
  const [isEyeImage, setIsEyeImage] = useState("true");
  const [isOnClicked, setIsOnClicked] = useState("true");
  const [user, setUser] = useState({
    name: "",
    emaill: "",
    passwordd: "",
    phone: "",
  });
  const { name, emaill, passwordd, phone } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  // redirecting to Sign-in page
  function changeSignInForm() {
    setInitialState(initialState);
    setIsActive(false);
  }
  // redirecting to  Sign-up page
  function changeSignUpForm() {
    setInitialState(initialState);
    setIsActive(true);
  }
  function PasswordVisibility() {
    setIsPasswordShown(true);
    setIsEyeImage(false);
    setIsOnClicked(false);
  }
  function PasswordNotVisibility() {
    setIsPasswordShown(false);
    setIsEyeImage(true);
    setIsOnClicked(true);
  }

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const submitHandlerSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", emaill);
    formData.set("password", passwordd);
    formData.set("phone", phone);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChangeSignUp = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className={"Login-Section"}>
      <div
        className={
          isActive === false
            ? "login-container sign-up-mode"
            : "login-container"
        }
        id={"container"}
      >
        <div className={"forms-container"}>
          <div className={"signin-signup"}>
            {/* ----------------------------- Login Form ----------------------------- */}
            <form className={"sign-in-form"} onSubmit={submitHandler}>
              <h2 className={"title"}>Sign in</h2>
              <div className={"input-field"}>
                <img src={ImgUser} className={"fas"} alt="user img" />
                <input
                  type="text"
                  name={"username"}
                  id={"username"}
                  placeholder={"Enter your Email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={"input-field"}>
                <img src={ImgLock} className={"fas"} alt="img lock" />
                <input
                  type={isPasswordShown === false ? "text" : "password"}
                  name={"password"}
                  id={"password"}
                  placeholder={"Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src={isEyeImage === true ? ImgEyeHide : ImgEye}
                  alt="eye img"
                  className={"eye"}
                  onClick={
                    isOnClicked === true
                      ? PasswordVisibility.bind(this)
                      : PasswordNotVisibility.bind(this)
                  }
                />
              </div>
              <br />
              <input type="submit" value={"Login"} className={"btn solid"} />
              <br />
              <Link to="/password/forgot" className="float-right mb-4">
                Forgot Password?
              </Link>
            </form>

            {/* ----------------------------- Registration Form ----------------------------- */}
            <form className={"sign-up-form"} onSubmit={submitHandlerSignUp}>
              <h2 className={"title"}>Sign up</h2>
              <div className={"input-field"}>
                <img src={ImgUsers} className={"fas"} alt="user img" />
                <input
                  type="text"
                  name={"name"}
                  id={"username"}
                  placeholder={"username"}
                  value={name}
                  onChange={onChangeSignUp}
                />
              </div>
              <div className={"input-field"}>
                <img src={ImgEmail} className={"fas"} alt="email img" />
                <input
                  type={"email"}
                  name={"emaill"}
                  id={"email"}
                  placeholder={"Email"}
                  value={emaill}
                  onChange={onChangeSignUp}
                />
              </div>
              <div className={"input-field"}>
                <img src={ImgLock} className={"fas"} alt="lock img" />
                <input
                  type={isPasswordShown === false ? "text" : "password"}
                  name={"passwordd"}
                  id={"password"}
                  placeholder={"Password"}
                  value={passwordd}
                  onChange={onChangeSignUp}
                  required
                />
                <img
                  src={isEyeImage === true ? ImgEyeHide : ImgEye}
                  alt="eye img"
                  className={"eye"}
                  onClick={
                    isOnClicked === true
                      ? PasswordVisibility.bind(this)
                      : PasswordNotVisibility.bind(this)
                  }
                />
              </div>
              <div className={"input-field"}>
                <img
                  src={Call}
                  className={"fas"}
                  alt="email img"
                  style={{ width: "50px", height: "55px" }}
                />
                <input
                  type={"number"}
                  name={"phone"}
                  id={"phone"}
                  placeholder={"Contact Number"}
                  value={phone}
                  onChange={onChangeSignUp}
                />
              </div>
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="iamges/*"
                      onChange={onChangeSignUp}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
              <input type={"submit"} className={"btn"} value={"sign up"} />
              <br />
              <p className={"social-media"}>Visit our social platforms</p>
              <div className={"social-media"}>
                <a
                  href="https://www.facebook.com/profile.php?id=100079158640952"
                  target="_blank"
                  className={"social-icon"}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="https://twitter.com/MedicineDonati2?t=s45iowTtaAFj8-LE6w82FQ&s=09"
                  target="_blank"
                  className={"social-icon"}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  className={"social-icon"}
                  href="https://instagram.com/medicare.pk"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.linkedin.com/in/saif-rehman-432383183/"
                  target="_blank"
                  className={"social-icon"}
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </form>
            {/* ------------ Registration Form  end ------------ */}
          </div>
        </div>

        <div className={"panels-container"}>
          <div className={"panel left-panel"}>
            <div className={"content"}>
              <h3>New here ?</h3>
              <p>
                If you have not created your account yet then join us right now
                by clicking on Sign Up button
              </p>
              <button
                className={"btn transparent"}
                id={"sign-up-btn"}
                onClick={changeSignInForm.bind(this)}
                disabled={loading ? true : false}
              >
                Sign up
              </button>
            </div>
            <img src={Img01} className={"image"} alt={"fb"} />
          </div>

          <div className={"panel right-panel"}>
            <div className={"content"}>
              <h3>Already Created ?</h3>
              <p>
                If you have already created your account then kindly click on
                Sign In button to continue.
              </p>
              <button
                className={"btn transparent"}
                id={"sign-in-btn"}
                onClick={changeSignUpForm.bind(this)}
              >
                Sign in
              </button>
            </div>
            <img src={Img02} className={"image"} alt={"fb"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
