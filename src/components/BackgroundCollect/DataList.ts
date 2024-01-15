export type BackgroundDataItem = { id: string; name: string };

const positions: BackgroundDataItem[] = [
    { id: '1', name: 'Student' },
    { id: '2', name: 'Teacher' },
    { id: '3', name: 'Researcher' },
    { id: '4', name: 'Business IT' },
    { id: '5', name: 'Business management' },
    { id: '6', name: 'Government' },
    { id: '7', name: 'Ethicist/policy maker' },
    { id: '8', name: 'Other' },
];

const keywords: BackgroundDataItem[] = [
    { id: '1', name: 'Machine Learning' },
    { id: '2', name: 'Deep Learning' },
    { id: '3', name: 'Artificial Intelligence' },
    { id: '4', name: 'Natural Language Processing' },
    { id: '5', name: 'Reinforcement Learning' },
    { id: '6', name: 'Computer Vision' },
    { id: '7', name: 'AI Ethics' },
    { id: '8', name: 'Neural Networks' },
];

const aiFamiliarity: BackgroundDataItem[] = [
    { id: '1', name: 'Unfamiliar' },
    { id: '2', name: 'Slightly Familiar' },
    { id: '3', name: 'Moderately Familiar' },
    { id: '4', name: 'Familiar' },
    { id: '5', name: 'Very Familiar' },
    { id: '6', name: 'Extremely Familiar' },
];

export { positions, keywords, aiFamiliarity };
