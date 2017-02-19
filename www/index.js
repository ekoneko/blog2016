import 'initialize-css'
import 'fetch-ie8'
import './assets/style.scss'
import Scroller from './src/utils/Scroller'
import Router from './src/utils/Router'
import Index from './src/Index/Index'
import Post from './src/Post/Post'

const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);
const scroller = new Scroller(container);
const router = new Router();

router.addRouter('/$', () => {
  Index(container, scroller);
});

router.addRouter(/\/p\/(\d+)$/, () => {
  Post(container, scroller);
});
router.hashChange();
