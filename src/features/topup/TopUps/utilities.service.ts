import {
    Utilities_TopUpInput,
    Utilities_TopUpResponse,
    Utilities_LookUpNoResponse,
    Utilities_LookUpNoInput,
    UserInput,
} from './utilities.dto';
import { ReloadlyTopUpService } from './reloadly.service';
import { logger } from '@/src/lib/utils';



export class UtilitiesService {
    private reloadly: ReloadlyTopUpService | undefined = new ReloadlyTopUpService(
    );


    public async purchaseAirtime(
        input: Utilities_TopUpInput,
    ): Promise<Utilities_TopUpResponse> {
        logger.info('Purchase Airtime');

        const transaction_hash = "hash from transfer"

        try {
            const res = await this.reloadly!.topUp({
                amount: `${input.amount}.00`,
                operatorId: input.operatorId,
                recipientPhone: {
                    countryCode: input.countryCode,
                    number: input.phoneNo,
                },
                useLocalAmount: true,
                customIdentifier: `userId:${input.userId}&txnHash:${transaction_hash}`,
            });


            logger.info('Custom Identifier ' + res!.customIdentifier);
            return { title: 'Successful', message: "Sent successfully" };
        } catch (error) {
            throw Error("Could not send airtime")
        }
    }
    public async lookUpNo(
        input: Utilities_LookUpNoInput & UserInput,
    ): Promise<Utilities_LookUpNoResponse> {
        logger.info('Look Up Number');

        try {
            await this.reloadly!.lookUpNumber({
                countryCode: input.countryCode,
                phone: input.phoneNo,
            });


            return { operator: 'Successful', };
        } catch (error) {
            throw Error("Could find noy find num")
        }
    }



}
