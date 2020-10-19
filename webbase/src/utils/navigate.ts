export const navigateToUrl = (url = '/', title: string, stateObj = {}) => {
    // @ts-ignore
    window.navigateToUrl(stateObj, title, url);
}