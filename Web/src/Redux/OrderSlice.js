import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";
import Cookies from 'universal-cookie';
import axios from 'axios';

const Literals = {
    addcode: {
        en: 'Data Save',
        tr: 'Veri Kaydetme'
    },
    adddescription: {
        en: 'Order added successfully',
        tr: 'Sipariş Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Order updated successfully',
        tr: 'Sipariş Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Order Deleted successfully',
        tr: 'Sipariş Başarı ile Silindi'
    },
}

export const GetOrders = createAsyncThunk(
    'Orders/GetOrders',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Business, ROUTES.ORDER);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillOrdernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetOrder = createAsyncThunk(
    'Orders/GetOrder',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Business, `${ROUTES.ORDER}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillOrdernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddOrders = createAsyncThunk(
    'Orders/AddOrders',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Business, ROUTES.ORDER, data);
            dispatch(fillOrdernotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            const formData = new FormData();
            data.Files.forEach((data, index) => {
                Object.keys(data).forEach(element => {
                    formData.append(`list[${index}].${element}`, data[element])
                });
            })
            const localcookies = new Cookies();
            await axios({
                method: `post`,
                url: config.services.File + `${ROUTES.FILE}`,
                headers: { Authorization: "Bearer  " + localcookies.get('patientcare'), contentType: 'mime/form-data' },
                data: formData
            })
            dispatch(fillOrdernotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillOrdernotification({
                type: 'Clear',
                code: 'OrdersCreate',
                description: '',
            }));
            history && history.push('/Orders');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillOrdernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditOrders = createAsyncThunk(
    'Orders/EditOrders',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Business, ROUTES.ORDER, data);
            dispatch(fillOrdernotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillOrdernotification({
                type: 'Clear',
                code: 'OrdersEdit',
                description: '',
            }));
            history && history.push('/Orders');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillOrdernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteOrders = createAsyncThunk(
    'Orders/DeleteOrders',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Business, `${ROUTES.ORDER}/${data.Uuid}`);
            dispatch(fillOrdernotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillOrdernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const OrdersSlice = createSlice({
    name: 'Orders',
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
        handleSelectedOrder: (state, action) => {
            state.selected_record = action.payload;
        },
        fillOrdernotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeOrdernotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetOrders.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetOrder.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddOrders.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddOrders.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddOrders.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditOrders.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditOrders.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditOrders.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteOrders.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteOrders.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteOrders.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedOrder,
    fillOrdernotification,
    removeOrdernotification,
    handleDeletemodal
} = OrdersSlice.actions;

export default OrdersSlice.reducer;