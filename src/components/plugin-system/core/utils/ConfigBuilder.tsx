import { h } from "@stencil/core";


export function ConfigBuilder(chart) {
    const actionPanel = chart.actionPanel || {};

    return actionPanel?.sections.map(section => {
        return <Accordion name={section.title}>
            {OptionsBuilder(section.options, chart)}
        </Accordion>
    });
}


function OptionsBuilder(options = [], ctx) {
    return options.map(option => {
        if (option.componet) {
            return <div class="setting-item">
                {componentList[option.componet]?.(option, ctx)}
            </div>
        }

        return <div class="setting-item">
            <label>{option.label}</label>
            {componentList[option.type]?.(option, ctx)}
        </div>
    })
}

// FUCNTINAL COMPONENTS
function Accordion(props, children) {
    return <details class="accordion">
        <summary class="accordion-title">{props.name}</summary>
        <div class="accordion-detail">{children}</div>
    </details>

}



// FUNCTION => RETURN TSX
function Tooltip() {
    return <label>
        <input type="checkbox" /> Tooltip
    </label>

}

function List({ list = [], onSelect, ref, reloadData = false }, ctx) {
    const onChange = ({ target }) => {
        const item = list[target.value].value;

        ctx.model[ref] = item;
        ctx.paint(reloadData);

        onSelect && onSelect({
            value: item,
            list,
            context: ctx
        });
    };

    return <select onChange={onChange}>
        {list.map((l, i) => <option value={i} >{l.label}</option>)}
    </select>
}


const componentList = {
    Tooltip,
    List
}