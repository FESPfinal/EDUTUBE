export type Step1Data = {
  type: string;
  email: string;
  password: string;
};

export type Step2UserData = {
  type: string;
  name: string;
  address: string;
  phone: string;
  extra: {
    profileImage: string;
    nickname: string;
    contactEmail: string;
    major: string;
  };
};

export type UserItem = {
  _id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  extra: {};
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
