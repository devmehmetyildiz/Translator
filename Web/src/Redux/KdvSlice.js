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
        en: 'Kdv added successfully',
        tr: 'Kdv Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Kdv updated successfully',
        tr: 'Kdv Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Kdv Deleted successfully',
        tr: 'Kdv Başarı ile Silindi'
    },
}


export const GetKdvs = createAsyncThunk(
    'Kdvs/GetKdvs',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.KDV);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillKdvnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetKdv = createAsyncThunk(
    'Kdvs/GetKdv',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.KDV}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillKdvnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddKdvs = createAsyncThunk(
    'Kdvs/AddKdvs',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.KDV, data);
            dispatch(fillKdvnotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillKdvnotification({
                type: 'Clear',
                code: 'JobsCreate',
                description: '',
            }));
            history && history.push('/Kdvs');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillKdvnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddRecordKdvs = createAsyncThunk(
    'Kdvs/AddRecordKdvs',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.KDV + '/AddRecord', data);
            dispatch(fillKdvnotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            history && history.push('/Kdvs');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillKdvnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditKdvs = createAsyncThunk(
    'Kdvs/EditKdvs',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.KDV, data);
            dispatch(fillKdvnotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillKdvnotification({
                type: 'Clear',
                code: 'JobsEdit',
                description: '',
            }));
            history && history.push('/Kdvs');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillKdvnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteKdvs = createAsyncThunk(
    'Kdvs/DeleteKdvs',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.KDV}/${data.Uuid}`);
            dispatch(fillKdvnotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillKdvnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const KdvsSlice = createSlice({
    name: 'Kdvs',
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
        handleSelectedKdv: (state, action) => {
            state.selected_record = action.payload;
        },
        fillKdvnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeKdvnotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetKdvs.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetKdvs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetKdvs.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetKdv.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetKdv.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetKdv.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddKdvs.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddKdvs.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddKdvs.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddRecordKdvs.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddRecordKdvs.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddRecordKdvs.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditKdvs.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditKdvs.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditKdvs.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteKdvs.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteKdvs.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteKdvs.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedKdv,
    fillKdvnotification,
    removeKdvnotification,
    handleDeletemodal
} = KdvsSlice.actions;

export default KdvsSlice.reducer;