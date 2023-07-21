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
        en: 'Record type added successfully',
        tr: 'Kayıt türü Başarı ile eklendi'
    },
    updatecode: {
        en: 'Data Update',
        tr: 'Veri Güncelleme'
    },
    updatedescription: {
        en: 'Record type updated successfully',
        tr: 'Kayıt türü Başarı ile güncellendi'
    },
    deletecode: {
        en: 'Data Delete',
        tr: 'Veri Silme'
    },
    deletedescription: {
        en: 'Record type Deleted successfully',
        tr: 'Kayıt türü Başarı ile Silindi'
    },
}

export const GetActiveuser = createAsyncThunk(
    'Recordtypes/GetActiveuser',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Userrole, ROUTES.RECORDTYPE);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillRecordtypenotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const ReportsSlice = createSlice({
    name: 'Reports',
    initialState: {
        list: [],
        selected_record: {},
        errMsg: null,
        notifications: [],
        isLoading: false,
        isDispatching: false,
    },
    reducers: {
        fillRecordtypenotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeRecordtypenotification: (state) => {
            state.notifications.splice(0, 1);
        },
    },
});

export const {
    fillRecordtypenotification,
    removeRecordtypenotification
} = ReportsSlice.actions;

export default ReportsSlice.reducer;