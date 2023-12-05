import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../compponate/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../actions/userAction";

function Index() {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate();
  const { error, loading, user, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [shoPassword, setShoPassword] = useState(false);
  const [Newuser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [avatar, setAvatar] = useState('https://mdbootstrap.com/img/new/avatars/1.jpg');
  const [avatarPreview, setAvatarPreview] = useState('https://mdbootstrap.com/img/new/avatars/1.jpg');
  const [errors, setErrors] = useState({});

  const { name, email, password, phone } = Newuser;
  //  onchange input value handle 
  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setNewUser({ ...Newuser, [e.target.name]: e.target.value });
    }
  };
  //   submit register form data 
  const registerSubmit = (e) => {
    e.preventDefault();
    //  validation check 
    const validateFields = ['name', 'phone', 'email', 'password'];
    const newErrors = {};
    validateFields.forEach((field) => {
      if (!Newuser[field] || Newuser[field].trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    if (phone.length !== 10) {
      newErrors['phone'] = 'Phone number should be 10 digits long';
    }
    // if any error availble then return and  stop next call
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Clear errors if there are none
    setErrors({});

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('phone', phone);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    dispatch(register(myForm));
  };

  // login funcation 
  const loginSubmit = (e) => {
    e.preventDefault();
    const validateFields = ['email', 'password'];
    const newErrors = {};
    validateFields.forEach((field) => {
      if (!Newuser[field] || Newuser[field].trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    dispatch(login(email, password));
  };

  //  show and hide password 
  const toggleShowpassword = () => {
    setShoPassword(!shoPassword)
  }

  // toggle login and sinup comopnate 
  const toggle = () => {
    setErrors({});
    containerRef.current.classList.toggle('sign-in');
    containerRef.current.classList.toggle('sign-up');
  };
  //  default set login componate 
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setTimeout(() => {
        container.classList.add('sign-in');
      }, 200);
    }
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      const redirectPath = location.search.startsWith("?redirect=")
        ? decodeURIComponent(location.search.replace("?redirect=", ""))
        : "/me/dash-bord";
      navigate(redirectPath);
    }
    if (isAuthenticated && user.role === "admin") {
      const redirectPath = location.search.startsWith("?redirect=")
        ? decodeURIComponent(location.search.replace("?redirect=", ""))
        : "/me/dash-bord";
      navigate(redirectPath);
    }
  }, [dispatch, navigate, error, user, isAuthenticated, location.search]);

  return (
    <>
        <div ref={containerRef} id="home-container" class="home-container">
          {/* FORM SECTION */}
          <div class="row">
            {/* SIGN UP  */}
            <div class="col align-items-center flex-col sign-up">
              <div class="form-wrapper align-items-center">
                <form onSubmit={registerSubmit} className="form sign-up">
                  <div className='avatar-group'>
                    <img className="avatar" src={avatarPreview} alt="Avatar Preview" />
                  </div>
                  <div className="input-group">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      className={errors['name'] ? 'error' : ''}
                      name="name"
                      value={name}
                      onChange={registerDataChange}
                      placeholder="Name"
                    />
                    {errors['name'] && <span>{errors['name']}</span>}
                  </div>
                  <div className="input-group">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      type="email"
                      className={errors['email'] ? 'error' : ''}
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                      placeholder="Email"
                    />
                    {errors['email'] && <span >{errors['email']}</span>}
                  </div>
                  <div className="input-group">
                    <i className="fa-solid fa-phone"></i>
                    <input
                      type="text"
                      className={errors['phone'] ? 'error' : ''}
                      name="phone"
                      value={phone}
                      onChange={registerDataChange}
                      placeholder="Phone"
                    />
                    {errors['phone'] && <span >{errors['phone']}</span>}
                  </div>
                  <div className="input-group">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type={shoPassword ? 'text' : 'password'}
                      className={errors['password'] ? 'error' : ''}
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                      placeholder="Password"
                    />
                    <i
                      id='show-password'
                      onClick={() => toggleShowpassword()}
                      className={shoPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}
                    ></i>
                    {errors['password'] && <span >{errors['password']}</span>}
                  </div>
                  <div className="input-group">
                    <i className="fa-solid fa-image"></i>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>
                  <button>Sign up</button>
                  <p>
                    <span>Already have an account?</span>
                    <b onClick={() => toggle()} className="pointer">Sign in here</b>
                  </p>
                </form>

              </div>

            </div>
            {/* END SIGN UP  */}
            {/* SIGN IN  */}
            <div class="col align-items-center flex-col sign-in">
              <div class="form-wrapper align-items-center">
                <form onSubmit={loginSubmit} class="form sign-in">
                  <div className="input-group">
                    <i className="fa-regular fa-envelope"></i>
                    <input
                      type="email"
                      className={errors['email'] ? 'error' : ''}
                      name="email"
                      value={email}
                      onChange={registerDataChange}
                      placeholder="Email"
                    />
                    {errors['email'] && <span >{errors['email']}</span>}
                  </div>
                  <div className="input-group">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type={shoPassword ? 'text' : 'password'}
                      className={errors['password'] ? 'error' : ''}
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                      placeholder="Password"
                    />
                    <i
                      id='show-password'
                      onClick={() => toggleShowpassword()}
                      className={shoPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}
                    ></i>
                    {errors['password'] && <span >{errors['password']}</span>}
                  </div>
                  <button>
                    Sign in
                  </button>
                  <p>
                    <b>
                      Forgot password?
                    </b>
                  </p>
                  <p>
                    <span>
                      Don't have an account?
                    </span>
                    <b onClick={() => toggle()} class="pointer">
                      Sign up here
                    </b>
                  </p>
                </form>
              </div>
              <div class="form-wrapper">

              </div>
            </div>
            {/* END SIGN IN  */}
          </div>
          {/* END FORM SECTION  */}
          {/* CONTENT SECTION */}
          <div class="row content-row">

            <div class="col align-items-center flex-col">
              <div class="text sign-in">
                <h2>
                  Welcome
                </h2>

              </div>
              <div class="img sign-in">

              </div>
            </div>
            <div class="col align-items-center flex-col">
              <div class="img sign-up">

              </div>
              <div class="text sign-up">
                <h2>
                  Join with us
                </h2>

              </div>
            </div>

          </div>

        </div>
    </>
  )
}
export default Index