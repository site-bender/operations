export type Formatter = (value: string) => string

export type CurrencyCode =
	| "AED"
	| "AFA"
	| "ALL"
	| "AMD"
	| "ANG"
	| "AON"
	| "ARS"
	| "AUD"
	| "AWG"
	| "AZM"
	| "BAM"
	| "BBD"
	| "BDT"
	| "BGL"
	| "BHD"
	| "BIF"
	| "BMD"
	| "BND"
	| "BRL"
	| "BSD"
	| "BTN"
	| "BWP"
	| "BYR"
	| "BZD"
	| "CAD"
	| "CDF"
	| "CHF"
	| "CLP"
	| "CNY"
	| "COP"
	| "CRC"
	| "CUP"
	| "CVE"
	| "CYP"
	| "CZK"
	| "DJF"
	| "DKK"
	| "DOP"
	| "DZD"
	| "EEK"
	| "EGP"
	| "ERN"
	| "ETB"
	| "EUR"
	| "FJD"
	| "FKP"
	| "GBP"
	| "GEL"
	| "GHC"
	| "GIP"
	| "GMD"
	| "GNF"
	| "GTQ"
	| "GYD"
	| "HKD"
	| "HNL"
	| "HRK"
	| "HTG"
	| "HUF"
	| "IDR"
	| "ILS"
	| "INR"
	| "IQD"
	| "IRR"
	| "ISK"
	| "JMD"
	| "JOD"
	| "JPY"
	| "KES"
	| "KGS"
	| "KHR"
	| "KMF"
	| "KPW"
	| "KRW"
	| "KWD"
	| "KYD"
	| "KZT"
	| "LAK"
	| "LBP"
	| "LKR"
	| "LRD"
	| "LSL"
	| "LTL"
	| "LVL"
	| "LYD"
	| "MAD"
	| "MDL"
	| "MGF"
	| "MKD"
	| "MMK"
	| "MNT"
	| "MOP"
	| "MRO"
	| "MTL"
	| "MUR"
	| "MVR"
	| "MWK"
	| "MXN"
	| "MYR"
	| "MZM"
	| "NAD"
	| "NGN"
	| "NIO"
	| "NOK"
	| "NPR"
	| "NZD"
	| "OMR"
	| "PAB"
	| "PEN"
	| "PGK"
	| "PHP"
	| "PKR"
	| "PLN"
	| "PYG"
	| "QAR"
	| "RON"
	| "RUB"
	| "RWF"
	| "SAR"
	| "SBD"
	| "SCR"
	| "SDD"
	| "SEK"
	| "SGD"
	| "SHP"
	| "SIT"
	| "SKK"
	| "SLL"
	| "SOS"
	| "SRG"
	| "STD"
	| "SVC"
	| "SYP"
	| "SZL"
	| "THB"
	| "TJS"
	| "TMM"
	| "TND"
	| "TOP"
	| "TRL"
	| "TTD"
	| "TWD"
	| "TZS"
	| "UAH"
	| "UGX"
	| "USD"
	| "UYU"
	| "UZS"
	| "VEB"
	| "VND"
	| "VUV"
	| "WST"
	| "XAF"
	| "XCD"
	| "XOF"
	| "XPF"
	| "YER"
	| "YUM"
	| "ZAR"
	| "ZMK"
	| "ZWD"

declare enum TypeOfFormatter {
	AS_CURRENCY = "AS_CURRENCY",
	AS_PERCENT = "AS_PERCENT",
	INSERT = "INSERT",
	MASK_VALUE = "MASK_VALUE",
	REPLACE = "REPLACE",
}

export type MakeAsCurrencyParameters = {
	code: CurrencyCode
	readonly formatType: TypeOfFormatter.AS_CURRENCY
	isMajorUnit: boolean
	numberFormat?: string
	subdivision?: 1 | 5 | 10 | 100 | 1000
}

export type MakeAsPercentParameters = {
	readonly formatType: TypeOfFormatter.AS_PERCENT
}

export type MakeInsertParameters = {
	flags?: string
	readonly formatType: TypeOfFormatter.INSERT
	insert?: string
	pattern: string | RegExp
}

export type MakeMaskValueParameters = {
	readonly formatType: TypeOfFormatter.MASK_VALUE
	pattern: string | RegExp
	segments: { [key: number]: string }
	separator: string
}

export type MakeReplaceParameters = {
	readonly formatType: TypeOfFormatter.REPLACE
	pattern: string | RegExp
	replaceWith: string
	replaceOne?: boolean
}

export type MakeFormatterParameters =
	| MakeAsCurrencyParameters
	| MakeAsPercentParameters
	| MakeInsertParameters
	| MakeMaskValueParameters
	| MakeReplaceParameters
