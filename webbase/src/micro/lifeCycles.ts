export const lifeCycles = {
    beforeLoad: [
        // @ts-ignore
        app => {
            console.log("before load", app);
        }
    ],
    beforeMount: [
        // @ts-ignore
        app => {
            console.log("before mount", app);
        }
    ],
    afterUnmount: [
        // @ts-ignore
        app => {
            console.log("after unload", app);
        }
    ]
};