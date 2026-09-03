import axios from 'axios';
import { BASE__URL } from '../constants';

type authUserProps = {
  username?: string;
  email: string;
  password: string;
};

type authUserReturn = {
  username: string;
  email: string;
  password: string;
  _id: number;
}

export const authUser = (data: authUserProps):Promise<authUserReturn> => {
  return axios.post(
    BASE__URL + '/user/login/',
    data,
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const registerUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios.post(
    BASE__URL + '/user/signup/',
    data,
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};
