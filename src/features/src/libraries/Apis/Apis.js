import axios from 'axios';
import {AsyncStorage} from 'react-native';

var instance = axios.create ({
  baseURL: 'http://app-dating.yez.vn/api',
  timeout: 10000,
});

async function fetch (url,isAuth){
  let id = await AsyncStorage.getItem ('TOKEN');
  console.log (id, 'id tokennnnn');
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
    };
  }
  return instance
    .get (url,  {
      headers,
    })
    .then (response => {
      return response.data;
    })
    .catch (error => {
      return error;
    });
};
async function fetchdata  (url,data ,isAuth) {
  let id = await AsyncStorage.getItem ('TOKEN');
  console.log (id, 'id tokennnnn');
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
    };
  }

  return instance
    .get (url, {...data},{
      headers,
    })
    .then (response => {
      return response.data;
    })
    .catch (error => {
      return error;
    });
};

function postlogin (url, data, isAuth) {
  console.log(data,'datalogin')
  let headers = null;
  if (isAuth) {
    headers = {};
  }

  return instance
    .post (
      url,
      {...data},
      {
        headers,
      }
    )
    .then (response => {
      console.log ('object', response);
      return response;
    })
    .catch (error => {
      return error;
    });
}
function postregister (url, data, isAuth) {
  let headers = null;
  if (isAuth) {
    headers = {};
  }

  return instance
    .post (
      url,
      {...data},
      {
        headers,
      }
    )
    .then (response => {
      console.log ('object', response);
      return response.data;
    })
    .catch (error => {
      return error;
    });
}

async function post (url, data, isAuth) {
  console.log(data,'datasetting')
  let id = await AsyncStorage.getItem ('TOKEN');
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
    };
  }
  return instance
    .post (
      url,
      {...data},
      {
        headers,
      }
    )
    .then (response => {
      console.log ('object', response);
      return response.data;
    })
    .catch (error => {
      console.log(`erorr, response`, error)
      return error;
    });
}

async function postprofile (url, data, isAuth) {
  //console.log(data[2],'datapostprofile')
  console.log(data,'trc xoa')
  // for (var i in data){
  //   if (!data[i] ){
  //     delete data[i]; 
  //   }
  // }
  console.log(data,'datapostprofile')
  let id = await AsyncStorage.getItem ('TOKEN');
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
    };
  }
  return instance
    .post (
      url,
      {...data},
      {
        headers,
      }
    )
    .then (response => {
      console.log ('object', response);
      return response.data;
    })
    .catch (error => {
      console.log(`erorr, response`, error)
      return error;
    });
}

async function postUploadImg (image, isAuth) {
  // console.log(image,'imgdfata')
  let id = await AsyncStorage.getItem ('TOKEN');
  // console.log (image, isAuth);
  let headers = null;
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
      'Content-Type': 'multipart/form-data',
    };
  }
  const formData = new FormData ();
  if (!Array.isArray (image)) image = [image];
  image.map (item => {
    let imageName = new Date().getTime() + new Date().getMilliseconds() + (item.height + item.width).toString() + new Date().getSeconds() + '.png';
    console.log(imageName, 'namessss')
    formData.append ('image[]', {
      uri: item.uri || item.path,
      name: imageName,
      type: 'image/jpeg',
    });
  });
   console.log(image, 'day sssss')
  return instance
    .post (`/upload_image_user`, formData, {
      headers,
    })
    .then (response => {
      console.log (response, 'upload');
      return response.data;
    })
    .catch (error => {
      // console.log (error);
      return error;
    });
}


async function postForm(url, data, isAuth) {
  // console.log(data)
  let id = await AsyncStorage.getItem ('TOKEN');
  let formData = new FormData();
  Object.keys(data).forEach(key =>{
    const value = data[key];
    if(Array.isArray(value)){
      value.forEach(val => formData.append(`${key}`, val));
    }
    formData.append(key, value);
  })
  let headers = null
  if (isAuth) {
    headers = {
      Authorization: `Bearer ${id}`,
    }
  }
  return instance.post(url, formData , {
    headers
  }).then((response) => response.data).catch(error => {
    console.log(error, 'loi ')
  })
}

export default (apis = {
  PATH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGIN_FB: '/login_facebook',
    LOGIN_GG: '/login_google',
    CHECK: '/check_isset',
    CHECK_PHONE: '/check_phone_email',
    CHANGE_PASSWORD: '/change_password',
    HOBBIES: '/hobbies',
    INFOR: '/infomation',
    UPDATE_USER: '/user/update_user',
    USER_HOBBIES:'/user_hobbies',
    UPDATE_INFO:'/update_info',
    UPDATE_INFOMATION:'/update_information',
    USER : '/user',
    UPDATE_PROFILE:'/update_profile',
    UPDATE_HOBBIES:'/update_hobbies',
    UESR_INFO:'/user_info?personal_id=',
    UPDATE_SETTING:'/update_setting',
    SHOW_SETTING:'/show_setting',
    SHOW_INFO:"/show_information?personal_id=",
    SENTOTP:'/otp_email',
    CHECK_OTP:'/check_otp',
    UPDATE_FILLTER:'/update_filter',
    GET_FILLTER:'/filter_user',
    LAT_LONG:'/lat_longitude'
  },
  fetchdata,
  fetch,
  post,
  postUploadImg,
  postlogin,
  postregister,
  postForm,
  postprofile
});
