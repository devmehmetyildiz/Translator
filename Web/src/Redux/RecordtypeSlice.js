import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

export const GetRecordtypes = createAsyncThunk(
    'Recordtypes/GetRecordtypes',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.RECORDTYPE);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillRecordtypenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetRecordtype = createAsyncThunk(
    'Recordtypes/GetRecordtype',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.RECORDTYPE}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillRecordtypenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddRecordtypes = createAsyncThunk(
    'Recordtypes/AddRecordtypes',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Setting, ROUTES.RECORDTYPE, data);
            dispatch(fillRecordtypenotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Kayıt Türü başarı ile Eklendi',
            }));
            history.push('/Recordtypes');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillRecordtypenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditRecordtypes = createAsyncThunk(
    'Recordtypes/EditRecordtypes',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Setting, ROUTES.RECORDTYPE, data);
            dispatch(fillRecordtypenotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Kayıt Türü başarı ile Güncellendi',
            }));
            history.push('/Recordtypes');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillRecordtypenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteRecordtypes = createAsyncThunk(
    'Recordtypes/DeleteRecordtypes',
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.RECORDTYPE}/${data.Uuid}`);
            dispatch(fillRecordtypenotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Kayıt Türü başarı ile Silindi',
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillRecordtypenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const RecordtypesSlice = createSlice({
    name: 'Recordtypes',
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
        handleSelectedRecordtype: (state, action) => {
            state.selected_record = action.payload;
        },
        fillRecordtypenotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeRecordtypenotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetRecordtypes.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetRecordtypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetRecordtypes.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetRecordtype.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetRecordtype.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetRecordtype.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddRecordtypes.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddRecordtypes.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddRecordtypes.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditRecordtypes.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditRecordtypes.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditRecordtypes.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteRecordtypes.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteRecordtypes.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteRecordtypes.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedRecordtype,
    fillRecordtypenotification,
    removeRecordtypenotification,
    handleDeletemodal
} = RecordtypesSlice.actions;

export default RecordtypesSlice.reducer;