import { connect } from 'react-redux'
import PasswordChange from '../../Pages/Auth/PasswordChange'
import { removenotification, fillnotification, Changepassword } from "../../Redux/ProfileSlice"
import { removeUsernotification } from "../../Redux/UserSlice"


const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Users: state.Users
})

const mapDispatchToProps = {
    removenotification, fillnotification, Changepassword, removeUsernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange)