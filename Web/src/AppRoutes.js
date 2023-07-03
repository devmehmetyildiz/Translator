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

const ProfileEdit = lazy(() => import('./Containers/Auth/ProfileEdit'));
const PasswordChange = lazy(() => import('./Containers/Auth/PasswordChange'));
const Passwordforget = lazy(() => import('./Containers/Auth/Passwordforget'));
const Home = lazy(() => import('./Pages/Home'));


class AppRoutes extends Component {
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

      { exact: true, path: "/Rules", auth: true, component: Rules },
      { exact: true, path: "/Rules/Create", auth: true, component: RulesCreate },
      { exact: true, path: "/Rules/:RuleID/Edit", auth: true, component: RulesEdit },
      
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

export default AppRoutes;
