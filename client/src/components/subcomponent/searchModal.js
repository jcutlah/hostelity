import React from 'react';
import ReactDOM from "react-dom";

const display = {
    display: 'block'
  };
  const hide = {
    display: 'none'
  };
  
  class searchModal extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
  
      this.state = {
        toggle: true
      }
    }
  
    toggle(event) {
      this.setState(prevState => ({
        toggle: !prevState.toggle
      }));
    }
  
    render() {
      var modal = [];
      modal.push(
        <div className="modal" style={this.state.toggle ? display : hide}>
        <div className="modal-content">
          <h4>Plan your trip</h4>
          <div class="input-field">
              <input placeholder="Where do you want to begin your trip?">

              </input>
          </div>

          <div class="input-field">
              <input placeholder="Where do you want to end your trip?">

              </input>
          </div>

        </div>


        <div className="modal-footer">
          <a className="btn" onClick={this.toggle}>submit</a>
        </div>
      </div>
      );
      return (
        <div>
          {modal}
        </div>
      );
    }
  }
  
  ReactDOM.render(<searchModal />, document.getElementById("root"));

  export default searchModal;