/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
    ViewStyle,
    Image,
    Button
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import arrowLeft from '../../assets/images/Icon/go_back_arrow.png';
import { StageCard } from '../../components/course/card/StageCard';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import { IconLine } from '../../../src/components/general/base/IconLine';

import {
    useColorConfig,
    useColorStateConfig,
    useCurrentTheme,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useMapSingleScanToData } from '../../lib/repositories/scans/mapSingleScanToData';
import useSingleScan from '../../lib/repositories/scans/useSingleScan';
import { usePreparedTranslator } from '../../lib/translations/hooks';
import { estimateTime } from '../../lib/utility/estimateTime';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
type ScandOverviewPageProps = {
    scanId: string;
};



export default function ScanOverview() {
    const fonts = useFonts();
    const windowDimensions = useWindowDimensions();
    const t = usePreparedTranslator();
    const stateColors = useColorStateConfig();
    const colors = useColorConfig();
    const route = useRoute();
    const navigator = useNavigation();
    const params = route.params as ScandOverviewPageProps;
    const scanId = params.scanId;

    const goBack = () => {
        HapticFeedback(HapticForces.Light);
        navigator.goBack();
    };
    const { data, isLoading, error } = useSingleScan(scanId);
    const scan = useMapSingleScanToData(data);
    const currentTheme = useCurrentTheme();
    const containerHeight = windowDimensions.height * 0.54;
    const buttonStyle: ViewStyle = {
        position: 'absolute',
        top: -5,
        right: 10,
    };
    const iconStyle = {
        width: 37,
        height: 37,
        tintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
        backgroundColor: colors.arrowContainer,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
    };
    const styles = StyleSheet.create({
        container: {
            margin: -20,
        },
        courseStageContainer: {
            marginTop: 10,
            height: containerHeight,
        },
        content: {
            margin: 10,
        },
        title: {
            ...fonts.h1,
            fontSize: 34,
            margin: 10,
        },

        diffcultytext: {
            margin: 10,
            fontWeight: 'bold',
        },
        courseBackgroundImage: {
            height: 140,
            marginLeft: 10,
            marginRight: 10,
        },
        courseCardContainer: {
            margin: 4,
            marginBottom: 80,
        },
        infoBar: {
            marginTop: 10,
            flexDirection: 'row',
            display: 'none', // ENABLE THIS WHEN THE DATA IS AVAILABLE
        },
        icons: {
            marginLeft: 10,
        },
        stageBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 10,
        },
        timeBar: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
        },
        courseBackgroundContainer: {
            borderTopRadius: 15,
            overflow: 'hidden',
        },
        courseTitle: {
            ...fonts.courseTitle,
            marginRight: 10,
        },
        buttonContainer: {
            alignItems: 'center',
            backgroundColor: '#FFD700',
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 15,
            ...fonts.stageTime,
        },
    });

    function navigateBackToCourses() {
        HapticFeedback(HapticForces.Light);
        navigator.navigate(Routes.Quizzes.toString());
    }



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

    console.log
    return (
        <ScrollView>
            <PageView>
            <View style={styles.container}>
                <View style={styles.courseBackgroundContainer}>
                    <img 
                        src={scan?.imageUrl ? scan?.imageUrl : "https://placehold.co/200X100/EEE/31343C"} 
                        alt="Scan Image" 
                        style={{ width: '100%', height: 'auto' }} 
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
                        text={"Difficulty: " + scan?.difficulty + "/5"}
                    />
                    
                </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={goBack}
                            style={[styles.buttonContainer, { backgroundColor: colors.secondary, width: '48%' }]}
                        >
                            <TextTranslated text="Go Back" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigator.navigate(Routes.ChooseCategories.toString(), { scanId: scanId })}
                            style={[styles.buttonContainer, { backgroundColor: colors.secondary, width: '48%' }]}
                        >
                            <TextTranslated text="Take scan" />
                        </TouchableOpacity>
                    </View>
                </View>
                </PageView>
        </ScrollView>
    );
}
