import { connect } from 'react-redux'
import UsersEdit from '../../Pages/Users/UsersEdit'
import { EditUsers, GetUser, handleSelectedUser, fillUsernotification, removeUsernotification } from "../../Redux/UserSlice"
import { GetRoles, removeRolenotification } from "../../Redux/RoleSlice"

const mapStateToProps = (state) => ({
  Users: state.Users,
  Roles: state.Roles,
  Profile: state.Profile
})

const mapDispatchToProps = {
  EditUsers, GetUser, handleSelectedUser, fillUsernotification, removeUsernotification, GetRoles, removeRolenotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersEdit)