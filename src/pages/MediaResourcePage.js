import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom'

import { HomeHeader, HomeRect } from "./HomePage";
import axios from "axios";

const baseUrl = process.env.REACT_APP_MEDIA_BASE_URL
const mediaEndpoint = `${baseUrl}/resource/`;


export default function MediaResourcePage(props) {
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
            id: props.id
        }
        this.handleResourceResponse = this.handleResourceResponse.bind(this)
    }
    handleResourceResponse(data) {
        this.setState({ resource: data })
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

    render() {
        const stringStyle = {
            color: "#c6c6c6",
            fontFamily: "    font-family: Roboto, Helvetica, Arial, sans-serif"
        }
        return (
            <div>
                {console.log(this.state.resource)}
                <h1 style={stringStyle}>{this.state.resource.title}</h1>

                <div style={{
                    display: "block",
                    margin: "0 auto"
                }}>
                    <video style={{
                        display: "block",
                        margin: "0 auto",
                    }} width='940' height='480' src={this.state.resource.path + '?alt=media&token=' + this.state.resource.id} autoPlay type='video/mp4' controls />
                </div>
                <h5 style={stringStyle}>{this.state.resource.description}</h5>
                <h6 style={stringStyle}>{this.state.resource.owner}</h6>

            </div>
        )
    }

}
