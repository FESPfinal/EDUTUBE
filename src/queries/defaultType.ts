type DefaultPlayResponse = {
  result: number;
  resultString: string;
  desc: string;
};

type DefaultResponse = {
  Result?: number;
  ResultString?: string;
  Desc?: string;
};

type DefaultPagingParam = {
  page: number;
  size: number;
};

export type { DefaultPlayResponse, DefaultResponse, DefaultPagingParam };
