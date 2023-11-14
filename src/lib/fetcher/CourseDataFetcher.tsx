/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchJsonData, useDataFetcher } from './DataFetcher';
import { appConfig } from '../../../app.config';
import * as j from '../../assets/courses/test.json';
import { Course } from '../../types/Course';
// import env
// @ts-ignore
import { WP_USERNAME, WP_PASSWORD } from '@env';

type FetchCourseResult = {
    data: Course[] | undefined;
    isLoading: boolean;
    hasContent: boolean;
};

// When no id is provided, fetch all courses
export function useFetchCourseData(id?: string): FetchCourseResult {
    const extension = id ? '/' + id : '';
    const { data, isLoading, error } = useDataFetcher<string>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/wingai/v1/courses' + extension,
        username: WP_USERNAME,
        password: WP_PASSWORD,
    });

    const testdata = j as unknown as Course;
    if (error) return { data: [testdata], isLoading, hasContent: false };

    const hasContent = Boolean(data);
    if (!hasContent) {
        return { data: [], isLoading, hasContent };
    }
    const parsedData = JSON.parse(data ?? '') as Course[];

    return { data: parsedData, hasContent, isLoading };
}
