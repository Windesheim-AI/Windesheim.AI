import React, { useState } from 'react';
import {
    FaChevronUp,
    FaChevronDown,
    FaRegSquare,
    FaRegCheckSquare,
    FaArrowRight,
} from 'react-icons/fa';
import { ScrollView } from 'react-native';
import { styled } from 'styled-components';

import { useNavigation } from '../lib/utility/navigation/useNavigation';
import { Routes } from '../routes/routes';

interface CategoryProps {
    isSelected: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h1`
    color: #333;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 2rem;
`;

const CategoryList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const CategoryItem = styled.div<CategoryProps>`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding: 1rem;
    border-radius: 10px;
    background-color: ${(props) => (props.isSelected ? '#E6F0FF' : '#fff')};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background-color: #f5f9ff;
        transform: translateX(3px);
    }
`;

const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const CategoryContent = styled.div<{ isExpanded: boolean }>`
    max-height: ${(props) => (props.isExpanded ? '200px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease;
    margin-top: ${(props) => (props.isExpanded ? '1rem' : '0')};
    padding-left: 2.5rem;
    color: #666;
`;

const CategoryText = styled.span<{ isExpanded: boolean }>`
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) => (props.isExpanded ? '#007AFF' : '#333')};
    flex-grow: 1;
    margin-left: 1rem;
`;

const ChevronIcon = styled.div<{ isExpanded: boolean }>`
    color: ${(props) => (props.isExpanded ? '#007AFF' : '#333')};
`;

const CheckBox = styled.div<{ isSelected: boolean }>`
    color: ${(props) => (props.isSelected ? '#FFD700' : '#333')};
`;

const Header = styled.p`
    color: #000;
    font-size: 24px;
    font-weight: bold;
    align-self: flex-start;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    color: #666;
    font-size: 1rem;
    align-self: flex-start;
    margin-bottom: 2rem;
    line-height: 1.5;
`;

const Button = styled.button`
    position: relative;
    margin-top: 2rem;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background-color: #ffd700;
    color: black;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #ffc700;
        transform: translateX(3px);
    }
`;

const ChooseCategories: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    const navigator = useNavigation();

    const toggleCategory = (categoryId: number) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(
                selectedCategories.filter((id) => id !== categoryId),
            );
        } else {
            if (selectedCategories.length < 3) {
                setSelectedCategories([...selectedCategories, categoryId]);
            }
        }
    };

    const toggleExpand = (categoryId: number) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(
                expandedCategories.filter((id) => id !== categoryId),
            );
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    const categories = [
        'Strategy, Leadership, and Planning',
        'Technology and Processes',
        'Data Management and Ethics',
        'Skills, Workforce, and AI Knowledge',
        'Innovation and Change Management',
        'Risk and Compliance Management',
    ];

    const categoryDescriptions = [
        'Strategic alignment and leadership skills in the context of digital transformation.',
        'Technological infrastructure and process optimization for digital solutions.',
        'Responsible data management and ethical guidelines.',
        'Development of skills and knowledge in AI and digital technologies.',
        'Management of innovation processes and organizational change.',
        'Risk management and compliance with regulatory requirements.',
    ];

    return (
        <ScrollView>
            <Container>
                <Header>Maturity Scan Light</Header>
                <Description>
                    The Maturity Scan Light helps you assess the maturity level
                    of your organization.{'\n'}
                    Select the most important categories for you.{'\n'}
                    These will be weighted more heavily in the evaluation.
                </Description>

                <CategoryList>
                    {categories.map((category, index) => (
                        <CategoryItem
                            key={index}
                            isSelected={selectedCategories.includes(index)}
                        >
                            <CategoryHeader>
                                <CheckBox
                                    isSelected={selectedCategories.includes(
                                        index,
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCategory(index);
                                    }}
                                >
                                    {selectedCategories.includes(index) ? (
                                        <FaRegCheckSquare size={20} />
                                    ) : (
                                        <FaRegSquare size={20} />
                                    )}
                                </CheckBox>

                                <CategoryText
                                    isExpanded={expandedCategories.includes(
                                        index,
                                    )}
                                    onClick={() => toggleExpand(index)}
                                >
                                    {category}
                                </CategoryText>

                                <ChevronIcon
                                    isExpanded={expandedCategories.includes(
                                        index,
                                    )}
                                    onClick={() => toggleExpand(index)}
                                >
                                    {expandedCategories.includes(index) ? (
                                        <FaChevronDown size={20} />
                                    ) : (
                                        <FaChevronUp size={20} />
                                    )}
                                </ChevronIcon>
                            </CategoryHeader>

                            <CategoryContent
                                isExpanded={expandedCategories.includes(index)}
                            >
                                {categoryDescriptions[index]}
                            </CategoryContent>
                        </CategoryItem>
                    ))}
                </CategoryList>
                <Button
                    onClick={() =>
                        navigator.navigate(Routes.InformationPage.toString())
                    }
                >
                    Take Scan <FaArrowRight />
                </Button>
            </Container>
        </ScrollView>
    );
};

export { ChooseCategories };
