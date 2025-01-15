import { useRoute } from '@react-navigation/native';
import { persistentStorageWrite } from 'lib/utility/persistentStorage';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import { useColorConfig } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useMapSingleScanToData } from '../../lib/repositories/scans/mapSingleScanToData';
import useSingleScan from '../../lib/repositories/scans/useSingleScan';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

type ScanOverviewPageProps = {
    scanId: string;
};

export default function ScanOverview() {
    const fonts = useFonts();
    const colors = useColorConfig();
    const route = useRoute();
    const navigator = useNavigation();
    const params = route.params as ScanOverviewPageProps;
    const scanId = params.scanId;

    const goBack = () => {
        HapticFeedback(HapticForces.Light);
        navigator.goBack();
    };
    const { data, isLoading, error } = useSingleScan(scanId);
    const scan = useMapSingleScanToData(data);
    const styles = StyleSheet.create({
        container: {
            margin: -20,
        },
        content: {
            margin: 10,
            color: colors.text,
        },
        title: {
            ...fonts.h1,
            fontSize: 34,
            margin: 10,
        },

        diffcultytext: {
            margin: 10,
            fontWeight: 'bold',
            color: colors.text,
        },
        courseBackgroundContainer: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            overflow: 'hidden',
        },
        buttonContainer: {
            alignItems: 'center',
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 15,
            backgroundColor: colors.continueButtonColor,
            width: '48%',
            ...fonts.stageTime,
        },
        courseBackgroundImage: { width: '100%', height: 'auto' },
        courseStageBottomButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            padding: 16,
        },
        buttonText: {
            color: colors.text,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <PageView title="An error occurred while loading the data">
                <GoBackButton
                    buttonText="Go back"
                    onPress={() => navigator.goBack()}
                />
            </PageView>
        );
    }

    return (
        <ScrollView>
            <PageView>
                <View style={styles.container}>
                    <View style={styles.courseBackgroundContainer}>
                        <Image
                            src={
                                scan?.imageUrl
                                    ? scan?.imageUrl
                                    : 'https://placehold.co/200X100/EEE/31343C'
                            }
                            alt="Scan Image"
                            style={styles.courseBackgroundImage}
                        />
                    </View>

                    <View style={styles.content}>
                        <TextTranslated style={styles.title} text={scan.name} />
                        <TextTranslated
                            style={styles.content}
                            text={scan?.content}
                        />
                        <TextTranslated
                            style={styles.diffcultytext}
                            text={'Difficulty: ' + scan?.difficulty + '/5'}
                        />
                    </View>

                    <View style={styles.courseStageBottomButtons}>
                        <TouchableOpacity
                            onPress={goBack}
                            style={styles.buttonContainer}
                        >
                            <TextTranslated
                                style={styles.buttonText}
                                text="Go Back"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // eslint-disable-next-line no-void
                                void persistentStorageWrite('scanId', scanId);

                                navigator.navigate(
                                    Routes.ChooseCategories.toString(),
                                    { scanId },
                                );
                            }}
                            style={styles.buttonContainer}
                        >
                            <TextTranslated
                                style={styles.buttonText}
                                text="Take scan"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </PageView>
        </ScrollView>
    );
}
