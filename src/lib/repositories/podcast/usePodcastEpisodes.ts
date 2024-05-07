import { PodcastEpisode } from '../../../types/PodcastEpisode';
import { useDataFetcher, fetchJsonData } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function usePodcastEpisodes() {
    return useDataFetcher<PodcastEpisode[]>(fetchJsonData, {
        url:
            getEnvValue(EnvOptions.WordPressDataURL) +
            '/wp-json/winp/v1/episodes/',
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
