import { IOperators } from './types';
import { NG_Operators } from './NG';
import { Country } from '@/zapi';

export const operatorsData: Record<Country, IOperators> = {
    NG: NG_Operators,
    GH: {
        dataPlan: [],
        dataBundles: [],
        airtime: [],
    },
    KE: {
        dataPlan: [],
        dataBundles: [],
        airtime: [],
    },
    MW: {
        dataPlan: [],
        dataBundles: [],
        airtime: [],
    },
    RW: {
        dataPlan: [],
        dataBundles: [],
        airtime: [],
    },
    TZ: {
        dataPlan: [],
        dataBundles: [],
        airtime: [],
    },
    UG: {
        dataPlan: [],
        dataBundles: [],
        airtime: [],
    },
    ZA: {
        dataPlan: [],
        dataBundles: [],
        airtime: [],
    },
};
