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
        en: 'Document added successfully',
        tr: 'Doküman Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Document updated successfully',
        tr: 'Doküman Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Document Deleted successfully',
        tr: 'Doküman Başarı ile Silindi'
    },
}

export const GetDocuments = createAsyncThunk(
    'Documents/GetDocuments',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, ROUTES.DOCUMENT);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDocumentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetDocument = createAsyncThunk(
    'Documents/GetDocument',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.DOCUMENT}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDocumentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddDocuments = createAsyncThunk(
    'Documents/AddDocuments',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.post(config.services.Setting, ROUTES.DOCUMENT, data);
            dispatch(fillDocumentnotification({
                type: 'Success',
                code: Literals.addcode[Language],
                description: Literals.adddescription[Language],
            }));
            dispatch(fillDocumentnotification({
                type: 'Clear',
                code: 'DocumentsCreate',
                description: '',
            }));
            history && history.push('/Documents');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDocumentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditDocuments = createAsyncThunk(
    'Documents/EditDocuments',
    async ({ data, history }, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            const response = await instanse.put(config.services.Setting, ROUTES.DOCUMENT, data);
            dispatch(fillDocumentnotification({
                type: 'Success',
                code: Literals.updatecode[Language],
                description: Literals.updatedescription[Language],
            }));
            dispatch(fillDocumentnotification({
                type: 'Clear',
                code: 'DocumentsEdit',
                description: '',
            }));
            history && history.push('/Documents');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDocumentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeleteDocuments = createAsyncThunk(
    'Documents/DeleteDocuments',
    async (data, { dispatch, getState }) => {
        try {
            const state = getState()
            const Language = state.Profile.Language || 'en'
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.DOCUMENT}/${data.Uuid}`);
            dispatch(fillDocumentnotification({
                type: 'Success',
                code: Literals.deletecode[Language],
                description: Literals.deletedescription[Language],
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillDocumentnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DocumentsSlice = createSlice({
    name: 'Documents',
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
        handleSelectedDocument: (state, action) => {
            state.selected_record = action.payload;
        },
        fillDocumentnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeDocumentnotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetDocuments.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetDocuments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetDocuments.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetDocument.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetDocument.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetDocument.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddDocuments.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddDocuments.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddDocuments.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditDocuments.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditDocuments.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditDocuments.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeleteDocuments.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeleteDocuments.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeleteDocuments.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedDocument,
    fillDocumentnotification,
    removeDocumentnotification,
    handleDeletemodal
} = DocumentsSlice.actions;

export default DocumentsSlice.reducer;