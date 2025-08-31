import { Country } from "@/zapi";

export enum RequestFrom {
    Farcaster = 'Farcaster',
    Minipay = 'Minipay',
}
export interface UserInput { userId: string }

export interface PaymentInput {

    transaction_pin: string;


    user_uid: string;


    isNative?: boolean;


    tokenAddress: string;


    tokenChain: string;


    txHash?: string;


    from?: RequestFrom;


    amountCrypto: number;


    amountFiat: number;


    fiatCurrency: Country;

}



export interface Utilities_LookUpNoInput {

    phoneNo: string;



    countryCode: Country;
}


export interface Utilities_TopUpInput extends UserInput {

    phoneNo: string;


    amount: number;


    countryCode: Country;


    operatorId: number;


    payment: PaymentInput;
}




export interface Utilities_PurchaseDataBundleInput {

    phoneNo: string;


    amount: number;


    payment: PaymentInput;


    countryCode: Country;

    operatorId: number;
}


export interface Utilities_GetOperatorsInput {

    countryCode: Country;
}

export enum BillerType {
    Electricity = 'Electricity',
    Water = 'Water',
    Internet = 'Internet',
}



export interface Utilities_GetBillingOperatorsInput {

    countryCode: Country;


    biller_type?: BillerType;
}


export interface Utilities_BillingResponse {

    name: string;


    category: string;


    slug: string;


    status: boolean;


    logo: string;
}

// 
// export interface Utilities_GetAirtimeOperatorsInput {
//     
//     countryCode: Country;

//   
//     isAvaliable: boolean;
// }


export interface Utilities_LookUpNoResponse {

    operator: string;
}


export interface Utilities_TopUpResponse {

    title: string;


    message: string;
}


export interface Utilities_GetOperatorResponse {
    dataPlan: IOperator[];

    dataBundles: IOperator[];

    airtime: IAirtimeOperator[];
}


interface IOperator {

    name: string;


    logo: string;

    operatorId: number;

    plans?: IDataPlan[];
}


interface IAirtimeOperator {

    name: string;


    logo: string;


    operatorId: number;


    maxAmount?: number;


    minAmount?: number;


    suggestedAmounts?: number[];
}


export interface IDataPlan {

    amount: number;


    desc: string;
}
