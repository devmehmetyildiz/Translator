import { connect } from 'react-redux'
import GoalsEdit from '../../Pages/Goals/GoalsEdit'
import {
    EditGoals, GetGoal, handleDeletemodal,
    removeGoalnotification, fillGoalnotification
} from "../../Redux/GoalSlice"

const mapStateToProps = (state) => ({
    Goals: state.Goals,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditGoals, GetGoal, handleDeletemodal,
    removeGoalnotification, fillGoalnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalsEdit)