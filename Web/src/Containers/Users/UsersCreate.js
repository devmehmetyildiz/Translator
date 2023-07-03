import { connect } from 'react-redux'
import UsersCreate from "../../Pages/Users/UsersCreate"
import { AddUsers, fillUsernotification, removeUsernotification } from "../../Redux/UserSlice"
import { GetRoles, removeRolenotification } from "../../Redux/RoleSlice"

const mapStateToProps = (state) => ({
    Users: state.Users,
    Roles: state.Roles,
    Profile: state.Profile
})

const mapDispatchToProps = {
    AddUsers, fillUsernotification, removeUsernotification, GetRoles, removeRolenotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersCreate)