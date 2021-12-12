export interface filterParam {
  _page: number;
  _list: number;

  [key: string]: any;
}

export type ResponseGenerator = {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  result?: any;
};
