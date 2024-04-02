/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

//@ts-ignore
import AmazonLogo from '../../assets/images/WTR/TechProviders/amazon.png';
//@ts-ignore
import AppleLogo from '../../assets/images/WTR/TechProviders/apple.png';
//@ts-ignore
import CiscoLogo from '../../assets/images/WTR/TechProviders/cisco.png';
//@ts-ignore
import GoogleLogo from '../../assets/images/WTR/TechProviders/google.png';
//@ts-ignore
import HpLogo from '../../assets/images/WTR/TechProviders/hp.png';
//@ts-ignore
import IbmLogo from '../../assets/images/WTR/TechProviders/ibm.png';
//@ts-ignore
import IntelLogo from '../../assets/images/WTR/TechProviders/intel.png';
//@ts-ignore
import MetaLogo from '../../assets/images/WTR/TechProviders/meta.png';
//@ts-ignore
import MicrosoftLogo from '../../assets/images/WTR/TechProviders/microsoft.png';
//@ts-ignore
import OpenAILogo from '../../assets/images/WTR/TechProviders/openai.png';
//@ts-ignore
import OracleLogo from '../../assets/images/WTR/TechProviders/oracle.png';
//@ts-ignore
import SalesForceLogo from '../../assets/images/WTR/TechProviders/salesforce.png';
//@ts-ignore
import SapLogo from '../../assets/images/WTR/TechProviders/sap.png';

export type TechProvider = {
    name: string;
    slug: string;
    logo: React.FC<{ width: string; height: string; fill: string }>;
    link: string;
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
export enum TechProviderLink {
    Apple = 'https://www.windesheim.tech/technology-providers/apple/',
    Amazon = 'https://www.windesheim.tech/technology-providers/aws/',
    Cisco = 'https://www.windesheim.tech/technology-providers/cisco-systems/',
    Google = 'https://www.windesheim.tech/technology-providers/google/',
    HP = 'https://www.windesheim.tech/technology-providers/hp/',
    IBM = 'https://www.windesheim.tech/technology-providers/ibm/',
    Intel = 'https://www.windesheim.tech/technology-providers/intel/',
    Meta = 'https://www.windesheim.tech/technology-providers/meta/',
    Microsoft = 'https://www.windesheim.tech/technology-providers/microsoft/',
    OpenAI = 'https://www.windesheim.tech/technology-providers/openai/',
    Oracle = 'https://www.windesheim.tech/technology-providers/oracle/',
    SalesForce = 'https://www.windesheim.tech/technology-providers/salesforce/',
    SAP = 'https://www.windesheim.tech/technology-providers/sap/',
}
export const techProviderItems: TechProvider[] = [
    {
        name: 'Apple',
        slug: TechProviderSlug.Apple,
        logo: AppleLogo,
        link: TechProviderLink.Apple,
    },
    {
        name: 'Amazon',
        slug: TechProviderSlug.Amazon,
        logo: AmazonLogo,
        link: TechProviderLink.Amazon,
    },
    {
        name: 'Cisco',
        slug: TechProviderSlug.Cisco,
        logo: CiscoLogo,
        link: TechProviderLink.Cisco,
    },
    {
        name: 'Google',
        slug: TechProviderSlug.Google,
        logo: GoogleLogo,
        link: TechProviderLink.Google,
    },
    {
        name: 'HP',
        slug: TechProviderSlug.HP,
        logo: HpLogo,
        link: TechProviderLink.HP,
    },
    {
        name: 'IBM',
        slug: TechProviderSlug.IBM,
        logo: IbmLogo,
        link: TechProviderLink.IBM,
    },
    {
        name: 'Intel',
        slug: TechProviderSlug.Intel,
        logo: IntelLogo,
        link: TechProviderLink.Intel,
    },
    {
        name: 'Meta',
        slug: TechProviderSlug.Meta,
        logo: MetaLogo,
        link: TechProviderLink.Meta,
    },
    {
        name: 'Microsoft',
        slug: TechProviderSlug.Microsoft,
        logo: MicrosoftLogo,
        link: TechProviderLink.Microsoft,
    },
    {
        name: 'OpenAI',
        slug: TechProviderSlug.OpenAI,
        logo: OpenAILogo,
        link: TechProviderLink.OpenAI,
    },
    {
        name: 'Oracle',
        slug: TechProviderSlug.Oracle,
        logo: OracleLogo,
        link: TechProviderLink.Oracle,
    },
    {
        name: 'SalesForce',
        slug: TechProviderSlug.SalesForce,
        logo: SalesForceLogo,
        link: TechProviderLink.SalesForce,
    },
    {
        name: 'SAP',
        slug: TechProviderSlug.SAP,
        logo: SapLogo,
        link: TechProviderLink.SAP,
    },
];
