import axios from 'axios';
import { secrets } from '../../../lib/secrets';
import { logger } from '@/src/lib/utils';
import { Country } from '@/zapi';
import { ITopUpAirtime } from './t.topUpAirtime';

export type IReloadlyOperatorId = 'MTN' | 'AIRTEL' | 'GLO' | 'ETISALAT';


export class ReloadlyTopUpService {
    baseURL = 'https://topups.reloadly.com';
    token: string;
    header: any;

    constructor() {
        this.token = secrets.RELOADLY_TOP_UP_ACCESS_TOKEN;
        this.header = {
            'Content-Type': 'application/json',
            Accept: 'application/com.reloadly.topups-v1+json',
            Authorization: `Bearer ${this.token}`,
        };
    }


    async lookUpNumber(props: { phone: string; countryCode: string; }) {
        logger.info("Look up number called" + JSON.stringify(props))
        const url = `https://topups.reloadly.com/operators/mnp-lookup/phone/${props.phone}/countries/${props.countryCode}`;

        try {
            const result = await axios.get(url, this.header)
            logger.info("Look up response", JSON.stringify(result.data))
        } catch (err) {
            logger.error('Look Up error:' + JSON.stringify(err))
        }

    }


    async topUp(props: {
        //  amount should have 2 place decimal number
        amount: string;
        operatorId: number;
        customIdentifier: string;
        useLocalAmount: boolean;
        recipientPhone: {
            /** 2 values isoName */
            countryCode: Country;
            /** should include country phone no. code without the +
             * e.g2348101234567
             */
            number: string;
        };
        senderPhone?: { countryCode: Country; number: string };
    }): Promise<ITopUpAirtime | undefined> {
        logger.info(
            'Topup request to reloadly...'
        );
        let payload: object;

        if (typeof props.operatorId === 'number') {
            payload = {
                ...props,
                operatorId: props.operatorId,
            };
        } else {
            payload = { ...props, operatorId: props.operatorId };
        }

        logger.info(
            'Sending topup request to reloadly...' + JSON.stringify(payload),
        );

        const url = 'https://topups.reloadly.com/topups';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/com.reloadly.topups-v1+json',
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(payload),
        };

        let result: ITopUpAirtime = {} as ITopUpAirtime;
        await fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
                result = json as ITopUpAirtime;
                logger.info(
                    'Airtime result...' + JSON.stringify(json),
                );
                return json as ITopUpAirtime;
            })
            .catch((err) => {
                logger.info('Airtime ...' + JSON.stringify(err));

                throw Error("Could not topup: " + err);
            }

            );


        return result;

    }

    async createAccessToken() {
        const res = await axios.post('https://auth.reloadly.com/oauth/token', {
            client_id: secrets.RELOADLY_CLIENT_ID,
            client_secret: secrets.RELOADLY_CLIENT_SECRET,
            grant_type: 'client_credentials',
            audience: this.baseURL,
        });
        return res.data;
    }
}
