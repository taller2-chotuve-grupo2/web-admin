import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom'
import {Button, TextField} from "@material-ui/core";
import {HomeHeader, HomeRect} from "./HomePage";
import axios from "axios";
import Select from 'react-select'

const baseUrl = process.env.REACT_APP_MEDIA_BASE_URL
const mediaEndpoint = `${baseUrl}/resource/`;
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    }
}
const options = [
    { value: 'private', label: 'private' },
    { value: 'public', label: 'public' }
]


const stringStyle = {
    color: "#c6c6c6",
    fontFamily: "font-family: Roboto, Helvetica, Arial, sans-serif",
    margin: "0 auto",
    textAlign: "left",
    width: "50%",
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
            <MediaResourceBody id={props.match.params.id} hst={history}/>
        ]
    }
}


class MediaResourceBody extends React.Component {
    constructor(props) {
        super();
        this.state = {
            resource: {},
            id: props.id,
            showEditForm: false,
            hst: null
        }
        this.handleResourceResponse = this.handleResourceResponse.bind(this)
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)
        this.handleDeleteButton = this.handleDeleteButton.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }
    handleResourceResponse(data) {
        this.setState({resource: data})
    }

    componentDidMount() {
        this.getResource()
    }

    getResource() {
        const resourceEndpoint = mediaEndpoint + this.state.id
        axios.get(resourceEndpoint, axiosConfig).then((res) => {
            if (res.status === 200) {
                this.handleResourceResponse(res.data)
            } else
                alert("El usuario no tiene permisos")
        })
    }

    showForm(){
        this.setState({showEditForm : !this.state.showEditForm})
    }

    handleEdit(){
        const data = {
            title: document.getElementById('title-input').value,
            description: document.getElementById('description-input').value,
            visibility: document.getElementById('select-input').textContent,
        }
        axios.patch(mediaEndpoint + this.state.resource.id, data, axiosConfig).then((res) =>{
            if (res.status === 200) {
                console.log(res)
                this.setState({showEditForm : false})
                this.setState({resource : res.data})
            } else
                alert("El usuario no tiene permisos")
        })
    }

    handleDeleteButton(){
        axios.delete(mediaEndpoint + this.state.id, axiosConfig).then((res) =>{
            if (res.status === 200) {
                this.props.hst.push("/resources");
            } else
                alert("El usuario no tiene permisos")
        })
    }
    hideForm(){
        this.setState({showEditForm : false})
    }
    render() {
        return (
            <div>
                <div style={{display: "block",
                    margin: "0 auto"}}>
                    <video style={{display: "block",
                        margin: "0 auto",
                        }} width='940' height='480' src={this.state.resource.path + '?alt=media&token=' + this.state.resource.id} type='video/mp4' controls />
                </div>
                <h1  style={stringStyle}>{this.state.resource.title}</h1>
                <h5  style={stringStyle}>{this.state.resource.description}</h5>
                <h6  style={stringStyle}>{this.state.resource.owner}</h6>
                <div style={{display: "inline-block", width: "100%", marginTop: "1%"}}>
                    <Button style={{ marginLeft: "25%", width: "5%"}} variant="contained" color="primary" onClick={this.showForm}> Edit </Button>
                    <Button style={{ marginLeft: "40%", width: "5%"}} variant="contained" color="secondary" onClick={this.handleDeleteButton}> Delete </Button>
                </div>
                { this.state.showEditForm && (
                    <div>
                        <h1 style={formTitle}> Edit Video...</h1>
                        <form id= "add-app">
                            <div style={formStrings}>
                                <label>Title : </label>
                                <br/>
                                <TextField id="title-input" style={{backgroundColor:"white"}} defaultValue={this.state.resource.title} variant="outlined" />
                                <br/>
                                <label> Description : </label>
                                <br/>
                                <TextField id="description-input" style={{backgroundColor:"white", width:"40%"}} defaultValue={this.state.resource.description} variant="outlined" />
                                <br/>
                                <label>Visibility: </label>
                                <div style={{width:"40%" , color:"black"}}>
                                    <Select options={options} defaultValue={options.filter(({value}) => value === this.state.resource.visibility)} id="select-input"/>
                                </div>
                            </div>
                            <div style={{display: "inline-block", width: "100%", marginTop: "1%"}}>
                                <Button style={{ marginLeft: "25%",background:"#2E8B57"}} variant="contained" onClick={this.handleEdit}> CONFIRM </Button>
                                <Button style={{marginLeft: "2%", background:"#CD5C5C"}} variant="contained" onClick={this.hideForm}> CANCEL </Button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        )
    }

}

