import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom'

import {Button, TextField} from "@material-ui/core";

import {HomeHeader, HomeRect} from "./HomePage";
import axios from "axios";

const baseUrl = process.env.REACT_APP_MEDIA_BASE_URL
const mediaEndpoint = `${baseUrl}/resource/`;


const stringStyle = {
    color: "#c6c6c6",
    fontFamily: "font-family: Roboto, Helvetica, Arial, sans-serif",
    margin: "0 auto",
    textAlign: "left",
    width: "50%"
}

const formTitle = {
    color: "#c6c6c6",
    fontFamily: "font-family: Roboto, Helvetica, Arial, sans-serif",
    margin: "0 auto",
    textAlign: "left",
    width: "50%",
    marginTop: "10px"
}
const formStrings = {
    color: "#c6c6c6",
    fontFamily: "font-family: Roboto, Helvetica, Arial, sans-serif",
    margin: "0 auto",
    textAlign: "left",
    marginLeft: "25%",
}

export default function MediaResourcePage (props) {
    const history = useHistory()
    if (!localStorage.getItem('user')) {
        return <Redirect to='/login' />
    } else {
        return [
            <HomeHeader hst={history} />,
            <HomeRect />,
            <MediaResourceBody id={props.match.params.id} />
        ]
    }
}


class MediaResourceBody extends React.Component {
    constructor(props) {
        super();
        this.state = {
            resource: {},
            id: props.id,
            showEditForm: false
        }
        this.handleResourceResponse = this.handleResourceResponse.bind(this)
        this.showForm = this.showForm.bind(this)
    }
    handleResourceResponse(data) {
        this.setState({resource: data})
    }

    componentDidMount() {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            }
        }
        this.getResource(axiosConfig)
    }



    getResource(axiosConfig) {
        const resourceEndpoint = mediaEndpoint + this.state.id
        axios.get(resourceEndpoint, axiosConfig).then((res) => {
            if (res.status === 200) {
                this.handleResourceResponse(res.data)
            } else
                alert("El usuario no tiene permisos")
        })
    }

    showForm(){
        this.setState({showEditForm : true})
    }

    render() {
        const stringStyle = {
            color: "#c6c6c6",
                fontFamily: "    font-family: Roboto, Helvetica, Arial, sans-serif"
        }
        return (
            <div>
                {console.log(this.state.resource)}
                <h1  style={stringStyle}>{this.state.resource.title}</h1>

                <div style={{display: "block",
                    margin: "0 auto"}}>
                    <video style={{display: "block",
                        margin: "0 auto",
                        }} width='940' height='480' src={this.state.resource.path + '?alt=media&token=' + this.state.resource.id} autoPlay type='video/mp4' controls />
                </div>
                <h1  style={stringStyle}>{this.state.resource.title}</h1>
                <h5  style={stringStyle}>{this.state.resource.description}</h5>
                <h6  style={stringStyle}>{this.state.resource.owner}</h6>
                <div style={{display: "inline-block", marginLeft: "25"}}>
                    <Button style={{marginLeft:"470px", marginTop: "10px"}} variant="contained" color="primary" onClick={this.showForm}> Edit </Button>
                    <Button style={{marginLeft:"790px", marginTop: "10px"}} variant="contained" color="secondary" > Delete </Button>
                </div>
                { this.state.showEditForm && (
                    <div>
                        <h1 style={formTitle}> Edit Video...</h1>
                        <form id= "add-app">
                            <div style={formStrings}>
                                <label>Title : </label>
                                <br/>
                                <TextField id="title-input" style={{backgroundColor:"white"}} variant="outlined" />
                                <br/>
                                <label> Description : </label>
                                <br/>
                                <TextField id="description-input" style={{backgroundColor:"white", width:"40%"}} variant="outlined" />
                                <br/>
                            </div>

                            <Button style={{marginLeft:"25%", marginTop: "10px"}} variant="contained" color="primary"> Edit </Button>
                        </form>
                    </div>
                )}

            </div>
        )
    }

}
