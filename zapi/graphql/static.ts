import { useQuery } from "@apollo/client";

import { QueryResponse, } from "./types";
import { Static_GetChainDocument, Static_GetCountryDocument, Static_GetFundCollectorsDocument, Static_GetTokensDocument, } from '../__generated__/graphql';


export const useStatic_getTokens = () =>
    useQuery<QueryResponse<"static_getTokens">>(Static_GetTokensDocument);

export const useStatic_getChains = () =>
    useQuery<QueryResponse<"static_getChains">>(Static_GetChainDocument);

export const useStatic_getCountries = () =>
    useQuery<QueryResponse<"static_getCountries">>(Static_GetCountryDocument);

export const useStatic_getFundCollectors = () =>
    useQuery<QueryResponse<"static_getFundCollectors">>(Static_GetFundCollectorsDocument);

