import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'

class Avateezy extends Component {

  constructor(props) {
    super(props)
    const src = './assets/images/hockeyJersey.jpg';
    this.state = {
      preview: null,
      src
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  
  onClose() {
    this.setState({preview: null})
  }
  
  onCrop(preview) {
    this.setState({preview})
  }
  
  render () {
    return (
      <div>
        <Avatar
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.src}
        />
        <img src={this.state.preview} alt="Preview" />
      </div>
    )
  }
}

export default Avateezy;