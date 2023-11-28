import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Modal,
    FlatList,
    useWindowDimensions,
} from 'react-native';

import {
    position,
    keywords,
    aiFamiliarity,
} from '../../components/BackgroundCollect/DataList';
import { EditButton } from '../../components/BackgroundCollect/EditButton';
import { SettingCard } from '../../components/general/card/SettingCard';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
    setPosition,
    setInterestedKeyword,
    setHowMuchFamiliar,
} from '../../redux/slices/BgCollectSlice';
import { translateText } from '../../translations/hooks';

export const BackgroundInfo = () => {
    const language = useAppSelector((state) => state.language.langCode);
    const { t } = useTranslation();

    const windowDimensions = useWindowDimensions();
    const [showModal, setShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useAppDispatch();
    const colors = useColorConfig();
    const [isPositionEditing, setIsPositionEditing] = useState(false);
    const [isKeywordsEditing, setIsKeywordsEditing] = useState(false);
    const [isFamiliarityEditing, setIsFamiliarityEditing] = useState(false);

    const closeModal = () => {
        setIsPositionEditing(false);
        setIsKeywordsEditing(false);
        setIsFamiliarityEditing(false);
    };

    const handleEditPositionClick = (valueType: string) => {
        if (!isPositionEditing) return;

        setSelectedValue(valueType);
        setShowModal(true);
    };
    const handleEditKeywordClick = (valueType: string) => {
        if (!isKeywordsEditing) return;

        setSelectedValue(valueType);
        setShowModal(true);
    };
    const handleEditFamiliarityClick = (valueType: string) => {
        if (!isFamiliarityEditing) return;

        setSelectedValue(valueType);
        setShowModal(true);
    };

    const handlePositionEditPress = () => {
        setIsPositionEditing(!isPositionEditing);
    };

    const handleKeywordsEditPress = () => {
        setIsKeywordsEditing(!isKeywordsEditing);
    };

    const handleFamiliarityEditPress = () => {
        setIsFamiliarityEditing(!isFamiliarityEditing);
    };

    let modalData: { id: string; name: string }[] = [];

    if (selectedValue === 'position') {
        modalData = position.map((item) => {
            return {
                id: item.id,
                name: translateText(t, item.name, language),
            };
        });
    } else if (selectedValue === 'keywords') {
        modalData = keywords.map((item) => {
            return {
                id: item.id,
                name: translateText(t, item.name, language),
            };
        });
    } else if (selectedValue === 'aiFamiliarity') {
        modalData = aiFamiliarity.map((item) => {
            return {
                id: item.id,
                name: translateText(t, item.name, language),
            };
        });
    }

    const handleValueSelection = (value: string | number) => {
        setShowModal(false);

        if (selectedValue === 'position') {
            dispatch(setPosition(String(value)));
        } else if (selectedValue === 'keywords') {
            dispatch(setInterestedKeyword(String(value)));
        } else if (selectedValue === 'aiFamiliarity') {
            dispatch(setHowMuchFamiliar(String(value)));
        }
    };

    const backgroundInformation = useAppSelector((state) => state.bgCollect);
    const selectedPosition = backgroundInformation.position;
    const inputKeywords = backgroundInformation.interestedKeyword;
    const selectedFamiliarity = backgroundInformation.howMuchFamiliar;
    const fonts = useFonts();

    const styles = StyleSheet.create({
        container: {
            paddingTop: windowDimensions.height * 0.03,
        },
        infoText: {
            color: colors.text,
            ...fonts.h2,
            position: 'absolute',
            paddingHorizontal: windowDimensions.width * 0.05,
        },
        modalContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: windowDimensions.width * 0.25,
            backgroundColor: colors.listItemBg,
        },
        modalText: {
            ...fonts.h1,
        },
    });

    return (
        <PageView title="Background Information">
            <View style={styles.container}>
                {/* position */}
                <Pressable
                    onPress={() => {
                        handleEditPositionClick('position');
                        setSelectedValue('position');
                        handlePositionEditPress();
                    }}
                    disabled={!isPositionEditing}
                    testID="positionPressable"
                >
                    <SettingCard icon="user" title="" testID="position">
                        <TextTranslated
                            style={styles.infoText}
                            text={selectedPosition}
                        />
                        <EditButton
                            onPressEdit={handlePositionEditPress}
                            isEditing={isPositionEditing}
                            testID="editbutton"
                        />
                    </SettingCard>
                </Pressable>
                {/* keywords */}
                <Pressable
                    onPress={() => {
                        handleEditKeywordClick('keywords');
                        setSelectedValue('keywords');
                        handleKeywordsEditPress();
                    }}
                    disabled={!isKeywordsEditing}
                    testID="positionPressable"
                >
                    <SettingCard icon="user" title="" testID="keywords">
                        <TextTranslated
                            style={styles.infoText}
                            text={inputKeywords}
                        />
                        <EditButton
                            onPressEdit={handleKeywordsEditPress}
                            isEditing={isKeywordsEditing}
                            testID="editbutton"
                        />
                    </SettingCard>
                </Pressable>
                {/* aiFamiliarity */}
                <Pressable
                    onPress={() => {
                        handleEditFamiliarityClick('aiFamiliarity');
                        setSelectedValue('aiFamiliarity');
                        handleFamiliarityEditPress();
                    }}
                    disabled={!isFamiliarityEditing}
                    testID="positionPressable"
                >
                    <SettingCard icon="user" title="" testID="aiFamiliarity">
                        <TextTranslated
                            style={styles.infoText}
                            text={selectedFamiliarity}
                        />
                        <EditButton
                            onPressEdit={handleFamiliarityEditPress}
                            isEditing={isFamiliarityEditing}
                            testID="editbutton"
                        />
                    </SettingCard>
                </Pressable>
            </View>
            {/* Modal content */}
            <Modal
                visible={showModal}
                animationType="slide"
                testID="modalContent"
            >
                <View style={styles.modalContent}>
                    <FlatList
                        data={modalData}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    handleValueSelection(item.name || item.id)
                                }
                            >
                                <Text style={styles.modalText}>
                                    {item.name || item.id}
                                </Text>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <Pressable onPress={closeModal}>
                        <TextTranslated text="Close" />
                    </Pressable>
                </View>
            </Modal>
        </PageView>
    );
};
