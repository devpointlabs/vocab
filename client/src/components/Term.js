import React from 'react';
import { Accordion, Icon, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';

class Term extends React.Component {
  state = { open: false, showForm:false, definition: this.props.body || '', terms: {} }

  componentDidMount() {
    axios.get('/api/terms')
    .then( res => {
      this.setState({terms: res.data })
      this.props.dispatch( setHeaders(res.headers) )
    })
  }
  
  handleClick = () => {
    this.setState( state => this.setState({ open: !state.open }) )
  }

  handleChange = (e, { value }) => {
    this.setState({ definition: value });
  }

  cancel = () => {
    this.setState({ showForm: false, term: {}, definition: this.props.body || '' });
  }

  toggleForm = () => {
    this.setState( state => this.setState({ showForm: !state.showForm }) )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { definition } = this.state;
    const { id, dispatch } = this.props;
    axios.post(`/api/terms/${id}/definitions`, { definition: { body: definition }})
      .then( res => {
        dispatch(setHeaders(res.headers));
        this.setState({ definition: res.data.body, showForm: false });
      })
      .catch( err => {
        dispatch(setHeaders(err.headers));
        //TODO handle errors
      });
  }

  deleteTerm = (id) => {
    window.confirm("Delete Word?")
    axios.delete(`/api/terms/${id}`)
      .then( res => {
        this.setState 
      })
      .catch( err => {
        console.log(err)
      })
  }

  render() {
    const { open, showForm, definition } = this.state;
    const { name, created_at } = this.props;

    // const style = this.state.definition ? { border: 'solid 2px blue', color: 'black !important' } : { border: 'solid 1px grey' }
    return [
      <Accordion.Title key="title" onClick={this.handleClick} active={open}>
        <Icon name="dropdown" />
        <span>{name}</span>
      </Accordion.Title>,
      <Accordion.Content key="content" active={open}>
        { showForm ?
            <Form onSubmit={this.handleSubmit}>
              <Form.TextArea
                required
                label="Definition"
                value={definition}
                onChange={this.handleChange}
              />
              <Button.Group> 
              <Form.Button primary type="submit" style={{borderRadius: '0px'}}>Save</Form.Button>
              <Form.Button secondary onClick={this.cancel} style={{borderRadius: '0px'}} type="button">Cancel</Form.Button>
              </Button.Group>
            </Form>
            :
            <span>
              <p>{this.state.definition}</p>
              <span style={{ color: 'grey' }}>Added On: {new Date(created_at).toLocaleDateString()}</span>
              <br />
              <Icon 
                name="pencil" 
                className="right" 
                style={{ cursor: 'pointer' }}
                onClick={this.toggleForm}
              />
              <Icon 
                name="delete" 
                className="right" 
                style={{ cursor: 'pointer' }}
                onClick={() => this.deleteTerm(this.props.id) }
              />
            </span>
         }
      </Accordion.Content>
    ]
  }
}

export default connect()(Term);
