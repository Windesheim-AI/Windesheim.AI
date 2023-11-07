import { useState, useEffect } from 'react';
import { appConfig } from '../../../app.config';

interface PageData {
    content: {
        rendered: string;
    };
}

export const useFetchWTRPage = (page: string, defaultPage: string) => {
    const [content, setContent] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const backendUrl = appConfig.backendUrl;
        let contentUrl = backendUrl + '/wp-json/wp/v2/pages?slug=' + page;

        fetch(contentUrl)
            .then((response) => response.json() as Promise<PageData[]>)
            .then((json) => {
                const html = json[0]?.content?.rendered || '';
                setContent(html);
                setLoaded(true);
            })
            .catch(() => {
                contentUrl =
                    backendUrl + '/wp-json/wp/v2/pages?slug=' + defaultPage;
                fetch(contentUrl)
                    .then((response) => response.json() as Promise<PageData[]>)
                    .then((json) => {
                        const html = json[0]?.content?.rendered || '';
                        setContent(html);
                        setLoaded(true);
                    })
                    .catch(() => {
                        setContent(
                            '<h2>404</h2><p>Page not found</p><p>Something went wrong while loading the page. Please try again later.</p>',
                        );
                        setLoaded(true);
                    });
            });
    }, [page, defaultPage]);
    return { content, loaded };
};
