import { connect } from 'react-redux'
import StockmovementsDelete from '../../Pages/Stockmovements/StockmovementsDelete'
import {
    DeleteStockmovements, handleDeletemodal, handleSelectedStockmovement
} from '../../Redux/StockmovementSlice'


const mapStateToProps = (state) => ({
    Stockmovements: state.Stockmovements,
    Profile: state.Profile
})

const mapDispatchToProps = {
    DeleteStockmovements, handleDeletemodal, handleSelectedStockmovement
}

export default connect(mapStateToProps, mapDispatchToProps)(StockmovementsDelete)