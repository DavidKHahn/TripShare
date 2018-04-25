import React, { Component } from "react";
import "./FormModal";
import API from "../../utils/API";


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
    toggle: false,
    name: "",
    description: "",
    saved: []
    }
}

toggle(event) {
    this.setState(prevState => ({
    toggle: !prevState.toggle
    }));
}

handleInputChange = event => {
    let value = event.target.value;
    let name = event.target.name

    this.setState({
        [name]: value
    });
};

handleSubmitForm = event => {
    event.preventDefault();

    var name = this.state.name;
    var description = this.state.description;

    API.savePlace(name, description)
        .then(res => {
            this.setState({
                saved: res.data
            })
        })
};

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
                                <input 
                                    onChange={this.handleInputChange}
                                    name="name"
                                    id="name" 
                                    type="text" 
                                    className="validate"
                                />
                                <label for="name">Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    onChange={this.handleInputChange}
                                    name="description"
                                    id="=description" 
                                    type="text" 
                                    className="validate"
                                />
                                <label for="=description">Description</label>
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