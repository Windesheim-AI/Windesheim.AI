/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ImageSourcePropType } from 'react-native';

//@ts-ignore
import AiImage from '../../assets/images/WTR/Themes/ai.jpg';
//@ts-ignore
import CloudImage from '../../assets/images/WTR/Themes/cloud.jpg';
//@ts-ignore
import CustomerCentricImage from '../../assets/images/WTR/Themes/ftti.jpg';
//@ts-ignore
import GreenImage from '../../assets/images/WTR/Themes/green-it.jpg';
//@ts-ignore
import NextUIImage from '../../assets/images/WTR/Themes/nextui.jpg';
//@ts-ignore
import ProgrammingImage from '../../assets/images/WTR/Themes/programming.jpg';
//@ts-ignore
import QuantumImage from '../../assets/images/WTR/Themes/quantum.jpg';
//@ts-ignore
import TrustImage from '../../assets/images/WTR/Themes/trust.jpg';
//@ts-ignore
import WorkImage from '../../assets/images/WTR/Themes/work.jpeg';

type ThemeItem = {
    name: string;
    slug: ThemeItemSlug;
    image: ImageSourcePropType;
    description: string;
};

export enum ThemeItemSlug {
    ArtificialIntelligence = 'artificial-intelligence',
    NextUI = 'next-ui',
    GreenIT = 'green-it',
    CustomerCentrality = 'customer-centricity',
    FutureOfWork = 'future-of-work',
    CloudEverywhere = 'cloud-everywhere',
    FutureOfProgramming = 'future-of-programming',
    BuildingTrust = 'building-trust',
    QuantumComputing = 'quantum-computing',
}

export const themeItems: ThemeItem[] = [
    {
        name: 'Artificial Intelligence',
        slug: ThemeItemSlug.ArtificialIntelligence,
        image: AiImage,
        description:
            'Artificial intelligence is the key to innovating the future and transforming our lives.',
    },
    {
        name: 'Next UI',
        slug: ThemeItemSlug.NextUI,
        image: NextUIImage,
        description:
            'Next UI focuses on the next generation of user interface design and innovation.',
    },
    {
        name: 'Green IT',
        slug: ThemeItemSlug.GreenIT,
        image: GreenImage,
        description:
            'Green IT is about environmentally sustainable and energy-efficient information technology.',
    },
    {
        name: 'Transaction to Interaction',
        slug: ThemeItemSlug.CustomerCentrality,
        image: CustomerCentricImage,
        description:
            'Transaction to Interaction explores the shift from transaction-focused to customer-centric interactions.',
    },
    {
        name: 'Future of Work',
        slug: ThemeItemSlug.FutureOfWork,
        image: WorkImage,
        description:
            'Future of Work examines how work will evolve in the coming years with technological advancements.',
    },
    {
        name: 'Cloud Everywhere',
        slug: ThemeItemSlug.CloudEverywhere,
        image: CloudImage,
        description:
            'Cloud Everywhere explores the pervasive use and impact of cloud computing in various domains.',
    },
    {
        name: 'Future of Programming',
        slug: ThemeItemSlug.FutureOfProgramming,
        image: ProgrammingImage,
        description:
            'Future of Programming delves into the evolving landscape of programming languages and paradigms.',
    },
    {
        name: 'Building Trust',
        slug: ThemeItemSlug.BuildingTrust,
        image: TrustImage,
        description:
            'Building Trust focuses on strategies and technologies for building trust in digital interactions.',
    },
    {
        name: 'Quantum Computing',
        slug: ThemeItemSlug.QuantumComputing,
        image: QuantumImage,
        description:
            'Quantum Computing explores the revolutionary field of quantum information processing and computation.',
    },
];
