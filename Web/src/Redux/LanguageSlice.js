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
        en: 'Language added successfully',
        tr: 'Dil Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Language updated successfully',
        tr: 'Dil Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Language Deleted successfully',
        tr: 'Dil Başarı ile Silindi'
    },
}

export const GetLanguages = createAsyncThunk(
    'Languages/GetLanguages',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.LANGUAGE);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillLanguagenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetLanguage = createAsyncThunk(
    'Languages/GetLanguage',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.LANGUAGE}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillLanguagenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddLanguages = createAsyncThunk(
    'Languages/AddLanguages',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.LANGUAGE, data);
            dispatch(fillLanguagenotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillLanguagenotification({
                type: 'Clear',
                code: 'LanguagesCreate',
                description: '',
            }));
            history && history.push('/Languages');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillLanguagenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditLanguages = createAsyncThunk(
    'Languages/EditLanguages',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.LANGUAGE, data);
            dispatch(fillLanguagenotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillLanguagenotification({
                type: 'Clear',
                code: 'LanguagesEdit',
                description: '',
            }));
            history && history.push('/Languages');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillLanguagenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteLanguages = createAsyncThunk(
    'Languages/DeleteLanguages',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.LANGUAGE}/${data.Uuid}`);
            dispatch(fillLanguagenotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillLanguagenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const LanguagesSlice = createSlice({
    name: 'Languages',
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
        handleSelectedLanguage: (state, action) => {
            state.selected_record = action.payload;
        },
        fillLanguagenotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeLanguagenotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetLanguages.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetLanguages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetLanguages.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetLanguage.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetLanguage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetLanguage.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddLanguages.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddLanguages.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddLanguages.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditLanguages.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditLanguages.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditLanguages.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteLanguages.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteLanguages.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteLanguages.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedLanguage,
    fillLanguagenotification,
    removeLanguagenotification,
    handleDeletemodal
} = LanguagesSlice.actions;

export default LanguagesSlice.reducer;