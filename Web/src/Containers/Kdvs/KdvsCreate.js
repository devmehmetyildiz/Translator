import { connect } from 'react-redux'
import KdvsCreate from '../../Pages/Kdvs/KdvsCreate'
import { AddKdvs, removeKdvnotification, fillKdvnotification } from "../../Redux/KdvSlice"


const mapStateToProps = (state) => ({
    Kdvs: state.Kdvs,
    Profile: state.Profile
})

const mapDispatchToProps = { AddKdvs, removeKdvnotification, fillKdvnotification }

export default connect(mapStateToProps, mapDispatchToProps)(KdvsCreate)