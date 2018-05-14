import React, { Component } from "react";
import "./Landing.css";
import { Button, Row, Card, Col, CardPanel, Modal, Input, Navbar } from "react-materialize";
import NavBar2 from "../NavBar2";
import { Link } from "react-router-dom";
import randtoken from "rand-token";
import API from "../../utils/API";
import NavItem from "react-materialize/lib/NavItem";


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class Landing extends Component {
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

    scrollLearn = () => {
        document.getElementById("learnSection").scrollIntoView()
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
            window.localStorage.setItem("name", result.data.name)
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
                    let token = randtoken.generate(16);
                    window.localStorage.setItem("token", token)
                    window.localStorage.setItem("name", result.data.name)

                    let userInfo = {
                        username: this.state.username,
                        token: token
                    }

                    API.updateUserToken({ userInfo })



                    window.location = "/create"



                }
                else {
                    alert("Invalid Username/Password")
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
                <div className="hero">
                    <Navbar brand={<img id="logo" src="uploads/logo.png" />} id="navbar2" right>
                        <NavItem>
                            <Modal
                                header='Log In'
                                trigger={<Button waves='light'>Log In</Button>}>
                                <Row>
                                    <Input onChange={this.handleInputChange} s={12} name="username" type="text" label="Username" />
                                    <Input onChange={this.handleInputChange} s={12} name="password" type="password" label="Password"  />
                                    <Button onClick={this.handleSubmitLogin}>Login</Button>
                                </Row>
                            </Modal>
                        </NavItem>
                    </Navbar>
                    <Row className="filler" />
                    <Row className="filler3">
                        <Col s={12} m={1} />

                        <Col s={12} m={5}>
                            <h4>tripshare</h4>
                            <h6>Relive all your favorite vacations and share them with your friends!</h6>
                        </Col>
                        <Col s={12} m={6} />
                    </Row>
                    <Row className="filler2" >
                        <Col s={12} m={1}>
                        </Col>
                        <Col s={12} m={5}>
                            <Col s={12} m={6}>
                                <Button onClick={this.scrollLearn} className="orange" waves='light'>learn more</Button>
                            </Col>
                            <Col s={12} m={6}>
                                <Modal
                                    header='Sign Up'
                                    trigger={<Button className="orange" waves='light'>Sign Up</Button>}>
                                    <Row>
                                        <Input onChange={this.handleInputChange} s={12} name="name" label="Name" />
                                        <Input onChange={this.handleInputChange} name="email" type="email" label="Email" s={12} />
                                        <Input onChange={this.handleInputChange} s={12} name="username" label="Username" />
                                        <Input onChange={this.handleInputChange} name="password" type="password" label="Password" s={12} />
                                        <Button onClick={this.handleSubmitSignUp} className="modal-action modal-close"><Link to={"/create"}>Create</Link></Button>
                                    </Row>
                                </Modal>
                            </Col>
                        </Col>
                        <Col s={12} m={6}>

                        </Col>
                    </Row>
                </div>
                <div id="learnSection">
                    <Row className="learnFiller" />
                    <Row className="learn">
                        <Col s={12} m={1} />
                        <Col s={12} m={10}>
                            <h2>Here's how it works</h2>
                        </Col>
                        <Col s={12} m={1} />
                    </Row>
                    <Row>
                        <Col s={12} m={6} />
                        <Col className="learnList" s={12} m={6}>
                            <div>
                                <h4 className="bulletHeader"> The online passport you can share with your friends!</h4>
                            </div>
                            <h5 className="bullets"> ☼   Type in the name of a city you have visited and click select city to start</h5 >
                            <h5 className="bullets"> ☼   Start adding in places or events you visited in that city</h5>
                            <h5 className="bullets"> ☼   After you've finished a city, search and select another city</h5>
                            <h5 className="bullets"> ☼   Go to the view page to see all your trips and other user trips</h5>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Landing;