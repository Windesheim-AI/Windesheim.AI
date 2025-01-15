/* eslint-disable indent */
import { getEnvValue } from './env/env';
import { EnvOptions } from './env/env.values';
import { stringToBase64 } from '../utility/stringutils';

export const postScan = async (data: object) => {
    const username = getEnvValue(EnvOptions.WordPressUsername);
    const password = getEnvValue(EnvOptions.WordPressPassword);

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(username.length > 0 &&
            password.length > 0 && {
                Authorization: `Basic ${stringToBase64(`${username}:${password}`)}`,
            }),
    };

    const response = await fetch(
        getEnvValue(EnvOptions.WordPressDataURL) + 'wp-json/wins/v1/result',
        {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        },
    );

    if (!response.ok) {
        throw new Error('Failed to post scan data');
    }

    const resJson = (await response.json()) as ScanResult;

    return resJson;
};

export interface ScanResult {
    result_id: string;
    scan_id: string;
    scan_name: string;
    scan_type: string;
    companySize: any;
    companyLocation: string;
    created_at: string;
    overall_score: number;
    scores: Score[];
    advices: Advice[];
}

export interface Score {
    id: string;
    resultId: string;
    categoryId: string;
    score: string;
    weight: string;
    categoryName: string;
}

export interface Advice {
    id: string;
    categoryId: string;
    score: string;
    text: string;
    categoryName: string;
}
