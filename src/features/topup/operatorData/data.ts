import { IOperator } from "./types";

export const dataOnly = [
    {
        "id": 1256,
        "operatorId": 1256,
        "name": "Airtel Nigeria Bundle",
        "bundle": true,
        "data": true,
        "pin": false,
        "comboProduct": false,
        "supportsLocalAmounts": true,
        "supportsGeographicalRechargePlans": false,
        "denominationType": "FIXED",
        "senderCurrencyCode": "NGN",
        "senderCurrencySymbol": "₦",
        "destinationCurrencyCode": "NGN",
        "destinationCurrencySymbol": "₦",
        "commission": 4.0,
        "internationalDiscount": 4.0,
        "localDiscount": 0.0,
        "mostPopularAmount": 4999.93,
        "mostPopularLocalAmount": null,
        "minAmount": null,
        "maxAmount": null,
        "localMinAmount": null,
        "localMaxAmount": null,
        "country": {
            "isoName": "NG",
            "name": "Nigeria"
        },
        "fx": {
            "rate": 1,
            "currencyCode": "NGN"
        },
        "logoUrls": [
            "https://s3.amazonaws.com/rld-portal-avatar-prd/95db3bed-04b1-4afa-96a1-e42134789e6f.png",
            "https://s3.amazonaws.com/rld-portal-avatar-prd/90a1d418-f58c-4722-a8c4-5bdb10ffaf1d.png",
            "https://s3.amazonaws.com/rld-portal-avatar-prd/22f59f8b-6ea5-49e7-801d-71d0fab180e6.png"
        ],
        "fixedAmounts": [
            99.93,
            199.92,
            299.93,
            499.95,
            999.94,
            1499.94,
            1999.92,
            4999.93
        ],
        "fixedAmountsDescriptions": {
            "99.93": "Talkmore_N100 -10 Mins - 3days",
            "199.92": "Talkmore_N200 - 20 mins 3days",
            "299.93": "Talkmore_N300 - 30 mins 3days",
            "499.95": "Talkmore_N500 - 50 mins - 14days",
            "999.94": "Talkmore_N1000 - 100mins - 14days",
            "1499.94": "Talkmore_N1500 - 150mins - 30days",
            "1999.92": "Flexi_N2000 - 40mins + 2.5GB + 5 SMS 30days",
            "4999.93": "Flexi_N5000 - 100mins + 12GB + 5 SMS - 30days"
        },
        "localFixedAmounts": [],
        "localFixedAmountsDescriptions": null,
        "suggestedAmounts": [],
        "suggestedAmountsMap": {},
        "fees": {
            "international": 0.0,
            "local": 0.0,
            "localPercentage": 0.0,
            "internationalPercentage": 0.0
        },
        "geographicalRechargePlans": [],
        "promotions": [],
        "status": "ACTIVE"
    },
    {
        "id": 646,
        "operatorId": 646,
        "name": "Airtel Nigeria Data",
        "bundle": false,
        "data": true,
        "pin": false,
        "comboProduct": false,
        "supportsLocalAmounts": true,
        "supportsGeographicalRechargePlans": false,
        "denominationType": "FIXED",
        "senderCurrencyCode": "NGN",
        "senderCurrencySymbol": "₦",
        "destinationCurrencyCode": "NGN",
        "destinationCurrencySymbol": "₦",
        "commission": 4.0,
        "internationalDiscount": 4.0,
        "localDiscount": 0.0,
        "mostPopularAmount": 99999.91,
        "mostPopularLocalAmount": null,
        "minAmount": null,
        "maxAmount": null,
        "localMinAmount": null,
        "localMaxAmount": null,
        "country": {
            "isoName": "NG",
            "name": "Nigeria"
        },
        "fx": {
            "rate": 1,
            "currencyCode": "NGN"
        },
        "logoUrls": [
            "https://s3.amazonaws.com/rld-operator/2acbfe97-ef3e-4cce-906f-8681fed03b2d-size-3.png",
            "https://s3.amazonaws.com/rld-operator/2acbfe97-ef3e-4cce-906f-8681fed03b2d-size-2.png",
            "https://s3.amazonaws.com/rld-operator/2acbfe97-ef3e-4cce-906f-8681fed03b2d-size-1.png"
        ],
        "fixedAmounts": [
            49.91,
            99.91,
            199.91,
            299.91,
            499.91,
            599.91,
            799.91,
            999.92,
            1499.92,
            1999.91,
            2499.92,
            2999.92,
            3999.91,
            4999.92,
            5999.91,
            7999.91,
            9999.91,
            14999.91,
            19999.91,
            29999.91,
            39999.91,
            49999.91,
            59999.91,
            99999.91
        ],
        "fixedAmountsDescriptions": {
            "49.91": "250MB - 1Day",
            "99.91": "This Data plan gives 100MB for N100 valid for 1day",
            "199.91": "This Data 200MB for valid for 2 days",
            "299.91": "This Data plan gives 300MB for 2 days ",
            "499.91": "This Data plan gives 1.5GB for 1 Day",
            "599.91": "This Data plan gives  2GB for 2 days",
            "799.91": "This Data plan gives 1GB - 7days  ",
            "999.92": "1.5GB\t2GB Youtube Night + 200MB (YT, IG & Tiktok)  - 7days",
            "1499.92": "3.5GB\t5GB Youtube Night + 200MB (YT, IG & Tiktok)  - 7days",
            "1999.91": "3GB - 2GB Youtube Night + 200MB (YT, IG & Tiktok) -30days",
            "2499.92": "4GB- 2GB Youtube Night + 200MB (YT, IG & Tiktok) \t30days",
            "2999.92": "8GB -2GB Youtube Night + 200MB (YT, IG & Tiktok) - 30days ",
            "3999.91": "10GB -2GB Youtube Night + 200MB (YT, IG & Tiktok) 30days ",
            "4999.92": "13GB- 2GB Youtube Night + 200MB (YT, IG & Tiktok) 30days",
            "5999.91": "18GB - 2GB Youtube Night + 200MB (YT, IG & Tiktok) 30days",
            "7999.91": "25GB- 2GB Youtube Night + 200MB (YT, IG & Tiktok) 30days",
            "9999.91": "35GB- 2GB Youtube Night + 200MB (YT, IG & Tiktok) 30day",
            "14999.91": "60GB- 2GB Youtube Night + 200MB (YT, IG & Tiktok) 30days",
            "19999.91": "100GB- 2GB Youtube Night + 200MB (YT, IG & Tiktok) 30days",
            "29999.91": "This Data plan gives 160GB 30days",
            "39999.91": "This Data plan gives  210GB for N30,000 valid for 30days",
            "49999.91": "This Data plan gives  300GB for 90days",
            "59999.91": "This Data plan gives  350GB for N60,000 valid for 120days",
            "99999.91": "This Data plan gives  650GB for N100,000 valid for 365days"
        },
        "localFixedAmounts": [],
        "localFixedAmountsDescriptions": null,
        "suggestedAmounts": [],
        "suggestedAmountsMap": {},
        "fees": {
            "international": 0.0,
            "local": 0.0,
            "localPercentage": 0.0,
            "internationalPercentage": 0.0
        },
        "geographicalRechargePlans": [],
        "promotions": [],
        "status": "ACTIVE"
    },
    {
        "id": 931,
        "operatorId": 931,
        "name": "Glo Nigeria Bundle",
        "bundle": false,
        "data": true,
        "pin": false,
        "comboProduct": false,
        "supportsLocalAmounts": true,
        "supportsGeographicalRechargePlans": false,
        "denominationType": "FIXED",
        "senderCurrencyCode": "NGN",
        "senderCurrencySymbol": "₦",
        "destinationCurrencyCode": "NGN",
        "destinationCurrencySymbol": "₦",
        "commission": 5.0,
        "internationalDiscount": 5.0,
        "localDiscount": 0.0,
        "mostPopularAmount": 100000.00,
        "mostPopularLocalAmount": null,
        "minAmount": null,
        "maxAmount": null,
        "localMinAmount": null,
        "localMaxAmount": null,
        "country": {
            "isoName": "NG",
            "name": "Nigeria"
        },
        "fx": {
            "rate": 1,
            "currencyCode": "NGN"
        },
        "logoUrls": [
            "https://s3.amazonaws.com/rld-operator/18416726-e966-4ed0-b352-f02e9e9ff9db-size-1.png",
            "https://s3.amazonaws.com/rld-operator/18416726-e966-4ed0-b352-f02e9e9ff9db-size-2.png",
            "https://s3.amazonaws.com/rld-operator/18416726-e966-4ed0-b352-f02e9e9ff9db-size-3.png"
        ],
        "fixedAmounts": [
            25.00,
            50.00,
            100.00,
            200.00,
            1500.00,
            30000.00,
            36000.00,
            50000.00,
            60000.00,
            75000.00,
            100000.00
        ],
        "fixedAmountsDescriptions": {
            "25.00": "WTF_N25 100MB (1 day)",
            "50.00": "TelegramN50 50MB (7 days)",
            "100.00": "InstagramN100 125MB (30 days)",
            "200.00": "Sunday_200 1.25GB (1 day)",
            "1500.00": "Special_1500 7GB (7 days)",
            "30000.00": "GloMega30000_auto 225GB (30 days)",
            "36000.00": "GloMega36000_auto 300GB (30 days)",
            "50000.00": "GloMega50000_auto 425GB (90 days)",
            "60000.00": "GloMega60000_auto 525GB (120 days)",
            "75000.00": "GloMega75000_auto 675GB (120 days)",
            "100000.00": "GloMega100000_auto 1TB (365 days)"
        },
        "localFixedAmounts": [],
        "localFixedAmountsDescriptions": null,
        "suggestedAmounts": [],
        "suggestedAmountsMap": {},
        "fees": {
            "international": 0.0,
            "local": 0.0,
            "localPercentage": 0.0,
            "internationalPercentage": 0.0
        },
        "geographicalRechargePlans": [],
        "promotions": [],
        "status": "ACTIVE"
    },
    {
        "id": 647,
        "operatorId": 647,
        "name": "Glo Nigeria Data",
        "bundle": false,
        "data": true,
        "pin": false,
        "comboProduct": false,
        "supportsLocalAmounts": true,
        "supportsGeographicalRechargePlans": false,
        "denominationType": "FIXED",
        "senderCurrencyCode": "NGN",
        "senderCurrencySymbol": "₦",
        "destinationCurrencyCode": "NGN",
        "destinationCurrencySymbol": "₦",
        "commission": 5.0,
        "internationalDiscount": 5.0,
        "localDiscount": 0.0,
        "mostPopularAmount": 20000.00,
        "mostPopularLocalAmount": null,
        "minAmount": null,
        "maxAmount": null,
        "localMinAmount": null,
        "localMaxAmount": null,
        "country": {
            "isoName": "NG",
            "name": "Nigeria"
        },
        "fx": {
            "rate": 1,
            "currencyCode": "NGN"
        },
        "logoUrls": [
            "https://s3.amazonaws.com/rld-operator/18416726-e966-4ed0-b352-f02e9e9ff9db-size-1.png",
            "https://s3.amazonaws.com/rld-operator/18416726-e966-4ed0-b352-f02e9e9ff9db-size-2.png",
            "https://s3.amazonaws.com/rld-operator/18416726-e966-4ed0-b352-f02e9e9ff9db-size-3.png"
        ],
        "fixedAmounts": [
            50.00,
            100.00,
            200.00,
            500.00,
            750.00,
            1000.00,
            1500.00,
            2000.00,
            2500.00,
            3000.00,
            4000.00,
            5000.00,
            6000.00,
            8000.00,
            10000.00,
            15000.00,
            20000.00
        ],
        "fixedAmountsDescriptions": {
            "50.00": "40MB + 5MB Night",
            "100.00": "110Mb + 15MB Night",
            "200.00": "220MB + 40MB Night",
            "500.00": "500MB + 1GB Night",
            "750.00": "1.1GB Weekly",
            "1000.00": "1.5GB + 2GB Night Weekly",
            "1500.00": "2GB + 3GB Night (30 days)",
            "2000.00": "3.25GB + 3GB Night (30 days)",
            "2500.00": "4.5GB + 3GB Night (30 days)",
            "3000.00": "8GB +3GB Night (30 days)",
            "4000.00": "11GB + 3GB Night (30 days)",
            "5000.00": "14GB + 4GB Night (30 days)",
            "6000.00": "18GB + 4GB NIght (30 days)",
            "8000.00": "25GB + 4GB Night (30 days)",
            "10000.00": "36GB + 4GB Night (30 days)",
            "15000.00": "65GB + 4GB Night (30 days)",
            "20000.00": "135 MEGA PLAN (30 days)"
        },
        "localFixedAmounts": [],
        "localFixedAmountsDescriptions": null,
        "suggestedAmounts": [],
        "suggestedAmountsMap": {},
        "fees": {
            "international": 0.0,
            "local": 0.0,
            "localPercentage": 0.0,
            "internationalPercentage": 0.0
        },
        "geographicalRechargePlans": [],
        "promotions": [],
        "status": "ACTIVE"
    },
    {
        "id": 345,
        "operatorId": 345,
        "name": "MTN Nigeria Data",
        "bundle": false,
        "data": true,
        "pin": false,
        "comboProduct": false,
        "supportsLocalAmounts": true,
        "supportsGeographicalRechargePlans": false,
        "denominationType": "FIXED",
        "senderCurrencyCode": "NGN",
        "senderCurrencySymbol": "₦",
        "destinationCurrencyCode": "NGN",
        "destinationCurrencySymbol": "₦",
        "commission": 3.0,
        "internationalDiscount": 3.0,
        "localDiscount": 0.0,
        "mostPopularAmount": 225000.00,
        "mostPopularLocalAmount": null,
        "minAmount": null,
        "maxAmount": null,
        "localMinAmount": null,
        "localMaxAmount": null,
        "country": {
            "isoName": "NG",
            "name": "Nigeria"
        },
        "fx": {
            "rate": 1,
            "currencyCode": "NGN"
        },
        "logoUrls": [
            "https://s3.amazonaws.com/rld-operator/55a96d7c-b577-4526-b6cf-38ab0449698e-size-3.png",
            "https://s3.amazonaws.com/rld-operator/55a96d7c-b577-4526-b6cf-38ab0449698e-size-1.png",
            "https://s3.amazonaws.com/rld-operator/55a96d7c-b577-4526-b6cf-38ab0449698e-size-2.png"
        ],
        "fixedAmounts": [
            350.00,
            500.00,
            600.00,
            750.00,
            800.00,
            900.00,
            1000.00,
            1500.00,
            2000.00,
            2500.00,
            3500.00,
            4500.00,
            5000.00,
            5500.00,
            6500.00,
            7500.00,
            9000.00,
            11000.00,
            18000.00,
            30000.00,
            35000.00,
            37500.00,
            40000.00,
            45000.00,
            225000.00
        ],
        "fixedAmountsDescriptions": {
            "350.00": "500MB Daily Plan",
            "500.00": "1GB Daily Plan + 1.5mins.",
            "600.00": "1.5GB + 100MB YouTube Music for N600.",
            "750.00": "2GB 2-Day Plan",
            "800.00": "1GB + 1GB YouTube Night + 100MB YouTube Music Weekly Plan",
            "900.00": "2.5GB 2-Day Plan",
            "1000.00": "3.2GB 2-Day Plan",
            "1500.00": "2GB+2mins Monthly Plan",
            "2000.00": "2.7GB+2mins Monthly Plan",
            "2500.00": "3.5GB + 5mins + 2GB All Night Streaming + 200MB YouTube Music Monthly Plan",
            "3500.00": "11GB Weekly Bundle",
            "4500.00": "10GB+10mins Monthly Plan",
            "5000.00": "20GB Weekly Plan",
            "5500.00": "12.5GB Monthly Plan",
            "6500.00": "16.5GB+10mins Monthly Plan",
            "7500.00": "20GB Monthly Plan",
            "9000.00": "25GB SME Monthly Plan",
            "11000.00": "36GB Monthly Plan + 40mins 30days",
            "18000.00": "75GB Monthly Plan",
            "30000.00": "150GB + 2GB daily upon exhausting main bundle 30 Days",
            "35000.00": "165GB Monthly Plan",
            "37500.00": "200GB + 5GB Youtube/MSTeams/Zoom",
            "40000.00": "150GB 2-Month Plan",
            "45000.00": "260GB + 2GB daily upon exhausting main bundle 30 Days",
            "225000.00": "1.5TB Yearly"
        },
        "localFixedAmounts": [],
        "localFixedAmountsDescriptions": null,
        "suggestedAmounts": [],
        "suggestedAmountsMap": {},
        "fees": {
            "international": 0.0,
            "local": 0.0,
            "localPercentage": 0.0,
            "internationalPercentage": 0.0
        },
        "geographicalRechargePlans": [],
        "promotions": [],
        "status": "ACTIVE"
    },
    {
        "id": 1236,
        "operatorId": 1236,
        "name": "MTN Nigeria Extra Data ",
        "bundle": false,
        "data": true,
        "pin": false,
        "comboProduct": false,
        "supportsLocalAmounts": true,
        "supportsGeographicalRechargePlans": false,
        "denominationType": "FIXED",
        "senderCurrencyCode": "NGN",
        "senderCurrencySymbol": "₦",
        "destinationCurrencyCode": "NGN",
        "destinationCurrencySymbol": "₦",
        "commission": 3.0,
        "internationalDiscount": 3.0,
        "localDiscount": 0.0,
        "mostPopularAmount": 5500.00,
        "mostPopularLocalAmount": null,
        "minAmount": null,
        "maxAmount": null,
        "localMinAmount": null,
        "localMaxAmount": null,
        "country": {
            "isoName": "NG",
            "name": "Nigeria"
        },
        "fx": {
            "rate": 1,
            "currencyCode": "NGN"
        },
        "logoUrls": [
            "https://s3.amazonaws.com/rld-portal-avatar-prd/a630d8cf-aac1-45b3-865e-21af915c276d.png",
            "https://s3.amazonaws.com/rld-portal-avatar-prd/b197f709-6d04-4ca5-b991-5e1cdbf752d2.png",
            "https://s3.amazonaws.com/rld-portal-avatar-prd/c7277a04-0b7a-43f5-9bb3-41e634260642.png"
        ],
        "fixedAmounts": [
            500.00,
            2500.00,
            3500.00,
            5500.00
        ],
        "fixedAmountsDescriptions": {
            "500.00": "Extradata 1.8GB+10 mins valid for 30 days",
            "2500.00": "Xtradata 3.5GB + 5mins + 2GB All Night Streaming + 200MB YouTube Music for N2,500. ",
            "3500.00": "Extradata 7GB + 2GB All Night Streaming for N3,500. Valid for 30 days",
            "5500.00": "Xtradata 12.5GB + 36mins + 15 SMS"
        },
        "localFixedAmounts": [],
        "localFixedAmountsDescriptions": null,
        "suggestedAmounts": [],
        "suggestedAmountsMap": {},
        "fees": {
            "international": 0.0,
            "local": 0.0,
            "localPercentage": 0.0,
            "internationalPercentage": 0.0
        },
        "geographicalRechargePlans": [],
        "promotions": [],
        "status": "ACTIVE"
    },
    {
        "id": 645,
        "operatorId": 645,
        "name": "T2 Mobile Nigeria Data",
        "bundle": false,
        "data": true,
        "pin": false,
        "comboProduct": false,
        "supportsLocalAmounts": true,
        "supportsGeographicalRechargePlans": false,
        "denominationType": "FIXED",
        "senderCurrencyCode": "NGN",
        "senderCurrencySymbol": "₦",
        "destinationCurrencyCode": "NGN",
        "destinationCurrencySymbol": "₦",
        "commission": 6.0,
        "internationalDiscount": 6.0,
        "localDiscount": 0.0,
        "mostPopularAmount": 5000.00,
        "mostPopularLocalAmount": null,
        "minAmount": null,
        "maxAmount": null,
        "localMinAmount": null,
        "localMaxAmount": null,
        "country": {
            "isoName": "NG",
            "name": "Nigeria"
        },
        "fx": {
            "rate": 1,
            "currencyCode": "NGN"
        },
        "logoUrls": [
            "https://s3.amazonaws.com/rld-operator/a6c9c490-39fa-47c0-a63a-b4a4d1d4dbe5-size-3.png",
            "https://s3.amazonaws.com/rld-operator/a6c9c490-39fa-47c0-a63a-b4a4d1d4dbe5-size-2.png",
            "https://s3.amazonaws.com/rld-operator/a6c9c490-39fa-47c0-a63a-b4a4d1d4dbe5-size-1.png"
        ],
        "fixedAmounts": [
            50.00,
            100.00,
            150.00,
            200.00,
            500.00,
            1000.00,
            1200.00,
            1500.00,
            2000.00,
            2500.00,
            3000.00,
            4000.00,
            5000.00
        ],
        "fixedAmountsDescriptions": {
            "50.00": "40MB validity 24 hours",
            "100.00": "Daily 83MB validity 24 hours",
            "150.00": "150MB (150MB + 100MB night) validity 24 hours",
            "200.00": "250MB validity 24 hours",
            "500.00": "650MB + 100MB Social validity 7 days",
            "1000.00": "2GB Anytime Data Plan 30 days",
            "1200.00": "2.3GB Anytime data Plan 30 days",
            "1500.00": "3.4GB Special Data Plan 7 days",
            "2000.00": "4.5GB Anytime data Plan 30 days",
            "2500.00": "5.2GB Anytime data Plan 30 days",
            "3000.00": "6.2GB Anytime data Plan 30 days",
            "4000.00": "8.4GB Anytime data Plan 30 days",
            "5000.00": "11.4GB Anytime data Plan 30 days"
        },
        "localFixedAmounts": [],
        "localFixedAmountsDescriptions": null,
        "suggestedAmounts": [],
        "suggestedAmountsMap": {},
        "fees": {
            "international": 0.0,
            "local": 0.0,
            "localPercentage": 0.0,
            "internationalPercentage": 0.0
        },
        "geographicalRechargePlans": [],
        "promotions": [],
        "status": "ACTIVE"
    }
]


export const getDataBundleOps = () => {
    const ops: IOperator[] = dataOnly.map((item) => {
        const fixedAmount = item.fixedAmountsDescriptions;

        const listOfAmounts = Object.keys(fixedAmount).map((amt) => {
            return {
                amount: parseFloat(amt),
                desc: fixedAmount[amt as keyof typeof fixedAmount]!
            }
        });

        const cc: IOperator = {
            "name": item.name,
            "logo": item.logoUrls[0] || '',
            "operatorId": item.operatorId,
            "plans": listOfAmounts
        };

        return cc
    })
    return ops
}