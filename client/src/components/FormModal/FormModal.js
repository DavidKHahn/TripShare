import React, { Component } from "react";
import "./FormModal";


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};
  
class FormModal extends Component {
constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
    toggle: false
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
                <h4>Title of Place</h4>
                <p>Enter Details</p>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" className="validate"/>
                                <label for="name">Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="details" type="text" className="validate"/>
                                <label for="details">Details</label>
                            </div>
                        </div>
                    </form>
                    <form action="#">
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input type="file"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-footer">
                <a className="btn" onClick={this.toggle}>Save</a>
            </div>
        </div>
    );

    return (
    <div>
        <a className="btn" onClick={this.toggle}>Add Place</a>
        {modal}
    </div>
    );
}
}

export default FormModal;