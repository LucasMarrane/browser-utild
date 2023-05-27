interface ILogger {
    logs: Array<any>;
    downloadLogFile: Function;
    addLog: Function;
    printTableLog: Function;
}

export declare global {
    interface Window {
        logger: ILogger;
    }
}
