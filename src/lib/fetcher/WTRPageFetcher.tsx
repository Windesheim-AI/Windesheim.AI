import { useState, useEffect } from 'react';

import { appConfig } from '../../../app.config';
import { useAppDispatch } from '../../redux/Hooks';
import { setLoading } from '../../redux/slices/LoadingSlice';

interface PageData {
    content: {
        rendered: string;
    };
}

export const useFetchWTRPage = (page: string, defaultPage: string) => {
    const storeDispatch = useAppDispatch();

    const [content, setContent] = useState('');

    useEffect(() => {
        if (content.length > 1) {
            return;
        }

        const backendUrl = appConfig.backendUrl;
        const contentUrl = backendUrl + '/wp-json/wp/v2/pages?slug=' + page;
        const defaultUrl =
            backendUrl + '/wp-json/wp/v2/pages?slug=' + defaultPage;

        if (content.length < 1) {
            storeDispatch(setLoading(true));
        }

        fetch(contentUrl)
            .then((response) => response.json() as Promise<PageData[]>)
            .then((json) => {
                const html = json[0]?.content?.rendered || '';
                setContent(html);
            })
            .catch(() => {
                fetch(defaultUrl)
                    .then((response) => response.json() as Promise<PageData[]>)
                    .then((json) => {
                        const html = json[0]?.content?.rendered || '';
                        setContent(html);
                    })
                    .finally(() => storeDispatch(setLoading(false)));
            })
            .finally(() => storeDispatch(setLoading(false)));
    }, [page, defaultPage, storeDispatch]);

    return { content };
};
