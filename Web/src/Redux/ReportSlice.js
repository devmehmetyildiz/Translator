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

export const GetUserscount = createAsyncThunk(
    'Recordtypes/GetUserscount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Userrole, `${ROUTES.USER}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetRolescount = createAsyncThunk(
    'Recordtypes/GetRolescount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Userrole, `${ROUTES.ROLE}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetCasescount = createAsyncThunk(
    'Recordtypes/GetCasescount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.CASE}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetCourtcount = createAsyncThunk(
    'Recordtypes/GetCourtcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.COURT}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetCourthausecount = createAsyncThunk(
    'Recordtypes/GetCourthausecount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.COURTHAUSE}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetCompanycount = createAsyncThunk(
    'Recordtypes/GetCompanycount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.DEFINEDCOMPANY}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetCostumercount = createAsyncThunk(
    'Recordtypes/GetCostumercount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.DEFINEDCOSTUMER}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetDocumentcount = createAsyncThunk(
    'Recordtypes/GetDocumentcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.DOCUMENT}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetGoalcount = createAsyncThunk(
    'Recordtypes/GetGoalcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.GOAL}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetKdvcount = createAsyncThunk(
    'Recordtypes/GetKdvcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.KDV}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetLanguagecount = createAsyncThunk(
    'Recordtypes/GetLanguagecount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.LANGUAGE}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetPaymentcount = createAsyncThunk(
    'Recordtypes/GetPaymentcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.PAYMENT}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetRecordtypecount = createAsyncThunk(
    'Recordtypes/GetRecordtypecount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.RECORDTYPE}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetTranslatorcount = createAsyncThunk(
    'Recordtypes/GetTranslatorcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Setting, `${ROUTES.TRANSLATOR}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetJobcount = createAsyncThunk(
    'Recordtypes/GetJobcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Business, `${ROUTES.JOB}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetOrdercount = createAsyncThunk(
    'Recordtypes/GetOrdercount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Business, `${ROUTES.ORDER}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetRulecount = createAsyncThunk(
    'Recordtypes/GetRulecount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.System, `${ROUTES.RULE}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetMailsettingcount = createAsyncThunk(
    'Recordtypes/GetMailsettingcount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.System, `${ROUTES.MAILSETTING}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetPrinttemplatecount = createAsyncThunk(
    'Recordtypes/GetPrinttemplatecount',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.System, `${ROUTES.PRINTTEMPLATE}/GetCount`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);

export const GetLogs = createAsyncThunk(
    'Recordtypes/GetLogs',
    async (_, { dispatch }) => {
        try {
            const response = await instanse.get(config.services.Log, `${ROUTES.LOG}`);
            return response.data;
        } catch (error) {
            const errorPayload = AxiosErrorHelper(error);
            dispatch(fillReportnotification(errorPayload));
            throw errorPayload;
        }
    }
);


export const ReportsSlice = createSlice({
    name: 'Reports',
    initialState: {
        usercount: 0,
        casecount: 0,
        recordtypecount: 0,
        languagecount: 0,
        documentcount: 0,
        goalcount: 0,
        courtcount: 0,
        courthausecount: 0,
        companycount: 0,
        costumercount: 0,
        filecount: 0,
        jobcount: 0,
        kdvcount: 0,
        mailsettingcount: 0,
        ordercount: 0,
        paymentcount: 0,
        printtemplatecount: 0,
        rolecount: 0,
        rulecount: 0,
        translatorcount: 0,
        errMsg: null,
        notifications: [],
        logs: [],
        isLoading: false,
        isDispatching: false,
        Pricepotancial: 0,
        Pricenet: 0,
        Pricereal: 0,
        Pricereal: 0,
        Priceexpence: 0

    },
    reducers: {
        fillReportnotification: (state, action) => {
            const payload = action.payload;
            const messages = Array.isArray(payload) ? payload : [payload];
            state.notifications = messages.concat(state.notifications || []);
        },
        removeReportnotification: (state) => {
            state.notifications.splice(0, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUserscount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.usercount = 0;
            })
            .addCase(GetUserscount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.usercount = action.payload;
            })
            .addCase(GetUserscount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetRolescount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.rolecount = 0;
            })
            .addCase(GetRolescount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.rolecount = action.payload;
            })
            .addCase(GetRolescount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCasescount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.casecount = 0;
            })
            .addCase(GetCasescount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.casecount = action.payload;
            })
            .addCase(GetCasescount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCourtcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.courtcount = 0;
            })
            .addCase(GetCourtcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courtcount = action.payload;
            })
            .addCase(GetCourtcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCourthausecount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.courthausecount = 0;
            })
            .addCase(GetCourthausecount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courthausecount = action.payload;
            })
            .addCase(GetCourthausecount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCompanycount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.companycount = 0;
            })
            .addCase(GetCompanycount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.companycount = action.payload;
            })
            .addCase(GetCompanycount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetCostumercount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.companycount = 0;
            })
            .addCase(GetCostumercount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.companycount = action.payload;
            })
            .addCase(GetCostumercount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetDocumentcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.documentcount = 0;
            })
            .addCase(GetDocumentcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.documentcount = action.payload;
            })
            .addCase(GetDocumentcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetGoalcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.goalcount = 0;
            })
            .addCase(GetGoalcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goalcount = action.payload;
            })
            .addCase(GetGoalcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetKdvcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.kdvcount = 0;
            })
            .addCase(GetKdvcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.kdvcount = action.payload;
            })
            .addCase(GetKdvcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetLanguagecount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.languagecount = 0;
            })
            .addCase(GetLanguagecount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.languagecount = action.payload;
            })
            .addCase(GetLanguagecount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetPaymentcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.paymentcount = 0;
            })
            .addCase(GetPaymentcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paymentcount = action.payload;
            })
            .addCase(GetPaymentcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetRecordtypecount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.recordtypecount = 0;
            })
            .addCase(GetRecordtypecount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recordtypecount = action.payload;
            })
            .addCase(GetRecordtypecount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetTranslatorcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.translatorcount = 0;
            })
            .addCase(GetTranslatorcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.translatorcount = action.payload;
            })
            .addCase(GetTranslatorcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetOrdercount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.ordercount = 0;
            })
            .addCase(GetOrdercount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ordercount = action.payload;
            })
            .addCase(GetOrdercount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetJobcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.jobcount = 0;
            })
            .addCase(GetJobcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobcount = action.payload;
            })
            .addCase(GetJobcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetRulecount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.rulecount = 0;
            })
            .addCase(GetRulecount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.rulecount = action.payload;
            })
            .addCase(GetRulecount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetMailsettingcount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.mailsettingcount = 0;
            })
            .addCase(GetMailsettingcount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.mailsettingcount = action.payload;
            })
            .addCase(GetMailsettingcount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetPrinttemplatecount.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.printtemplatecount = 0;
            })
            .addCase(GetPrinttemplatecount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.printtemplatecount = action.payload;
            })
            .addCase(GetPrinttemplatecount.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
            .addCase(GetLogs.pending, (state) => {
                state.isLoading = true;
                state.errMsg = null;
                state.logs = [];
            })
            .addCase(GetLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.logs = action.payload;
            })
            .addCase(GetLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.error.message;
            })
    }
});

export const {
    fillReportnotification,
    removeReportnotification
} = ReportsSlice.actions;

export default ReportsSlice.reducer;