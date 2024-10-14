declare enum filter {
    increasing = "INCREASING",
    decreasing = "DECREASING"
}
export declare class FilterOrdersQueryDto {
    roomId?: number;
    time?: filter;
}
export {};
