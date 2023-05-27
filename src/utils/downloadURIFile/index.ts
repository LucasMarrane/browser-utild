export function downloadUriFile(uriFile: string, filename: string = 'file.txt') {
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('hidden', 'true');
    downloadAnchor.setAttribute('href', uriFile);
    downloadAnchor.setAttribute('download', filename);

    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}
