const messages = {
  ERROR: {
    ORDER_NOT_FOUND: {
      code: 'ORDER_NOT_FOUND', description: {
        en: 'order not found',
        tr: 'sipariş bulunamadı',
      }
    },
    ORDER_NOT_ACTIVE: {
      code: 'ORDER_NOT_ACTIVE', description: {
        en: 'order is not active',
        tr: 'sipariş aktif değil',
      }
    },
    JOB_NOT_FOUND: {
      code: 'JOB_NOT_FOUND', description: {
        en: 'job not found',
        tr: 'iş bulunamadı',
      }
    },
    JOB_NOT_ACTIVE: {
      code: 'JOB_NOT_ACTIVE', description: {
        en: 'job is not active',
        tr: 'iş aktif değil',
      }
    },

  },
  VALIDATION_ERROR: {
    ORDERID_REQUIRED: {
      code: 'ORDERID_REQUIRED', description: {
        en: 'The order Id required',
        tr: 'Bu işlem için sipariş numarası gerekli',
      }
    },
    UNSUPPORTED_ORDERID: {
      code: 'UNSUPPORTED_ORDERID', description: {
        en: 'The order Id is unsupported',
        tr: 'Tanımsız sipariş numarası',
      }
    },
    JOBID_REQUIRED: {
      code: 'JOBID_REQUIRED', description: {
        en: 'The job Id required',
        tr: 'Bu işlem için iş numarası gerekli',
      }
    },
    UNSUPPORTED_JOBID: {
      code: 'UNSUPPORTED_JOBID', description: {
        en: 'The job Id is unsupported',
        tr: 'Tanımsız iş numarası',
      }
    },
    ORDERNO_REQUIRED: {
      code: 'ORDERNO_REQUIRED', description: {
        en: 'The order no required',
        tr: 'Sipariş numarası gerekli',
      }
    },
    RECORDTYPEID_REQUIRED: {
      code: 'RECORDTYPEID_REQUIRED', description: {
        en: 'The record type id required',
        tr: 'Kayıt tür numarası gerekli',
      }
    },
    REGISTERDATE_REQUIRED: {
      code: 'REGISTERDATE_REQUIRED', description: {
        en: 'The register date required',
        tr: 'Kayıt tarihi gerekli',
      }
    },
    TRANSLATORID_REQUIRED: {
      code: 'TRANSLATORID_REQUIRED', description: {
        en: 'The translator id required',
        tr: 'tercüman numarası gerekli',
      }
    },
    JOBS_REQUIRED: {
      code: 'JOBS_REQUIRED', description: {
        en: 'The jobs required',
        tr: 'işler gerekli',
      }
    },
    CASEID_REQUIRED: {
      code: 'CASEID_REQUIRED', description: {
        en: 'The case id required',
        tr: 'Durum numarası gerekli',
      }
    },
    SOURCELANGUAGEID_REQUIRED: {
      code: 'SOURCELANGUAGEID_REQUIRED', description: {
        en: 'The source language id required',
        tr: 'Kaynak dil numarası gerekli',
      }
    },
    TARGETLANGUAGEID_REQUIRED: {
      code: 'TARGETLANGUAGEID_REQUIRED', description: {
        en: 'The target language id required',
        tr: 'Hedef dil numarası gerekli',
      }
    },
    DOCUMENTID_REQUIRED: {
      code: 'DOCUMENTID_REQUIRED', description: {
        en: 'Document id required',
        tr: 'Belge numarası gerekli',
      }
    },
    AMOUNT_REQUIRED: {
      code: 'AMOUNT_REQUIRED', description: {
        en: 'Amount required',
        tr: 'Miktar gerekli',
      }
    },
    PRICE_REQUIRED: {
      code: 'PRICE_REQUIRED', description: {
        en: 'Price required',
        tr: 'Fiyat gerekli',
      }
    },
  


  }
}
module.exports = messages
