import { fetchJsonData, useDataFetcher } from '../../fetcher/DataFetcher';
import { appConfig } from '../../../../app.config';
import { Course } from '../../../types/Course';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function useAllCourses() {
    return useDataFetcher<Course[]>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/wingai/v1/courses/',
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
