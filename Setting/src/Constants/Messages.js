const messages = {
  ERROR: {
    CASE_NOT_FOUND: {
      code: 'CASE_NOT_FOUND', description: {
        en: 'Case not found',
        tr: 'Durum bulunamadı',
      }
    },
    CASE_NOT_ACTIVE: {
      code: 'CASE_NOT_ACTIVE', description: {
        en: 'Case not active',
        tr: 'Durum aktif değil',
      }
    },
    PAYMENT_NOT_FOUND: {
      code: 'PAYMENT_NOT_FOUND', description: {
        en: 'Payment not found',
        tr: 'Ödeme yöntemi bulunamadı',
      }
    },
    PAYMENT_NOT_ACTIVE: {
      code: 'PAYMENT_NOT_ACTIVE', description: {
        en: 'Payment not active',
        tr: 'Ödeme yöntemi aktif değil',
      }
    },
    COURT_NOT_FOUND: {
      code: 'COURT_NOT_FOUND', description: {
        en: 'Court not found',
        tr: 'Mahkeme bulunamadı',
      }
    },
    COURT_NOT_ACTIVE: {
      code: 'COURT_NOT_ACTIVE', description: {
        en: 'Court not active',
        tr: 'Mahkeme aktif değil',
      }
    },
    COURTHAUSE_NOT_FOUND: {
      code: 'CASE_NOT_FOUND', description: {
        en: 'Courthause not found',
        tr: 'Adliye bulunamadı',
      }
    },
    COURTHAUSE_NOT_ACTIVE: {
      code: 'COURTHAUSE_NOT_ACTIVE', description: {
        en: 'Courthause not active',
        tr: 'Adliye aktif değil',
      }
    },
    DEFINEDCOMPANY_NOT_FOUND: {
      code: 'DEFINEDCOMPANY_NOT_FOUND', description: {
        en: 'Defined company not found',
        tr: 'Tanımlı Firma bulunamadı',
      }
    },
    DEFINEDCOMPANY_NOT_ACTIVE: {
      code: 'DEFINEDCOMPANY_NOT_ACTIVE', description: {
        en: 'Defined company not active',
        tr: 'Tanımlı firma aktif değil',
      }
    },
    DEFINEDCOSTUMER_NOT_FOUND: {
      code: 'DEFINEDCOSTUMER_NOT_FOUND', description: {
        en: 'Defined costumer not found',
        tr: 'Tanımlı müşteri bulunamadı',
      }
    },
    DEFINEDCOSTUMER_NOT_ACTIVE: {
      code: 'DEFINEDCOSTUMER_NOT_ACTIVE', description: {
        en: 'Defined costumer not active',
        tr: 'Tanımlı müşteri aktif değil',
      }
    },

    DOCUMENT_NOT_FOUND: {
      code: 'DOCUMENT_NOT_FOUND', description: {
        en: 'Document not found',
        tr: 'Belge bulunamadı',
      }
    },
    DOCUMENT_NOT_ACTIVE: {
      code: 'DOCUMENT_NOT_ACTIVE', description: {
        en: 'Document not active',
        tr: 'Belge aktif değil',
      }
    },
    GOAL_NOT_FOUND: {
      code: 'GOAL_NOT_FOUND', description: {
        en: 'Goal not found',
        tr: 'Hedef bulunamadı',
      }
    },
    GOAL_NOT_ACTIVE: {
      code: 'GOAL_NOT_ACTIVE', description: {
        en: 'Goal not active',
        tr: 'Hedef aktif değil',
      }
    },
    KDV_NOT_FOUND: {
      code: 'KDV_NOT_FOUND', description: {
        en: 'Kdv not found',
        tr: 'Kdv bulunamadı',
      }
    },
    KDV_NOT_ACTIVE: {
      code: 'KDV_NOT_ACTIVE', description: {
        en: 'Kdv not active',
        tr: 'Kdv aktif değil',
      }
    },
    LANGUAGE_NOT_FOUND: {
      code: 'LANGUAGE_NOT_FOUND', description: {
        en: 'Language not found',
        tr: 'Dil bulunamadı',
      }
    },
    LANGUAGE_NOT_ACTIVE: {
      code: 'LANGUAGE_NOT_ACTIVE', description: {
        en: 'Language not active',
        tr: 'Dil aktif değil',
      }
    },
    LANGUAGECONFIG_NOT_FOUND: {
      code: 'LANGUAGECONFIG_NOT_FOUND', description: {
        en: 'Language config not found',
        tr: 'Dil ayarı bulunamadı',
      }
    },
    LANGUAGECONFIG_NOT_ACTIVE: {
      code: 'LANGUAGECONFIG_NOT_ACTIVE', description: {
        en: 'Language config not active',
        tr: 'Dil ayarı aktif değil',
      }
    },
    RECORDTYPE_NOT_FOUND: {
      code: 'RECORDTYPE_NOT_FOUND', description: {
        en: 'Record type not found',
        tr: 'Kayıt türü bulunamadı',
      }
    },
    RECORDTYPE_NOT_ACTIVE: {
      code: 'RECORDTYPE_NOT_ACTIVE', description: {
        en: 'Record type not active',
        tr: 'Kayıt türü aktif değil',
      }
    },
    TRANSLATOR_NOT_FOUND: {
      code: 'TRANSLATOR_NOT_FOUND', description: {
        en: 'Translator not found',
        tr: 'Tercüman bulunamadı',
      }
    },
    TRANSLATOR_NOT_ACTIVE: {
      code: 'TRANSLATOR_NOT_ACTIVE', description: {
        en: 'Translator not active',
        tr: 'Tercüman aktif değil',
      }
    },
    DATA_ISNOT_ARRAY: {
      code: 'DATA_ISNOT_ARRAY', description: {
        en: 'data is not array',
        tr: 'Data bir dizi değil',
      }
    },
  },
  VALIDATION_ERROR: {
    CASEID_REQUIRED: {
      code: 'CASEID_REQUIRED', description: {
        en: 'The Case Id required',
        tr: 'Bu işlem için Durum unik Id bilgisi gerekli',
      }
    },
    UNSUPPORTED_CASEID: {
      code: 'UNSUPPORTED_CASEID', description: {
        en: 'The Case ID is not supported',
        tr: 'geçersiz durum numarası',
      }
    },
    PAYMENTID_REQUIRED: {
      code: 'PAYMENTID_REQUIRED', description: {
        en: 'The Payment Id required',
        tr: 'Bu işlem için Ödeme numarası gerekli',
      }
    },
    UNSUPPORTED_PAYMENTID: {
      code: 'UNSUPPORTED_PAYMENTID', description: {
        en: 'The Payment ID is not supported',
        tr: 'geçersiz Ödeme numarası',
      }
    },
    COURTID_REQUIRED: {
      code: 'COURTID_REQUIRED', description: {
        en: 'The Court Id required',
        tr: 'Bu işlem için Mahkeme Id bilgisi gerekli',
      }
    },
    UNSUPPORTED_COURTID: {
      code: 'UNSUPPORTED_COURTID', description: {
        en: 'The Court ID is not supported',
        tr: 'geçersiz Mahkeme numarası',
      }
    },
    COURTHAUSEID_REQUIRED: {
      code: 'COURTHAUSEID_REQUIRED', description: {
        en: 'The Courthause Id required',
        tr: 'Bu işlem için Adliye Id bilgisi gerekli',
      }
    },
    UNSUPPORTED_COURTHAUSEID: {
      code: 'UNSUPPORTED_COURTID', description: {
        en: 'The Courthause ID is not supported',
        tr: 'geçersiz Adliye numarası',
      }
    },
    DEFINEDCOMPANYID_REQUIRED: {
      code: 'DEFINEDCOMPANYID_REQUIRED', description: {
        en: 'The Defined company Id required',
        tr: 'Bu işlem için Tanımlı firma bilgisi gerekli',
      }
    },
    UNSUPPORTED_DEFINEDCOMPANYID: {
      code: 'UNSUPPORTED_DEFINEDCOMPANYID', description: {
        en: 'The Defined Company ID is not supported',
        tr: 'geçersiz Tanımlı Firma numarası',
      }
    },
    DEFINEDCOSTUMERID_REQUIRED: {
      code: 'DEFINEDCOSTUMERID_REQUIRED', description: {
        en: 'The Defined Costumer Id required',
        tr: 'Bu işlem için Tanımlı Müşteri bilgisi gerekli',
      }
    },
    UNSUPPORTED_DEFINEDCOSTUMERID: {
      code: 'UNSUPPORTED_DEFINEDCOSTUMERID', description: {
        en: 'The Defined Costumer ID is not supported',
        tr: 'geçersiz Tanımlı Müşteri numarası',
      }
    },
    DOCUMENTID_REQUIRED: {
      code: 'DOCUMENTID_REQUIRED', description: {
        en: 'The Document Id required',
        tr: 'Bu işlem için Belge numarası gerekli',
      }
    },
    UNSUPPORTED_DOCUMENTID: {
      code: 'UNSUPPORTED_DOCUMENTID', description: {
        en: 'The Document ID is not supported',
        tr: 'geçersiz Belge numarası',
      }
    },
    GOALID_REQUIRED: {
      code: 'GOALID_REQUIRED', description: {
        en: 'The Goal Id required',
        tr: 'Bu işlem için Hedef Numarası gerekli',
      }
    },
    UNSUPPORTED_GOALID: {
      code: 'UNSUPPORTED_GOALID', description: {
        en: 'The Goal ID is not supported',
        tr: 'geçersiz Hedef numarası',
      }
    },
    KDVID_REQUIRED: {
      code: 'KDVID_REQUIRED', description: {
        en: 'The Kdv Id required',
        tr: 'Bu işlem için Kdv Numarası gerekli',
      }
    },
    UNSUPPORTED_KDVID: {
      code: 'UNSUPPORTED_KDVID', description: {
        en: 'The Kdv is not supported',
        tr: 'geçersiz Kdv numarası',
      }
    },
    LANGUAGEID_REQUIRED: {
      code: 'LANGUAGEID_REQUIRED', description: {
        en: 'The Language Id required',
        tr: 'Bu işlem için Dil Numarası gerekli',
      }
    },
    UNSUPPORTED_LANGUAGEID: {
      code: 'UNSUPPORTED_LANGUAGEID', description: {
        en: 'The Language is not supported',
        tr: 'geçersiz Dil numarası',
      }
    },
    RECORDTYPEID_REQUIRED: {
      code: 'RECORDTYPEID_REQUIRED', description: {
        en: 'The Record type Id required',
        tr: 'Bu işlem için Kayıt Tür Numarası gerekli',
      }
    },
    UNSUPPORTED_RECORDTYPEID: {
      code: 'UNSUPPORTED_RECORDTYPEID', description: {
        en: 'The Record Type Id is not supported',
        tr: 'geçersiz Kayıt Tür numarası',
      }
    },
    TRANSLATORID_REQUIRED: {
      code: 'TRANSLATORID_REQUIRED', description: {
        en: 'The Translator Id required',
        tr: 'Bu işlem için Tercüman Numarası gerekli',
      }
    },
    UNSUPPORTED_TRANSLATORID: {
      code: 'UNSUPPORTED_TRANSLATORID', description: {
        en: 'The Translator Id is not supported',
        tr: 'geçersiz Tercüman numarası',
      }
    },


    NAME_REQUIRED: {
      code: 'NAME_REQUIRED', description: {
        en: 'The name required',
        tr: 'Bu işlem için isim gerekli',
      }
    },
    SHORTNAME_REQUIRED: {
      code: 'SHORTNAME_REQUIRED', description: {
        en: 'The shortname required',
        tr: 'Bu işlem için kısaltma gerekli',
      }
    },
    CASECOLOR_REQUIRED: {
      code: 'CASECOLOR_REQUIRED', description: {
        en: 'The casecolor required',
        tr: 'Bu işlem için durum rengi gerekli',
      }
    },
    CASESTATUS_REQUIRED: {
      code: 'CASESTATUS_REQUIRED', description: {
        en: 'The case status required',
        tr: 'Bu işlem için case durumu gerekli',
      }
    },
    ADDRESS_REQUIRED: {
      code: 'ADDRESS_REQUIRED', description: {
        en: 'The address required',
        tr: 'Bu işlem için adres gerekli',
      }
    },
    ACCOUNTCODE_REQUIRED: {
      code: 'ACCOUNTCODE_REQUIRED', description: {
        en: 'The account code required',
        tr: 'Bu işlem için vergi numarası gerekli',
      }
    },
    ACCOUNTNAME_REQUIRED: {
      code: 'ACCOUNTNAME_REQUIRED', description: {
        en: 'The account name required',
        tr: 'Bu işlem için vergi dairesi gerekli',
      }
    },
    COUNTRYID_REQUIRED: {
      code: 'COUNTRYID_REQUIRED', description: {
        en: 'The country Id required',
        tr: 'Bu işlem için Kimlik numarası gerekli',
      }
    },
    PHONE_REQUIRED: {
      code: 'PHONE_REQUIRED', description: {
        en: 'The phone required',
        tr: 'Bu işlem için telefon gerekli',
      }
    },
    EMAIL_REQUIRED: {
      code: 'EMAIL_REQUIRED', description: {
        en: 'The e mail required',
        tr: 'Bu işlem için e posta gerekli',
      }
    },
    CITY_REQUIRED: {
      code: 'CITY_REQUIRED', description: {
        en: 'The city required',
        tr: 'Bu işlem için şehir gerekli',
      }
    },
    TOWN_REQUIRED: {
      code: 'TOWN_REQUIRED', description: {
        en: 'The town required',
        tr: 'Bu işlem için ilçe gerekli',
      }
    },
    GOAL_REQUIRED: {
      code: 'GOAL_REQUIRED', description: {
        en: 'The goal required',
        tr: 'Bu işlem için hedef gerekli',
      }
    },
    PERCENT_REQUIRED: {
      code: 'PERCENT_REQUIRED', description: {
        en: 'The percent required',
        tr: 'Bu işlem için yüzde değeri gerekli',
      }
    },
    PRICE_REQUIRED: {
      code: 'PRICE_REQUIRED', description: {
        en: 'The price required',
        tr: 'Bu işlem için fiyat gerekli',
      }
    },
    DISCOUNT_REQUIRED: {
      code: 'DISCOUNT_REQUIRED', description: {
        en: 'The discount required',
        tr: 'Bu işlem için iskonto gerekli',
      }
    },
    USERID_REQUIRED: {
      code: 'USERID_REQUIRED', description: {
        en: 'The user Id required',
        tr: 'Bu işlem için kullanıcı id bilgisi gerekli',
      }
    },
    WORDMAXCOUNT_REQUIRED: {
      code: 'WORDMAXCOUNT_REQUIRED', description: {
        en: 'The word max count required',
        tr: 'Bu işlem için maximum kelime sayısı gerekli',
      }
    },
    LINEMAXCOUNT_REQUIRED: {
      code: 'LINEMAXCOUNT_REQUIRED', description: {
        en: 'The line max count required',
        tr: 'Bu işlem için maximum satır sayısı gerekli',
      }
    },
    CHARMAXCOUNT_REQUIRED: {
      code: 'CHARMAXCOUNT_REQUIRED', description: {
        en: 'The char max count required',
        tr: 'Bu işlem için maximum karakter sayısı gerekli',
      }
    },
  }
}
module.exports = messages
