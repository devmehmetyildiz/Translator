import { connect } from 'react-redux'
import Orders from "../../Pages/Orders/Orders"
import { GetOrders, removeOrdernotification, handleDeletemodal, handleSelectedOrder } from "../../Redux/OrderSlice"
import { GetJobs, removeJobnotification } from "../../Redux/JobSlice"
import { GetCourthauses, removeCourthausenotification } from "../../Redux/CourthauseSlice"
import { GetCourts, removeCourtnotification } from "../../Redux/CourtSlice"
import { GetDefinedcompanies, removeDefinedcompanynotification } from "../../Redux/DefinedcompanySlice"
import { GetDefinedcostumers, removeDefinedcostumernotification } from "../../Redux/DefinedcostumerSlice"
import { GetPayments, removePaymentnotification } from "../../Redux/PaymentSlice"
import { GetKdvs, removeKdvnotification } from "../../Redux/KdvSlice"
import { GetTranslators, removeTranslatornotification } from "../../Redux/TranslatorSlice"
import { GetCases, removeCasenotification } from "../../Redux/CaseSlice"
import { GetRecordtypes, removeRecordtypenotification } from "../../Redux/RecordtypeSlice"
import { GetDocuments, removeDocumentnotification } from "../../Redux/DocumentSlice"
import { GetLanguages, removeLanguagenotification } from "../../Redux/LanguageSlice"

const mapStateToProps = (state) => ({
    Orders: state.Orders,
    Jobs: state.Jobs,
    Profile: state.Profile,
    Courthauses: state.Courthauses,
    Courts: state.Courts,
    Definedcompanies: state.Definedcompanies,
    Definedcostumers: state.Definedcostumers,
    Kdvs: state.Kdvs,
    Translators: state.Translators,
    Payments: state.Payments,
    Cases: state.Cases,
    Recordtypes: state.Recordtypes,
    Documents: state.Documents,
    Languages: state.Languages
})

const mapDispatchToProps = {
    GetOrders, removeOrdernotification, handleDeletemodal, handleSelectedOrder, GetJobs, GetDefinedcompanies, removeDefinedcompanynotification,
    removeJobnotification, GetCourthauses, removeCourthausenotification, GetCourts, removeCourtnotification, GetDefinedcostumers, removeDefinedcostumernotification,
    GetPayments, removePaymentnotification, GetKdvs, removeKdvnotification, GetTranslators, removeTranslatornotification, GetCases, removeCasenotification,
    GetRecordtypes, removeRecordtypenotification, GetDocuments, removeDocumentnotification, GetLanguages, removeLanguagenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)