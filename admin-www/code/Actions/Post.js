import ActionsType from 'ActionsType'

export function add(data) {
  return dispatch => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch('admin/post', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(response => {
      if (response.statusText === 'Created') {
        return response.json();
      }
      return response.text();
    }).then(result => {
      if (typeof result === 'object' && result.id) {
        dispatch({
          type: ActionsType.POST_ADD_SUCCESS,
          data: result
        });
      } else {
        dispatch({
          type: ActionsType.POST_ADD_FAILED,
          data: result
        });
      }
    });
  }
}

export function edit(id, data) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return dispatch => {
    fetch(`admin/post/${id}`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status >= 200) {
        dispatch({
          type: ActionsType.POST_EDIT,
          data: data
        });
      }
    });
  }
}

export function reset() {
  return {
    type: ActionsType.POST_ADD_RESET
  }
}

export function list(offset = 0, size = 10, isAppend = false) {
  // TODO: no more
  return dispatch => {
    const query = `offset=${offset}&size=${size}`;
    fetch(`admin/post?${query}`, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      if (response.status === 200) {
        return Promise.all([
          response.headers['X-Total'],
          response.json()
        ]);
      } else {
        // TODO: friendly error output
        alert('load data error')
      }
    }).then(result => {
      if (result instanceof Array) {
        const type = isAppend ? ActionsType.POST_LIST_APPEND : ActionsType.POST_LIST;
        dispatch({type, total: result[0], data: result[1]});
      }
    });
  }
}

export function remove(id) {
  return dispatch => {
    fetch(`admin/post/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(response => {
      if (response.status === 200) {
        dispatch({
          type: ActionsType.POST_DELETE,
          data: +id
        })
      }
    });
  }
}

export function getCurrentContent(id) {
  return dispatch => {
    fetch(`admin/post/${id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        // TODO: friendly error output
        alert('load data error')
      }
    }).then(data => {
      if (typeof data === 'object') {
        dispatch({
          type: ActionsType.POST_GET_CURRENT,
          data
        });
      }
    });
  }
}
