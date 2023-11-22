/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-ignore
import { WP_USERNAME, WP_PASSWORD } from '@env';

import { fetchJsonData, useDataFetcher } from './DataFetcher';
import { appConfig } from '../../../app.config';
import { Course } from '../../types/Course';

export function useFetchCourseData(id?: string, fetchAll = false) {
    if (!fetchAll && !id) throw new Error('No id was given, but was expected!');
    const extension = fetchAll ? `/${id}` : '/';
    return useDataFetcher<Course[]>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/wingai/v1/courses' + extension,
        username: WP_USERNAME,
        password: WP_PASSWORD,
    });
}
