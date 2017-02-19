import './style.scss'
import React from 'react'
import {findDOMNode} from 'react-dom'
import {Table} from 'react-bootstrap'
import Scrollbar from 'Components/Scrollbar/Scrollbar'
import PostListItem from './PostListItem'

const PAGESIZE = 5;

export default class PostList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      offset: 0,
      showMoreBtn: false
    }
  }
  componentWillMount() {
    this.context.actions.post.list(this.state.offset, PAGESIZE);
  }
  componentDidUpdate() {
    const noMoreData = this.props.Post.list.length >= this.props.Post.total;
    const noScroller = document.documentElement.clientHeight > findDOMNode(this.refs.table).offsetHeight;
    if (!noMoreData && noScroller) {
      if (!this.state.showMoreBtn) {
        this.setState({showMoreBtn: true})
      }
    } else if (this.state.showMoreBtn) {
      this.setState({showMoreBtn: false})
    }
  }
  scrollPullDownHandle() {
    this.context.actions.post.list(this.state.offset + PAGESIZE, PAGESIZE, true);
    this.setState({
      offset: this.state.offset + PAGESIZE
    })
  }
  render() {
    let items = [];
    let moreBtn = '';
    this.props.Post.list.forEach(item => {
      items.push(<PostListItem key={item.id} {...item}></PostListItem>);
    });
    if (this.state.showMoreBtn) {
      moreBtn = <a href="javascript:;" onClick={this.scrollPullDownHandle.bind(this)}>more</a>;
    }
    return (
      <Scrollbar scrollPullDownHandle={this.scrollPullDownHandle.bind(this)}>
        <div className="ComponentsPostContainer">
        <div className="menubar">
          <a href="#/post/add">Add</a>
        </div>
        <Table ref="table" className="ComponentsPostList"><tbody>
          {items}
        </tbody></Table>
        {moreBtn}
      </div>
        </Scrollbar>
    )
  }
}
PostList.contextTypes = {
  actions: React.PropTypes.object
};
