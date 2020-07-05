import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom'
import { HomeHeader, HomeRect } from './HomePage'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_APP_BASE_URL
const appEndpoint = `${baseUrl}/ping/`

function AppStatsPage () {
  const history = useHistory()
  if (!localStorage.getItem('user')) {
    return <Redirect to='/login' />
  }

  return (
    [

      <HomeHeader hst={history} />,
      <HomeRect />,
      <AppTable />

    ]
  )
}

class AppTable extends React.Component {
  constructor () {
    super()
    this.state = {
      appData: []
    }

    this.handleAppResponse = this.handleAppResponse.bind(this)
  }

  componentDidMount () {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token
      }
    }
    this.getResources(axiosConfig)
  }

  getResources (axiosConfig) {
    let status
    axios.get(appEndpoint, axiosConfig).then((res) => {
      if (res.status === 200) {
        status = 'OK'
      } else {
        status = 'ERROR'
      }
      this.handleAppResponse(status)
    })
  }

  render () {
    return <SimpleTable data={this.state.appData} />
  }

  handleAppResponse (status) {
    const data = [{
      name: 'App server', url: appEndpoint, status
    }]
    this.setState({ appData: data })
  }
}

class SimpleTable extends React.Component {
  render () {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Server Name</TableCell>
              <TableCell>Url</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default (AppStatsPage)
