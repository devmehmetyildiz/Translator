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
    FILE_NOT_FOUND: {
      code: 'FILE_NOT_FOUND', description: {
        en: 'File not found',
        tr: 'Dosya bulunamadı',
      }
    },
    FILE_CANT_REMOVE: {
      code: 'FILE_CANT_REMOVE', description: {
        en: 'File cant remove',
        tr: 'Dosya Silinemedi',
      }
    },
    FILE_NOT_ACTIVE: {
      code: 'FILE_NOT_ACTIVE', description: {
        en: 'File not active',
        tr: 'Dosya aktif değil',
      }
    },
    UNIT_NOT_FOUND: {
      code: 'UNIT_NOT_FOUND', description: {
        en: 'Unit not found',
        tr: 'Birim bulunamadı',
      }
    },
    UNIT_NOT_ACTIVE: {
      code: 'UNIT_NOT_ACTIVE', description: {
        en: 'Unit not active',
        tr: 'Birim aktif değil',
      }
    },
    DEPARTMENT_NOT_FOUND: {
      code: 'DEPARTMENT_NOT_FOUND', description: {
        en: 'Department not found',
        tr: 'Departman bulunamadı',
      }
    },
    DEPARTMENT_NOT_ACTIVE: {
      code: 'DEPARTMENT_NOT_ACTIVE', description: {
        en: 'Department not active',
        tr: 'Departman aktif değil',
      }
    },
    CHECKPERIOD_NOT_FOUND: {
      code: 'CHECKPERIOD_NOT_FOUND', description: {
        en: 'Checkperiod not found',
        tr: 'Kontrol periyodu bulunamadı',
      }
    },
    CHECKPERIOD_NOT_ACTIVE: {
      code: 'CHECKPERIOD_NOT_ACTIVE', description: {
        en: 'Checkperiod not active',
        tr: 'Kontrol periyodu aktif değil',
      }
    },
    COSTUMERTYPE_NOT_FOUND: {
      code: 'COSTUMERTYPE_NOT_FOUND', description: {
        en: 'Costumer type not found',
        tr: 'Müşteri türü bulunamadı',
      }
    },
    COSTUMERTYPE_NOT_ACTIVE: {
      code: 'COSTUMERTYPE_NOT_ACTIVE', description: {
        en: 'Costumer type not active',
        tr: 'Müşteri türü aktif değil',
      }
    },
    FILE_UPLOAD_ERROR: {
      code: 'FILE_UPLOAD_ERROR', description: {
        en: 'File cant upload to ftp server',
        tr: 'Dosya ftp servera yüklenemedi',
      }
    },
    FILE_DOWNLOAD_ERROR: {
      code: 'FILE_DOWNLOAD_ERROR', description: {
        en: 'File cant download to ftp server',
        tr: 'Dosya ftp serverdan indirilemedi',
      }
    },
    PATIENTTYPE_NOT_FOUND: {
      code: 'PATIENTTYPE_NOT_FOUND', description: {
        en: 'Patient type not found',
        tr: 'Hasta türü bulunamadı',
      }
    },
    PATIENTTYPE_NOT_ACTIVE: {
      code: 'PATIENTTYPE_NOT_ACTIVE', description: {
        en: 'Patienttype not active',
        tr: 'Hasta türü aktif değil',
      }
    },
    PERIOD_NOT_FOUND: {
      code: 'PERIOD_NOT_FOUND', description: {
        en: 'Period not found',
        tr: 'Periyot bulunamadı',
      }
    },
    PERIOD_NOT_ACTIVE: {
      code: 'PERIOD_NOT_ACTIVE', description: {
        en: 'Period not active',
        tr: 'Periyot aktif değil',
      }
    },
    STATION_NOT_FOUND: {
      code: 'STATION_NOT_FOUND', description: {
        en: 'Station not found',
        tr: 'İstasyon bulunamadı',
      }
    },
    STATION_NOT_ACTIVE: {
      code: 'STATION_NOT_ACTIVE', description: {
        en: 'Station not active',
        tr: 'İstasyon aktif değil',
      }
    },
    TODODEFINE_NOT_FOUND: {
      code: 'TODODEFINE_NOT_FOUND', description: {
        en: 'Todo define not found',
        tr: 'Yapılacaklar tanımı bulunamadı',
      }
    },
    TODODEFINE_NOT_ACTIVE: {
      code: 'TODODEFINE_NOT_ACTIVE', description: {
        en: 'Todo define not active',
        tr: 'Yapılacaklar tanımı aktif değil',
      }
    },
    TODOGROUPDEFINE_NOT_FOUND: {
      code: 'TODOGROUPDEFINE_NOT_FOUND', description: {
        en: 'Todogroup define not found',
        tr: 'Yapılacak grup tanımı bulunamadı',
      }
    },
    TODOGROUPDEFINE_NOT_ACTIVE: {
      code: 'TODOGROUPDEFINE_NOT_ACTIVE', description: {
        en: 'Todogroup define not active',
        tr: 'Yapılacak grup tanımı aktif değil',
      }
    },

  },
  VALIDATION_ERROR: {
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
    DEPARTMENTS_REQUIRED: {
      code: 'DEPARTMENTS_REQUIRED', description: {
        en: 'The departments required',
        tr: 'Bu işlem için departmanlar gerekli',
      }
    },
    CASEID_REQUIRED: {
      code: 'CASEID_REQUIRED', description: {
        en: 'The caseId required',
        tr: 'Bu işlem için caseid bilgisi gerekli',
      }
    },
    UNITID_REQUIRED: {
      code: 'UNITID_REQUIRED', description: {
        en: 'The unitID required',
        tr: 'Bu işlem için unitId bilgisi gerekli',
      }
    },
    DEPARTMENTID_REQUIRED: {
      code: 'DEPARTMENTID_REQUIRED', description: {
        en: 'The departmentId required',
        tr: 'Bu işlem için departmentId bilgisi gerekli',
      }
    },
    UNITTYPE_REQUIRED: {
      code: 'UNITTYPE_REQUIRED', description: {
        en: 'The unit type required',
        tr: 'Bu işlem için birim türü bilgisi gerekli',
      }
    },
    UNSUPPORTED_CASEID: {
      code: 'UNSUPPORTED_CASEID', description: {
        en: 'The caseId is not supported',
        tr: 'geçersiz durum numarası',
      }
    },
    UNSUPPORTED_UNITID: {
      code: 'UNSUPPORTED_UNITID', description: {
        en: 'The unitId is not supported',
        tr: 'geçersiz birim numarası',
      }
    },
    UNSUPPORTED_DEPARTMENTID: {
      code: 'UNSUPPORTED_DEPARTMENTID', description: {
        en: 'The department id is not supported',
        tr: 'geçersiz departman numarası',
      }
    },
    PERIODTYPE_REQUIRED: {
      code: 'PERIODTYPE_REQUIRED', description: {
        en: 'The Periodtype required',
        tr: 'Periyot türü gereklidir',
      }
    },
    OCCUREDDAYS_REQUIRED: {
      code: 'OCCUREDDAYS_REQUIRED', description: {
        en: 'The Occureddays is required',
        tr: 'Gerçekleşme günleri gereklidir',
      }
    },
    TODODEFINES_REQUIRED: {
      code: 'TODODEFINES_REQUIRED', description: {
        en: 'The Todo defines are required',
        tr: 'Yapılacaklar gereklidir',
      }
    },
    PERIODS_REQUIRED: {
      code: 'PERIODS_REQUIRED', description: {
        en: 'The Periods is required',
        tr: 'Periyotlar gereklidir',
      }
    },
    CHECKPERIODID_REQUIRED: {
      code: 'CHECKPERIODID_REQUIRED', description: {
        en: 'The Checkperiodid is required',
        tr: 'Kontrol periyot idsi gereklidir',
      }
    },
    UNSUPPORTED_CHECKPERIODID: {
      code: 'UNSUPPORTED_CHECKPERIODID', description: {
        en: 'The Checkperiodid is unsupported',
        tr: 'Geçersiz kontrol periyot idsi',
      }
    },
    UNSUPPORTED_PERIODID: {
      code: 'UNSUPPORTED_PERIODID', description: {
        en: 'The Periodid is unsupported',
        tr: 'Geçersiz  periyot idsi',
      }
    },
    UNSUPPORTED_COSTUMERTYPEID: {
      code: 'UNSUPPORTED_COSTUMERTYPEID', description: {
        en: 'The costumertypeid is unsupported',
        tr: 'Geçersiz  costumertypeid',
      }
    },
    UNSUPPORTED_PATIENTTYPEID: {
      code: 'UNSUPPORTED_PATIENTTYPEID', description: {
        en: 'The patienttypeid is unsupported',
        tr: 'Geçersiz  patienttypeid',
      }
    },
    UNSUPPORTED_STATIONID: {
      code: 'UNSUPPORTED_STATIONID', description: {
        en: 'The stationid is unsupported',
        tr: 'Geçersiz  stationid',
      }
    },
    COSTUMERTYPEID_REQUIRED: {
      code: 'COSTUMERTYPEID_REQUIRED', description: {
        en: 'The costumertypeid required',
        tr: 'Bu işlem için costumertypeid bilgisi gerekli',
      }
    },
    PERIODID_REQUIRED: {
      code: 'PERIODID_REQUIRED', description: {
        en: 'The periodid required',
        tr: 'Bu işlem için periodid bilgisi gerekli',
      }
    },
    STATIONID_REQUIRED: {
      code: 'STATIONID_REQUIRED', description: {
        en: 'The stationid required',
        tr: 'Bu işlem için stationid bilgisi gerekli',
      }
    },
    PATIENTTYPEID_REQUIRED: {
      code: 'PATIENTTYPEID_REQUIRED', description: {
        en: 'The patienttypeId required',
        tr: 'Bu işlem için patienttypeId bilgisi gerekli',
      }
    },
    STATIONS_REQUIRED: {
      code: 'STATIONS_REQUIRED', description: {
        en: 'The stations required',
        tr: 'Bu işlem için istasyonlar gerekli',
      }
    },
    ISHAVEPATIENTS_REQUIRED: {
      code: 'ISHAVEPATIENTS_REQUIRED', description: {
        en: 'The ishavepatients required',
        tr: 'Bu işlem için hastalara sahipmi bilgisi gerekli',
      }
    },
    CHECKTIME_REQUIRED: {
      code: 'CHECKTIME_REQUIRED', description: {
        en: 'Check time required',
        tr: 'Bu işlem için kontrol süresi bilgisi gerekli',
      }
    },
    OCCUREDTIME_REQUIRED: {
      code: 'OCCUREDTIME_REQUIRED', description: {
        en: 'The occured time required',
        tr: 'Bu işlem için gerçekleşme zamanı bilgisi gerekli',
      }
    },
    UNSUPPORTED_TODODEFINEID: {
      code: 'UNSUPPORTED_TODODEFINEID', description: {
        en: 'The tododefineid is unsupported',
        tr: 'Geçersiz tododefineid',
      }
    },
    TODODEFINEID_REQUIRED: {
      code: 'TODODEFINEID_REQUIRED', description: {
        en: 'The tododefineid is required',
        tr: 'Bu işlem için tododefineid gerekli',
      }
    },
    UNSUPPORTED_TODOGROUPDEFINEID: {
      code: 'UNSUPPORTED_TODOGROUPDEFINEID', description: {
        en: 'The todogroupdefineid is unsupported',
        tr: 'Geçersiz todogroupdefineid',
      }
    },
    FILEID_REQUIRED: {
      code: 'FILEID_REQUIRED', description: {
        en: 'The fileid is required',
        tr: 'Bu işlem için fileid gerekli',
      }
    },
    UNSUPPORTED_FILEID: {
      code: 'UNSUPPORTED_FILEID', description: {
        en: 'The fileid is unsupported',
        tr: 'Geçersiz fileid',
      }
    },
    PARENTID_REQUIRED: {
      code: 'PARENTID_REQUIRED', description: {
        en: 'The parentId is required',
        tr: 'Bu işlem için parentId gerekli',
      }
    },
    UNSUPPORTED_PARENTID: {
      code: 'UNSUPPORTED_PARENTID', description: {
        en: 'The parentId is unsupported',
        tr: 'Geçersiz parentId',
      }
    },
    TODOGROUPDEFINEID_REQUIRED: {
      code: 'TODOGROUPDEFINEID_REQUIRED', description: {
        en: 'The todogroupdefineid is required',
        tr: 'Bu işlem için todogroupdefineid gerekli',
      }
    },
    INFO_REQUIRED: {
      code: 'INFO_REQUIRED', description: {
        en: 'The info required',
        tr: 'Bu işlem için açıklama gerekli',
      }
    },
    ISREQUIRED_REQUIRED: {
      code: 'INFO_REQUIRED', description: {
        en: 'The isrequired required',
        tr: 'Bu işlem için zorunlu mu? bilgisi gerekli',
      }
    },
    ISNEEDACTIVATION_REQUIRED: {
      code: 'ISNEEDACTIVATION_REQUIRED', description: {
        en: 'The isneedactivation required',
        tr: 'Bu işlem için aktivasyon gereklimi bilgisi gerekli',
      }
    },
  }

}
module.exports = messages
