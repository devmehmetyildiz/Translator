import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

export const GetDefinedcostumers = createAsyncThunk(
    'Definedcostumers/GetDefinedcostumers',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.DEFINEDCOSTUMER);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcostumernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetDefinedcostumer = createAsyncThunk(
    'Definedcostumers/GetDefinedcostumer',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.DEFINEDCOSTUMER}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcostumernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddDefinedcostumers = createAsyncThunk(
    'Definedcostumers/AddDefinedcostumers',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Setting, ROUTES.DEFINEDCOSTUMER, data);
            dispatch(fillDefinedcostumernotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Tanımlı Müşteri başarı ile Eklendi',
            }));
            history.push('/Definedcostumers');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcostumernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditDefinedcostumers = createAsyncThunk(
    'Definedcostumers/EditDefinedcostumers',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Setting, ROUTES.DEFINEDCOSTUMER, data);
            dispatch(fillDefinedcostumernotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Tanımlı Müşteri başarı ile Güncellendi',
            }));
            history.push('/Definedcostumers');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcostumernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteDefinedcostumers = createAsyncThunk(
    'Definedcostumers/DeleteDefinedcostumers',
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.DEFINEDCOSTUMER}/${data.Uuid}`);
            dispatch(fillDefinedcostumernotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Tanımlı Müşteri başarı ile Silindi',
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcostumernotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DefinedcostumersSlice = createSlice({
    name: 'Definedcostumers',
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
        handleSelectedDefinedcostumer: (state, action) => {
            state.selected_record = action.payload;
        },
        fillDefinedcostumernotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeDefinedcostumernotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetDefinedcostumers.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetDefinedcostumers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetDefinedcostumers.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetDefinedcostumer.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetDefinedcostumer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetDefinedcostumer.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddDefinedcostumers.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddDefinedcostumers.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddDefinedcostumers.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditDefinedcostumers.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditDefinedcostumers.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditDefinedcostumers.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteDefinedcostumers.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteDefinedcostumers.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteDefinedcostumers.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedDefinedcostumer,
    fillDefinedcostumernotification,
    removeDefinedcostumernotification,
    handleDeletemodal
} = DefinedcostumersSlice.actions;

export default DefinedcostumersSlice.reducer;