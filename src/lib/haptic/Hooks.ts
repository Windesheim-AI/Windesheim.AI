import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export enum HapticForces {
    Light = 'light',
    Medium = 'medium',
    Heavy = 'heavy',
}

export function HapticFeedback(force: HapticForces): void {
    if (!force) {
        return;
    }

    if (Platform.OS === 'web') {
        return;
    }

    let impactStyle: Haptics.ImpactFeedbackStyle;
    switch (force) {
        case HapticForces.Light:
            impactStyle = Haptics.ImpactFeedbackStyle.Light;
            break;
        case HapticForces.Medium:
            impactStyle = Haptics.ImpactFeedbackStyle.Medium;
            break;
        case HapticForces.Heavy:
            impactStyle = Haptics.ImpactFeedbackStyle.Heavy;
            break;
        default:
            return;
    }
    // eslint-disable-next-line no-void
    void Haptics.impactAsync(impactStyle);
}
