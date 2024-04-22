// Please note: this is a mock return for demo purposes only
// TODO: Implement the actual fetcher logic

//To get article 2 description use: getArticleArray()[1].description
export const getArticleArray = () => {
    return [
        {
            title: 'Article 1',
            description:
                'Het gebruik van AI roept meerdere ethische vraagstukken op, over onder andere privacy, aansprakelijkheid en gelijkwaardigheid. Hoewel er vee...',
            url: 'https://www.example.com/',
            image: 'https://placehold.co/500x400/000000/FFFFFF/png',
            catagory: ['Ethical', ' Social'],
        },
        {
            title: 'Article 2',
            description: 'This is the article 2 description',
            url: 'https://www.example.com/',
            image: 'https://placehold.co/400x600/000000/FFFFFF/png',
            catagory: ['Ethical'],
        },
        {
            title: 'Article 3',
            description: 'This is the article 3 description',
            url: 'https://www.example.com/',
            image: 'https://placehold.co/200x200/000000/FFFFFF/png',
            catagory: ['Ethical', 'Legal', 'Social', 'Technical'],
        },
    ];
};
