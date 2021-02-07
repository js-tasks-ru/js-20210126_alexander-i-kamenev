/** class representing Chart*/
export default class ColumnChart {
  chartHeight = 50;
  /**
   * constructor
   * @param p
   */
  constructor({data = [], label = '', link = '', value = ''} = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;

    this.render();
  }

  render() {
    const columnChart = document.createElement('div');

    columnChart.innerHTML = `<div class="column-chart" style="--chart-height: 50"></div>`;

    const columnChartTitle = document.createElement('div');
    columnChartTitle.innerHTML = `
    <div class="column-chart__title">
      ${this.label}
      <a href="${this.link}" class="column-chart__link">View all</a>
    </div>
    `;
    columnChart.firstElementChild.append(columnChartTitle.firstElementChild);

    const columnChartContainer = document.createElement('div');
    columnChartContainer.innerHTML = `
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${this.value}</div>
    </div>
    `;
    const columnChartContainerChart = document.createElement('div');
    columnChartContainerChart.setAttribute("data-element", "body");
    columnChartContainerChart.setAttribute("class", "column-chart__chart");
    columnChartContainer.firstElementChild.append(columnChartContainerChart);
    columnChart.firstElementChild.append(columnChartContainer.firstElementChild);

    this.element = columnChart.firstElementChild;

    this.update(this.data);
  }

  /**
   *
   * @param {Array} data
   */
  update(data) {
    this.element.setAttribute("class", "column-chart");

    if (!data.length) {
      this.element.setAttribute("class", "column-chart_loading");
    }

    const columnChartContainer = this.element
      .getElementsByClassName("column-chart__container")[0];

    const columnChartContainerChart = this.element
      .getElementsByClassName("column-chart__chart")[0];

    columnChartContainerChart.innerHTML = '';

    for (const obj of this._getColumnProps(data)) {
      let div = document.createElement('div');
      div.setAttribute("style", `--value: ${obj['value']}`);
      div.setAttribute("data-tooltip", `${obj['percent']}`);
      columnChartContainerChart.append(div);
    }
    columnChartContainer.firstElementChild.append(columnChartContainerChart);
  }

  /**
   *
   * @param {Array} data
   * @returns {Array}
   * @private
   */
  _getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  destroy() {
    this.element.remove();
  }

  remove() {
    this.element.remove();
  }

}
