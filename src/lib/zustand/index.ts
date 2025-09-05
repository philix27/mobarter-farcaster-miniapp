import { useAdvert } from './adverts';
import { useBankAccount } from './bank';
import { useGiftCard } from './giftcard';
import { useKyc } from './kyc';
import { useView } from './screens';
import { useSendToBank } from './sendToBank';
import { useSettings } from './settings';
import { useSwap } from './swap';
import { useUser } from './user';


export const AppStores = {
  useSettings,
  useView,
  useAdvert,
  useUser,
  useSwap,
  useSendToBank,
  useKyc,
  useGiftCard,
  useBankAccount,
}