import React from 'react'
import PostForm from 'Components/PostForm/PostForm'

export default class PostAdd extends React.Component {
  submitHandle() {
    let data = {
      title: this.state.data.title,
      summary: this.state.data.summary,
      content: window.tinyMCE.activeEditor.getContent()
    };
    this.context.actions.post.add(data);
  }
  render() {
    return <PostForm Post={this.props.Post}
                     submitHandle={this.submitHandle} />
  }
}
PostAdd.contextTypes = {
  actions: React.PropTypes.object
};
