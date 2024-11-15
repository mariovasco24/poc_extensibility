import { Component, Host, h, ComponentInterface, State } from '@stencil/core';
import { extendChartDefinition } from './utils/ChartDefinition';
import { importPlugins } from './utils/ChartPluginService';
import { ConfigBuilder } from './utils/ConfigBuilder';
import { getColumns } from './utils/QrveyApi';
import { ShelveBuilder } from './utils/ShelveBuilder';


@Component({
  tag: 'an-cb-core',
  styleUrl: 'an-cb-core.css',
  shadow: true,
})
export class AnCbCore implements ComponentInterface {
  charts = [];
  chartList = ['loading ...'];
  vizElement: HTMLElement;
  chartModel;
  shelves;
  columns = [];

  @State() configSection;
  @State() ready = false;


  componentWillLoad(): void {
    Promise.all([
      importPlugins().then((modules) => {
        this.charts = modules;
        this.proccessCharts();
      })
      ,
      getColumns().then(columns => { debugger; return this.columns = columns[0].options})
    ])
      .then(() => {
        this.onChartSelected(this.charts[0]);
        this.ready = false;
      });

  }

  proccessCharts() {
    this.chartList = this.charts.map((chart) => {
      return <div class="chart-icon" onClick={_ => this.onChartSelected(chart)} >
        <img src={chart.icon}  />
        <span>{chart.name}</span>
      </div>;
    })
  }

  onChartSelected(chart) {
    if (!chart) return;

    if(!this.chartModel) {
      this.chartModel = {...chart.defaultModel} || {};
    }
    const copyChart = extendChartDefinition(chart, this.chartModel, this.vizElement);
    

    this.configSection = ConfigBuilder(copyChart);
    this.shelves = ShelveBuilder(copyChart, this.columns);

    debugger
    copyChart.paint();
  }


  render() {
    return (
      <Host>
        <header class="header" />

        <aside class="left" >
          {this.shelves}
        </aside>

        <section class="canvas">
          <div class="viz" ref={el => this.vizElement = el} />
        </section>

        <aside class="rigth">

          <div class="charts">
            <strong>Charts</strong>
            <div class="chart-list">{this.chartList}</div>
          </div>

          <div class="actionPanel">{this.configSection}</div>

        </aside>

        <footer class="footer" />
      </Host>
    );
  }

}
