export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export function createRequestType(base: string) {
  if (!base) {
    throw new Error('cannot create request type ');
  }
  return [REQUEST, SUCCESS, FAILURE].reduce((acc: any, type: any) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createAction(type: any, payload: object = {}) {
  return {
    type,
    ...payload,
  };
}
