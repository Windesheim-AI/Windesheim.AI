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
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

    useEffect(() => {
        const backendUrl = appConfig.backendUrl;
        let contentUrl = backendUrl + '/wp-json/wp/v2/pages?slug=' + page;

        if (!isLoading && !isLoadingCompleted) {
            storeDispatch(setLoading(true));
            setIsLoading(true);
        }

        if (isLoadingCompleted) {
            return;
        }

        fetch(contentUrl)
            .then((response) => response.json() as Promise<PageData[]>)
            .then((json) => {
                const html = json[0]?.content?.rendered || '';
                setContent(html);

                storeDispatch(setLoading(false));
                setIsLoading(false);
                setIsLoadingCompleted(true);
            })
            .catch(() => {
                contentUrl =
                    backendUrl + '/wp-json/wp/v2/pages?slug=' + defaultPage;
                fetch(contentUrl)
                    .then((response) => response.json() as Promise<PageData[]>)
                    .then((json) => {
                        const html = json[0]?.content?.rendered || '';
                        setContent(html);

                        storeDispatch(setLoading(false));
                        setIsLoading(false);
                        setIsLoadingCompleted(true);
                    })
                    .catch(() => {
                        setContent(
                            '<h2>404</h2><p>Page not found</p><p>Something went wrong while loading the page. Please try again later.</p>',
                        );

                        storeDispatch(setLoading(false));
                        setIsLoading(false);
                        setIsLoadingCompleted(true);
                    });
            });
    }, [page, defaultPage]);

    return { content };
};
