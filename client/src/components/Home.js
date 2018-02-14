import React, { Component } from 'react';
import { Header, Segment, Input, Button, Divider, Accordion, Menu, Container, Grid } from 'semantic-ui-react';
import axios from 'axios'
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
import Categories from './Categories'
import Term from './Term';

class Home extends Component {
  state = { term: '', terms: [], suggestions: [] }

  componentDidMount() {
    axios.get('/api/terms')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ terms: res.data });
      });
  }

  handleSearch = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const { term, terms } = this.state;
      const regex = new RegExp(term.toLowerCase());
      const suggestions = terms.filter( t => regex.test(t.name.toLowerCase()) )
      this.setState({ suggestions });
    });
  }

  byName = (a,b) => {
    const left = a.name.toLowerCase();
    const right = a.name.toLowerCase();
    if (left > right )
      return 1
    if
      (left < right)
      return -1
     return 0
  }

  reOrderTerms = (term) => {
    let terms = [...this.state.terms, term]
    return terms.sort(this.byName);
  }

  addTerm = () => {
    const { term } = this.state;
    axios.post('/api/terms', { term: { name: term }})
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        const terms = this.reOrderTerms(res.data);
        this.setState({ term: '', suggestions: [], terms });
      })
      .catch( err => {
        const { dispatch } = this.props;
        dispatch(setHeaders(err.headers));
        dispatch(setFlash(err.data.errors.join(","), "red"))
      })
  }

  deleteTerm = (id) => {
    const deleted = window.confirm("Delete Word?")
    if (deleted)
    axios.delete(`/api/terms/${id}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
      })
    let filterTerms = this.state.terms.filter(term => term.id !== id)
    this.setState({ terms: filterTerms })
  }

  showTerms = () => {
    const { suggestions, terms } = this.state;
    const visible = suggestions.length > 0 ? suggestions : terms;
    return visible.map( term =>
      <Term key={term.id} {...term} deleteTerm={this.deleteTerm} />
    )
  }

  cancel = () => {
    this.setState({ term: '', suggestions: [] });
  }

  action = () => {
    const { suggestions, term } = this.state;
    if (suggestions.length > 0 && term.length > 0) {
      return <Button secondary onClick={this.cancel}>Clear</Button>
     } else if (term.length > 0 && suggestions.length === 0 ) {
      return (
        <div>
          <Button secondary onClick={this.cancel}>Clear</Button>
          <Button primary onClick={this.addTerm}>Add Term</Button>
        </div>
      )
    }
  }

  render() {
    const { term, suggestions } = this.state
    const { user } = this.props
    return (
      <div>
      <Grid celled='internally'> 
        <Grid.Row> 
        <Grid.Column tablet={8} className='wrapper' computer={3} style={{backgroundColor: 'gray'}}>
        <Categories />
        </Grid.Column> 
        <Grid.Column computer={13}>
          <Divider hidden />
          <Header as='h1' textAlign="center">DevPoint Vocabulary</Header>
          <Divider />
          <Segment basic textAlign="center">
            <Input
              label="I don't know what this means"
              value={term}
              onChange={this.handleSearch}
              name="term"
              action={this.action()}
            />
          </Segment>
          <Divider />
        <Grid>
        <Grid.Row columns="equal">
          <Grid.Column> 
            <Header as="h2" textAlign="center">Terms</Header>
              <Accordion styled style={{paddingBottom: "7%"}}>
                { this.showTerms() }
              </Accordion>
              </Grid.Column>
              <Grid.Column>
            <Header as="h2" textAlign="center">Saved Terms</Header>
              <Accordion styled style={{paddingBottom: "7%"}}>
                This will show saved terms 
              </Accordion>
              </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        </Grid> 
      </div>
    );
  }
}

const styles = {
  body :{
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Home);
