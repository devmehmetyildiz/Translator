import { connect } from 'react-redux'
import RecordtypesCreate from '../../Pages/Recordtypes/RecordtypesCreate'
import { AddRecordtypes, removeRecordtypenotification, fillRecordtypenotification } from "../../Redux/RecordtypeSlice"
import { GetGoals, removeGoalnotification } from "../../Redux/GoalSlice"


const mapStateToProps = (state) => ({
    Recordtypes: state.Recordtypes,
    Profile: state.Profile,
    Goals: state.Goals
})

const mapDispatchToProps = { AddRecordtypes, removeRecordtypenotification, fillRecordtypenotification, GetGoals, removeGoalnotification }

export default connect(mapStateToProps, mapDispatchToProps)(RecordtypesCreate)