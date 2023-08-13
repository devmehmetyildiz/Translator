import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from './Common/Spinner'
import ProtectedRoute from './Utils/ProtectedRoute';

const Login = lazy(() => import('./Containers/Auth/Login'));
const Register = lazy(() => import('./Containers/Auth/Register'));
const Roles = lazy(() => import('./Containers/Roles/Roles'));
const RolesCreate = lazy(() => import('./Containers/Roles/RolesCreate'));
const RolesEdit = lazy(() => import('./Containers/Roles/RolesEdit'));

const Rules = lazy(() => import('./Containers/Rules/Rules'));
const RulesCreate = lazy(() => import('./Containers/Rules/RulesCreate'));
const RulesEdit = lazy(() => import('./Containers/Rules/RulesEdit'));

const Cases = lazy(() => import('./Containers/Cases/Cases'));
const CasesCreate = lazy(() => import('./Containers/Cases/CasesCreate'));
const CasesEdit = lazy(() => import('./Containers/Cases/CasesEdit'));

const Users = lazy(() => import('./Containers/Users/Users'));
const UsersCreate = lazy(() => import('./Containers/Users/UsersCreate'));
const UsersEdit = lazy(() => import('./Containers/Users/UsersEdit'));

const Files = lazy(() => import('./Containers/Files/Files'));
const FilesCreate = lazy(() => import('./Containers/Files/FilesCreate'));
const FilesEdit = lazy(() => import('./Containers/Files/FilesEdit'));

const Mailsettings = lazy(() => import('./Containers/Mailsettings/Mailsettings'));
const MailsettingsCreate = lazy(() => import('./Containers/Mailsettings/MailsettingsCreate'));
const MailsettingsEdit = lazy(() => import('./Containers/Mailsettings/MailsettingsEdit'));

const Printtemplates = lazy(() => import('./Containers/Printtemplates/Printtemplates'));
const PrinttemplatesCreate = lazy(() => import('./Containers/Printtemplates/PrinttemplatesCreate'));
const PrinttemplatesEdit = lazy(() => import('./Containers/Printtemplates/PrinttemplatesEdit'));

const Courthauses = lazy(() => import('./Containers/Courthauses/Courthauses'));
const CourthausesCreate = lazy(() => import('./Containers/Courthauses/CourthausesCreate'));
const CourthausesEdit = lazy(() => import('./Containers/Courthauses/CourthausesEdit'));

const Courts = lazy(() => import('./Containers/Courts/Courts'));
const CourtsCreate = lazy(() => import('./Containers/Courts/CourtsCreate'));
const CourtsEdit = lazy(() => import('./Containers/Courts/CourtsEdit'));

const Definedcompanies = lazy(() => import('./Containers/Definedcompanies/Definedcompanies'));
const DefinedcompaniesCreate = lazy(() => import('./Containers/Definedcompanies/DefinedcompaniesCreate'));
const DefinedcompaniesEdit = lazy(() => import('./Containers/Definedcompanies/DefinedcompaniesEdit'));

const Definedcostumers = lazy(() => import('./Containers/Definedcostumers/Definedcostumers'));
const DefinedcostumersCreate = lazy(() => import('./Containers/Definedcostumers/DefinedcostumersCreate'));
const DefinedcostumersEdit = lazy(() => import('./Containers/Definedcostumers/DefinedcostumersEdit'));

const Documents = lazy(() => import('./Containers/Documents/Documents'));
const DocumentsCreate = lazy(() => import('./Containers/Documents/DocumentsCreate'));
const DocumentsEdit = lazy(() => import('./Containers/Documents/DocumentsEdit'));

const Goals = lazy(() => import('./Containers/Goals/Goals'));
const GoalsCreate = lazy(() => import('./Containers/Goals/GoalsCreate'));
const GoalsEdit = lazy(() => import('./Containers/Goals/GoalsEdit'));

