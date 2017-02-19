import Handlebars from 'handlebars'
import indexTemplate from './Index.html'
import itemTemplate from './Item.html'
import moment from 'moment'

const SIZE = 20;
var offset = 0;
var noMore = false;
var listHtml = '';

function request() {
  const query = `offset=${offset}&size=${SIZE}`;
  var total;
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
}
