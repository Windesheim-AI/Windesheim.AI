import * as React from 'react';
import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Modal,
    TouchableOpacity,
    FlatList,
    useWindowDimensions,
} from 'react-native';

import {
    position,
    keywords,
    aiFamiliarity,
} from '../../components/Bgcollect/DataList';
import { EditButton } from '../../components/Bgcollect/EditButton';
import { PageView } from '../../components/general/views/PageView';
import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
    setPosition,
    setInterestedKeyword,
    setHowMuchFamiliar,
} from '../../redux/slices/BgCollectSlice';

export const MyInfo = () => {
    const windowDimensions = useWindowDimensions();
    const [showModal, setShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const colors = useColorConfig();

    const closeModal = () => {
        setShowModal(false);
    };

    const handlePress = (valueType: string) => {
        if (!isEditing) return;

        setSelectedValue(valueType);
        setShowModal(true);
    };

    const handleEditPress = () => {
        setIsEditing(!isEditing);
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
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: windowDimensions.height * 0.03,
        },
        box: {
            alignItems: 'center',
            borderRadius: 25,
            flexDirection: 'row',
            backgroundColor: colors.listItemBg,
            marginBottom: windowDimensions.width * 0.05,
            width: windowDimensions.width * 0.8,
            height: windowDimensions.height * 0.1,
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
        editButtonContainer: {
            width: windowDimensions.width,
            position: 'absolute',
            bottom: 0, // 화면 하단에 배치
            paddingBottom: windowDimensions.height * 0.03, // 아래 여백
            paddingRight: 60,
        },
    });

    return (
        <PageView title="My Background Information">
            <View style={styles.container}>
                <Pressable
                    onPress={() => handlePress('position')}
                    style={styles.box}
                    disabled={!isEditing}
                    testID="positionPressable"
                >
                    <Text style={styles.infoText}>
                        Position: {selectedPosition}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => handlePress('keywords')}
                    disabled={!isEditing}
                    style={styles.box}
                >
                    <Text style={styles.infoText}>
                        Keyword: {inputKeywords}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => handlePress('aiFamiliarity')}
                    disabled={!isEditing}
                    style={styles.box}
                >
                    <Text style={styles.infoText}>
                        Familiarity: {selectedFamiliarity}
                    </Text>
                </Pressable>
            </View>
            {/* Edit Button */}
            <View style={styles.editButtonContainer}>
                <EditButton
                    onPressEdit={handleEditPress}
                    isEditing={isEditing}
                    testID="editbutton"
                />
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
                            <TouchableOpacity
                                onPress={() =>
                                    handleValueSelection(item.name || item.id)
                                }
                            >
                                <Text style={styles.modalText}>
                                    {item.name || item.id}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <TouchableOpacity onPress={closeModal}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </PageView>
    );
};
