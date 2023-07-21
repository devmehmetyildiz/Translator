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
const Home = lazy(() => import('./Pages/Home'));


class Routes extends Component {
  render() {

    const routes = [
      { exact: true, path: "/Login", auth: false, component: Login },
      { exact: true, path: "/Register", auth: false, component: Register },
      { exact: true, path: "/Home", auth: true, component: Home },
      { exact: true, path: "/", auth: true, component: Home },

      { exact: true, path: "/Roles", auth: true, component: Roles },
      { exact: true, path: "/Roles/Create", auth: true, component: RolesCreate },
      { exact: true, path: "/Roles/:RoleID/Edit", auth: true, component: RolesEdit },

      { exact: true, path: "/Cases", auth: true, component: Cases },
      { exact: true, path: "/Cases/Create", auth: true, component: CasesCreate },
      { exact: true, path: "/Cases/:CaseID/Edit", auth: true, component: CasesEdit },

      { exact: true, path: "/Users", auth: true, component: Users },
      { exact: true, path: "/Users/Create", auth: true, component: UsersCreate },
      { exact: true, path: "/Users/:UserID/Edit", auth: true, component: UsersEdit },

      { exact: true, path: "/Files", auth: true, component: Files },
      { exact: true, path: "/Files/Create", auth: true, component: FilesCreate },
      { exact: true, path: "/Files/:FileID/Edit", auth: true, component: FilesEdit },

      { exact: true, path: "/Mailsettings", auth: true, component: Mailsettings },
      { exact: true, path: "/Mailsettings/Create", auth: true, component: MailsettingsCreate },
      { exact: true, path: "/Mailsettings/:MailsettingID/Edit", auth: true, component: MailsettingsEdit },

      { exact: true, path: "/Printtemplates", auth: true, component: Printtemplates },
      { exact: true, path: "/Printtemplates/Create", auth: true, component: PrinttemplatesCreate },
      { exact: true, path: "/Printtemplates/:PrinttemplateID/Edit", auth: true, component: PrinttemplatesEdit },

      { exact: true, path: "/Courthauses", auth: true, component: Courthauses },
      { exact: true, path: "/Courthauses/Create", auth: true, component: CourthausesCreate },
      { exact: true, path: "/Courthauses/:CourthauseID/Edit", auth: true, component: CourthausesEdit },

      { exact: true, path: "/Courts", auth: true, component: Courts },
      { exact: true, path: "/Courts/Create", auth: true, component: CourtsCreate },
      { exact: true, path: "/Courts/:CourtID/Edit", auth: true, component: CourtsEdit },

      { exact: true, path: "/Definedcompanies", auth: true, component: Definedcompanies },
      { exact: true, path: "/Definedcompanies/Create", auth: true, component: DefinedcompaniesCreate },
      { exact: true, path: "/Definedcompanies/:DefinedcompanyID/Edit", auth: true, component: DefinedcompaniesEdit },

      { exact: true, path: "/Definedcostumers", auth: true, component: Definedcostumers },
      { exact: true, path: "/Definedcostumers/Create", auth: true, component: DefinedcostumersCreate },
      { exact: true, path: "/Definedcostumers/:DefinedcostumerID/Edit", auth: true, component: DefinedcostumersEdit },

      { exact: true, path: "/Documents", auth: true, component: Documents },
      { exact: true, path: "/Documents/Create", auth: true, component: DocumentsCreate },
      { exact: true, path: "/Documents/:DocumentID/Edit", auth: true, component: DocumentsEdit },

      { exact: true, path: "/Goals", auth: true, component: Goals },
      { exact: true, path: "/Goals/Create", auth: true, component: GoalsCreate },
      { exact: true, path: "/Goals/:GoalID/Edit", auth: true, component: GoalsEdit },

      { exact: true, path: "/Kdvs", auth: true, component: Kdvs },
      { exact: true, path: "/Kdvs/Create", auth: true, component: KdvsCreate },
      { exact: true, path: "/Kdvs/:KdvID/Edit", auth: true, component: KdvsEdit },

      { exact: true, path: "/Languages", auth: true, component: Languages },
      { exact: true, path: "/Languages/Create", auth: true, component: LanguagesCreate },
      { exact: true, path: "/Languages/:LanguageID/Edit", auth: true, component: LanguagesEdit },

      { exact: true, path: "/Payments", auth: true, component: Payments },
      { exact: true, path: "/Payments/Create", auth: true, component: PaymentsCreate },
      { exact: true, path: "/Payments/:PaymentID/Edit", auth: true, component: PaymentsEdit },

      { exact: true, path: "/Recordtypes", auth: true, component: Recordtypes },
      { exact: true, path: "/Recordtypes/Create", auth: true, component: RecordtypesCreate },
      { exact: true, path: "/Recordtypes/:RecordtypeID/Edit", auth: true, component: RecordtypesEdit },

      { exact: true, path: "/Translators", auth: true, component: Translators },
      { exact: true, path: "/Translators/Create", auth: true, component: TranslatorsCreate },
      { exact: true, path: "/Translators/:TranslatorID/Edit", auth: true, component: TranslatorsEdit },

      { exact: true, path: "/Orders", auth: true, component: Orders },
      { exact: true, path: "/Orders/Create", auth: true, component: OrdersCreate },
      { exact: true, path: "/Orders/:OrderID/Edit", auth: true, component: OrdersEdit },

      { exact: true, path: "/Jobs", auth: true, component: Jobs },
      { exact: true, path: "/Jobs/Create", auth: true, component: JobsCreate },
      { exact: true, path: "/Jobs/:JobID/Edit", auth: true, component: JobsEdit },

      { exact: true, path: "/Rules", auth: true, component: Rules },
      { exact: true, path: "/Rules/Create", auth: true, component: RulesCreate },
      { exact: true, path: "/Rules/:RuleID/Edit", auth: true, component: RulesEdit },

      { exact: true, path: "/Demandreports", auth: true, component: Demandreports },
      { exact: true, path: "/Appreports", auth: true, component: Appreports },
      { exact: true, path: "/Flowreports", auth: true, component: Flowreports },

      { exact: true, path: "/Profile/Edit", auth: true, component: ProfileEdit },
      { exact: true, path: "/Profile/Change-Password", auth: true, component: PasswordChange },
      { exact: true, path: "/Forgetpassword", auth: false, component: Passwordforget }
    ]

    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map((route, index) => {
            return route.auth ? <ProtectedRoute key={index} exact={route.exact} path={route.path} component={route.component} /> :
              <Route key={index} exact={route.exact} path={route.path} component={route.component} />
          })}
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
