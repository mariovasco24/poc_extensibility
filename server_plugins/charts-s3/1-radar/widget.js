import actionPanel from './actionPanel.js';
import { render, processResult, buildQuery } from './render.js';

export default {
    name: 'Radar',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80RRWSus9MXm7nBNs5bEpLt6YJhFZgZM4XBwxbNdJ&s',
    key: 'prefix-viz-radar', // unique
    type: 'visualization',
    version: '1.0.0', 

    /**
     * This attribute is an object which allows us to define the default properties of our chart.
     */
    defaultModel: {
         color: ['darkred', 'green', 'yellow', 'orange']
        //color: "red"
    },

    /**
     * This object allows us to configure each of the elements or characteristics that will be part of the actions panel.
     */
    dimensions: [
        { label: 'Category', type: 'category' },
        { label: 'Value', type: 'value', multiple: true },
        { label: 'Series', type: 'series', multiple: true },
    ],

    /**
     * This object allows us to configure each of the items or characteristics that will be part of the actions panel.
     */
    actionPanel,

    /**
     * Thihs hook should contains the Visulization rendering Logic 
     * * If the model has results, draw the visualization, otherwise show an empty state
     * @param {HTMLElement} element 
     * @param {ChartModel} model 
     * @param {Object} __results 
     */
    render,

    /**
     * Through this function we can process or transform the received data and adapt it to the final structure that our graph accepts.
     */
    processResult,

    /**
     * This Hook prepare the Query Body Object 
     * the results is passed to `async getData` Hook
     * @returns QueryBodyObject
     */
    buildQuery,

    // getData

};
