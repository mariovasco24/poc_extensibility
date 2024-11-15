import * as echarts from './jquery-3.5.1.min.js';
import * as devE from './dx.all.js';
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

/**
 * This hook is intended to transforn de results into a especific visualization data structure
 * @param {Object} results 
 * @returns 
 */

export function processResult(results = []) {
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

export function getDX(host, style, height, callback) {
  let iframe = host.querySelector('iframe');
  
  // TODO: use Dependencies.Const.ts for DX css injection
  const html = `
  <link href="https://cdn3.devexpress.com/jslib/22.2.3/css/dx.light.css" rel="stylesheet" type="text/css" />
  <link href="https://d34fmtisi2qqyu.cloudfront.net/cdn/qui-libs/devexpress/17.2.3/dx.softblue.css" rel="stylesheet" type="text/css" />
  <link href="https://d34fmtisi2qqyu.cloudfront.net/cdn/widgets-assets/qrvey-icons/style.css" rel="stylesheet" type="text/css" />

  <style>body{margin: 0; padding: 0;}
    .dx-scrollable-scroll-content {
      background-color: rgba(139, 139, 139, 0.9) !important;
    }
  </style>
  <style>${style}</style>

  <script src="https://cdn3.devexpress.com/jslib/22.2.3/js/dx.all.js"></script>

  <body><div id="table-container"></div></body>
  `;

  if (!iframe) iframe = document.createElement('iframe');

  iframe.style.width = '100%';
  iframe.style.height = height + '%';
  iframe.srcdoc = html;
  //iframe.src = URL.createObjectURL(new Blob([html], { type: 'text/html' }));


  host.appendChild(iframe);

  iframe.onload = () => {
      window['iframeDevExpress'] = iframe.contentWindow['DevExpress'];
      const e = {
          el: iframe.contentDocument.body.querySelector('#table-container'),
          dx: iframe.contentWindow['DevExpress']
      };

      iframe.onmouseout = () => e.dx.events.trigger(e.el, 'mouseup'); // fix AN-11736

      callback(e);
  };
}


function emptyState(el) {
    el.innerHTML = '<div style="text-align:center"><h3>Empty State</h3><strong>Radar Chart</strong> <br/>To start add a Category and a Value</div>';
}

function drawViz(el, model, results) {
    const el2 = document.createElement('div');
    el2.style.height = '100%'
    el.innerHTML = '';
    el.append(el2);
   

    
      debugger
      let e=echarts;
     
      getDX(el2, null, 100, ({ el: tableContainer, dx }) => {
        myChart = new dx.ui.dxDataGrid(tableContainer, getTableConfig());
  
            
      
      });

      

   // myChart.setOption(option);
}

function getTableConfig() {
  const customers = [{
    ID: 1,
    CompanyName: 'Super Mart of the West',
    Address: '702 SW 8th Street',
    City: 'Bentonville',
    State: 'Arkansas',
    Zipcode: 72716,
    Phone: '(800) 555-2797',
    Fax: '(800) 555-2171',
    Website: 'http://www.nowebsitesupermart.com',
  }, {
    ID: 2,
    CompanyName: 'Electronics Depot',
    Address: '2455 Paces Ferry Road NW',
    City: 'Atlanta',
    State: 'Georgia',
    Zipcode: 30339,
    Phone: '(800) 595-3232',
    Fax: '(800) 595-3231',
    Website: 'http://www.nowebsitedepot.com',
  }, {
    ID: 3,
    CompanyName: 'K&S Music',
    Address: '1000 Nicllet Mall',
    City: 'Minneapolis',
    State: 'Minnesota',
    Zipcode: 55403,
    Phone: '(612) 304-6073',
    Fax: '(612) 304-6074',
    Website: 'http://www.nowebsitemusic.com',
  }, {
    ID: 4,
    CompanyName: "Tom's Club",
    Address: '999 Lake Drive',
    City: 'Issaquah',
    State: 'Washington',
    Zipcode: 98027,
    Phone: '(800) 955-2292',
    Fax: '(800) 955-2293',
    Website: 'http://www.nowebsitetomsclub.com',
  }, {
    ID: 5,
    CompanyName: 'E-Mart',
    Address: '3333 Beverly Rd',
    City: 'Hoffman Estates',
    State: 'Illinois',
    Zipcode: 60179,
    Phone: '(847) 286-2500',
    Fax: '(847) 286-2501',
    Website: 'http://www.nowebsiteemart.com',
  }, {
    ID: 6,
    CompanyName: 'Walters',
    Address: '200 Wilmot Rd',
    City: 'Deerfield',
    State: 'Illinois',
    Zipcode: 60015,
    Phone: '(847) 940-2500',
    Fax: '(847) 940-2501',
    Website: 'http://www.nowebsitewalters.com',
  }, {
    ID: 7,
    CompanyName: 'StereoShack',
    Address: '400 Commerce S',
    City: 'Fort Worth',
    State: 'Texas',
    Zipcode: 76102,
    Phone: '(817) 820-0741',
    Fax: '(817) 820-0742',
    Website: 'http://www.nowebsiteshack.com',
  }, {
    ID: 8,
    CompanyName: 'Circuit Town',
    Address: '2200 Kensington Court',
    City: 'Oak Brook',
    State: 'Illinois',
    Zipcode: 60523,
    Phone: '(800) 955-2929',
    Fax: '(800) 955-9392',
    Website: 'http://www.nowebsitecircuittown.com',
  }, {
    ID: 9,
    CompanyName: 'Premier Buy',
    Address: '7601 Penn Avenue South',
    City: 'Richfield',
    State: 'Minnesota',
    Zipcode: 55423,
    Phone: '(612) 291-1000',
    Fax: '(612) 291-2001',
    Website: 'http://www.nowebsitepremierbuy.com',
  }, {
    ID: 10,
    CompanyName: 'ElectrixMax',
    Address: '263 Shuman Blvd',
    City: 'Naperville',
    State: 'Illinois',
    Zipcode: 60563,
    Phone: '(630) 438-7800',
    Fax: '(630) 438-7801',
    Website: 'http://www.nowebsiteelectrixmax.com',
  }, {
    ID: 11,
    CompanyName: 'Video Emporium',
    Address: '1201 Elm Street',
    City: 'Dallas',
    State: 'Texas',
    Zipcode: 75270,
    Phone: '(214) 854-3000',
    Fax: '(214) 854-3001',
    Website: 'http://www.nowebsitevideoemporium.com',
  }, {
    ID: 12,
    CompanyName: 'Screen Shop',
    Address: '1000 Lowes Blvd',
    City: 'Mooresville',
    State: 'North Carolina',
    Zipcode: 28117,
    Phone: '(800) 445-6937',
    Fax: '(800) 445-6938',
    Website: 'http://www.nowebsitescreenshop.com',
  }];
  return {
    dataSource: customers,
    keyExpr: 'ID',
    columns: ['CompanyName', 'City', 'State', 'Phone', 'Fax'],
    showBorders: true,
  }
}