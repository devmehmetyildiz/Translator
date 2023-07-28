import { connect } from 'react-redux'
import RecordtypesEdit from '../../Pages/Recordtypes/RecordtypesEdit'
import {
    EditRecordtypes, GetRecordtype, handleDeletemodal,
    removeRecordtypenotification, fillRecordtypenotification
} from "../../Redux/RecordtypeSlice"
import { GetGoals, removeGoalnotification } from "../../Redux/GoalSlice"

const mapStateToProps = (state) => ({
    Recordtypes: state.Recordtypes,
    Profile: state.Profile,
    Goals: state.Goals
})

const mapDispatchToProps = {
    EditRecordtypes, GetRecordtype, handleDeletemodal, removeGoalnotification,
    removeRecordtypenotification, fillRecordtypenotification, GetGoals
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordtypesEdit)