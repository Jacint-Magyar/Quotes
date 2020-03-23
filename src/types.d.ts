export type Quote = {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
};

export type List = {
  items: string[];
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
};

export type Dispatch = (action: {
  type: string;
  payload: any;
}) => void;
