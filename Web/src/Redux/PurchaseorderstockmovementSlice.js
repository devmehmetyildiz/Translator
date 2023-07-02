import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTES } from "../Utils/Constants";
import AxiosErrorHelper from "../Utils/AxiosErrorHelper"
import instanse from "./axios";
import config from "../Config";

export const GetPurchaseorderstockmovements = createAsyncThunk(
    'Purchaseorderstockmovements/GetPurchaseorderstockmovements',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Warehouse, ROUTES.PURCHASEORDERSTOCKMOVEMENT);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPurchaseorderstockmovementnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetPurchaseorderstockmovement = createAsyncThunk(
    'Purchaseorderstockmovements/GetPurchaseorderstockmovement',
    async (guid, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Warehouse, `${ROUTES.PURCHASEORDERSTOCKMOVEMENT}/${guid}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPurchaseorderstockmovementnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const AddPurchaseorderstockmovements = createAsyncThunk(
    'Purchaseorderstockmovements/AddPurchaseorderstockmovements',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.post(config.services.Warehouse, ROUTES.PURCHASEORDERSTOCKMOVEMENT, data);
            dispatch(fillPurchaseorderstockmovementnotification({
                type: 'Success',
                code: 'Veri Kaydetme',
                description: 'Satın alma stok hareketi başarı ile Eklendi',
            }));
            history.push('/Purchaseorderstockmovements');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPurchaseorderstockmovementnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const EditPurchaseorderstockmovements = createAsyncThunk(
    'Purchaseorderstockmovements/EditPurchaseorderstockmovements',
    async ({ data, history }, { dispatch }) => {
        try {
            const response = await instanse.put(config.services.Warehouse, ROUTES.PURCHASEORDERSTOCKMOVEMENT, data);
            dispatch(fillPurchaseorderstockmovementnotification({
                type: 'Success',
                code: 'Veri Güncelleme',
                description: 'Satın alma stok hareketi başarı ile Güncellendi',
            }));
            history.push('/Purchaseorderstockmovements');
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPurchaseorderstockmovementnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const DeletePurchaseorderstockmovements = createAsyncThunk(
    'Purchaseorderstockmovements/DeletePurchaseorderstockmovements',
    async (data, { dispatch }) => {
        try {
            delete data['edit'];
            delete data['delete'];
            const response = await instanse.delete(config.services.Warehouse, `${ROUTES.PURCHASEORDERSTOCKMOVEMENT}/${data.Uuid}`);
            dispatch(fillPurchaseorderstockmovementnotification({
                type: 'Success',
                code: 'Veri Silme',
                description: 'Satın alma stok hareketi başarı ile Silindi',
            }));
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillPurchaseorderstockmovementnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const PurchaseorderstockmovementsSlice = createSlice({
    name: 'Purchaseorderstockmovements',
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
        handleSelectedPurchaseorderstockmovement: (state, action) => {
            state.selected_record = action.payload;
        },
        fillPurchaseorderstockmovementnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removePurchaseorderstockmovementnotification: (state) => {
            state.notifications.splice(0, 1);
        },
        handleDeletemodal: (state, action) => {
            state.isDeletemodalopen = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPurchaseorderstockmovements.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.list = [];
            })
            .addCase(GetPurchaseorderstockmovements.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(GetPurchaseorderstockmovements.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetPurchaseorderstockmovement.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.selected_record = {};
            })
            .addCase(GetPurchaseorderstockmovement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selected_record = action.payload;
            })
            .addCase(GetPurchaseorderstockmovement.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(AddPurchaseorderstockmovements.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(AddPurchaseorderstockmovements.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(AddPurchaseorderstockmovements.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(EditPurchaseorderstockmovements.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(EditPurchaseorderstockmovements.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(EditPurchaseorderstockmovements.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            })
            .addCase(DeletePurchaseorderstockmovements.pending, (state) => {
                state.isDispatching = true;
            })
            .addCase(DeletePurchaseorderstockmovements.fulfilled, (state, action) => {
                state.isDispatching = false;
                state.list = action.payload;
            })
            .addCase(DeletePurchaseorderstockmovements.rejected, (state, action) => {
                state.isDispatching = false;
                state.errMsg = action.error.message;
            });
    },
});

export const {
    handleSelectedPurchaseorderstockmovement,
    fillPurchaseorderstockmovementnotification,
    removePurchaseorderstockmovementnotification,
    handleDeletemodal
} = PurchaseorderstockmovementsSlice.actions;

export default PurchaseorderstockmovementsSlice.reducer;