import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";


export const GetPricenet = createAsyncThunk(
    'Flow/GetPricenet',
    async ({ Startdate, Enddate, RecordtypeID }, { dispatch }) => {
        console.log('Enddate: ', Enddate);
        console.log('Startdate: ', Startdate);
        console.log('RecordtypeID: ', RecordtypeID);
        try {
            const response = await instanse.get(config.services.Business, `${ROUTES.ORDER}/GetPricenet?${Startdate && `Startdate=${Startdate}&`}${Enddate && `Enddate=${Enddate}&`}${RecordtypeID && `RecordtypeID=${RecordtypeID}`}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillFlownotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetPricepotancial = createAsyncThunk(
    'Flow/GetPricepotancial',
    async ({ Startdate, Enddate, RecordtypeID }, { dispatch }) => {
        try {
            const response = await instanse.get(
                config.services.Business,
                `${ROUTES.ORDER}/GetPricepotancial?${Startdate && `Startdate=${Startdate}&`}${Enddate && `Enddate=${Enddate}&`}${RecordtypeID && `RecordtypeID=${RecordtypeID}`}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillFlownotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetPricereal = createAsyncThunk(
    'Flow/GetPricereal',
    async ({ Startdate, Enddate, RecordtypeID }, { dispatch }) => {
        try {
            const response = await instanse.get(
                config.services.Business,
                `${ROUTES.ORDER}/GetPricereal?${Startdate && `Startdate=${Startdate}&`}${Enddate && `Enddate=${Enddate}&`}${RecordtypeID && `RecordtypeID=${RecordtypeID}`}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillFlownotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetPriceexpence = createAsyncThunk(
    'Flow/GetPriceexpence',
    async ({ Startdate, Enddate, RecordtypeID }, { dispatch }) => {
        try {
            const response = await instanse.get(
                config.services.Business,
                `${ROUTES.ORDER}/GetPriceexpence?${Startdate && `Startdate=${Startdate}&`}${Enddate && `Enddate=${Enddate}&`}${RecordtypeID && `RecordtypeID=${RecordtypeID}`}`);
            console.log('response.data: ', response.data);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillFlownotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetOrdercountbydate = createAsyncThunk(
    'Flow/GetOrdercountbydate',
    async ({ Startdate, Enddate, RecordtypeID }, { dispatch }) => {
        try {
            const response = await instanse.get(
                config.services.Business,
                `${ROUTES.ORDER}/GetOrdercountbydate?${Startdate && `Startdate=${Startdate}&`}${Enddate && `Enddate=${Enddate}&`}${RecordtypeID && `RecordtypeID=${RecordtypeID}`}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillFlownotification(errorPayload));
            throw errorPayload;
        }
    }
);
export const GetOrdercountwithjob = createAsyncThunk(
    'Flow/GetOrdercountwithjob',
    async ({ Startdate, Enddate, RecordtypeID }, { dispatch }) => {
        try {
            const response = await instanse.get(
                config.services.Business,
                `${ROUTES.ORDER}/GetOrdercountwithjob?${Startdate && `Startdate=${Startdate}&`}${Enddate && `Enddate=${Enddate}&`}${RecordtypeID && `RecordtypeID=${RecordtypeID}`}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillFlownotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetOrdersforchart = createAsyncThunk(
    'Flow/GetOrdersforchart',
    async ({ Startdate, Enddate, RecordtypeID }, { dispatch }) => {
        try {
            const response = await instanse.get(
                config.services.Business,
                `${ROUTES.ORDER}/GetOrdersforchart?${Startdate && `Startdate=${Startdate}&`}${Enddate && `Enddate=${Enddate}&`}${RecordtypeID && `RecordtypeID=${RecordtypeID}`}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillFlownotification(errorPayload));
            throw errorPayload;
        }
    }
);


export const FlowSlice = createSlice({
    name: 'Flow',
    initialState: {
        errMsg: null,
        notifications: [],
        logs: [],
        isLoading: false,
        isDispatching: false,
        Pricenet: 0,
        Pricepotancial: 0,
        Priceexpence: 0,
        Pricereal: 0,
        Ordercount: 0,
        Jobcount: 0,
        Chartdatas: []
    },
    reducers: {
        fillFlownotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeFlownotification: (state) => {
            state.notifications.splice(0, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPricenet.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.Pricenet = 0;
            })
            .addCase(GetPricenet.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Pricenet = action.payload;
            })
            .addCase(GetPricenet.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetPricepotancial.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.Pricepotancial = 0;
            })
            .addCase(GetPricepotancial.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Pricepotancial = action.payload;
            })
            .addCase(GetPricepotancial.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetPricereal.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.Pricereal = 0;
            })
            .addCase(GetPricereal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Pricereal = action.payload;
            })
            .addCase(GetPricereal.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetPriceexpence.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.Priceexpence = 0;
            })
            .addCase(GetPriceexpence.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Priceexpence = action.payload;
            })
            .addCase(GetPriceexpence.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetOrdercountbydate.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.Ordercount = 0;
            })
            .addCase(GetOrdercountbydate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Ordercount = action.payload;
            })
            .addCase(GetOrdercountbydate.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetOrdercountwithjob.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.Jobcount = 0;
            })
            .addCase(GetOrdercountwithjob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Jobcount = action.payload;
            })
            .addCase(GetOrdercountwithjob.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetOrdersforchart.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.Chartdatas = [];
            })
            .addCase(GetOrdersforchart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Chartdatas = action.payload;
            })
            .addCase(GetOrdersforchart.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })

    }
});

export const {
    fillFlownotification,
    removeFlownotification
} = FlowSlice.actions;

export default FlowSlice.reducer;