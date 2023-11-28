import * as React from 'react';
import { useState } from 'react';
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
import { RootState, useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
    setPosition,
    setInterestedKeyword,
    setHowMuchFamiliar,
} from '../../redux/slices/BgCollectSlice';

export const BackgroundInfo = () => {
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

    const phandlePress = (valueType: string) => {
        if (!isPositionEditing) return;

        setSelectedValue(valueType);
        setShowModal(true);
    };
    const khandlePress = (valueType: string) => {
        if (!isKeywordsEditing) return;

        setSelectedValue(valueType);
        setShowModal(true);
    };
    const fhandlePress = (valueType: string) => {
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
        modalData = position;
    } else if (selectedValue === 'keywords') {
        modalData = keywords;
    } else if (selectedValue === 'aiFamiliarity') {
        modalData = aiFamiliarity;
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

    const selectedPosition = useAppSelector<string>(
        (state: RootState) => state.bgCollect.position,
    );
    const inputKeywords = useAppSelector<string>(
        (state: RootState) => state.bgCollect.interestedKeyword,
    );
    const selectedFamiliarity = useAppSelector<string>(
        (state: RootState) => state.bgCollect.howMuchFamiliar,
    );
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
        <PageView title="My Background Information">
            <View style={styles.container}>
                {/* position */}
                <Pressable
                    onPress={() => {
                        phandlePress('position');
                        setSelectedValue('position');
                        handlePositionEditPress();
                    }}
                    disabled={!isPositionEditing}
                    testID="positionPressable"
                >
                    <SettingCard icon="user" title="" testID="position">
                        <Text style={styles.infoText}>{selectedPosition}</Text>
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
                        khandlePress('keywords');
                        setSelectedValue('keywords');
                        handleKeywordsEditPress();
                    }}
                    disabled={!isKeywordsEditing}
                    testID="positionPressable"
                >
                    <SettingCard icon="user" title="" testID="keywords">
                        <Text style={styles.infoText}>{inputKeywords}</Text>
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
                        fhandlePress('aiFamiliarity');
                        setSelectedValue('aiFamiliarity');
                        handleFamiliarityEditPress();
                    }}
                    disabled={!isFamiliarityEditing}
                    testID="positionPressable"
                >
                    <SettingCard icon="user" title="" testID="aiFamiliarity">
                        <Text style={styles.infoText}>
                            {selectedFamiliarity}
                        </Text>
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
                        <Text>
                            <TextTranslated text="Close" />
                        </Text>
                    </Pressable>
                </View>
            </Modal>
        </PageView>
    );
};
