import './style.scss'
import React from 'react'
import PostList from 'Components/PostList/PostList'
import PostAdd from 'Components/PostAdd/PostAdd'
import PostEdit from 'Components/PostEdit/PostEdit'

export default class ContainerRouter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.hashChangeHandle = this.hashChangeHandle.bind(this);
    this.state = {
      hash: ''
    }
  }
  componentDidMount() {
    if (!location.hash) {
      location.hash = '#/post'
    } else {
      this.hashChangeHandle();
    }
    window.addEventListener('hashchange', this.hashChangeHandle, false);
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.hashChangeHandle);
  }
  hashChangeHandle() {
    const hash = location.hash.match(/#\/([\w\/]+)/)[1];
    this.setState({
      hash: hash
    })
  }
  render() {
    var content;
    switch (this.state.hash) {
      case 'post':
        content = <PostList Post={this.props.Post} />;
        break;
      case 'post/add':
        content = <PostAdd Post={this.props.Post} />;
        break;
      case 'post/edit':
        content = <PostEdit Post={this.props.Post} />;
        break;
    }
    return (<div className="ComponentsContainerRouter">
        {content}
      </div>)
  }
}
ContainerRouter.contextTypes = {
  actions: React.PropTypes.object
};
