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
        en: 'Translator added successfully',
        tr: 'Tercüman Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Translator updated successfully',
        tr: 'Tercüman Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Translator Deleted successfully',
        tr: 'Tercüman Başarı ile Silindi'
    },
}

export const GetTranslators = createAsyncThunk(
    'Translators/GetTranslators',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.TRANSLATOR);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillTranslatornotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetTranslator = createAsyncThunk(
    'Translators/GetTranslator',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.TRANSLATOR}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillTranslatornotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddTranslators = createAsyncThunk(
    'Translators/AddTranslators',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.TRANSLATOR, data);
            dispatch(fillTranslatornotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillTranslatornotification({
                type: 'Clear',
                code: 'TranslatorsCreate',
                description: '',
            }));
history && history.push('/Translators');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillTranslatornotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditTranslators = createAsyncThunk(
    'Translators/EditTranslators',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.TRANSLATOR, data);
            dispatch(fillTranslatornotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillTranslatornotification({
                type: 'Clear',
                code: 'TranslatorsEdit',
                description: '',
            }));
history && history.push('/Translators');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillTranslatornotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteTranslators = createAsyncThunk(
    'Translators/DeleteTranslators',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.TRANSLATOR}/${data.Uuid}`);
            dispatch(fillTranslatornotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillTranslatornotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const TranslatorsSlice = createSlice({
    name: 'Translators',
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
        handleSelectedTranslator: (state, action) => {
            state.selected_record = action.payload;
        },
        fillTranslatornotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeTranslatornotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetTranslators.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetTranslators.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetTranslators.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetTranslator.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetTranslator.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetTranslator.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddTranslators.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddTranslators.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddTranslators.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditTranslators.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditTranslators.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditTranslators.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteTranslators.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteTranslators.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteTranslators.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedTranslator,
    fillTranslatornotification,
    removeTranslatornotification,
    handleDeletemodal
} = TranslatorsSlice.actions;

export default TranslatorsSlice.reducer;