import React from 'react'
import { Header, Menu, Button } from 'semantic-ui-react'

class Categories extends React.Component {
  render(){
    return(
      <div> 
      <Header as='h4' textAlign='center' style={styles.white}> Categories </Header>
        <Menu  secondary vertical >
          <Menu.Item name='All Words' style={styles.white} onClick={this.handleItemClick} />
          <Menu.Item name='Languages' style={styles.white} onClick={this.handleItemClick} />
          <Menu.Item name='Ruby' style={styles.white}  onClick={this.handleItemClick} />
        </Menu>
      <Button> Add Category </Button> 
      </div>
    )
  }
}

const styles = {
  white :{
    color: 'white'
  }
}

export default Categories