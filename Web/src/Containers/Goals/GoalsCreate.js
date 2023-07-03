import { connect } from 'react-redux'
import GoalsCreate from '../../Pages/Goals/GoalsCreate'
import { AddGoals, removeGoalnotification, fillGoalnotification } from "../../Redux/GoalSlice"


const mapStateToProps = (state) => ({
    Goals: state.Goals,
    Profile: state.Profile
})

const mapDispatchToProps = { AddGoals, removeGoalnotification, fillGoalnotification }

export default connect(mapStateToProps, mapDispatchToProps)(GoalsCreate)