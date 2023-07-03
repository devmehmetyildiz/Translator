import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

export const GetGoals = createAsyncThunk(
    'Goals/GetGoals',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.GOAL);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillGoalnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetGoal = createAsyncThunk(
    'Goals/GetGoal',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.GOAL}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillGoalnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddGoals = createAsyncThunk(
    'Goals/AddGoals',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Setting, ROUTES.GOAL, data);
            dispatch(fillGoalnotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Hedef başarı ile Eklendi',
            }));
            history.push('/Goals');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillGoalnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditGoals = createAsyncThunk(
    'Goals/EditGoals',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Setting, ROUTES.GOAL, data);
            dispatch(fillGoalnotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Hedef başarı ile Güncellendi',
            }));
            history.push('/Goals');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillGoalnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteGoals = createAsyncThunk(
    'Goals/DeleteGoals',
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.GOAL}/${data.Uuid}`);
            dispatch(fillGoalnotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Hedef başarı ile Silindi',
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillGoalnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GoalsSlice = createSlice({
    name: 'Goals',
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
        handleSelectedGoal: (state, action) => {
            state.selected_record = action.payload;
        },
        fillGoalnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeGoalnotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetGoals.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetGoal.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddGoals.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddGoals.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddGoals.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditGoals.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditGoals.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditGoals.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteGoals.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteGoals.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteGoals.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedGoal,
    fillGoalnotification,
    removeGoalnotification,
    handleDeletemodal
} = GoalsSlice.actions;

export default GoalsSlice.reducer;