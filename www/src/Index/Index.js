import Handlebars from 'handlebars'
import indexTemplate from './Index.html'
import itemTemplate from './Item.html'
import moment from 'moment'
import {request as requestPost, generatorContent, getIdByUrl} from '../Post/Post'

const SIZE = 20;
let offset = 0;
let noMore = false;
let listHtml = '';

function request() {
  const query = `offset=${offset}&size=${SIZE}`;
  let total;
  return fetch(`api/post?${query}`, {
    method: 'GET',
  }).then(res => {
    total = res.headers.get('X-total');
    return res.json()
  }).then(json => {
    offset += json.length;
    if (total >= offset) {
      noMore = true;
    }
    return json;
  })
}

function generatorItem(data) {
  return Handlebars.compile(itemTemplate)(data);
}

export default function (container, scroller) {
  container.innerHTML = indexTemplate;

  if (noMore) {
    container.querySelector('.list').innerHTML = listHtml;
    scroller.refresh();
    return;
  }

  function loadItem(res = []) {
    let html = '';
    res.forEach(item => {
      item.createdAt = moment(item.createdAt).format('YYYY-MM-DD');
      html += generatorItem(item);
    });
    listHtml += html;
    container.querySelector('.list').innerHTML = listHtml;
    scroller.refresh();
  }

  request().then(loadItem);
  scroller.bindNextPage(() => {
    if (!noMore) {
      return request().then(loadItem)
    }
  })

  document.body.addEventListener('click', e => {
    if (e.metaKey) return; // press cmd key to open new tab
    if (e.target.classList.contains('more')) {
      const id = getIdByUrl(e.target.href);
      if (!id) return;
      requestPost(id).then(res => {
        res.createdAt = moment(res.createdAt).format('YYYY-MM-DD');
        e.target.parentNode.innerHTML = generatorContent(res);
        scroller.refresh();
      });
      e.stopPropagation();
      e.preventDefault()
      //
    }
  })
}
