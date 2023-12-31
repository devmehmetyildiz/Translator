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
        en: 'Court added successfully',
        tr: 'Mahkeme Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Court updated successfully',
        tr: 'Mahkeme Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Court Deleted successfully',
        tr: 'Mahkeme Başarı ile Silindi'
    },
}

export const GetCourts = createAsyncThunk(
    'Courts/GetCourts',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.COURT);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourtnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetCourt = createAsyncThunk(
    'Courts/GetCourt',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.COURT}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourtnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddCourts = createAsyncThunk(
    'Courts/AddCourts',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.COURT, data);
            dispatch(fillCourtnotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillCourtnotification({
                type: 'Clear',
                code: 'CourtsCreate',
                description: '',
            }));
            history && history.push('/Courts');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourtnotification(errorPayload));
            throw errorPayload;
        }
    }
);
export const AddRecordCourts = createAsyncThunk(
    'Courts/AddRecordCourts',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.COURT+ '/AddRecord', data);
            dispatch(fillCourtnotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            history && history.push('/Courts');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourtnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditCourts = createAsyncThunk(
    'Courts/EditCourts',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.COURT, data);
            dispatch(fillCourtnotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillCourtnotification({
                type: 'Clear',
                code: 'CourtsEdit',
                description: '',
            }));
            history && history.push('/Courts');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourtnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteCourts = createAsyncThunk(
    'Courts/DeleteCourts',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.COURT}/${data.Uuid}`);
            dispatch(fillCourtnotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillCourtnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const CourtsSlice = createSlice({
    name: 'Courts',
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
        handleSelectedCourt: (state, action) => {
            state.selected_record = action.payload;
        },
        fillCourtnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeCourtnotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetCourts.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetCourts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetCourts.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCourt.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetCourt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetCourt.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddCourts.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddCourts.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddCourts.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddRecordCourts.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddRecordCourts.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddRecordCourts.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditCourts.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditCourts.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditCourts.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteCourts.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteCourts.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteCourts.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedCourt,
    fillCourtnotification,
    removeCourtnotification,
    handleDeletemodal
} = CourtsSlice.actions;

export default CourtsSlice.reducer;