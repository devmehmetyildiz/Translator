import { connect } from 'react-redux'
import Demandreports from "../../Pages/Demandreports/Demandreports"

const mapStateToProps = (state) => ({
    Profile: state.Profile
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Demandreports)