const Kdvs = lazy(() => import('./Containers/Kdvs/Kdvs'));
const KdvsCreate = lazy(() => import('./Containers/Kdvs/KdvsCreate'));
const KdvsEdit = lazy(() => import('./Containers/Kdvs/KdvsEdit'));

const Languages = lazy(() => import('./Containers/Languages/Languages'));
const LanguagesCreate = lazy(() => import('./Containers/Languages/LanguagesCreate'));
const LanguagesEdit = lazy(() => import('./Containers/Languages/LanguagesEdit'));

const Payments = lazy(() => import('./Containers/Payments/Payments'));
const PaymentsCreate = lazy(() => import('./Containers/Payments/PaymentsCreate'));
const PaymentsEdit = lazy(() => import('./Containers/Payments/PaymentsEdit'));

const Recordtypes = lazy(() => import('./Containers/Recordtypes/Recordtypes'));
const RecordtypesCreate = lazy(() => import('./Containers/Recordtypes/RecordtypesCreate'));
const RecordtypesEdit = lazy(() => import('./Containers/Recordtypes/RecordtypesEdit'));

const Translators = lazy(() => import('./Containers/Translators/Translators'));
const TranslatorsCreate = lazy(() => import('./Containers/Translators/TranslatorsCreate'));
const TranslatorsEdit = lazy(() => import('./Containers/Translators/TranslatorsEdit'));

const Orders = lazy(() => import('./Containers/Orders/Orders'));
const OrdersCreate = lazy(() => import('./Containers/Orders/OrdersCreate'));
const OrdersEdit = lazy(() => import('./Containers/Orders/OrdersEdit'));

const Jobs = lazy(() => import('./Containers/Jobs/Jobs'));
const JobsCreate = lazy(() => import('./Containers/Jobs/JobsCreate'));
const JobsEdit = lazy(() => import('./Containers/Jobs/JobsEdit'));

const Appreports = lazy(() => import('./Containers/Appreports/Appreports'));
const Demandreports = lazy(() => import('./Containers/Demandreports/Demandreports'));
const Flowreports = lazy(() => import('./Containers/Flowreports/Flowreports'));


const ProfileEdit = lazy(() => import('./Containers/Auth/ProfileEdit'));
const PasswordChange = lazy(() => import('./Containers/Auth/PasswordChange'));
const Passwordforget = lazy(() => import('./Containers/Auth/Passwordforget'));
const Passwordreset = lazy(() => import('./Containers/Auth/Passwordreset'));
const Home = lazy(() => import('./Pages/Home'));
const Notfoundpage = lazy(() => import('./Utils/Notfoundpage'));


