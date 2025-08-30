export type IOperator = {
    name: string;
    logo: string;
    operatorId: number;
    plans: {
        amount: number;
        desc: string;
    }[];
};
export type IAirtimeOperator = {
    name: string;
    logo: string;
    operatorId: number;
    maxAmount?: number;
    minAmount?: number;
    suggestedAmounts?: Array<number>;
};
export type IOperators = {
    dataPlan: IOperator[];
    dataBundles: IOperator[];
    airtime: IAirtimeOperator[];
};
