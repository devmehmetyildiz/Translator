import { combineReducers } from "@reduxjs/toolkit";

import JobSlice from "./JobSlice";
import OrderSlice from "./OrderSlice";

import ReportSlice from "./ReportSlice";

import ProfileSlice from "./ProfileSlice";
import RoleSlice from "./RoleSlice";
import UserSlice from "./UserSlice";

import FileSlice from "./FileSlice";

import RuleSlice from "./RuleSlice";
import MailsettingSlice from "./MailsettingSlice";
import PrinttemplateSlice from "./PrinttemplateSlice";

import CaseSlice from "./CaseSlice";
import CourthauseSlice from './CourthauseSlice'
import CourtSlice from './CourtSlice'
import DefinedcompanySlice from './DefinedcompanySlice'
import DefinedcostumerSlice from './DefinedcostumerSlice'
import DocumentSlice from './DocumentSlice'
import GoalSlice from './GoalSlice'
import KdvSlice from './KdvSlice'
import LanguageSlice from './LanguageSlice'
import PaymentSlice from './PaymentSlice'
import RecordtypeSlice from './RecordtypeSlice'
import TranslatorSlice from './TranslatorSlice'

const Slices = combineReducers({
    Profile: ProfileSlice,
    Roles: RoleSlice,
    Cases: CaseSlice,
    Users: UserSlice,
    Files: FileSlice,
    Mailsettings: MailsettingSlice,
    Printtemplates: PrinttemplateSlice,
    Rules: RuleSlice,
    Courthauses: CourthauseSlice,
    Courts: CourtSlice,
    Definedcompanies: DefinedcompanySlice,
    Definedcostumers: DefinedcostumerSlice,
    Documents: DocumentSlice,
    Goals: GoalSlice,
    Kdvs: KdvSlice,
    Languages: LanguageSlice,
    Payments: PaymentSlice,
    Recordtypes: RecordtypeSlice,
    Translators: TranslatorSlice,
    Orders: OrderSlice,
    Jobs: JobSlice,
    Reports: ReportSlice
});

export default Slices;