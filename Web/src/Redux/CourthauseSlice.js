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
        en: 'Courthause added successfully',
        tr: 'Adliye Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Courthause updated successfully',
        tr: 'Adliye Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Courthause Deleted successfully',
        tr: 'Adliye Başarı ile Silindi'
    },
}


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
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.COURTHAUSE, data);
            dispatch(fillCourthausenotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillCourthausenotification({
                type: 'Clear',
                code: 'CourthausesUpdate',
                description: '',
            }));
            history && history.push('/Courthauses');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourthausenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddRecordCourthauses = createAsyncThunk(
    'Courthauses/AddRecordCourthauses',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.COURTHAUSE + '/AddRecord', data);
            dispatch(fillCourthausenotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            history && history.push('/Courthauses');
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
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.COURTHAUSE, data);
            dispatch(fillCourthausenotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            history && history.push('/Courthauses');
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
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.COURTHAUSE}/${data.Uuid}`);
            dispatch(fillCourthausenotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
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
            .addCase(AddRecordCourthauses.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddRecordCourthauses.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddRecordCourthauses.rejected, (state, action) => {
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