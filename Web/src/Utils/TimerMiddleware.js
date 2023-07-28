import Cookies from "universal-cookie";
import config from "../Config";
import { ROUTES } from "./Constants";
import instanse from "../Redux/axios";

const INTERVAL = 1000 * 60 * 2

const timerMiddleware = store => next => action => {

    if (action.type === 'START_TIMER') {
        const intervalId = setInterval(async () => {
            store.dispatch({
                type: 'EXECUTED_TIMER'
            })
            try {
                console.log("refresh token yenileniyor")
                const localcookies = new Cookies();
                let token = localcookies.get('patientcareRefresh')
                const response = await instanse.post(config.services.Auth, `Oauth/Login`, {
                    grant_type: 'refresh_token',
                    refreshToken: token
                });
                console.log('response.data: ', response.data);
                localcookies.set('patientcare', response.data.accessToken, { path: '/' })
                localcookies.set('patientcareRefresh', response.data.refreshToken, { path: '/' })
                console.log("refresh token yenilendi")
            } catch (error) {
                console.log('error: ', error);
                console.log("refresh token hatalı")
            }

        }, INTERVAL);

        next({ ...action, meta: { ...action.meta, intervalId } });
    } else if (action.type === 'STOP_TIMER') {
        clearInterval(action.meta.intervalId);
    } else {
        next(action);
    }
};

export default timerMiddleware;