import { connect } from 'react-redux'
import KdvsEdit from '../../Pages/Kdvs/KdvsEdit'
import {
    EditKdvs, GetKdv, handleDeletemodal,
    removeKdvnotification, fillKdvnotification
} from "../../Redux/KdvSlice"

const mapStateToProps = (state) => ({
    Goals: state.Goals,
    Profile: state.Profile
})

const mapDispatchToProps = {
    EditKdvs, GetKdv, handleDeletemodal,
    removeKdvnotification, fillKdvnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(KdvsEdit)