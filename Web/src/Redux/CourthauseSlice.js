import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

export const GetCourthauses = createAsyncThunk(
    'Courthauses/GetCourthauses',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.COURTHAUSE);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourthausenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetCourthause = createAsyncThunk(
    'Courthauses/GetCourthause',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.COURTHAUSE}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourthausenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddCourthauses = createAsyncThunk(
    'Courthauses/AddCourthauses',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Setting, ROUTES.COURTHAUSE, data);
            dispatch(fillCourthausenotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Adliye başarı ile Eklendi',
            }));
            history.push('/Courthauses');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourthausenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditCourthauses = createAsyncThunk(
    'Courthauses/EditCourthauses',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Setting, ROUTES.COURTHAUSE, data);
            dispatch(fillCourthausenotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Adliye başarı ile Güncellendi',
            }));
            history.push('/Courthauses');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourthausenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteCourthauses = createAsyncThunk(
    'Courthauses/DeleteCourthauses',
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.COURTHAUSE}/${data.Uuid}`);
            dispatch(fillCourthausenotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Adliye başarı ile Silindi',
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourthausenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const CourthausesSlice = createSlice({
    name: 'Courthauses',
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
        handleSelectedCourthause: (state, action) => {
            state.selected_record = action.payload;
        },
        fillCourthausenotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeCourthausenotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetCourthauses.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetCourthauses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetCourthauses.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCourthause.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetCourthause.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetCourthause.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddCourthauses.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddCourthauses.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddCourthauses.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditCourthauses.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditCourthauses.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditCourthauses.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteCourthauses.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteCourthauses.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteCourthauses.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedCourthause,
    fillCourthausenotification,
    removeCourthausenotification,
    handleDeletemodal
} = CourthausesSlice.actions;

export default CourthausesSlice.reducer;