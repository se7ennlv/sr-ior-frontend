export interface SummaryReport {
    name: string;
    value: number;
}

export interface Item {
    status: string;
    data: SummaryReport[];
}
