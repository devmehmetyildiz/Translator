import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

export const GetDefinedcompanies = createAsyncThunk(
    'Definedcompanies/GetDefinedcompanies',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.DEFINEDCOMPANY);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcompanynotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetDefinedcompany = createAsyncThunk(
    'Definedcompanies/GetDefinedcompany',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.DEFINEDCOMPANY}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcompanynotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddDefinedcompanies = createAsyncThunk(
    'Definedcompanies/AddDefinedcompanies',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Setting, ROUTES.DEFINEDCOMPANY, data);
            dispatch(fillDefinedcompanynotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Tanımlı Firma başarı ile Eklendi',
            }));
            history.push('/Definedcompanies');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcompanynotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditDefinedcompanies = createAsyncThunk(
    'Definedcompanies/EditDefinedcompanies',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Setting, ROUTES.DEFINEDCOMPANY, data);
            dispatch(fillDefinedcompanynotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Tanımlı Firma başarı ile Güncellendi',
            }));
            history.push('/Definedcompanies');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcompanynotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteDefinedcompanies = createAsyncThunk(
    'Definedcompanies/DeleteDefinedcompanies',
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.DEFINEDCOMPANY}/${data.Uuid}`);
            dispatch(fillDefinedcompanynotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Tanımlı Firma başarı ile Silindi',
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcompanynotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DefinedcompaniesSlice = createSlice({
    name: 'Definedcompanies',
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
        handleSelectedDefinedcompany: (state, action) => {
            state.selected_record = action.payload;
        },
        fillDefinedcompanynotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeDefinedcompanynotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetDefinedcompanies.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetDefinedcompanies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetDefinedcompanies.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetDefinedcompany.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetDefinedcompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetDefinedcompany.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddDefinedcompanies.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddDefinedcompanies.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddDefinedcompanies.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditDefinedcompanies.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditDefinedcompanies.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditDefinedcompanies.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteDefinedcompanies.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteDefinedcompanies.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteDefinedcompanies.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedDefinedcompany,
    fillDefinedcompanynotification,
    removeDefinedcompanynotification,
    handleDeletemodal
} = DefinedcompaniesSlice.actions;

export default DefinedcompaniesSlice.reducer;