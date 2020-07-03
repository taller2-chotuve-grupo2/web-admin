import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom'
import { HomeHeader, HomeRect } from './HomePage'
import JsonTable from 'ts-react-json-table'
import axios from 'axios'
import styles from '../styles/usersTable.css'

const baseUrl = process.env.REACT_APP_AUTH_BASE_URL
const usersApi = `${baseUrl}/users/`;

export default function UsersPage () {
  const history = useHistory()
  if (!localStorage.getItem('user')) {
    return <Redirect to='/login' />
  }

  return ([
    <HomeHeader hst={history} />,
    <HomeRect />,
    <UsersBody />
  ])
}

class UsersBody extends React.Component {
  constructor () {
    super()
    this.state = {
      usersData: [],
      columns: [
        { key: 'username', label: 'Username' },
        { key: 'password', label: 'Password' },
        { key: 'email', label: 'Email' },
        { key: 'createdAt', label: 'Creation Date' },
        { key: 'updatedAt', label: 'Last Update' }
      ]
    }

    this.handleApiResponse = this.handleApiResponse.bind(this)
  }

  handleApiResponse (users) {
    console.log(users)
    this.setState({ usersData: users })
  }

  componentDidMount () {
    const data = {
      token: localStorage.getItem('token')
    }

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.getUsersFromAuth(data, axiosConfig)
  }

  render () {
    console.log(this.state.usersData)
    return <JsonTable
      rows={this.state.usersData} columns={this.state.columns} class={styles}
      settings={{ noRowsMessage: 'Loading or no permissions' }}
           />
  }

  getUsersFromAuth (data, axiosConfig) {
    axios.post(usersApi, data, axiosConfig).then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        this.handleApiResponse(res.data)
      } else { alert('El usuario no tiene permisos') }
    })
  }
}
