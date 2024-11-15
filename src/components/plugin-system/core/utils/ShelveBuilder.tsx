import { h } from "@stencil/core";

export function ShelveBuilder(chart: any = {}, columns = []) {
    const { model} = chart;
    const chartDimensions = chart.dimensions || [];


    // aqui logica para preservar columnas en los shelves 
    if(!model.dimensions) {
        model.dimensions = [];
    }
    model.dimensions.length = chartDimensions.length;




    const onSelectChange = ({target}, dimensionIndex) => {
        const values = Array.from(target.selectedOptions).map(option => option['data-value']);
        debugger
        model.dimensions[dimensionIndex] = values;
        chart.paint(true);
    }

    return chartDimensions.map((dimension, index) => {
        return <div>
            <label>{dimension.label} </label>
            <select multiple={dimension.multiple} onChange={e => onSelectChange(e, index)}>
                <option>select a Column</option>
                {columns.map(col => {
                    return <option data-value={col}>{col.text}</option>
                })}
            </select>
        </div>
    });
}