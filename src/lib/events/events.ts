export enum IAppEvents {
    ClickExchangeTab = "TABS/EXCHANGE",
    ClickSettingsTab = "TABS/SETTINGS",
    ClickTopUpTab = "TABS/TOPUP",
}

export enum TopUpEvents {
    BUY_DATA = "TOPUP/BUY_DATA",
    BUY_AIRTIME = "TOPUP/BUY_AIRTIME",
    PURCHASE_SUCCESSFUL = "TOPUP/PURCHASE_SUCCESSFUL",
    PURCHASE_FAILED = "TOPUP/PURCHASE_FAILED",
}

export enum SettingsEvents {
    OPEN_EXTERNAL_LINK = "SETTINGS/OPEN_EXTERNAL_LINK",
    TOGGLE_THEME = "SETTINGS/TOGGLE_THEME",
    ADD_BANK_ACCOUNT_BUTTON = "SETTINGS/ADD_BANK_ACCOUNT_BUTTON",
    ADD_KYC_DOCUMENTS = "SETTINGS/ADD_KYC_DOCUMENTS",
}

export enum ExchangeEvents {
    BUY_TAB = "EXCHANGE/BUY_TAB",
    SELL_TAB = "EXCHANGE/SELL_TAB",

}


export type IEvents = TopUpEvents | SettingsEvents | ExchangeEvents | IAppEvents