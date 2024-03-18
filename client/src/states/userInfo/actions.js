export const SET_DATA = 'userInfo/SET_DATA';

const setData = (key, value) => ({
  type: SET_DATA,
  payload: { key, value },
});

export default setData;