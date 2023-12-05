import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Loader from "../../compponate/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import './user.css';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [NewPasswordFormData, setNewPasswordFormData,] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const { oldPassword, newPassword, confirmPassword } = NewPasswordFormData;

    const { error, isUpdated, loading } = useSelector((state) => state.profile);


    //  onchange input value handle 
    const registerDataChange = (e) => {
        setNewPasswordFormData({ ...NewPasswordFormData, [e.target.name]: e.target.value });
    };
    //   submit  form data 
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const validateFields = ['oldPassword', 'newPassword', 'confirmPassword',];
        const newErrors = {};
        validateFields.forEach((field) => {
            if (!NewPasswordFormData[field] || NewPasswordFormData[field].trim() === '') {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });
        // if any error availble then return and  stop next call
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Clear errors if there are none
        setErrors({});

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully");
            navigate("/me/dash-bord");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="d-flex  flex-column align-items-center p-4 justify-content-center">
                        <h2 className="resetPasswordHeading">Update Password</h2>
                        <div class="align-items-center">
                            <form onSubmit={updatePasswordSubmit} class="form sign-in">
                                <div className="input-group">
                                    <i className="fa-regular fa-envelope"></i>
                                    <input
                                        type='password'
                                        className={errors['oldPassword'] ? 'error' : ''}
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={registerDataChange}
                                        placeholder="Old Password"
                                    />
                                    {errors['oldPassword'] && <span >{errors['oldPassword']}</span>}
                                </div>
                                <div className="input-group">
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                   type='password'
                                        className={errors['newPassword'] ? 'error' : ''}
                                        name="newPassword"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={registerDataChange}

                                    />
                                    {errors['newPassword'] && <span >{errors['newPassword']}</span>}
                                </div>
                                <div className="input-group">
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        type='password'
                                        className={errors['confirmPassword'] ? 'error' : ''}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={registerDataChange}
                                        placeholder="Confirm Password"
                                    />
                                    {errors['confirmPassword'] && <span >{errors['confirmPassword']}</span>}
                                </div>
                                <button>
                                   Update
                                </button>
        
                                <p>
                                    <span>
                                        Don't have a Chnage?
                                    </span>
                                    <b onClick={() => navigate('/me/dash-bord')} class="pointer">
                                        cancel
                                    </b>
                                </p>
                            </form>
                        </div>

                    </div>
                </>
            )}
        </>
    );
};

export default UpdatePassword;
