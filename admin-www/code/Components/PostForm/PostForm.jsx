import React from 'react'
import {FormControl, Button, Row, Col} from 'react-bootstrap'
import Editor from './Editor'
import './style.scss'

export default class PostForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        title: this.props.title || ''
      }
    }
  }
  postSuccess() {
    this.context.actions.post.reset();
    window.location.hash = '#/post';
  }
  postFailed() {
    alert(this.props.Post.errorMessage);
    this.context.actions.post.reset();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        title: nextProps.title || '',
        summary: nextProps.summary || ''
      }
    });
  }
  inputHandle(field, event) {
    let data = Object.assign({}, this.state.data);
    data[field] = event.target.value;
    this.setState({data});
  }
  render() {
    if (this.props.Post.postState === 'success') {
      this.postSuccess();
    }
    if (this.props.Post.postState === 'failed') {
      this.postFailed();
    }
    return <div className="ComponentsPostForm">
      <Row>
        <Col md={10}>
          <FormControl type="text"
                       ref="title"
                       placeholder="Title"
                       value={this.state.data.title}
                       onChange={this.inputHandle.bind(this, 'title')}></FormControl>
        </Col>
        <Col md={2}>
          <Button bsStyle="link" onClick={this.props.submitHandle.bind(this)}>Submit</Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <textarea value={this.state.data.summary}
                    onChange={this.inputHandle.bind(this, 'summary')}
                    rows={6}
                    style={{width: '100%', resize: 'vertical'}}>
          </textarea>
        </Col>
      </Row>
      <Editor id="editor" content={this.props.content} />
    </div>
  }
}
PostForm.contextTypes = {
  actions: React.PropTypes.object
};
