import { connect } from 'react-redux'
import Units from "../../Pages/Units/Units"
import { GetUnits, DeleteUnits, removeUnitnotification, fillUnitnotification, handleDeletemodal, handleSelectedUnit } from "../../Redux/UnitSlice"

const mapStateToProps = (state) => ({
  Units: state.Units,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetUnits, DeleteUnits, removeUnitnotification, fillUnitnotification,
  handleDeletemodal, handleSelectedUnit
}

export default connect(mapStateToProps, mapDispatchToProps)(Units)