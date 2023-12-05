import React, { useEffect,useState } from "react";
import Loader from "../../compponate/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import './user.css';

const UpdateProfile = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [phone, setPhone] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("phone", phone);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
       
    };
    
    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone)
            setAvatarPreview(user?.avatar?.url);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully");
            dispatch(loadUser());

           navigate("/me/acount");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error,toast , , user, isUpdated]);

    const [toggleClass, settoggleClass] = useState(false)
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                <div className="container h-100 d-block margin-auto">
                            <div className="login-form">
                                <form encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}>
                                    <div ><img className="avatar" src={avatarPreview} alt="Avatar Preview" /></div>
                                    <h4 className="modal-title">Update Profile</h4>
                                    <div className="form-group">
                                        <div className='Input-box align-center'>
                                            <i className="fa  fa-id-card text-primary prefix grey-text"></i>
                                            <input type="text"
                                                placeholder="Name"
                                                required
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} id="defaultForm-email" className="form-control validate" /><br />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className='Input-box align-center'>
                                            <i className="fa fa-envelope text-primary prefix grey-text"></i>
                                            <input type="email"
                                                placeholder="Email"
                                                required
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} id="defaultForm-email" className="form-control validate" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className='Input-box align-center'>
                                            <i className="fa fa-phone  text-primary prefix grey-text"></i>
                                            <input type="number"
                                                placeholder="phone"
                                                required
                                                name="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)} id="defaultForm-email" className="form-control validate" />
                                        </div>
                                    </div>

                                    <div className='form-group'>

                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange} />

                                    </div>

                                    <input type="submit" className="btn btn-primary btn-block btn-lg" value="Update" />
                                </form>

                            </div>
                        </div>
                  

                </>
            )}
        </>
    );
};

export default UpdateProfile;