class Routes extends Component {
  render() {

    console.log('this.props: ', this.props);
    const { Profile } = this.props

    const roles = Profile?.roles

    const routes = [
      { exact: true, path: "/Login", auth: false, component: Login },
      { exact: true, path: "/Register", auth: false, component: Register },
      { exact: true, path: "/Home", auth: true, component: Home, permission: '' },
      { exact: true, path: "/", auth: true, component: Home, permission: '' },

      { exact: true, path: "/Roles", auth: true, component: Roles, permission: 'rolescreen' },
      { exact: true, path: "/Roles/Create", auth: true, component: RolesCreate, permission: 'rolescreen' },
      { exact: true, path: "/Roles/:RoleID/Edit", auth: true, component: RolesEdit, permission: 'rolescreen' },

      { exact: true, path: "/Cases", auth: true, component: Cases, permission: 'casescreen' },
      { exact: true, path: "/Cases/Create", auth: true, component: CasesCreate, permission: 'casescreen' },
      { exact: true, path: "/Cases/:CaseID/Edit", auth: true, component: CasesEdit, permission: 'casescreen' },

      { exact: true, path: "/Users", auth: true, component: Users, permission: 'userscreen' },
      { exact: true, path: "/Users/Create", auth: true, component: UsersCreate, permission: 'userscreen' },
      { exact: true, path: "/Users/:UserID/Edit", auth: true, component: UsersEdit, permission: 'userscreen' },

      { exact: true, path: "/Files", auth: true, component: Files, permission: 'filescreen' },
      { exact: true, path: "/Files/Create", auth: true, component: FilesCreate, permission: 'filescreen' },
      { exact: true, path: "/Files/:FileID/Edit", auth: true, component: FilesEdit, permission: 'filescreen' },

      { exact: true, path: "/Mailsettings", auth: true, component: Mailsettings, permission: 'mailsettingscreen' },
      { exact: true, path: "/Mailsettings/Create", auth: true, component: MailsettingsCreate, permission: 'mailsettingscreen' },
      { exact: true, path: "/Mailsettings/:MailsettingID/Edit", auth: true, component: MailsettingsEdit, permission: 'mailsettingscreen' },

      { exact: true, path: "/Printtemplates", auth: true, component: Printtemplates, permission: 'printtemplatescreen' },
      { exact: true, path: "/Printtemplates/Create", auth: true, component: PrinttemplatesCreate, permission: 'printtemplatescreen' },
      { exact: true, path: "/Printtemplates/:PrinttemplateID/Edit", auth: true, component: PrinttemplatesEdit, permission: 'printtemplatescreen' },

      { exact: true, path: "/Courthauses", auth: true, component: Courthauses, permission: 'courthausescreen' },
      { exact: true, path: "/Courthauses/Create", auth: true, component: CourthausesCreate, permission: 'courthausescreen' },
      { exact: true, path: "/Courthauses/:CourthauseID/Edit", auth: true, component: CourthausesEdit, permission: 'courthausescreen' },

      { exact: true, path: "/Courts", auth: true, component: Courts, permission: 'courtscreen' },
      { exact: true, path: "/Courts/Create", auth: true, component: CourtsCreate, permission: 'courtscreen' },
      { exact: true, path: "/Courts/:CourtID/Edit", auth: true, component: CourtsEdit, permission: 'courtscreen' },

      { exact: true, path: "/Definedcompanies", auth: true, component: Definedcompanies, permission: 'definedcompanyscreen' },
      { exact: true, path: "/Definedcompanies/Create", auth: true, component: DefinedcompaniesCreate, permission: 'definedcompanyscreen' },
      { exact: true, path: "/Definedcompanies/:DefinedcompanyID/Edit", auth: true, component: DefinedcompaniesEdit, permission: 'definedcompanyscreen' },

      { exact: true, path: "/Definedcostumers", auth: true, component: Definedcostumers, permission: 'definedcostumerscreen' },
      { exact: true, path: "/Definedcostumers/Create", auth: true, component: DefinedcostumersCreate, permission: 'definedcostumerscreen' },
      { exact: true, path: "/Definedcostumers/:DefinedcostumerID/Edit", auth: true, component: DefinedcostumersEdit, permission: 'definedcostumerscreen' },

      { exact: true, path: "/Documents", auth: true, component: Documents, permission: 'documentscreen' },
      { exact: true, path: "/Documents/Create", auth: true, component: DocumentsCreate, permission: 'documentscreen' },
      { exact: true, path: "/Documents/:DocumentID/Edit", auth: true, component: DocumentsEdit, permission: 'documentscreen' },

      { exact: true, path: "/Goals", auth: true, component: Goals, permission: 'goalscreen' },
      { exact: true, path: "/Goals/Create", auth: true, component: GoalsCreate, permission: 'goalscreen' },
      { exact: true, path: "/Goals/:GoalID/Edit", auth: true, component: GoalsEdit, permission: 'goalscreen' },

      { exact: true, path: "/Kdvs", auth: true, component: Kdvs, permission: 'kdvscreen' },
      { exact: true, path: "/Kdvs/Create", auth: true, component: KdvsCreate, permission: 'kdvscreen' },
      { exact: true, path: "/Kdvs/:KdvID/Edit", auth: true, component: KdvsEdit, permission: 'kdvscreen' },

      { exact: true, path: "/Languages", auth: true, component: Languages, permission: 'languagescreen' },
      { exact: true, path: "/Languages/Create", auth: true, component: LanguagesCreate, permission: 'languagescreen' },
      { exact: true, path: "/Languages/:LanguageID/Edit", auth: true, component: LanguagesEdit, permission: 'languagescreen' },

      { exact: true, path: "/Payments", auth: true, component: Payments, permission: 'paymenttypesscreen' },
      { exact: true, path: "/Payments/Create", auth: true, component: PaymentsCreate, permission: 'paymenttypesscreen' },
      { exact: true, path: "/Payments/:PaymentID/Edit", auth: true, component: PaymentsEdit, permission: 'paymenttypesscreen' },

      { exact: true, path: "/Recordtypes", auth: true, component: Recordtypes, permission: 'recordtypescreen' },
      { exact: true, path: "/Recordtypes/Create", auth: true, component: RecordtypesCreate, permission: 'recordtypescreen' },
      { exact: true, path: "/Recordtypes/:RecordtypeID/Edit", auth: true, component: RecordtypesEdit, permission: 'recordtypescreen' },

      { exact: true, path: "/Translators", auth: true, component: Translators, permission: 'translatorscreen' },
      { exact: true, path: "/Translators/Create", auth: true, component: TranslatorsCreate, permission: 'translatorscreen' },
      { exact: true, path: "/Translators/:TranslatorID/Edit", auth: true, component: TranslatorsEdit, permission: 'translatorscreen' },

      { exact: true, path: "/Orders", auth: true, component: Orders, permission: 'orderscreen' },
      { exact: true, path: "/Orders/Create", auth: true, component: OrdersCreate, permission: 'orderscreen' },
      { exact: true, path: "/Orders/:OrderID/Edit", auth: true, component: OrdersEdit, permission: 'orderscreen' },

      { exact: true, path: "/Jobs", auth: true, component: Jobs, permission: 'jobscreen' },
      { exact: true, path: "/Jobs/Create", auth: true, component: JobsCreate, permission: 'jobscreen' },
      { exact: true, path: "/Jobs/:JobID/Edit", auth: true, component: JobsEdit, permission: 'jobscreen' },

      { exact: true, path: "/Rules", auth: true, component: Rules, permission: 'rulescreen' },
      { exact: true, path: "/Rules/Create", auth: true, component: RulesCreate, permission: 'rulescreen' },
      { exact: true, path: "/Rules/:RuleID/Edit", auth: true, component: RulesEdit, permission: 'rulescreen' },

      { exact: true, path: "/Demandreports", auth: true, component: Demandreports, permission: 'demandreportscreen' },
      { exact: true, path: "/Appreports", auth: true, component: Appreports, permission: 'appreportscreen' },
      { exact: true, path: "/Flowreports", auth: true, component: Flowreports, permission: 'flowreportscreen' },

      { exact: true, path: "/Profile/Edit", auth: true, component: ProfileEdit, permission: 'basic' },
      { exact: true, path: "/Profile/Change-Password", auth: true, component: PasswordChange, permission: 'basic' },
      { exact: true, path: "/Forgetpassword", auth: false, component: Passwordforget },
      { exact: true, path: "/Passwordreset/:PasswordID", auth: false, component: Passwordreset },
      { exact: false, path: "*", auth: false, component: Notfoundpage },
    ]

    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map((route, index) => {
            return route.auth ? (((roles || []).includes('admin') || (roles || []).includes(route.permission)) ? <ProtectedRoute key={index} exact={route.exact} path={route.path} component={route.component} /> : null) :
              <Route key={index} exact={route.exact} path={route.path} component={route.component} />
          })}
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
