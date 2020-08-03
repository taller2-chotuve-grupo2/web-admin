import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {HomeHeader, HomeRect} from "./HomePage";
import {Redirect, useHistory, Link} from "react-router-dom";
import  {PlainList} from 'flatlist-react'
import axios from "axios";

const baseUrl = process.env.REACT_APP_MEDIA_BASE_URL
const mediaEndpoint = `${baseUrl}/resource/`;

function MediaPage() {
    let history = useHistory();
    if (!localStorage.getItem('user')) {
        return <Redirect to="/login"/>;
    }


    return ([
        <HomeHeader hst={history}/>,
        <HomeRect/>,
        <MediaBody/>
    ])
}


const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

class MediaBody extends React.Component {
    constructor() {
        super();
        this.state = {
            mediaData: {},
        }

        this.handleMediaResponse = this.handleMediaResponse.bind(this)
    }

    componentDidMount() {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            }
        }
        this.getResources(axiosConfig)
    }


    getResources(axiosConfig) {
        axios.get(mediaEndpoint, axiosConfig).then((res) => {
            if (res.status === 200) {
                this.handleMediaResponse(res.data.result)
            } else
                alert("El usuario no tiene permisos")
        })
    }

    render() {
        return <MediaList resources={this.state.mediaData}/>
    }

    handleMediaResponse(data) {
        this.setState({mediaData: data})
    }
}

class MediaList extends React.Component {

    renderResource = (resource, idx) => {
        return (
            <div key={idx} style={{width: "20%", display: "inline-block"}}>
                <br/>
                <div>
                    <Link to={{
                        pathname: `/resources/${resource.id}`,
                        resourceProps: resource
                    }}>
                        <img src={resource.thumbnail} alt="Resource thumbnail" width="200" height="150"/>
                    </Link>
                    <h3 style={{
                        color: "#c6c6c6",
                        fontFamily: "    font-family: Roboto, Helvetica, Arial, sans-serif"
                    }}>{resource.title} </h3>
                </div>
                <p style={{
                    color: "#c6c6c6",
                    fontFamily: "Arial,Helvetica,sans-serif"
                }}> {resource.description} ({resource.owner}) </p>
            </div>
        );
    }

    render() {
        return (
            <PlainList
                list={this.props.resources}
                renderItem={this.renderResource}
                renderWhenEmpty={() => <div>List is empty!</div>}
                // sortBy={["title", {key: "id", descending: true}]}
                // groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
            />
        )

    }
}


export default withStyles(styles)(MediaPage);
