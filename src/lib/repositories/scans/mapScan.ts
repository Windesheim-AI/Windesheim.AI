import { Scan, ScanDataMapped } from '../../../types/Scan';

export function mapScanToData(
    scan: Scan,
): ScanDataMapped {

    return {
        scanId: scan.id,
        name: scan.name,
        description: scan.description,
        
    };
}
