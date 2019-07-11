import {
  ADD_PHONE,
  ADD_PASSWORD,
  DEM,
  ADD_ID,
  PROFLIE,
  STARTLEVEL,
  STARTRANGE,
  ENDLEVEL,
  ENDRANGE,
} from '../action/actionTypes';

const initialState = {
  task: [],
};

export const taskReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHONE:
      return {
        ...state,
        taskPhone: action.taskPhone,
      };
    case ADD_PASSWORD:
      return {
        ...state,
        taskPassword: action.taskPassword,
      };
    case DEM:
      return {
        ...state,
        taskDem: action.taskDem,
      };
    case ADD_ID:
      return {
        ...state,
        taskId: action.taskId,
      };
    case PROFLIE:
      console.log (action.taskoj, 'redux');
      return {
        ...state,
        taskoj: action.taskoj,
      };
    case STARTLEVEL:
      console.log (action.taskstartlevel, 'redux');
      return {
        ...state,
        taskstartlevel: action.taskstartlevel,
      };
    case STARTRANGE:
      console.log (action.taskstartrange, 'redux');
      return {
        ...state,
        taskstartrange: action.taskstartrange,
      };
    case ENDLEVEL:
      console.log (action.taskendlevel, 'redux');
      return {
        ...state,
        taskendlevel: action.taskendlevel,
      };
    case ENDRANGE:
      console.log (action.taskendrange, 'redux');
      return {
        ...state,
        taskendrange: action.taskendrange,
      };
    default:
      return state;
  }
};
