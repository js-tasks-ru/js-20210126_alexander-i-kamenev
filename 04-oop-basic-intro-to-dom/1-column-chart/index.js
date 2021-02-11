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

    columnChart.innerHTML = `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.label}
          <a href="${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.value}</div>
          <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>
    `;

    this.element = columnChart.firstElementChild;

    this.update(this.data);
  }

  /**
   *
   * @param {Array} data
   */
  update(data) {
    this.element.classList.remove("column-chart", "column-chart_loading");

    if (!data.length) {
      this.element.classList.add("column-chart_loading");
    } else {
      this.element.classList.add("column-chart");
    }

    const [columnChartContainer] = this.element.getElementsByClassName("column-chart__container");

    const [columnChartContainerChart] = this.element.getElementsByClassName("column-chart__chart");

    columnChartContainerChart.innerHTML = '';

    for (const obj of this.getColumnProps(data)) {
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
  getColumnProps(data) {
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
