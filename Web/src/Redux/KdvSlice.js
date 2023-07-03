import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

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
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Setting, ROUTES.KDV, data);
            dispatch(fillKdvnotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Kdv başarı ile Eklendi',
            }));
            history.push('/Kdvs');
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
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Setting, ROUTES.KDV, data);
            dispatch(fillKdvnotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Kdv başarı ile Güncellendi',
            }));
            history.push('/Kdvs');
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
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.KDV}/${data.Uuid}`);
            dispatch(fillKdvnotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Kdv başarı ile Silindi',
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