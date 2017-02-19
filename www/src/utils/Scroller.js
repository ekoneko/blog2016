import IScroll from 'iscroll/build/iscroll-probe'
import noop from './noop'

export default class Scroller {
  constructor(container) {
    const containWraper = this.generatorWrapper(container);
    const scrollHandle = this.bindIscroll(containWraper);
    this.bindEvent(scrollHandle);
    this.scrollHandle = scrollHandle;
  }

  bindNextPage(func = noop) {
    this.nextPageHandle = func;
  }

  unbindNextPage() {
    this.nextPageHandle = null;
  }

  refresh() {
    this.scrollHandle.refresh();
  }

  /**
   * @private
   */
  generatorWrapper(container) {
    const containWraper = document.createElement('div');
    containWraper.className = 'contain-wraper';
    container.parentNode.appendChild(containWraper);
    containWraper.appendChild(container);
    return containWraper;
  }

  /**
   * @private
   */
  bindIscroll(wrapper) {
    return new IScroll(wrapper, {
      mouseWheel: true,
      scrollbars: true,
      probeType: 3,
      preventDefault: false,
      disableMouse: true
    });
  }

  /**
   * @private
   */
  bindEvent(scrollHandle) {
    let isLoading = false;
    let isInLoadingScroll = false;

    scrollHandle.on('scrollEnd', () => {
      isInLoadingScroll = false;
    });

    scrollHandle.on('scroll', () => {
      if (isLoading || isInLoadingScroll || !this.nextPageHandle) {
        return;
      }
      if (scrollHandle.y <= scrollHandle.maxScrollY) {
        isLoading = true;
        isInLoadingScroll = true;
        const res = this.nextPageHandle();
        if (res instanceof Promise) {
          res
            .then(() => isLoading = false)
            .catch(() => isLoading = false);
        }
      }
    });
  }
}
