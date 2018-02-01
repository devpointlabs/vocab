import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Segment, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
class Footer extends React.Component {

rightNavs = () => {
  const { user, dispatch, history } = this.props;

  if (user.id) {
    return (
      <Menu.Menu>
        <Menu.Item
          name='Logout'
          style={styles.leftNav}
          onClick={() => dispatch(handleLogout(history))}
        />
      </Menu.Menu>
    );
  }
  return (
    <Menu.Menu>
    <span> 
      <Link to='/register' style={styles.leftNav}>
        <Menu.Item style={{fontWeight: '300'}} name='Register' />
      </Link>
      &nbsp; | &nbsp;
      <Link to='/login' style={styles.leftNav}>
        <Menu.Item name='Login' style={{fontWeight: '300'}} />
      </Link>
    </span> 
    </Menu.Menu>
  );
}

render(){
  return(
    <Segment style={styles.footer}>
      <Grid columns={2}>
        <Grid.Column textAlign='left'>
          <Link to='/' style={styles.text}>
            <i style={{fontWeight: '300'}}>DevPoint Vocab</i>
          </Link>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Link to='/' style={styles.leftNav}>
            <h5 style={{fontWeight: '300'}}>
            { this.rightNavs() }
            </h5>
          </Link>
          &nbsp;
        </Grid.Column>
      </Grid>
    </Segment>
    )
  }
}

const styles = {
  footer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '60px',   /* Height of the footer */
    background: '#599532',
    borderRadius: '0px'
  },
  container: {
    padding: '0',
  },
  text: {
    color: 'white',
  },
  leftNav: {
    display: 'inline-block',
    color: 'white',
  },
  icons: {
    display: 'inline-block',
  },
}


const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(Footer));
