import React from 'react'



class GangPage extends React.Component {
  render () {
    return <div className='message-box'>
      Hello {this.props.name}
    </div>
  }
}
export default GangPage;