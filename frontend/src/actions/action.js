import axios from "axios";
import {
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAIL,
    ALL_TEAMS_REQUEST,
    ALL_TEAMS_SUCCESS,
    ALL_TEAMS_FAIL,
    GET_TEAM_BY_ID_REQUEST,
    GET_TEAM_BY_ID_SUCCESS,
    GET_TEAM_BY_ID_FAIL,
    UPDATE_TEAM_BY_ID_REQUEST,
    UPDATE_TEAM_BY_ID_SUCCESS,
    UPDATE_TEAM_BY_ID_FAIL,
    DELETE_TEAM_BY_ID_REQUEST,
    DELETE_TEAM_BY_ID_SUCCESS,
    DELETE_TEAM_BY_ID_FAIL,
    GET_TEAMS_BY_USER_ID_REQUEST,
    GET_TEAMS_BY_USER_ID_SUCCESS,
    GET_TEAMS_BY_USER_ID_FAIL,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAIL,
    GET_ALL_TASKS_REQUEST,
    GET_ALL_TASKS_SUCCESS,
    GET_ALL_TASKS_FAIL,
    UPDATE_TASK_BY_ID_REQUEST,
    UPDATE_TASK_BY_ID_SUCCESS,
    UPDATE_TASK_BY_ID_FAIL,
    DELETE_TASK_BY_ID_REQUEST,
  DELETE_TASK_BY_ID_SUCCESS,
  DELETE_TASK_BY_ID_FAIL,
    GET_ALL_TASKS_FOR_TEAM_MEMBERS_REQUEST,
    GET_ALL_TASKS_FOR_TEAM_MEMBERS_SUCCESS,
    GET_ALL_TASKS_FOR_TEAM_MEMBERS_FAIL,
    GET_TASK_BY_ID_FOR_USER_REQUEST,
    GET_TASK_BY_ID_FOR_USER_SUCCESS,
    GET_TASK_BY_ID_FOR_USER_FAIL,
    UPDATE_COMPLETION_STATUS_REQUEST,
    UPDATE_COMPLETION_STATUS_SUCCESS,
    UPDATE_COMPLETION_STATUS_FAIL,
    GET_ALL_NOTIFICATIONS_REQUEST,
    GET_ALL_NOTIFICATIONS_SUCCESS,
    GET_ALL_NOTIFICATIONS_FAIL,
    UPDATE_NOTIFICATION_READ_STATUS_REQUEST,
    UPDATE_NOTIFICATION_READ_STATUS_SUCCESS,
    UPDATE_NOTIFICATION_READ_STATUS_FAIL,
    GET_ALL_TASK_COMPLETIONS_REQUEST,
    GET_ALL_TASK_COMPLETIONS_SUCCESS,
    GET_ALL_TASK_COMPLETIONS_FAIL,
    GET_TASK_COMPLETION_BY_ID_REQUEST,
    GET_TASK_COMPLETION_BY_ID_SUCCESS,
    GET_TASK_COMPLETION_BY_ID_FAIL,
    RESET_STATE,
    CLEAR_ERRORS,
  } from '../constants/constant';
  

