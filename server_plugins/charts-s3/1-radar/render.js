import * as echarts from './echarts.min.js';
let myChart;

/**
 * Thihs hook should contains the Visulization rendering Logic 
 * * If the model has results, draw the visualization, otherwise show an empty state
 * @param {HTMLElement} element 
 * @param {ChartModel} model 
 * @param {Object} __results 
 */
export function render() { //required  
    const { element, model, __results } = this;
    debugger

    if (__results) {
        drawViz(element, model, __results);
    }
    else {
        emptyState(element);
    }

}

/**
 * This Hook prepare the Query Body Object 
 * the results is passed to `async getData` Hook
 * @returns QueryBodyObject
 */
/**
 * It takes the model from the chart and builds a query object that can be sent to the API
 * @returns A query object that is used to make a request to the API.
 */
export function buildQuery() {
    const shelves = this.model.dimensions || [];
debugger
    const getShelf = (shelve = [], position) => (shelve[position] || []).filter(Boolean);


    // this should be abstracted inside core sdk 
    const dimensions = getShelf(shelves, 0).map(column => (column.questionid = column.id, column));
    const summaries = getShelf(shelves, 1).map(column => {
        column.questionid = column.id;
        column.aggregate = column.type == 'NUMERIC' ? 'SUM' : 'COUNT';
        return column;
    });


    if (dimensions.length === 0 || summaries.length === 0) return;


    return {
        "qrveyid": "dQyE9YrDc",
        "charts": [{ dimensions, summaries }],
        "logic": []
    }

}


/* export function getData(data){
    console.log(data);
} */

/**
 * This hook is intended to transforn de results into a especific visualization data structure
 * @param {Object} results 
 * @returns 
 */

export function processResult(results = []) {
    debugger
    const res = results?.[0] || {};
    const data = res.data || [];
    const indicator = [], series = [];
    const serieName = this.model.dimensions[1].map(col => col.text)

    data.forEach((item, i) => {
        indicator.push({ name: item.key, max: Math.max(...item.summary) });

        item.summary.forEach((value, serieIndex) => {
            series[serieIndex] ||= { value: [], name: serieName[serieIndex] };
            series[serieIndex].value.push(value);
        })

    });

    return { indicator, series };
}


/*----------------------------------------------------------------
Custom Function and methods 
----------------------------------------------------------------*/


function emptyState(el) {
    el.innerHTML = '<div style="text-align:center"><h3>Empty State</h3><strong>Radar Chart</strong> <br/>To start add a Category and a Value</div>';
}

function drawViz(el, model, results) {
    const el2 = document.createElement('div');

    el2.style.height = '100%'
    el.innerHTML = '';
    el.append(el2);

    myChart = echarts.init(el2);

    const color = model.color ? {color: model.color} : {};
    const option = {
        ...color,
        title: {
            text: 'Basic Radar Chart'
        },
        legend: {},
        radar: {
            shape: model.shape,
            indicator: results.indicator
        },
        series: [{
            type: 'radar',
            data: results.series
        }]
    };

    myChart.setOption(option);
}
