import React, { Component } from 'react';
import { Header, Segment, Input, Button, Divider, Accordion } from 'semantic-ui-react';
import axios from 'axios'
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import { setFlash } from '../actions/flash';
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

  showTerms = () => {
    const { suggestions, terms } = this.state;
    const visible = suggestions.length > 0 ? suggestions : terms;
    return visible.map( term => 
      <Term key={term.id} {...term} />
    )
  }

  render() {
    const { term, suggestions } = this.state

    return (
      <div>
        <Divider hidden />
        <Header as='h1' textAlign='center'>DevPoint Vocabulary</Header>
        <Segment>
          <Input
            label="I don't know what this means"
            value={term}
            onChange={this.handleSearch}
            name="term"
            action={ (suggestions.length === 0 && term.length > 0) && <Button primary onClick={this.addTerm}>Add Term</Button> }
          />
        </Segment>
        <Header as="h2" textAlign="center">Terms</Header>
        <Segment>
          <Accordion styled>
            { this.showTerms() }
          </Accordion>
        </Segment>
      </div>
    );
  }
}

export default connect()(Home);
