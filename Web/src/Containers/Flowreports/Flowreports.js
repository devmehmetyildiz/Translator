import { connect } from 'react-redux'
import Flowreports from "../../Pages/Flowreports/Flowreports"
import { GetRecordtypes, removeRecordtypenotification } from "../../Redux/RecordtypeSlice"

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Recordtypes: state.Recordtypes
})

const mapDispatchToProps = { GetRecordtypes, removeRecordtypenotification }

export default connect(mapStateToProps, mapDispatchToProps)(Flowreports)