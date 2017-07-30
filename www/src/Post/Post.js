import Handlebars from 'handlebars'
import layoutTemplate from './Layout.html'
import postTemplate from './Post.html'
import moment from 'moment'

export function request(moreId) {
  const id = moreId || location.hash.match(/\/p\/(\d+)/)[1];
  return fetch(`api/post/${id}`, {
    method: 'GET',
  }).then(res => res.json());
}

function generatorLayout(content) {
  return Handlebars.compile(layoutTemplate)({content});
}

export function generatorContent(data) {
  return Handlebars.compile(postTemplate)(data);
}

export function getIdByUrl(url) {
  return url.match(/\/p\/(\d+)/)[1]
}

export default function (container, scroller) {
  const id = getIdByUrl(location.hash);
  request(id).then(res => {
    res.createdAt = moment(res.createdAt).format('YYYY-MM-DD');
    container.innerHTML = generatorLayout(generatorContent(res));
    scroller.refresh();
  });
}
