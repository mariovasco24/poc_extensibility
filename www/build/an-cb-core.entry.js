import { h, r as registerInstance, e as Host } from './index-8b36f64b.js';

// const TOKEN = 'eyJraWQiOiJxMXRhYWNtTTI3YVFDZ3QwUWktRlZjaTZ0VExLT2lTTXBSdl9ScDdxOE84IiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImFsZyI6IlBCRVMyLUhTMjU2K0ExMjhLVyIsInAyYyI6MzIzMCwicDJzIjoiaWpPTzVUX3A4VjBjdDJMeGNwc2FhQSJ9.rKVveNXqXw2jR65iZChIz0dmlu2XNt2WfGifaTELJFtSXj7mKL3UPg.vuAQ1vBJQYoryqU_1RDDTQ.jjndms6wvkPHXt3js7M6-fPdYF_feN3DKHTofWnruVwQeX8wqIJ9OXl7OaNhdPVQOMDhdT7sSF517rzGj3I24McfJ1BCWtJiGk1aAJkcwXmw75Hg30HkEITHR3lMbsVCM3bm8qWEDRTm3rGKZd-CUnlPPpEkrBrwYcDXkGdKYB5skvVhsQQx_qiSYVrJzx5Esbn1-BMB_hfeLGDIkYIyTOgMgyAC_2fti2itCSI-f61psevvoiwZ7FJ-PusqI57nIa8Z6pMWkbLwS6cf0KkwAdxhvdlIWPkK7YyPkf7Zqf9qEWU8ZuLsU_cxCi1NQ9sYtlQ7iXM2Uyi17YMo2woTSiipU1TkFEyvIqq7BbOqkX9CY85xwmFwr-N2jZTkQrkD.fHFli-bWOYEap7XJ4tAr3w';
// const QRVEY_URL = 'https://demo.qrvey.com/devapi/v4/user/b2rParx/app/yQlOt3ATZ/qrvey/dQyE9YrDc';
const APIKEY = 'd41d8cd98f00b204e9800998ecf8427e';
const QRVEY_URL = 'https://demo.qrvey.com/devapi/v4/user/51WL5D2/app/_17KyxmyS/qrvey/klo2eAl4Ty';
function getColumns() {
  return fetch(QRVEY_URL + "/analytiq/chart/question/list", {
    "headers": {
      "content-type": "application/json",
      "x-api-key": APIKEY
    },
    "body": "{\"optionsAttributes\":[\"id\",\"text\",\"type\",\"property\",\"linked\",\"linkid\",\"qrveyid\",\"bucketId\",\"formulaId\",\"formulaType\",\"geogroup\",\"geoGroups\",\"imageUploadOption\",\"format\",\"outputFormat\"],\"splitQuestions\":false}",
    "method": "POST",
  })
    .then(res => res.json());
}
function getResults(body) {
  return fetch(QRVEY_URL + "/analytiq/uchart/results", {
    "headers": {
      "content-type": "application/json",
      // "authorization": "Bearer " + TOKEN
      "x-api-key": APIKEY
    },
    "body": JSON.stringify(body),
    "method": "POST"
  }).then(res => res.json());
}

const fn = (a) => a;
const ChartDefinitionBase = {
  __results: undefined,
  buildQuery: fn,
  processResult: fn,
  async getData(query) {
    return getResults(query);
  },
  async paint(realoadData = false) {
    debugger;
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
    this.render();
  }
};
function extendChartDefinition(chartDefinition = {}, model, element) {
  debugger;
  return Object.setPrototypeOf(Object.assign({}, chartDefinition), Object.assign(Object.assign({}, ChartDefinitionBase), { model,
    element, mario: "Test" }));
}

const PLUGIN_DOMAIN = 'http://localhost:3000';
const PLUGIN_PATH = '/charts/extensions';
const PLUGIN_URL = PLUGIN_DOMAIN + PLUGIN_PATH;
/**
 * (MOCK) Get all the registered plugins in the system
 * @returns Promise<String[]>
 */
function getAllPlugins() {
  return fetch(PLUGIN_URL + '/all')
    .then(response => response.json());
}
function importPlugins() {
  const entryPoint = 'widget.js';
  return getAllPlugins().then((plugins = []) => {
    return Promise
      .all(plugins.map(plugin => import(`${PLUGIN_URL}/${plugin}/${entryPoint}`)))
      .then(modules => modules.map(module => module.default));
  });
}

