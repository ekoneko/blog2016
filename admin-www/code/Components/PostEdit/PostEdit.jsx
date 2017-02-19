import React from 'react'
import PostForm from 'Components/PostForm/PostForm'

export default class PostEdit extends React.Component {
  componentWillMount() {
    this.id = location.hash.match(/[^\w]id=(\d+)/)[1];
    this.context.actions.post.getCurrentContent(this.id);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.Post.currentContent.content && !this.props.Post.currentContent.content) {
      window.tinyMCE.activeEditor.setContent(nextProps.Post.currentContent.content)
    }
  }
  submitHandle() {
    let data = {
      title: this.state.data.title,
      summary: this.state.data.summary,
      content: window.tinyMCE.activeEditor.getContent()
    };
    this.context.actions.post.edit(this.props.id, data);
  }
  render() {
    if (this.props.Post.currentContent.content) {}
    return <PostForm id={this.id}
                     Post={this.props.Post}
                     submitHandle={this.submitHandle}
                     title={this.props.Post.currentContent.title}
                     summary={this.props.Post.currentContent.summary}
                     content={this.props.Post.currentContent.content} />
  }
}
PostEdit.contextTypes = {
  actions: React.PropTypes.object
};
