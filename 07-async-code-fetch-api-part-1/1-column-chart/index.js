export default class ColumnChart {
  subElements = {};
  chartHeight = 50;

  constructor({
    link = '',
    label = '',
    url = '',
    range: {
      from = new Date(),
      to = new Date(),
    } = {}

  } = {}) {

    this.label = label;
    this.link = link;
    this.url = url;

    this.render();
    this.update(from, to);
  }

  getColumnBody(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data
      .map(item => {
        const percent = (item / maxValue * 100).toFixed(0);

        return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
           <div data-element="header" class="column-chart__header"></div>
          <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>
    `;
  }


  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  async update(from, to) {
    let url = new URL(this.url, 'https://course-js.javascript.ru');
    url.searchParams.set('from', from.toISOString());
    url.searchParams.set('to', to.toISOString());
    let response = await fetch(url);
    let data = await response.json();
    if (!data) {
      this.element.classList.add('column-chart_loading');
    } else {
      this.element.classList.remove('column-chart_loading');
    }
    this.subElements.body.innerHTML = this.getColumnBody(Object.values(data));
    this.subElements.header.innerHTML = Object.values(data).length;
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}