function ConfigBuilder(chart) {
  const actionPanel = chart.actionPanel || {};
  return actionPanel === null || actionPanel === void 0 ? void 0 : actionPanel.sections.map(section => {
    return h(Accordion, { name: section.title }, OptionsBuilder(section.options, chart));
  });
}
function OptionsBuilder(options = [], ctx) {
  return options.map(option => {
    var _a, _b;
    if (option.componet) {
      return h("div", { class: "setting-item" }, (_a = componentList[option.componet]) === null || _a === void 0 ? void 0 : _a.call(componentList, option, ctx));
    }
    return h("div", { class: "setting-item" },
      h("label", null, option.label), (_b = componentList[option.type]) === null || _b === void 0 ? void 0 :
      _b.call(componentList, option, ctx));
  });
}
// FUCNTINAL COMPONENTS
function Accordion(props, children) {
  return h("details", { class: "accordion" },
    h("summary", { class: "accordion-title" }, props.name),
    h("div", { class: "accordion-detail" }, children));
}
// FUNCTION => RETURN TSX
function Tooltip() {
  return h("label", null,
    h("input", { type: "checkbox" }),
    " Tooltip");
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
  return h("select", { onChange: onChange }, list.map((l, i) => h("option", { value: i }, l.label)));
}
const componentList = {
  Tooltip,
  List
};

function ShelveBuilder(chart = {}, columns = []) {
  const { model } = chart;
  const chartDimensions = chart.dimensions || [];
  // aqui logica para preservar columnas en los shelves 
  if (!model.dimensions) {
    model.dimensions = [];
  }
  model.dimensions.length = chartDimensions.length;
  const onSelectChange = ({ target }, dimensionIndex) => {
    const values = Array.from(target.selectedOptions).map(option => option['data-value']);
    debugger;
    model.dimensions[dimensionIndex] = values;
    chart.paint(true);
  };
  return chartDimensions.map((dimension, index) => {
    return h("div", null,
      h("label", null,
        dimension.label,
        " "),
      h("select", { multiple: dimension.multiple, onChange: e => onSelectChange(e, index) },
        h("option", null, "select a Column"),
        columns.map(col => {
          return h("option", { "data-value": col }, col.text);
        })));
  });
}

const anCbCoreCss = ":host{border:1px solid red;min-height:500px;display:grid;grid-template-columns:200px 1fr 250px;grid-template-rows:50px 1fr 50px;grid-column-gap:0px;grid-row-gap:0px}:host>*{padding:5px;border:1px dotted blueviolet}.header{grid-area:1 / 1 / 2 / 4}.left{grid-area:2 / 1 / 4 / 2}.canvas{grid-area:2 / 2 / 3 / 3}.rigth{grid-area:2 / 3 / 4 / 4;display:flex;flex-direction:column}.footer{grid-area:3 / 2 / 4 / 3}.rigth .charts{min-height:150px;border:1px dotted brown}.rigth .actionPanel{height:100%;border:1px dotted brown}.canvas .viz{height:100%;border:1px dotted brown}.chart-list{display:grid;grid-template-columns:repeat(3, 1fr);gap:5px;padding:5px}.chart-icon{border:1px solid lightgray;display:inline-flex;flex-direction:column;align-items:center;padding:5px 2px;cursor:pointer}.chart-icon:hover{background-color:rgb(237, 237, 237)}.chart-icon img{width:30px;height:30px}.accordion{border:1px solid lightgray;margin-bottom:1px}.accordion-title{background-color:lightgray;padding:5px}.accordion-detail{padding:5px}.setting-item{padding:5px;border-bottom:1px solid lightgray}.accordion-detail .setting-item:last-child{border-bottom:none}";

let AnCbCore = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.charts = [];
    this.chartList = ['loading ...'];
    this.columns = [];
    this.ready = false;
  }
  componentWillLoad() {
    Promise.all([
      importPlugins().then((modules) => {
        this.charts = modules;
        this.proccessCharts();
      }),
      getColumns().then(columns => { debugger; return this.columns = columns[0].options; })
    ])
      .then(() => {
      this.onChartSelected(this.charts[0]);
      this.ready = false;
    });
  }
  proccessCharts() {
    this.chartList = this.charts.map((chart) => {
      return h("div", { class: "chart-icon", onClick: _ => this.onChartSelected(chart) }, h("img", { src: chart.icon }), h("span", null, chart.name));
    });
  }
  onChartSelected(chart) {
    if (!chart)
      return;
    if (!this.chartModel) {
      this.chartModel = Object.assign({}, chart.defaultModel) || {};
    }
    const copyChart = extendChartDefinition(chart, this.chartModel, this.vizElement);
    this.configSection = ConfigBuilder(copyChart);
    this.shelves = ShelveBuilder(copyChart, this.columns);
    debugger;
    copyChart.paint();
  }
  render() {
    return (h(Host, null, h("header", { class: "header" }), h("aside", { class: "left" }, this.shelves), h("section", { class: "canvas" }, h("div", { class: "viz", ref: el => this.vizElement = el })), h("aside", { class: "rigth" }, h("div", { class: "charts" }, h("strong", null, "Charts"), h("div", { class: "chart-list" }, this.chartList)), h("div", { class: "actionPanel" }, this.configSection)), h("footer", { class: "footer" })));
  }
};
AnCbCore.style = anCbCoreCss;

export { AnCbCore as an_cb_core };
