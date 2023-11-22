import { useDataFetcher, fetchJsonData } from '../../fetcher/DataFetcher';
import { appConfig } from '../../../../app.config';
import { Course } from '../../../types/Course';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function useSingleCourse(id: string) {
    return useDataFetcher<Course>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/wingai/v1/courses/' + id,
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
