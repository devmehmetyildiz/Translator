import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

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
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Setting, ROUTES.DOCUMENT, data);
            dispatch(fillDocumentnotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Belge başarı ile Eklendi',
            }));
            history.push('/Documents');
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
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Setting, ROUTES.DOCUMENT, data);
            dispatch(fillDocumentnotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Belge başarı ile Güncellendi',
            }));
            history.push('/Documents');
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
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Setting, `${ROUTES.DOCUMENT}/${data.Uuid}`);
            dispatch(fillDocumentnotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Belge başarı ile Silindi',
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