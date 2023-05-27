import { ILogger } from '../@types/window';
import { createURIFile } from '../createURIFile';
import { downloadUriFile } from '../downloadURIFile';
import { MimeTypes } from '../mimeTypes';

export function initLogger() {
    const logger: ILogger = {
        logs: [],
        downloadLogFile: () => {
            const file = createURIFile(MimeTypes.APPLICATION_JSON, JSON.stringify(window?.logger?.logs));
            const filename = `log.${new Date().toISOString()}.json`;
            downloadUriFile(file, filename);
        },
        addLog: (err: any) => {
            if (Array.isArray(window?.logger?.logs)) {
                window.logger.logs.push({
                    date: new Date().toISOString(),
                    error: err,
                });
            }
        },
        printTableLog: () => {
            if (Array.isArray(window?.logger?.logs)) {
                console.table(window.logger.logs);
            }
        },
    };

    if (!window?.logger) {
        window.logger = logger;
    } else {
        if (!Array.isArray(window?.logger?.logs)) {
            window.logger.logs = logger.logs;
        }

        if (typeof window?.logger?.addLog != 'function') {
            window.logger.addLog = logger.addLog;
        }

        if (typeof window?.logger?.downloadLogFile != 'function') {
            window.logger.downloadLogFile = logger.downloadLogFile;
        }

        if (typeof window?.logger?.printTableLog != 'function') {
            window.logger.printTableLog = logger.printTableLog;
        }
    }
}

export function downloadLogFile() {
    if (Array.isArray(window?.logger?.logs) && typeof window?.logger?.downloadLogFile == 'function') {
        window.logger.downloadLogFile();
    } else {
        initLogger();
        downloadLogFile();
    }
}

export function addLog(err: any) {
    if (Array.isArray(window?.logger?.logs) && typeof window?.logger?.addLog == 'function') {
        window.logger.addLog(err);
    } else {
        initLogger();
        addLog(err);
    }
}

export function printTableLog() {
    if (Array.isArray(window?.logger?.logs) && typeof window?.logger?.printTableLog == 'function') {
        window.logger.printTableLog();
    } else {
        initLogger();
        printTableLog();
    }
}


export function catchErrors(message, source, lineno, colno, error) {
    addLog({ message: message, line: lineno, column: colno, source, stack: error?.stack });
}

export function catchUnhandledErrors(event) {
    addLog({type: 'Promise / unhandledrejection ', reason: typeof event?.reason == 'object' ? {message: event?.reason?.message, stack: event?.reason?.stack} : event?.reason, timestamp: event?.timeStamp });
}

export function setErrorsListenner() {
    window.onerror = catchErrors;
    window.addEventListener('unhandledrejection', catchUnhandledErrors);  
}