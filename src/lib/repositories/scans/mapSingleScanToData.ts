import { mapScanToData } from './mapScan';
import { Scan, ScanDataMapped } from '../../../types/Scan';

export function useMapSingleScanToData(scan: Scan | undefined): ScanDataMapped {
    // const scanDataState = useAppSelector((state) => state.courseData);
    if (!scan) return {} as ScanDataMapped;

    return mapScanToData(scan);
}
