import { connect } from 'react-redux'
import OrdersEdit from "../../Pages/Orders/OrdersEdit"
import { GetOrder, EditOrders, fillJobnotification, removeJobnotification } from "../../Redux/OrderSlice"
import { GetRecordtypes, removeRecordtypenotification } from "../../Redux/RecordtypeSlice"
import { GetCourthauses, removeCourthausenotification } from "../../Redux/CourthauseSlice"
import { GetCourts, removeCourtnotification } from "../../Redux/CourtSlice"
import { GetDefinedcostumers, removeDefinedcostumernotification } from "../../Redux/DefinedcostumerSlice"
import { GetDefinedcompanies, removeDefinedcompanynotification } from "../../Redux/DefinedcompanySlice"
import { GetTranslators, removeTranslatornotification } from "../../Redux/TranslatorSlice"
import { GetKdvs, removeKdvnotification } from "../../Redux/KdvSlice"
import { GetPayments, removePaymentnotification } from "../../Redux/PaymentSlice"
import { GetLanguages, removeLanguagenotification } from "../../Redux/LanguageSlice"
import { GetDocuments, removeDocumentnotification } from "../../Redux/DocumentSlice"
import { GetCases, removeCasenotification } from "../../Redux/CaseSlice"

const mapStateToProps = (state) => ({
    Orders: state.Orders,
    Recordtypes: state.Recordtypes,
    Courthauses: state.Courthauses,
    Courts: state.Courts,
    Definedcompanies: state.Definedcompanies,
    Definedcostumers: state.Definedcostumers,
    Translators: state.Translators,
    Kdvs: state.Kdvs,
    Payments: state.Payments,
    Languages: state.Languages,
    Documents: state.Documents,
    Cases: state.Cases,
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetOrder, EditOrders, fillJobnotification, removeJobnotification, GetRecordtypes, removeRecordtypenotification,
    GetCourthauses, removeCourthausenotification, GetCourts, removeCourtnotification,
    GetDefinedcostumers, removeDefinedcostumernotification, GetDefinedcompanies, removeDefinedcompanynotification,
    GetTranslators, removeTranslatornotification, GetKdvs, removeKdvnotification, GetPayments, removePaymentnotification,
    GetLanguages, removeLanguagenotification, GetDocuments, removeDocumentnotification, GetCases, removeCasenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersEdit)