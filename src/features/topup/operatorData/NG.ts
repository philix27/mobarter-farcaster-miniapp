import { opsInfo } from './opsInfo';
import { IOperators } from './types';

export const NG_Operators: IOperators = {
    dataPlan: [
        {
            ...opsInfo['9Mobile (Etisalat) Nigeria'],
            operatorId: 645,
            plans: [
                {
                    amount: 50.0,
                    desc: '50MB validity 24 hours',
                },
                {
                    amount: 100.0,
                    desc: 'Daily 100MB validity 24 hours',
                },
                {
                    amount: 150.0,
                    desc: '200MB (100MB + 100MB night) validity 24 hours',
                },
                {
                    amount: 200.0,
                    desc: '650MB validity 24 hours',
                },
                {
                    amount: 300.0,
                    desc: '1GB validity 24 hours',
                },
                {
                    amount: 500.0,
                    desc: '2GB validity 3 days',
                },
                {
                    amount: 1200.0,
                    desc: '6.2GB validity 30 days',
                },
                {
                    amount: 1500.0,
                    desc: '7GB validity 7 days',
                },
                {
                    amount: 2000.0,
                    desc: '9.5GB validity 30 days',
                },
                {
                    amount: 2500.0,
                    desc: '11GB validity 30 days',
                },

                // '3000.00': '15GB validity 30 days',
                // '4000.00': '18.6GB validity 30 days',
                // '5000.00': '24GB validity 30 days',
                // '7000.00': '35GB validity 30 days',
                // '10000.00': '50GB validity 180 days',
                // '15000.00': '80GB validity 30 days',
                // '20000.00': '125GB validity 100 days',
            ],
        },
    ],
    dataBundles: [
        {
            ...opsInfo['9Mobile (Etisalat) Nigeria'],
            operatorId: 645,
            plans: [
                {
                    amount: 50.0,
                    desc: '50MB validity 24 hours',
                },
                {
                    amount: 100.0,
                    desc: 'Daily 100MB validity 24 hours',
                },
                {
                    amount: 150.0,
                    desc: '200MB (100MB + 100MB night) validity 24 hours',
                },
                {
                    amount: 200.0,
                    desc: '650MB validity 24 hours',
                },
                {
                    amount: 300.0,
                    desc: '1GB validity 24 hours',
                },
                {
                    amount: 500.0,
                    desc: '2GB validity 3 days',
                },
                {
                    amount: 1200.0,
                    desc: '6.2GB validity 30 days',
                },
                {
                    amount: 1500.0,
                    desc: '7GB validity 7 days',
                },
                {
                    amount: 2000.0,
                    desc: '9.5GB validity 30 days',
                },
                {
                    amount: 2500.0,
                    desc: '11GB validity 30 days',
                },

                // '3000.00': '15GB validity 30 days',
                // '4000.00': '18.6GB validity 30 days',
                // '5000.00': '24GB validity 30 days',
                // '7000.00': '35GB validity 30 days',
                // '10000.00': '50GB validity 180 days',
                // '15000.00': '80GB validity 30 days',
                // '20000.00': '125GB validity 100 days',
            ],
        },
    ],
    airtime: [
        {
            ...opsInfo.MTN,
            operatorId: 341,
            maxAmount: 0,
            minAmount: 0,
            suggestedAmounts: [100, 200.0, 300.0, 1000.0],
        },
        {
            ...opsInfo.AIRTEL,
            operatorId: 342,
            maxAmount: 0,
            minAmount: 0,
            suggestedAmounts: [100, 200.0, 300.0, 1000.0],
        },
        {
            ...opsInfo.GLO,
            operatorId: 344,
            maxAmount: 0,
            minAmount: 0,
            suggestedAmounts: [100, 200.0, 300.0, 1000.0],
        },
        {
            ...opsInfo['9Mobile (Etisalat) Nigeria'],
            operatorId: 340,
            maxAmount: 0,
            minAmount: 0,
            suggestedAmounts: [100, 200.0, 300.0, 1000.0],
        },
    ],
};