export const createTeam = (teamData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_TEAM_REQUEST });
  
      const { data } = await axios.post(`/api/v1/teams`, teamData, );
      dispatch({ type: CREATE_TEAM_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: CREATE_TEAM_FAIL, payload: error.response.data.message });
    }
  };
  
  export const getAllTeams = (
    query = "",
    currentPage = 1,
    limit,
    searchFields = []
  ) => async (dispatch) => {
    try {
      dispatch({ type: ALL_TEAMS_REQUEST });
  
      let link = `/api/v1/teams?page=${currentPage}&limit=${limit}`;
      if (searchFields.length > 0) {
        const fieldsQueryParam = searchFields.join(',');
        link = `/api/v1/teams?keyword=${query}&page=${currentPage}&limit=${limit}&fields=${fieldsQueryParam}`;
      }
  
      const { data } = await axios.get(link, );
      dispatch({
        type: ALL_TEAMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_TEAMS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const getTeamById = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_TEAM_BY_ID_REQUEST });
  
      const { data } = await axios.get(`/api/v1/teams/${id}`, );
      dispatch({ type: GET_TEAM_BY_ID_SUCCESS, payload: data.data});
    } catch (error) {
      dispatch({ type: GET_TEAM_BY_ID_FAIL, payload: error.response.data.message });
    }
  };
  
  export const updateTeamById = (id, updatedTeamData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TEAM_BY_ID_REQUEST });
  
      const { data } = await axios.put(`/api/v1/teams/${id}`, updatedTeamData, );
      dispatch({ type: UPDATE_TEAM_BY_ID_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: UPDATE_TEAM_BY_ID_FAIL, payload: error.response.data.message });
    }
  };
  
  export const deleteTeamById = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_TEAM_BY_ID_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/teams/${id}`, );
      dispatch({ type: DELETE_TEAM_BY_ID_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_TEAM_BY_ID_FAIL, payload: error.response.data.message });
    }
  };
  
  export const getTeamsByUserId = () => async (dispatch) => {
    try {
      dispatch({ type: GET_TEAMS_BY_USER_ID_REQUEST });
  
      const { data } = await axios.get(`/api/v1/user/teams`, );
      dispatch({ type: GET_TEAMS_BY_USER_ID_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: GET_TEAMS_BY_USER_ID_FAIL, payload: error.response.data.message });
    }
  };




export const createTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TASK_REQUEST });

    const { data } = await axios.post('/api/v1/tasks', taskData);
    dispatch({ type: CREATE_TASK_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: CREATE_TASK_FAIL, payload: error.response.data.message });
  }
};

export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TASKS_REQUEST });

    const { data } = await axios.get('/api/v1/tasks');
    dispatch({ type: GET_ALL_TASKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_TASKS_FAIL, payload: error.response.data.message });
  }
};

export const updateTaskById = (id, updatedTaskData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TASK_BY_ID_REQUEST });

    const { data } = await axios.put(`/api/v1/tasks/${id}`, updatedTaskData);
    dispatch({ type: UPDATE_TASK_BY_ID_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_TASK_BY_ID_FAIL, payload: error.response.data.message });
  }
};

export const deleteTaskById = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TASK_BY_ID_REQUEST });

    const { data } = await axios.delete(`/api/v1/tasks/${id}`);
    dispatch({ type: DELETE_TASK_BY_ID_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_TASK_BY_ID_FAIL, payload: error.response.data.message });
  }
};

export const getAllTasksForTeamMembers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TASKS_FOR_TEAM_MEMBERS_REQUEST });

    const { data } = await axios.get('/api/v1/user/tasks');
    dispatch({ type: GET_ALL_TASKS_FOR_TEAM_MEMBERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_TASKS_FOR_TEAM_MEMBERS_FAIL, payload: error.response.data.message });
  }
};

export const getTaskByIdForUser = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TASK_BY_ID_FOR_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/user/tasks/${taskId}`);
    dispatch({ type: GET_TASK_BY_ID_FOR_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TASK_BY_ID_FOR_USER_FAIL, payload: error.response.data.message });
  }
};

export const updateCompletionStatusForTeamOrIndividual = (taskId, statusData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COMPLETION_STATUS_REQUEST });

    const { data } = await axios.put(`/api/v1/tasks/${taskId}/completions`, statusData);
    dispatch({ type: UPDATE_COMPLETION_STATUS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_COMPLETION_STATUS_FAIL, payload: error.response.data.message });
  }
};


export const getAllNotifications = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_NOTIFICATIONS_REQUEST });

    const { data } = await axios.get('/api/v1/user/notifications');
    dispatch({ type: GET_ALL_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_NOTIFICATIONS_FAIL, payload: error.response.data.message });
  }
};

export const updateNotificationReadStatus = (notificationId) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NOTIFICATION_READ_STATUS_REQUEST });

    const { data } = await axios.put(`/api/v1/user/notifications/${notificationId}`);
    dispatch({ type: UPDATE_NOTIFICATION_READ_STATUS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_NOTIFICATION_READ_STATUS_FAIL, payload: error.response.data.message });
  }
};


export const getAllTaskCompletions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TASK_COMPLETIONS_REQUEST });

    const { data } = await axios.get('/api/v1/taskCompletions');
    dispatch({ type: GET_ALL_TASK_COMPLETIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_TASK_COMPLETIONS_FAIL, payload: error.response.data.message });
  }
};

export const getTaskCompletionById = (taskCompletionId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TASK_COMPLETION_BY_ID_REQUEST });

    const { data } = await axios.get(`/api/v1/taskCompletions/${taskCompletionId}`);
    dispatch({ type: GET_TASK_COMPLETION_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TASK_COMPLETION_BY_ID_FAIL, payload: error.response.data.message });
  }
};

  // Create a new action creator to reset the state
export const resetState = () => ({
    type: RESET_STATE,
  });
  
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };