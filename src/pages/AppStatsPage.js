import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom'
import { HomeHeader, HomeRect } from './HomePage'
import { makeStyles } from '@material-ui/core/styles'
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

export default function AboutPage () {
  const history = useHistory()
  if (!localStorage.getItem('user')) {
    return <Redirect to='/login' />
  }

  return (
    [

      <HomeHeader hst={history} />,
      <HomeRect />,
      // <Content classes={styles} />,
      <SimpleTable />

    ]
  )
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function createData (name, url) {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.token
    }
  }
  let status
  axios.get(appEndpoint, axiosConfig).then((res) => {
    if (res.status === 200) {
      status = 'OK'
    } else {
      status = 'ERROR'
    }
  })
  return { name, url, status }
}

const rows = [
  createData('App server', appEndpoint)
]

function SimpleTable () {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Server Name</TableCell>
            <TableCell>Url</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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

function logOut (history) {
  localStorage.removeItem('user')
  history.push('/')
}
