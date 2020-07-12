import React from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect, useHistory } from 'react-router-dom'
import { HomeHeader, HomeRect } from './HomePage'
// import JsonTable from 'ts-react-json-table'
import axios from 'axios'
// import styles from '../styles/usersTable.css'
import MaterialTable from 'material-table'
import Avatar from '@material-ui/core/Avatar'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
const { forwardRef } = React

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

const baseUrl = process.env.REACT_APP_AUTH_BASE_URL
const getUsersApi = `${baseUrl}/users/`
const postUsersApi = `${baseUrl}/user/`

const axiosConfig = {
  headers: {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
}

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
      usersData: []
    }

    this.handleApiResponse = this.handleApiResponse.bind(this)
  }

  handleApiResponse (users) {
    this.setState({ usersData: users })
  }

  componentDidMount () {
    this.getUsersFromAuth()
  }

  render () {
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          columns={[
            {
              field: 'thumbnail',
              title: 'Avatar',
              render: rowData => <Avatar alt='Remy Sharp' src={rowData.thumbnail} />
            },
            { field: 'username', title: 'Username' },
            { field: 'password', title: 'Encripted Password' },
            { field: 'email', title: 'Email' },
            { field: 'first_name', title: 'first_name' },
            { field: 'last_name', title: 'last_name' },
            { field: 'idRol', title: 'roleId' },
            { field: 'phone', title: 'phone' },
            { field: 'createdAt', title: 'Creation Date' },
            { field: 'updatedAt', title: 'Last Update' }

          ]}
          data={this.state.usersData}
          options={{
            headerStyle: {
              backgroundColor: 'orange',
              color: 'black'
            },
            rowStyle: {
              backgroundColor: 'black',
              color: 'orange'
            }
          }}
          title='Users'
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.postNewUser(newData).then(() => {
                    // this.get
                    this.getUsersFromAuth()
                    resolve()
                    // this.setState({ usersData: [...data, newData] })
                  })
                }, 1000)
              })
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       const dataUpdate = [...data]
            //       const index = oldData.tableData.id
            //       dataUpdate[index] = newData
            //       setData([...dataUpdate])

            //       resolve()
            //     }, 1000)
            //   }),
            // onRowDelete: oldData =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       const dataDelete = [...data]
            //       const index = oldData.tableData.id
            //       dataDelete.splice(index, 1)
            //       setData([...dataDelete])

            //       resolve()
            //     }, 1000)
            //   })
          }}
        />
      </div>
    )
  }

  getUsersFromAuth () {
    axios.get(getUsersApi, axiosConfig).then((res) => {
      if (res.status === 200) {
        this.handleApiResponse(res.data.result)
      } else {
        alert('El usuario no tiene permisos')
      }
    })
  }

  postNewUser (userData) {
    return axios.post(postUsersApi, userData, axiosConfig)
  }
}
