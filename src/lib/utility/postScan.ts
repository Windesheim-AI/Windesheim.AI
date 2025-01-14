import { fetchJsonData } from '../fetcher/DataFetcher';

export const postScan = async (data: object) => {
    console.log('postScan', JSON.stringify(data, null, 2));

    return data;

    // const options = {
    //     input: '/wp-json/wins/v1/result',
    //     init: {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     },
    // };

    // return (await fetchJsonData(options)) as object;
};
