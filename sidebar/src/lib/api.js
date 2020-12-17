import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://localhost:8000';

axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  return config;
});

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (localStorage.getItem('accessToken')) {
        alert('인증 시간이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        window.location.reload(false);
      } else {
        alert('아이디 또는 패스워드를 확인해주세요');
        window.location.reload(false);
      }
    }
  }
);

// user
export const userLogin = ({ id, password }) =>
  axios.post('/api/users/login', {
    id,
    password,
  });

export const userRegister = ({ id, password, nickname, description }) =>
  axios.post('/api/users', {
    id,
    password,
    nickname,
    description,
  });

export const getUser = () => {
  return axios.get('/api/users/info').then((res) => {
    try {
      whale.storage.local.set({ '/api/users/info': 'not modified' });
      return res;
    } catch (error) {
      console.log('확장앱 API 이용 불가:', error);
      return res;
    }
  });
};

export const isDuplicated = (id) => axios.get(`/api/users/${id}`);

// buckets
export const getBuckets = () => {
  const res = axios.get('/api/buckets').then((res) => {
    try {
      whale.storage.local.set({ '/api/buckets': 'not modified' });
      return res;
    } catch (error) {
      console.log('확장앱 API 이용 불가:', error);
      return res;
    }
  });
  return res;
};
export const getBucketsbyNo = (no) => axios.get(`/api/buckets/${no}`);

export const createBucket = (title, description, details, ref) =>
  axios
    .post('/api/buckets', {
      title,
      description,
      details,
      ref,
    })
    .then((res) => {
      try {
        whale.storage.local.set({ '/api/buckets': 'modified' });
        whale.storage.local.set({ '/api/users/info': 'modified' });
        console.log('버킷 및 유저정보 변경');
        return res;
      } catch (error) {
        console.log('확장앱 API 이용 불가:', error);
        return res;
      }
    });

export const getPresets = (keyword) => axios.get(`/api/buckets/presets?keyword=${keyword}`);

export const updateBucketStatus = ({ no, status }) =>
  axios
    .patch(`/api/buckets/${no}`, {
      status,
    })
    .then((res) => {
      try {
        whale.storage.local.set({ '/api/buckets': 'modified' });
        whale.storage.local.set({ '/api/users/info': 'modified' });
        console.log('버킷 및 유저정보 변경');
        return res;
      } catch (error) {
        console.log('확장앱 API 이용 불가:', error);
        return res;
      }
    });

export const updateBucketInfo = ({ no, title, description }) =>
  axios
    .patch(`/api/buckets/${no}`, {
      title,
      description,
    })
    .then((res) => {
      try {
        whale.storage.local.set({ '/api/buckets': 'modified' });
        whale.storage.local.set({ '/api/users/info': 'modified' });
        console.log('버킷 및 유저정보 변경');
        return res;
      } catch (error) {
        console.log('확장앱 API 이용 불가:', error);
        return res;
      }
    });

// details
export const getDetails = (bucketNo) => axios.get(`/api/details/${bucketNo}`);

export const getDetailsByDDay = (dday) => axios.get(`/api/details/dday/${dday}`);

export const updateDetailStatus = ({ no, status }) =>
  axios
    .patch(`/api/details/${no}`, {
      status,
    })
    .then((res) => {
      try {
        whale.storage.local.set({ '/api/buckets': 'modified' });
        whale.storage.local.set({ '/api/users/info': 'modified' });
        console.log('버킷 및 디테일 및 유저정보 변경');
        return res;
      } catch (error) {
        console.log('확장앱 API 이용 불가:', error);
        return res;
      }
    });

export const updateDetailInfo = ({ no, title, dueDate }) =>
  axios.patch(`/api/details/${no}`, {
    title,
    dueDate,
  });
export const deleteDetail = ({ no }) => axios.delete(`/api/details/${no}`);

export const createDetail = ({ bucketNo, title, dueDate }) =>
  axios
    .post(`/api/details`, {
      bucketNo,
      title,
      dueDate,
    })
    .then((res) => {
      try {
        whale.storage.local.set({ '/api/buckets': 'modified' });
        whale.storage.local.set({ '/api/users/info': 'modified' });
        console.log('버킷 및 디테일 및 유저정보 변경');
        return res;
      } catch (error) {
        console.log('확장앱 API 이용 불가:', error);
        return res;
      }
    });

// achieves
export const setAchieves = ({ bucketNo, description }) =>
  axios
    .post('/api/achieves', {
      bucketNo,
      description,
    })
    .then((res) => {
      try {
        whale.storage.local.set({ '/api/buckets': 'modified' });
        whale.storage.local.set({ '/api/users/info': 'modified' });
        console.log('버킷 및 디테일 및 유저정보 변경');
        return res;
      } catch (error) {
        console.log('확장앱 API 이용 불가:', error);
        return res;
      }
    });

export const updateAchieves = ({ achieveNo, description }) =>
  axios
    .put(`/api/achieves/${achieveNo}`, {
      description,
    })
    .then((res) => {
      try {
        whale.storage.local.set({ '/api/buckets': 'modified' });
        whale.storage.local.set({ '/api/users/info': 'modified' });
        console.log('버킷 및 디테일 및 유저정보 변경');
        return res;
      } catch (error) {
        console.log('확장앱 API 이용 불가:', error);
        return res;
      }
    });

export const uploadObjectStorage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    header: { 'content-type': 'multipart/form-data' },
  };
  return axios.post(`/api/upload/`, formData, config);
};

// follow
export const setFollowing = (followingNo) => axios.post('/api/follows', { followingNo });
export const deleteFollowing = (no) => axios.delete(`/api/follows/${no}`);

export const getFollowedUsers = () => axios.get('/api/follows/followedusers');
export const getFollowingUsers = () => axios.get('/api/follows/followingusers');
export const searchUser = (keyword) => axios.get(`/api/follows/search?keyword=${keyword}`);
export const getUserInfo = (no) => axios.get(`/api/users/info/${no}`);
export const isFollowing = ({ following, followed }) =>
  axios.get(`/api/follows/isfollowing?following=${following}&followed=${followed}`);

// feed
export const getFeeds = () => axios.get('/api/feeds');
