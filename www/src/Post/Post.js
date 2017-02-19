import Handlebars from 'handlebars'
import postTemplate from './Post.html'
import moment from 'moment'

function request() {
  const id = location.hash.match(/\/p\/(\d+)/)[1];
  return fetch(`api/post/${id}`, {
    method: 'GET',
  }).then(res => res.json());
}

function generatorContent(data) {
  return Handlebars.compile(postTemplate)(data);
}

export default function (container, scroller) {
  request().then(res => {
    res.createdAt = moment(res.createdAt).format('YYYY-MM-DD');
    container.innerHTML = generatorContent(res);
    scroller.refresh();
  });
}
