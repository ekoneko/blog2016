import IScroll from 'iscroll/build/iscroll-probe'
import React from 'react'
import ReactDOM from 'react-dom'

export default class Scrollbar extends React.Component {
  componentDidMount() {
    this.myScroll = new IScroll(ReactDOM.findDOMNode(this), {
      mouseWheel: true,
      preventDefault: false,
      scrollbars: true,
      probeType: 3
    });
    this.bindScroll();
  }
  /**
   * 绑定 Iscroll 事件
   */
  bindScroll() {
    let scrollToBottom = false;
    let inPullRequest = false;
    this.myScroll.on('scroll', () => {
      if (scrollToBottom || inPullRequest) {
        return;
      }
      if (this.myScroll.y - this.myScroll.maxScrollY < 30) {
        scrollToBottom = true;
        if (typeof this.props.scrollPullDownHandle === 'function') {
          let scrollPullDownResult = this.props.scrollPullDownHandle();
          if (scrollPullDownResult instanceof Promise) {
            inPullRequest = true;
            scrollPullDownResult.then(() => {
              scrollToBottom = false;
              inPullRequest = false;
            });
          }
        }
      }
    });
    this.myScroll.on('scrollEnd', () => {
      scrollToBottom = false;
      inPullRequest = false;
    });
  }
  componentWillUnmount() {
    this.myScroll.destroy();
  }
  render() {
    return <div style={{height: '100%',overflow: 'hidden'}}>{this.props.children}</div>
  }
}
