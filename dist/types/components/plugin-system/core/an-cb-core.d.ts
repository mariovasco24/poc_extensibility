import { ComponentInterface } from '../../../stencil-public-runtime';
export declare class AnCbCore implements ComponentInterface {
  charts: any[];
  chartList: string[];
  vizElement: HTMLElement;
  chartModel: any;
  shelves: any;
  columns: any[];
  configSection: any;
  ready: boolean;
  componentWillLoad(): void;
  proccessCharts(): void;
  onChartSelected(chart: any): void;
  render(): any;
}
