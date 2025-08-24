import { useMutation, useQuery } from "@apollo/client";

import { QueryResponse, WrappedResponse } from "./types";
import { Utility_GetTopUpOperatorsDocument } from '../__generated__/graphql';
// import { Utility_GetTopUpOperatorsDocument } from '../../../mobarter/apps/mini/src/api/__generated__/graphql';

export const useGetTopUpOperators = () =>
    useQuery<QueryResponse<"utility_getTopUpOperators">>(Utility_GetTopUpOperatorsDocument);


export const useAdvert_Create = () =>
    useMutation<WrappedResponse<"adverts_create">, MutationAdverts_CreateArgs>(
        Adverts_CreateDocument
    );
