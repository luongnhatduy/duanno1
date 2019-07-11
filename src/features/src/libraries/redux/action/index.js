import{ADD_PHONE,ADD_PASSWORD,DEM,ADD_ID,PROFLIE,STARTLEVEL,ENDLEVEL,STARTRANGE,ENDRANGE} from './actionTypes'
export const Addphone = inputPhone => {
  return {
    type: ADD_PHONE,
    taskPhone: inputPhone
  };
};

export const Addpassword = inputPassword => {
  return {
    type: ADD_PASSWORD,
    taskPassword: inputPassword
  };
};

export const Tangdem = inputDem => {
  return {
    type: DEM,
    taskDem: inputDem
  };
};

export const AddID = inputId => {
  return {
    type: ADD_ID,
    taskId: inputId
  };
};
export const Profile = inputoj => {
  return {
    type: PROFLIE,
    taskoj: inputoj
  };
};

export const StartLevel = input => {
  return {
    type: STARTLEVEL,
    taskstartlevel: input
  };
};

export const EndLevel = inputoj=> {
  return {
    type: ENDLEVEL,
    taskendlevel: inputoj
  };
};

export const StartRange = inputoj => {
  return {
    type: STARTRANGE,
    taskstartrange: inputoj
  };
};

export const EndRange = inputoj => {
  return {
    type: ENDRANGE,
    taskendrange: inputoj
  };
};


