import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Loader from "../../../compponate/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../actions/userAction";
import { clearErrors, createTeam, updateTeamById, getTeamById } from "../../../actions/action";
import { RESET_STATE } from "../../../constants/constant";
import { useNavigate, useParams } from "react-router-dom";
import Search from '../../../compponate/Table/searchQuery'
const CreateTeam = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useParams();
    const id = location.id
    const [errors, setErrors] = useState({});
    const [formState, setFormState] = useState({
        name: '',
        department: '',
        members: [],
    });

    const { name, department, members } = formState;
    const [teamMembers, setTeamMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(2)
    const { error, success, loading, team, isUpdated } = useSelector((state) => state.team);
    const { users } = useSelector((state) => state.allUsers);

    // start drag
    const handleDragStart = (e, member) => {
        e.dataTransfer.setData('member', JSON.stringify(member));
    };
    //   drop
    const handleDrop = (e) => {
        e.preventDefault();
        const memberId = JSON.parse(e.dataTransfer.getData('member'));
        const selectedMember = users.find((member) => member._id.toString() === memberId._id);
        if (selectedMember) {
            const isMemberAlreadyAdded = teamMembers.some((member) => member._id === selectedMember._id);
            if (isMemberAlreadyAdded) {
                toast.error("Member already added to the team");
            } else {
                setTeamMembers([...teamMembers, selectedMember]);
                setFormState({
                    ...formState,
                    members: [...members, selectedMember._id],
                });
            }
        }
    };

    //  remove drop
    const handleRemoveMember = (memberId) => {
        const updatedTeamMembers = teamMembers.filter((member) => member._id !== memberId);
        const updatedMembers = members.filter((member) => member._id !== memberId);

        setTeamMembers(updatedTeamMembers);
        setFormState({
            ...formState,
            members: updatedMembers,
        });
    };

    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };



    const formSubmit = (e) => {
        console.log(formState)
        e.preventDefault();
        const validateFields = ['name', 'department', 'members'];
        const newErrors = {};
        validateFields.forEach((field) => {
            if (!formState[field] || formState[field] === '') {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("department", department);
        myForm.set("members", JSON.stringify(members));

        if (location.id) {
            dispatch(updateTeamById(id, myForm));
        } else {
            dispatch(createTeam(myForm));
        }
    };

    useEffect(() => {
        if (id) {
            if (!team || team._id !== id) {
              dispatch(getTeamById(id));
            } else if (team && team._id === id) {
              if (team.members && Array.isArray(team.members)) {
                setFormState({
                  name: team.name,
                  department: team.department,
                  members: team.members.map(user => user._id),
                });
                setTeamMembers(team.members);
              }
            }
          } else {
            setFormState({
              name: '',
              department: '',
              members: [],
            });
          }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("success");
            navigate("/Team/list-team");
            dispatch({
                type: RESET_STATE,
            });
        }
        if (success) {
            toast.success("success");
            navigate("/Team/list-team");
            dispatch({
                type: RESET_STATE,
            });
        }
        dispatch(getAllUsers(query, currentPage, limit, ['name']));
    }, [dispatch,navigate,id, error,isUpdated,  success ,team ,query, currentPage,  limit]);
 console.log(team)
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="d-flex flex-column align-items-center py-3 justify-content-center">
                                <h2 className="resetPasswordHeading">Create Team</h2>
                                <form onSubmit={formSubmit} className="form sign-in">
                                    <div className="input-group">
                                        <input
                                            type='text'
                                            className={errors['name'] ? 'error' : ''}
                                            name="name"
                                            value={name}
                                            onChange={handleInputChange}
                                            placeholder="Enter Team Name"
                                        />
                                        {errors['name'] && <span >{errors['name']}</span>}
                                    </div>
                                    <div className="input-group">
                                        <input
                                            type='text'
                                            className={errors['department'] ? 'error' : ''}
                                            name="department"
                                            placeholder="Enter Team Department"
                                            value={department}
                                            onChange={handleInputChange}

                                        />
                                        {errors['department'] && <span >{errors['department']}</span>}
                                    </div>
                                    <div className="input-group">

                                        <div style={{ height: "15rem" }}
                                            className="team-container"
                                            onDrop={handleDrop}
                                            onDragOver={(e) => e.preventDefault()}
                                        >
                                            <ul className="card w-100">
                                                {/* Render users as draggable list items */}
                                                {teamMembers && teamMembers.map((member) => (
                                                    <li
                                                        className="d-flex border justfy-content-between m-2 p-2 "
                                                        key={member._id}
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, member)}
                                                        value={member._id}
                                                    >
                                                        <div className='avatar-group mr-3  m-0'>
                                                            <img className="avatar" src={member.avatar?.url} alt="Avatar Preview" />
                                                        </div>
                                                        <span className="">{member.name}</span>
                                                        <span className="remove-btn" onClick={() => handleRemoveMember(member._id)}>X</span>

                                                    </li>
                                                ))}
                                            </ul>

                                        </div>
                                        {errors['members'] && <span>{errors['members']}</span>}
                                    </div>

                                    <button type="submit"> {id?'Update' :'Save'}</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="d-flex flex-column align-items-center py-3 justify-content-center">
                                <h2 className="resetPasswordHeading">Select Team</h2>
                                <Search value={query}
                                            onChange={(e) => setQuery(e.target.value)} />
                                <ul className="card w-100">
                                    {/* Render users as draggable list items */}
                                    {users && users.map((member) => (
                                        <li
                                            className="d-flex border justfy-content-between m-2 p-2 "
                                            key={member.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, member)}
                                            value={member}
                                        >
                                            <div className='avatar-group mr-3 m-0'>
                                                <img className="avatar" src={member.avatar?.url} alt="Avatar Preview" />
                                            </div>
                                            <span>{member.name}</span>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default CreateTeam;

