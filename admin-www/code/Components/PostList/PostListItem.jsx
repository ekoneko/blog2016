import React from 'React'

export default class PostListItem extends React.Component {
  editHandle() {
    window.location.hash = `#/post/edit?id=${this.props.id}`
  }
  viewHandle() {
    //
  }
  removeHandle() {
    let r= this.context.actions.post.remove(this.props.id);
    console.log(r);
  }
  render() {
    return <tr>
      <td width="35">{this.props.id}</td>
      <td>{this.props.title}</td>
      <td width="60"><a href="javascript:;" onClick={this.viewHandle.bind(this)}>查看</a></td>
      <td width="60"><a href="javascript:;" onClick={this.editHandle.bind(this)}>编辑</a></td>
      <td width="60"><a href="javascript:;" onClick={this.removeHandle.bind(this)}>删除</a></td>
    </tr>
  }
}
PostListItem.contextTypes = {
  actions: React.PropTypes.object
};
