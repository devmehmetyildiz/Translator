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
        en: 'Job added successfully',
        tr: 'İş Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Job updated successfully',
        tr: 'İş Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Job Deleted successfully',
        tr: 'İş Başarı ile Silindi'
    },
}

export const GetJobs = createAsyncThunk(
    'Jobs/GetJobs',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Business, ROUTES.JOB);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillJobnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetJob = createAsyncThunk(
    'Jobs/GetJob',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Business, `${ROUTES.JOB}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillJobnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddJobs = createAsyncThunk(
    'Jobs/AddJobs',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Business, ROUTES.JOB, data);
            dispatch(fillJobnotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillJobnotification({
                type: 'Clear',
                code: 'JobsCreate',
                description: '',
            }));
            history && history.push('/Jobs');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillJobnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditJobs = createAsyncThunk(
    'Jobs/EditJobs',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Business, ROUTES.JOB, data);
            dispatch(fillJobnotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'İş başarı ile Güncellendi',
            }));
            history && history.push('/Jobs');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillJobnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteJobs = createAsyncThunk(
    'Jobs/DeleteJobs',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Business, `${ROUTES.JOB}/${data.Uuid}`);
            dispatch(fillJobnotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'İş başarı ile Silindi',
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillJobnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const JobsSlice = createSlice({
    name: 'Jobs',
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
        handleSelectedJob: (state, action) => {
            state.selected_record = action.payload;
        },
        fillJobnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeJobnotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetJobs.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetJob.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetJob.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddJobs.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddJobs.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddJobs.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditJobs.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditJobs.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditJobs.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteJobs.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteJobs.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteJobs.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedJob,
    fillJobnotification,
    removeJobnotification,
    handleDeletemodal
} = JobsSlice.actions;

export default JobsSlice.reducer;