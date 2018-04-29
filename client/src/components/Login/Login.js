import React, { Component } from "react";
import "./Login.css";
import API from "../../utils/API";
import { Modal, Button, Row, Input, Card } from "react-materialize";
import { Link } from "react-router-dom";
import randtoken from "rand-token";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            userId: ""
        }
    }

    handleInputChange = event => {
        let value = event.target.value;
        let name = event.target.name

        this.setState({
            [name]: value
        });
    };

    handleSubmitSignUp = (e) => {
        e.preventDefault();
        const { name, email, username, password } = this.state;
        let formData = new FormData();

        formData.append('name', name)
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);

        let token = randtoken.generate(16);

        let userData = {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            token: token
        }

        //console.log("userdata", userData)

        API.saveUser({
            name: userData.name,
            email: userData.email,
            username: userData.username,
            password: userData.password,
            token: userData.token
        }).then((result) => {
            //console.log("result: ", result)
            window.localStorage.setItem("token", result.data.token)
            window.location = "/create"
        })
    }

    handleSubmitLogin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        let loginData = new FormData();

        loginData.append('username', username);
        loginData.append('password', password);

        //console.log("logindata", loginData)

        

        API.getUser(this.state.username)
        .then((result) => {
            //console.log(result.data)

            if (this.state.password === result.data.password) {
                alert("login successful")
                let token = randtoken.generate(16);
                window.localStorage.setItem("token", token)

                let userInfo = {
                    username: this.state.username,
                    token: token
                }

                API.updateUserToken({userInfo})

                window.location = "/create"



            }
            else {
                alert("no")
            }

        })


        // API.saveUser({
        //     name: loginData.name,
        //     email: loginData.email,
        //     username: loginData.username,
        //     password: loginData.password,
        // }).then((result) => {
        //     console.log("result: ", result)
        // })

        console.log("username:", this.state.username)
    }

    render() {

        return (

            <div>
                <Card className='container'>
                    <Row>
                        <h5 id='appName'>Listopher Columbus</h5>
                    </Row>
                    <Row>
                        <Input onChange={this.handleInputChange} s={12} name="username" label="Username" placeholder="" />
                    </Row>
                    <Row>
                        <Input onChange={this.handleInputChange} name="password" type="password" label="password" s={12} />
                    </Row>
                    <Row>
                        <Button onClick={this.handleSubmitLogin}>Login</Button>
                    </Row>
                    <Modal
                        header='Modal Header'
                        trigger={<Button>Sign Up</Button>}>
                        <Row>
                            <Input onChange={this.handleInputChange} s={12} name="name" label="name" />
                            <Input onChange={this.handleInputChange} s={12} name="username" label="Username" placeholder="Username" />
                            <Input onChange={this.handleInputChange} name="password" type="password" label="password" s={12} />
                            <Input onChange={this.handleInputChange} name="email" type="email" label="Email" s={12} />
                            <Button onClick={this.handleSubmitSignUp} className="modal-action modal-close"><Link to={"/create"}>Create</Link></Button>
                        </Row>
                    </Modal>
                </Card>
            </div>

        );
    }
}

export default Login;