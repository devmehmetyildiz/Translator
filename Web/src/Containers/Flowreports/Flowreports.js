import { connect } from 'react-redux'
import Flowreports from "../../Pages/Flowreports/Flowreports"

const mapStateToProps = (state) => ({
    Profile: state.Profile
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Flowreports)