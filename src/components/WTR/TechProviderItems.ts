/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

//@ts-ignore
import AmazonLogo from '../../assets/images/WTR/TechProviders/amazon.svg';
//@ts-ignore
import AppleLogo from '../../assets/images/WTR/TechProviders/apple.svg';
//@ts-ignore
import CiscoLogo from '../../assets/images/WTR/TechProviders/cisco.svg';
//@ts-ignore
import GoogleLogo from '../../assets/images/WTR/TechProviders/google.svg';
//@ts-ignore
import HpLogo from '../../assets/images/WTR/TechProviders/hp.svg';
//@ts-ignore
import IbmLogo from '../../assets/images/WTR/TechProviders/ibm.svg';
//@ts-ignore
import IntelLogo from '../../assets/images/WTR/TechProviders/intel.svg';
//@ts-ignore
import MetaLogo from '../../assets/images/WTR/TechProviders/meta.svg';
//@ts-ignore
import MicrosoftLogo from '../../assets/images/WTR/TechProviders/microsoft.svg';
//@ts-ignore
import OpenAILogo from '../../assets/images/WTR/TechProviders/openai.svg';
//@ts-ignore
import OracleLogo from '../../assets/images/WTR/TechProviders/oracle.svg';
//@ts-ignore
import SalesForceLogo from '../../assets/images/WTR/TechProviders/salesforce.svg';
//@ts-ignore
import SapLogo from '../../assets/images/WTR/TechProviders/sap.svg';

export type TechProvider = {
    name: string;
    slug: string;
    logo: React.FC<{ width: string; height: string; fill: string }>;
};

export enum TechProviderSlug {
    Apple = 'apple',
    Amazon = 'aws',
    Cisco = 'cisco-systems',
    Google = 'google',
    HP = 'hp',
    IBM = 'ibm',
    Intel = 'intel',
    Meta = 'meta',
    Microsoft = 'microsoft',
    OpenAI = 'openai',
    Oracle = 'oracle',
    SalesForce = 'salesforce',
    SAP = 'sap',
}

export const techProviderItems: TechProvider[] = [
    { name: 'Apple', slug: TechProviderSlug.Apple, logo: AppleLogo },
    { name: 'Amazon', slug: TechProviderSlug.Amazon, logo: AmazonLogo },
    { name: 'Cisco', slug: TechProviderSlug.Cisco, logo: CiscoLogo },
    { name: 'Google', slug: TechProviderSlug.Google, logo: GoogleLogo },
    { name: 'HP', slug: TechProviderSlug.HP, logo: HpLogo },
    { name: 'IBM', slug: TechProviderSlug.IBM, logo: IbmLogo },
    { name: 'Intel', slug: TechProviderSlug.Intel, logo: IntelLogo },
    { name: 'Meta', slug: TechProviderSlug.Meta, logo: MetaLogo },
    {
        name: 'Microsoft',
        slug: TechProviderSlug.Microsoft,
        logo: MicrosoftLogo,
    },
    { name: 'OpenAI', slug: TechProviderSlug.OpenAI, logo: OpenAILogo },
    { name: 'Oracle', slug: TechProviderSlug.Oracle, logo: OracleLogo },
    {
        name: 'SalesForce',
        slug: TechProviderSlug.SalesForce,
        logo: SalesForceLogo,
    },
    { name: 'SAP', slug: TechProviderSlug.SAP, logo: SapLogo },
];
