import { connect } from 'react-redux'
import Appreports from "../../Pages/Appreports/Appreports"

const mapStateToProps = (state) => ({
    Profile: state.Profile
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Appreports)