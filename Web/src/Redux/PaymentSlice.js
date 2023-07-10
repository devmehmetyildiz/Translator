import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

const Literals = {
    addcode: {
        en: 'Data Save',
        tr: 'Veri Kaydetme'
    },
    adddescription: {
        en: 'Payment type added successfully',
        tr: 'Ödeme yöntemi Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Payment type  updated successfully',
        tr: 'Ödeme yöntemi Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Payment type  Deleted successfully',
        tr: 'Ödeme yöntemi Başarı ile Silindi'
    },
}

export const GetPayments = createAsyncThunk(
    'Payments/GetPayments',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.PAYMENT);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPaymentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetPayment = createAsyncThunk(
    'Payments/GetPayment',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.PAYMENT}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPaymentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddPayments = createAsyncThunk(
    'Payments/AddPayments',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.PAYMENT, data);
            dispatch(fillPaymentnotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillPaymentnotification({
                type: 'Clear',
                code: 'PaymentsCreate',
                description: '',
            }));
            history && history.push('/Payments');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPaymentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditPayments = createAsyncThunk(
    'Payments/EditPayments',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.PAYMENT, data);
            dispatch(fillPaymentnotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillPaymentnotification({
                type: 'Clear',
                code: 'PaymentsEdit',
                description: '',
            }));
            history && history.push('/Payments');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPaymentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeletePayments = createAsyncThunk(
    'Payments/DeletePayments',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.PAYMENT}/${data.Uuid}`);
            dispatch(fillPaymentnotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPaymentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const PaymentsSlice = createSlice({
    name: 'Payments',
    initialState: {
        list: [],
        selected_record: {},
        errMsg: null,
        notifications: [],
        isLoading: false,
        isDispatching: false,
        isDeletemodalopen: false
    },
    reducers: {
        handleSelectedPayment: (state, action) => {
            state.selected_record = action.payload;
        },
        fillPaymentnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removePaymentnotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPayments.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetPayments.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetPayment.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetPayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddPayments.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddPayments.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddPayments.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditPayments.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditPayments.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditPayments.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeletePayments.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeletePayments.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeletePayments.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedPayment,
    fillPaymentnotification,
    removePaymentnotification,
    handleDeletemodal
} = PaymentsSlice.actions;

export default PaymentsSlice.reducer;