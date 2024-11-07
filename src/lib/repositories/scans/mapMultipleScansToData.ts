import { mapScanToData } from './mapScan';
import { Scan, ScanDataMapped } from '../../../types/Scan';
import { useAppSelector } from '../../redux/Hooks';

export function useMapMultipleScansToData(
    scans: Scan[] | undefined,
): ScanDataMapped[] | undefined {
    if (!scans) return [];

    return scans.map((scan) => mapScanToData(scan));
}
