/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//@ts-ignore
import { WP_USERNAME, WP_PASSWORD } from '@env';

import { useDataFetcher, fetchJsonData } from './DataFetcher';
import { appConfig } from '../../../app.config';
import { Course } from '../../types/Course';

export default function useAllCourses() {
    return useDataFetcher<Course[]>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/wingai/v1/courses/',
        username: WP_USERNAME,
        password: WP_PASSWORD,
    });
}
