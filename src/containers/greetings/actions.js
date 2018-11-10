import 'isomorphic-fetch';


export const types = {
  GET_GREETINGS_BY_NAME: 'GET_GREETINGS_BY_NAME',
  RESET_EXISTING_GREETINGS: 'RESET_EXISTING_GREETINGS',
};


function checkStatus(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}


export function get(url) {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      Accept: 'text/plain',
    }),
  }).then((response) => checkStatus(response))
    .catch((error) => {throw error;});
}


export function getGreetings(userName) {
  const urlPrefix = process.env.REACT_APP_API_URL_PREFIX;
  const entryPoint = process.env.REACT_APP_API_ENTRY_POINT;
  const errorMessage = 'Server not responded, try again later';
  return (dispatch) => {
    get(`${urlPrefix}${entryPoint}?name=${userName}`)
      .then((response) => {
        if (response) {
          response.text().then((text) => {
            dispatch({
              type: types.GET_GREETINGS_BY_NAME,
              greetings: text,
            });
          });
        }
      }).catch(() => {
        dispatch({
        type: types.GET_GREETINGS_BY_NAME,
        greetings: errorMessage,
      });
    });
  };
}

export function resetGreetings() {
  return (dispatch) => {
      dispatch({
        type: types.RESET_EXISTING_GREETINGS,
      });
  };
}
