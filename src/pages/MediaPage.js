import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import {HomeHeader, HomeRect} from "./HomePage";
import {Redirect, useHistory, Link} from "react-router-dom";
import FlatList, {PlainList} from 'flatlist-react'

import JsonTable from "ts-react-json-table";
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
        <Content classes={styles}/>,
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

function Content(props) {
    const {classes} = props;

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon className={classes.block} color="inherit"/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search by email address, phone number, or user UID"
                                InputProps={{
                                    disableUnderline: true,
                                    className: classes.searchInput,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className={classes.addUser}>
                                Add user
                            </Button>
                            <Tooltip title="Reload">
                                <IconButton>
                                    <RefreshIcon className={classes.block} color="inherit"/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                <Typography color="textSecondary" align="center">
                    No users for this project yet
                </Typography>
            </div>
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};


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
