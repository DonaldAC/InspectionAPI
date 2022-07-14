export interface InspectionType {
    _id?: {[key: string]: string};
    id: string;
    certificate_number: number;
    business_name?: string;
    date: string;
    result: string;
    sector: string;
    address: {[key: string]: string | number }
}
