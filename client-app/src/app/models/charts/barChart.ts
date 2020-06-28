export interface IBarOptions {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        maxBarThickness: number;
        backgroundColor: string;
    }[];
}