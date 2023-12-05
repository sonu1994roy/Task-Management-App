import React, { useState, useEffect } from 'react'
import Heading from '../../../compponate/Table/Heading'
import DropdwonShowEntire from '../../../compponate/Table/dropdownShowEntire'
import Search from '../../../compponate/Table/searchQuery'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, deleteTeamById, getAllTeams , resetState } from "../../../actions/action";
import Table from '../../../compponate/Table/table'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const columns = [
    {
        dataField: 'id',
        text: '#',
    },
    {
        dataField: 'name',
        text: 'Team_Name',
    },
    {
        dataField: 'Teams',
        text: 'Teams_members',
    },
];

function ListTeam() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading, error,  teams,  isDeleted} = useSelector((state) => state.team);
    const [Delet, setDelet] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [dltId, setdltId] = useState("")
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(2)

    const handleClickDlted = (id) => {
        setDelet(true)
        setdltId(id)
    }
    const deleteProductHandler = () => {
        dispatch(deleteTeamById(dltId));
        setDelet(false)
    };
    const navigateViewHandler = (id) => {
        navigate(`/Team/update-team/${id}`)
    }
    const navigateHandler = () => {
        navigate('/Team/new-team')
    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if ( isDeleted) {
            toast.success( isDeleted);
            // Dispatch the reset action to clear the state
            dispatch(resetState());

        }
        dispatch(getAllTeams(query, currentPage, limit, ['name']));
    }, [dispatch, query, currentPage, error, limit,  isDeleted]);

    
    return (
        <>
            <div className='row'>
                <div className="col-md-12">
                    <Heading click={navigateHandler} title={'Team List'} btnTitle={'Create New team'} isShowBtn={true} />
                </div>
                <div className="col-md-12 mt-4">
                    <div className="card shadow border-0">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='d-flex justify-content-between align-items-center  mb-3'>
                                        <DropdwonShowEntire name="limit" value={limit} onChange={(e) => setLimit(parseInt(e.target.value))} options={[10, 20, 30, 50, 100]} />
                                        <Search value={query}
                                            onChange={(e) => setQuery(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <Table
                                        column={columns}
                                        data={teams.teams}
                                        dltClick={handleClickDlted}
                                        viewClick={navigateViewHandler}
                                        hidebtn={true}
                                    />
                                </div>
                            </div>
                            <div id="deleteEmployeeModal" className={Delet ? "modal show d-block fade" : "modal fade"}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Delete Items</h4>
                                            <button onClick={() => setDelet(false)} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete these Records?</p>
                                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                                        </div>
                                        <div className="modal-footer">
                                            <input type="button" onClick={() => setDelet(false)} className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                            <input type="submit" onClick={deleteProductHandler} className="btn btn-danger" value="Delete" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ListTeam