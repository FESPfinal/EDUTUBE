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
