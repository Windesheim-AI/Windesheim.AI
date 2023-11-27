import { Course } from '../../../types/Course';
import { fetchJsonData, useDataFetcher } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function useAllCourses() {
    return useDataFetcher<Course[]>(fetchJsonData, {
        url:
            getEnvValue(EnvOptions.WordPressDataURL) +
            '/wp-json/winai/v1/courses/',
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
