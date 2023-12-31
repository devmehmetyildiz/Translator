const Priveleges = [
    { code: 'basic', text: 'Basic', group: ['BaseGroup'], required: [] },
    { code: 'admin', text: 'Admin', group: ['BaseGroup'], required: [] },

    { code: 'appreportscreen', text: 'App Report Screen', group: ['Reports'], required: [] },
    { code: 'flowreportscreen', text: 'Flow Report Screen', group: ['Reports'], required: [] },
    { code: 'demandreportscreen', text: 'Demand Report Screen', group: ['Reports'], required: [] },

    { code: 'jobscreen', text: 'Jobs Screen', group: ['Jobs'], required: [] },
    { code: 'jobadd', text: 'Jobs Add', group: ['Jobs'], required: [] },
    { code: 'jobupdate', text: 'Jobs Update', group: ['Jobs'], required: [] },
    { code: 'jobdelete', text: 'Jobs Delete', group: ['Jobs'], required: [] },
    { code: 'jobmanageview', text: 'Jobs Manage View', group: ['Jobs'], required: [] },
    { code: 'jobgetreport', text: 'Jobs Get Report', group: ['Jobs'], required: [] },

    { code: 'orderscreen', text: 'Orders Screen', group: ['Orders'], required: [] },
    { code: 'orderadd', text: 'Orders Add', group: ['Orders'], required: [] },
    { code: 'orderupdate', text: 'Orders Update', group: ['Orders'], required: [] },
    { code: 'orderdelete', text: 'Orders Delete', group: ['Orders'], required: [] },
    { code: 'ordermanageview', text: 'Orders Manage View', group: ['Orders'], required: [] },
    { code: 'ordergetreport', text: 'Orders Get Report', group: ['Orders'], required: [] },

    { code: 'printtemplatescreen', text: 'Printtemplates Screen', group: ['Printtemplates'], required: [] },
    { code: 'printtemplateadd', text: 'Printtemplates Add', group: ['Printtemplates'], required: [] },
    { code: 'printtemplateupdate', text: 'Printtemplates Update', group: ['Printtemplates'], required: [] },
    { code: 'printtemplatedelete', text: 'Printtemplates Delete', group: ['Printtemplates'], required: [] },
    { code: 'printtemplatemanageview', text: 'Printtemplates Manage View', group: ['Printtemplates'], required: [] },
    { code: 'printtemplategetreport', text: 'Printtemplates Get Report', group: ['Printtemplates'], required: [] },

    { code: 'mailsettingscreen', text: 'Mailsettings Screen', group: ['Mailsettings'], required: [] },
    { code: 'mailsettingadd', text: 'Mailsettings Add', group: ['Mailsettings'], required: [] },
    { code: 'mailsettingupdate', text: 'Mailsettings Update', group: ['Mailsettings'], required: [] },
    { code: 'mailsettingdelete', text: 'Mailsettings Delete', group: ['Mailsettings'], required: [] },
    { code: 'mailsettingmanageview', text: 'Mailsettings Manage View', group: ['Mailsettings'], required: [] },
    { code: 'mailsettinggetreport', text: 'Mailsettings Get Report', group: ['Mailsettings'], required: [] },

    { code: 'rulescreen', text: 'Rules Screen', group: ['Rules'], required: [] },
    { code: 'ruleadd', text: 'Rules Add', group: ['Rules'], required: [] },
    { code: 'ruleupdate', text: 'Rules Update', group: ['Rules'], required: [] },
    { code: 'ruledelete', text: 'Rules Delete', group: ['Rules'], required: [] },
    { code: 'rulemanageview', text: 'Rules Manage View', group: ['Rules'], required: [] },
    { code: 'rulegetreport', text: 'Rules Get Report', group: ['Rules'], required: [] },
    { code: 'canclearrulelog', text: 'Rules Can Clear Logs', group: ['Rules'], required: [] },
    { code: 'canstoprule', text: 'Rules Can Stop Rule', group: ['Rules'], required: [] },

    { code: 'kdvscreen', text: 'Kdvs Screen', group: ['Kdvs'], required: [] },
    { code: 'kdvadd', text: 'Kdvs Add', group: ['Kdvs'], required: [] },
    { code: 'kdvupdate', text: 'Kdvs Update', group: ['Kdvs'], required: [] },
    { code: 'kdvdelete', text: 'Kdvs Delete', group: ['Kdvs'], required: [] },
    { code: 'kdvmanageview', text: 'Kdvs Manage View', group: ['Kdvs'], required: [] },
    { code: 'kdvgetreport', text: 'Kdvs Get Report', group: ['Kdvs'], required: [] },

    { code: 'rolescreen', text: 'Roles Screen', group: ['Roles'], required: [] },
    { code: 'roleadd', text: 'Roles Add', group: ['Roles'], required: [] },
    { code: 'roleupdate', text: 'Roles Update', group: ['Roles'], required: [] },
    { code: 'roledelete', text: 'Roles Delete', group: ['Roles'], required: [] },
    { code: 'rolemanageview', text: 'Roles Manage View', group: ['Roles'], required: [] },
    { code: 'rolegetreport', text: 'Roles Get Report', group: ['Roles'], required: [] },

    { code: 'casescreen', text: 'Cases Screen', group: ['Cases'], required: [] },
    { code: 'caseadd', text: 'Cases Add', group: ['Cases'], required: [] },
    { code: 'caseupdate', text: 'Cases Update', group: ['Cases'], required: [] },
    { code: 'casedelete', text: 'Cases Delete', group: ['Cases'], required: [] },
    { code: 'casemanageview', text: 'Cases Manage View', group: ['Cases'], required: [] },
    { code: 'casegetreport', text: 'Cases Get Report', group: ['Cases'], required: [] },

    { code: 'userscreen', text: 'Users Screen', group: ['Users'], required: [] },
    { code: 'useradd', text: 'Users Add', group: ['Users'], required: [] },
    { code: 'userupdate', text: 'Users Update', group: ['Users'], required: [] },
    { code: 'userdelete', text: 'Users Delete', group: ['Users'], required: [] },
    { code: 'usermanageview', text: 'Users Manage View', group: ['Users'], required: [] },
    { code: 'usergetreport', text: 'Users Get Report', group: ['Users'], required: [] },

    { code: 'filescreen', text: 'Files Screen', group: ['Files'], required: [] },
    { code: 'fileadd', text: 'Files Add', group: ['Files'], required: [] },
    { code: 'fileupdate', text: 'Files Update', group: ['Files'], required: [] },
    { code: 'filedelete', text: 'Files Delete', group: ['Files'], required: [] },
    { code: 'filemanageview', text: 'Files Manage View', group: ['Files'], required: [] },
    { code: 'filegetreport', text: 'Files Get Report', group: ['Files'], required: [] },
    { code: 'filedownload', text: 'Files Download', group: ['Files'], required: [] },

    { code: 'courthausescreen', text: 'Courthauses Screen', group: ['Courthauses'], required: [] },
    { code: 'courthauseadd', text: 'Courthauses Add', group: ['Courthauses'], required: [] },
    { code: 'courthauseupdate', text: 'Courthauses Update', group: ['Courthauses'], required: [] },
    { code: 'courthausedelete', text: 'Courthauses Delete', group: ['Courthauses'], required: [] },
    { code: 'courthausemanageview', text: 'Courthauses Manage View', group: ['Courthauses'], required: [] },
    { code: 'courthausegetreport', text: 'Courthauses Get Report', group: ['Courthauses'], required: [] },

    { code: 'courtscreen', text: 'Courts Screen', group: ['Courts'], required: [] },
    { code: 'courtadd', text: 'Courts Add', group: ['Courts'], required: [] },
    { code: 'courtupdate', text: 'Courts Update', group: ['Courts'], required: [] },
    { code: 'courtdelete', text: 'Courts Delete', group: ['Courts'], required: [] },
    { code: 'courtmanageview', text: 'Courts Manage View', group: ['Courts'], required: [] },
    { code: 'courtgetreport', text: 'Courts Get Report', group: ['Courts'], required: [] },

    { code: 'definedcostumerscreen', text: 'Definedcostumers Screen', group: ['Definedcostumers'], required: [] },
    { code: 'definedcostumeradd', text: 'Definedcostumers Add', group: ['Definedcostumers'], required: [] },
    { code: 'definedcostumerupdate', text: 'Definedcostumers Update', group: ['Definedcostumers'], required: [] },
    { code: 'definedcostumerdelete', text: 'Definedcostumers Delete', group: ['Definedcostumers'], required: [] },
    { code: 'definedcostumermanageview', text: 'Definedcostumers Manage View', group: ['Definedcostumers'], required: [] },
    { code: 'definedcostumergetreport', text: 'Definedcostumers Get Report', group: ['Definedcostumers'], required: [] },

    { code: 'definedcompanyscreen', text: 'Definedcompanies Screen', group: ['Definedcompanies'], required: [] },
    { code: 'definedcompanyadd', text: 'Definedcompanies Add', group: ['Definedcompanies'], required: [] },
    { code: 'definedcompanyupdate', text: 'Definedcompanies Update', group: ['Definedcompanies'], required: [] },
    { code: 'definedcompanydelete', text: 'Definedcompanies Delete', group: ['Definedcompanies'], required: [] },
    { code: 'definedcompanymanageview', text: 'Definedcompanies Manage View', group: ['Definedcompanies'], required: [] },
    { code: 'definedcompanygetreport', text: 'Definedcompanies Get Report', group: ['Definedcompanies'], required: [] },

    { code: 'documentscreen', text: 'Documents Screen', group: ['Documents'], required: [] },
    { code: 'documentadd', text: 'Documents Add', group: ['Documents'], required: [] },
    { code: 'documentupdate', text: 'Documents Update', group: ['Documents'], required: [] },
    { code: 'documentdelete', text: 'Documents Delete', group: ['Documents'], required: [] },
    { code: 'documentmanageview', text: 'Documents Manage View', group: ['Documents'], required: [] },
    { code: 'documentgetreport', text: 'Documents Get Report', group: ['Documents'], required: [] },

    { code: 'documentscreen', text: 'Documents Screen', group: ['Documents'], required: [] },
    { code: 'documentadd', text: 'Documents Add', group: ['Documents'], required: [] },
    { code: 'documentupdate', text: 'Documents Update', group: ['Documents'], required: [] },
    { code: 'documentdelete', text: 'Documents Delete', group: ['Documents'], required: [] },
    { code: 'documentmanageview', text: 'Documents Manage View', group: ['Documents'], required: [] },
    { code: 'documentgetreport', text: 'Documents Get Report', group: ['Documents'], required: [] },

    { code: 'goalscreen', text: 'Goals Screen', group: ['Goals'], required: [] },
    { code: 'goaladd', text: 'Goals Add', group: ['Goals'], required: [] },
    { code: 'goalupdate', text: 'Goals Update', group: ['Goals'], required: [] },
    { code: 'goaldelete', text: 'Goals Delete', group: ['Goals'], required: [] },
    { code: 'goalmanageview', text: 'Goals Manage View', group: ['Goals'], required: [] },
    { code: 'goalgetreport', text: 'Goals Get Report', group: ['Goals'], required: [] },

    { code: 'languagescreen', text: 'Languages Screen', group: ['Languages'], required: [] },
    { code: 'languageadd', text: 'Languages Add', group: ['Languages'], required: [] },
    { code: 'languageupdate', text: 'Languages Update', group: ['Languages'], required: [] },
    { code: 'languagedelete', text: 'Languages Delete', group: ['Languages'], required: [] },
    { code: 'languagemanageview', text: 'Languages Manage View', group: ['Languages'], required: [] },
    { code: 'languagegetreport', text: 'Languages Get Report', group: ['Languages'], required: [] },
    { code: 'languagecanchangecalculatesetting', text: 'Languages Can Change Calculate Setting', group: ['Languages'], required: [] },

    { code: 'paymenttypesscreen', text: 'Paymenttypes Screen', group: ['Paymenttypes'], required: [] },
    { code: 'paymenttypesadd', text: 'Paymenttypes Add', group: ['Paymenttypes'], required: [] },
    { code: 'paymenttypesupdate', text: 'Paymenttypes Update', group: ['Paymenttypes'], required: [] },
    { code: 'paymenttypesdelete', text: 'Paymenttypes Delete', group: ['Paymenttypes'], required: [] },
    { code: 'paymenttypesmanageview', text: 'Paymenttypes Manage View', group: ['Paymenttypes'], required: [] },
    { code: 'paymenttypesgetreport', text: 'Paymenttypes Get Report', group: ['Paymenttypes'], required: [] },

    { code: 'recordtypescreen', text: 'Recordtypes Screen', group: ['Recordtype'], required: [] },
    { code: 'recordtypeadd', text: 'Recordtypes Add', group: ['Recordtype'], required: [] },
    { code: 'recordtypeupdate', text: 'Recordtypes Update', group: ['Recordtype'], required: [] },
    { code: 'recordtypedelete', text: 'Recordtypes Delete', group: ['Recordtype'], required: [] },
    { code: 'recordtypemanageview', text: 'Recordtypes Manage View', group: ['Recordtype'], required: [] },
    { code: 'recordtypegetreport', text: 'Recordtypes Get Report', group: ['Recordtype'], required: [] },

    { code: 'translatorscreen', text: 'Translators Screen', group: ['Translator'], required: [] },
    { code: 'translatoradd', text: 'Translators Add', group: ['Translator'], required: [] },
    { code: 'translatorupdate', text: 'Translators Update', group: ['Translator'], required: [] },
    { code: 'translatordelete', text: 'Translators Delete', group: ['Translator'], required: [] },
    { code: 'translatormanageview', text: 'Translators Manage View', group: ['Translator'], required: [] },
    { code: 'translatorgetreport', text: 'Translators Get Report', group: ['Translator'], required: [] },

]

module.exports = Priveleges