import { appConfig } from '../../../../app.config';
import { Course } from '../../../types/Course';
import { useDataFetcher, fetchJsonData } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function useSingleCourse(id: string | undefined) {
    return useDataFetcher<Course>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/winai/v1/courses/' + id,
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
