import { getResults } from "./QrveyApi";

const fn = (a) => a;

const ChartDefinitionBase = {
    __results: undefined,

    buildQuery: fn,
    processResult: fn,
    async getData(query) {
        return getResults(query)
    },

    async paint(realoadData = false) {
        debugger
        if (realoadData) {
            const query = this.buildQuery();

            if (query) {
                this.__results = await this.getData(query);
                this.__results = this.processResult(this.__results);
            }
            else {
                this.__results = undefined;
            }
        }

        console.log("paint::__results", this.__results);

        this.render()
    }
}


export function extendChartDefinition(chartDefinition: Object = {}, model, element) {
    debugger
    return Object.setPrototypeOf(
        {...chartDefinition},
        {
            ...ChartDefinitionBase,
            model,
            element,
            mario:"Test"
        },
    );
}