import { connect } from 'react-redux'
import KdvsDelete from "../../Pages/Kdvs/KdvsDelete"
import {
    DeleteKdvs, removeKdvnotification, fillKdvnotification,
    handleDeletemodal, handleSelectedKdv
} from "../../Redux/KdvSlice"

const mapStateToProps = (state) => ({
    Kdvs: state.Kdvs,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteKdvs, removeKdvnotification, fillKdvnotification,
    handleDeletemodal, handleSelectedKdv
}

export default connect(mapStateToProps, mapDispatchToProps)(KdvsDelete)