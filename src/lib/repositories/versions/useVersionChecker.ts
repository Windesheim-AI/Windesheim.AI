import { Course } from "../../../types/Course";
import { fetchData, fetchDataWithHeaders, fetchJsonData, useDataFetcher } from "../../fetcher/DataFetcher";
import { getEnvValue } from "../../utility/env/env";
import { EnvOptions } from "../../utility/env/env.values";

export async function useVersionChecker() {
    const { data, isLoading } = useDataFetcher(fetchDataWithHeaders, {
        url: getEnvValue(EnvOptions.WordPressDataURL) + "/wp-json/winai/v1/",
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });

    console.log(isLoading)
    console.log(data)
}