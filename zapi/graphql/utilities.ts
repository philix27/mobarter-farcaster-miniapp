import { useMutation, useQuery } from "@apollo/client";

import { QueryResponse, WrappedResponse } from "./types";
import { MutationUtility_PurchaseAirtimeArgs, MutationUtility_PurchaseDataBundleArgs, Utility_GetTopUpOperatorsDocument, Utility_PurchaseAirtimeDocument, Utility_PurchaseDataBundleDocument } from '../__generated__/graphql';

export const useGetTopUpOperators = () =>
    useQuery<QueryResponse<"utility_getTopUpOperators">>(Utility_GetTopUpOperatorsDocument);


export const useUtility_purchaseAirtime = () =>
    useMutation<WrappedResponse<"utility_purchaseAirtime">, MutationUtility_PurchaseAirtimeArgs>(
        Utility_PurchaseAirtimeDocument,
    );
export const useUtility_purchaseDataBundle = () =>
    useMutation<WrappedResponse<"utility_purchaseDataBundle">, MutationUtility_PurchaseDataBundleArgs>(
        Utility_PurchaseDataBundleDocument,
    );
