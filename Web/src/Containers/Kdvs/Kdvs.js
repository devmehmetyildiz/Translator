import { connect } from 'react-redux'
import Kdvs from "../../Pages/Kdvs/Kdvs"
import {
  GetKdvs, DeleteKdvs, removeKdvnotification,
  fillKdvnotification, handleDeletemodal, handleSelectedKdv
} from "../../Redux/KdvSlice"

const mapStateToProps = (state) => ({
  Kdvs: state.Kdvs,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetKdvs, DeleteKdvs, removeKdvnotification,
  fillKdvnotification, handleDeletemodal, handleSelectedKdv
}

export default connect(mapStateToProps, mapDispatchToProps)(Kdvs)