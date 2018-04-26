import React, { Component } from "react";
import DetailModal from "../components/DetailModal";

class User extends Component {

    state = {
        show: false
    };
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleShow} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </button>
                <DetailModal />
            </div>
        )
    }
}

export default User;