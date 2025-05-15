import axios from 'axios';

const createPublicAPI = (baseURL) => {
  return axios.create({ baseURL });
};

export default createPublicAPI;