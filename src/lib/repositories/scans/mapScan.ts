import { Scan, ScanDataMapped } from '../../../types/Scan';

export function mapScanToData(
    scan: Scan,
): ScanDataMapped {

    return {
        scanId: scan.id,
        name: scan.name,
        description: scan.description,
        content: scan.content,
        difficulty: scan.difficulty,
        scanType: scan.scanType,
        imageUrl: scan.imageUrl,
    };
}
