import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_EDUTUBE_API;
const URL = 'users/2/name';

const axiosGet = async () => {
  try {
    const response = await axios.get(BASE_URL + URL, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJpYXQiOjE3MDEyNDIzNDYsImV4cCI6MTcwMTI0OTU0NiwiaXNzIjoiRkVTUDAxIn0.SdbDY-J4ftD7E0uQyOiAkbW-MCe0eTeEvN9QgcrgP3Q`,
      },
    });

    console.log(response.data.item.name);
    return response.data.item.name;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default axiosGet;
