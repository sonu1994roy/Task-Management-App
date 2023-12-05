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
    RESET_STATE,
    CLEAR_ERRORS,
  } from '../constants/constant';
  
  const initialState = {
    loading: false,
    error: null,
    teams: [],
    team: null,
  };
  
  export const teamReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_TEAM_REQUEST:
      case ALL_TEAMS_REQUEST:
      case GET_TEAM_BY_ID_REQUEST:
      case UPDATE_TEAM_BY_ID_REQUEST:
      case DELETE_TEAM_BY_ID_REQUEST:
      case GET_TEAMS_BY_USER_ID_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_TEAM_SUCCESS:
        return {
          ...state,
          loading: false,
          success:action.payload
        };
      case ALL_TEAMS_SUCCESS:
        return {
          ...state,
          loading: false,
          teams: action.payload,
        };
      case GET_TEAM_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          team: action.payload,
        };
      case UPDATE_TEAM_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated:action.payload
        };
        case DELETE_TEAM_BY_ID_SUCCESS:
          return {
            ...state,
            loading: false,
            isDeleted:action.payload
          };
      case GET_TEAMS_BY_USER_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          teams: action.payload,
        };
      case CREATE_TEAM_FAIL:
      case ALL_TEAMS_FAIL:
      case GET_TEAM_BY_ID_FAIL:
      case UPDATE_TEAM_BY_ID_FAIL:
      case DELETE_TEAM_BY_ID_FAIL:
      case GET_TEAMS_BY_USER_ID_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case RESET_STATE:
        return initialState;
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  

  const initialState1 = {
    loading: false,
    error: null,
    tasks: [],
    task: null,
  };
  
  export const taskReducer = (state = initialState1, action) => {
    switch (action.type) {
      case CREATE_TASK_REQUEST:
      case GET_ALL_TASKS_REQUEST:
      case UPDATE_TASK_BY_ID_REQUEST:
      case DELETE_TASK_BY_ID_REQUEST:
      case GET_ALL_TASKS_FOR_TEAM_MEMBERS_REQUEST:
      case GET_TASK_BY_ID_FOR_USER_REQUEST:
      case UPDATE_COMPLETION_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
      case GET_ALL_TASKS_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: action.payload,
        };
      case UPDATE_TASK_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_TASK_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case GET_ALL_TASKS_FOR_TEAM_MEMBERS_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: action.payload,
        };
      case GET_TASK_BY_ID_FOR_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          task: action.payload,
        };
      case UPDATE_COMPLETION_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          isCompletionUpdated: action.payload,
        };
      case CREATE_TASK_FAIL:
      case GET_ALL_TASKS_FAIL:
      case UPDATE_TASK_BY_ID_FAIL:
      case DELETE_TASK_BY_ID_FAIL:
      case GET_ALL_TASKS_FOR_TEAM_MEMBERS_FAIL:
      case GET_TASK_BY_ID_FOR_USER_FAIL:
      case UPDATE_COMPLETION_STATUS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case RESET_STATE:
          return initialState1;
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
      default:
        return state;
    }
  };
  


  const initialState2 = {
    loading: false,
    error: null,
    notifications: [],
  };
  
  export const notificationReducer = (state = initialState2, action) => {
    switch (action.type) {
      case GET_ALL_NOTIFICATIONS_REQUEST:
      case UPDATE_NOTIFICATION_READ_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: action.payload,
        };
      case UPDATE_NOTIFICATION_READ_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          isReadStatusUpdated: action.payload,
        };
      case GET_ALL_NOTIFICATIONS_FAIL:
      case UPDATE_NOTIFICATION_READ_STATUS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case RESET_STATE:
          return initialState2;
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
      default:
        return state;
    }
  };
  