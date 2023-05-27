export function URIFromFile(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const uri = URL.createObjectURL(event.target.result);
            const uriFile = {
                name: file.name,
                size: file.size,
                type: file.type,
                uri: uri,
                extension: file?.name?.split('.')?.pop() ?? '',
            };
            resolve(uriFile);
        };
        reader.onerror = (event: any) => {
            reject(event.error);
        };
        reader.readAsDataURL(file);
    });
}
