const Routes = [
  { method: 'get', path: '/Cases/GetCompleteCase', controller: 'Case', action: 'GetCompleteCase' },
  { method: 'get', path: '/Cases/GetDeactivateCase', controller: 'Case', action: 'GetDeactivateCase' },
  { method: 'get', path: '/Cases/:caseId', controller: 'Case', action: 'GetCase' },
  { method: 'get', path: '/Cases', controller: 'Case', action: 'GetCases' },
  { method: 'post', path: '/Cases', controller: 'Case', action: 'AddCase' },
  { method: 'put', path: '/Cases', controller: 'Case', action: 'UpdateCase' },
  { method: 'delete', path: '/Cases/:caseId', controller: 'Case', action: 'DeleteCase' },

  { method: 'get', path: '/Courts/:courtId', controller: 'Court', action: 'GetCourt' },
  { method: 'get', path: '/Courts', controller: 'Court', action: 'GetCourts' },
  { method: 'post', path: '/Courts', controller: 'Court', action: 'AddCourt' },
  { method: 'put', path: '/Courts', controller: 'Court', action: 'UpdateCourt' },
  { method: 'delete', path: '/Courts/:courtId', controller: 'Court', action: 'DeleteCourt' },

  { method: 'get', path: '/Courthauses/:courthauseId', controller: 'Courthause', action: 'GetCourthause' },
  { method: 'get', path: '/Courthauses', controller: 'Courthause', action: 'GetCourthauses' },
  { method: 'post', path: '/Courthauses', controller: 'Courthause', action: 'AddCourthause' },
  { method: 'put', path: '/Courthauses', controller: 'Courthause', action: 'UpdateCourthause' },
  { method: 'delete', path: '/Courthauses/:courthauseId', controller: 'Courthause', action: 'DeleteCourthause' },

  { method: 'get', path: '/Definedcompanies/:definedcompanyId', controller: 'Definedcompany', action: 'GetDefinedcompany' },
  { method: 'get', path: '/Definedcompanies', controller: 'Definedcompany', action: 'GetDefinedcompanies' },
  { method: 'post', path: '/Definedcompanies', controller: 'Definedcompany', action: 'AddDefinedcompany' },
  { method: 'put', path: '/Definedcompanies', controller: 'Definedcompany', action: 'UpdateDefinedcompany' },
  { method: 'delete', path: '/Definedcompanies/:definedcompanyId', controller: 'Definedcompany', action: 'DeleteDefinedcompany' },

  { method: 'get', path: '/Definedcostumers/:definedcostumerId', controller: 'Definedcostumer', action: 'GetDefinedcostumer' },
  { method: 'get', path: '/Definedcostumers', controller: 'Definedcostumer', action: 'GetDefinedcostumers' },
  { method: 'post', path: '/Definedcostumers', controller: 'Definedcostumer', action: 'AddDefinedcostumer' },
  { method: 'put', path: '/Definedcostumers', controller: 'Definedcostumer', action: 'UpdateDefinedcostumer' },
  { method: 'delete', path: '/Definedcostumers/:definedcostumerId', controller: 'Definedcostumer', action: 'DeleteDefinedcostumer' },

  { method: 'get', path: '/Documents/:documentId', controller: 'Document', action: 'GetDocument' },
  { method: 'get', path: '/Documents', controller: 'Document', action: 'GetDocuments' },
  { method: 'post', path: '/Documents', controller: 'Document', action: 'AddDocument' },
  { method: 'put', path: '/Documents', controller: 'Document', action: 'UpdateDocument' },
  { method: 'delete', path: '/Documents/:documentId', controller: 'Document', action: 'DeleteDocument' },

  { method: 'get', path: '/Goals/:goalId', controller: 'Goal', action: 'GetGoal' },
  { method: 'get', path: '/Goals', controller: 'Goal', action: 'GetGoals' },
  { method: 'post', path: '/Goals', controller: 'Goal', action: 'AddGoal' },
  { method: 'put', path: '/Goals', controller: 'Goal', action: 'UpdateGoal' },
  { method: 'delete', path: '/Goals/:goalId', controller: 'Goal', action: 'DeleteGoal' },

  { method: 'get', path: '/Kdvs/:kdvId', controller: 'Kdv', action: 'GetKdv' },
  { method: 'get', path: '/Kdvs', controller: 'Kdv', action: 'GetKdvs' },
  { method: 'post', path: '/Kdvs', controller: 'Kdv', action: 'AddKdv' },
  { method: 'put', path: '/Kdvs', controller: 'Kdv', action: 'UpdateKdv' },
  { method: 'delete', path: '/Kdvs/:kdvId', controller: 'Kdv', action: 'DeleteKdv' },

  { method: 'get', path: '/Languages/:languageId', controller: 'Language', action: 'GetLanguage' },
  { method: 'get', path: '/Languages/Getconfig', controller: 'Language', action: 'GetLanguageconfig' },
  { method: 'post', path: '/Languages/Saveconfig', controller: 'Language', action: 'UpdateLanguageconfig' },
  { method: 'get', path: '/Languages', controller: 'Language', action: 'GetLanguages' },
  { method: 'post', path: '/Languages', controller: 'Language', action: 'AddLanguage' },
  { method: 'put', path: '/Languages', controller: 'Language', action: 'UpdateLanguage' },
  { method: 'delete', path: '/Languages/:languageId', controller: 'Language', action: 'DeleteLanguage' },

  { method: 'get', path: '/Recordtypes/:recordtypeId', controller: 'Recordtype', action: 'GetRecordtype' },
  { method: 'get', path: '/Recordtypes', controller: 'Recordtype', action: 'GetRecordtypes' },
  { method: 'post', path: '/Recordtypes', controller: 'Recordtype', action: 'AddRecordtype' },
  { method: 'put', path: '/Recordtypes', controller: 'Recordtype', action: 'UpdateRecordtype' },
  { method: 'delete', path: '/Recordtypes/:recordtypeId', controller: 'Recordtype', action: 'DeleteRecordtype' },

  { method: 'get', path: '/Translators/:translatorId', controller: 'Translator', action: 'GetTranslator' },
  { method: 'get', path: '/Translators', controller: 'Translator', action: 'GetTranslators' },
  { method: 'post', path: '/Translators', controller: 'Translator', action: 'AddTranslator' },
  { method: 'put', path: '/Translators', controller: 'Translator', action: 'UpdateTranslator' },
  { method: 'delete', path: '/Translators/:translatorId', controller: 'Translator', action: 'DeleteTranslator' },

  { method: 'get', path: '/Payments/:paymentId', controller: 'Payment', action: 'GetPayment' },
  { method: 'get', path: '/Payments', controller: 'Payment', action: 'GetPayments' },
  { method: 'post', path: '/Payments', controller: 'Payment', action: 'AddPayment' },
  { method: 'put', path: '/Payments', controller: 'Payment', action: 'UpdatePayment' },
  { method: 'delete', path: '/Payments/:paymentId', controller: 'Payment', action: 'DeletePayment' },

]

module.exports = Routes