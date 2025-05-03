export const isValidUrl = (url: string) => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?[&\w=.-]*)?(#[\w-]*)?$/i;
    return urlRegex.test(url);
}
