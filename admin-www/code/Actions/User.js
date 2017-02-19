import md5 from 'md5'
import ActionsType from 'ActionsType'

function getInfoRequest() {
  return fetch('/admin/account', {
    method: 'GET',
    credentials: 'include'
  }).then(response => {
    if (response.status === 200) {
      return response.text();
    }
  })
}

export function getInfo() {
  return dispatch => {
    getInfoRequest().then(result => {
      dispatch({
        type: ActionsType.USER_GET_INFO,
        value: result
      });
    })
  }
}

export function login(email, password) {
  return dispatch => {
    const body = {
      email: email,
      password: md5(password)
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch('/admin/login', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return '';
      }
    }).then(result => {
      if (!result) {
        // TODO: login failed
        alert('login failed');
      }
      return getInfoRequest()
    }).then(result => {
      dispatch({
        type: ActionsType.USER_GET_INFO,
        value: result
      });
    })
  }
}
