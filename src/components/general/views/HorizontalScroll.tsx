import React from 'react';
import { ScrollView } from 'react-native';

type HorizontalScrollProps = {
    children: React.ReactNode;
};

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
    children,
}: HorizontalScrollProps) => {
    return <ScrollView horizontal>{children}</ScrollView>;
};

export default HorizontalScroll;
