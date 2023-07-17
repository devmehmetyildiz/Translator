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
        en: 'Defined company added successfully',
        tr: 'Tanımlı Firma ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Defined company updated successfully',
        tr: 'Tanımlı Firma ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Defined company Deleted successfully',
        tr: 'Tanımlı Firma ile Silindi'
    },
}

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
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.DEFINEDCOMPANY, data);
            dispatch(fillDefinedcompanynotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillDefinedcompanynotification({
                type: 'Clear',
                code: 'DefinedcompaniesCreate',
                description: '',
            }));
            history && history.push('/Definedcompanies');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDefinedcompanynotification(errorPayload));
            throw errorPayload;
        }
    }
);
export const AddRecordDefinedcompanies = createAsyncThunk(
    'Definedcompanies/AddRecordDefinedcompanies',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.DEFINEDCOMPANY + '/AddRecord', data);
            dispatch(fillDefinedcompanynotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            history && history.push('/Definedcompanies');
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
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.DEFINEDCOMPANY, data);
            dispatch(fillDefinedcompanynotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillDefinedcompanynotification({
                type: 'Clear',
                code: 'DefinedcompaniesEdit',
                description: '',
            }));
            history && history.push('/Definedcompanies');
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
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.DEFINEDCOMPANY}/${data.Uuid}`);
            dispatch(fillDefinedcompanynotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
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
            .addCase(AddRecordDefinedcompanies.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddRecordDefinedcompanies.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddRecordDefinedcompanies.rejected, (state, action) => {
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