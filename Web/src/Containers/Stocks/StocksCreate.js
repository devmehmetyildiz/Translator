import { connect } from 'react-redux'
import StocksCreate from '../../Pages/Stocks/StocksCreate'
import { AddStocks, removeStocknotification, fillStocknotification } from '../../Redux/StockSlice'
import { GetStockdefines, removeStockdefinenotification } from '../../Redux/StockdefineSlice'
import { GetDepartments, removeDepartmentnotification } from '../../Redux/DepartmentSlice'
import { GetWarehouses, removeWarehousenotification } from '../../Redux/WarehouseSlice'

const mapStateToProps = (state) => ({
  Stockdefines: state.Stockdefines,
  Departments: state.Departments,
  Stocks: state.Stocks,
  Warehouses: state.Warehouses,
  Profile: state.Profile
})

const mapDispatchToProps = {
  AddStocks, removeStocknotification, fillStocknotification, GetStockdefines, removeStockdefinenotification,
  GetDepartments, removeDepartmentnotification, GetWarehouses, removeWarehousenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksCreate)