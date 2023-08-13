import { connect } from 'react-redux'
import Passwordreset from '../../Pages/Auth/Passwordreset'
import { removenotification, fillnotification, Resetpassword } from "../../Redux/ProfileSlice"
import { removeUsernotification } from "../../Redux/UserSlice"


const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Users: state.Users
})

const mapDispatchToProps = {
    removenotification, fillnotification, Resetpassword, removeUsernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Passwordreset)