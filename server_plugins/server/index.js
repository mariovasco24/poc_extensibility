const express = require('express');
const cors = require('cors');
const fs = require('fs');

const EXTENSIONS_DIR = '../charts-s3';

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('Holi!'))

app.get('/charts/extensions/all', (req, res) =>{
    fs.readdir(EXTENSIONS_DIR, (err, files) => {
        if(err) return res.send('pailas');

        res.json(files.filter(file => !file.startsWith('.')));
    })
});

app.get('/charts/extensions/:extensionName/:file', (req, res) => {
    const {extensionName, file} = req.params;
    const DIR = EXTENSIONS_DIR + '/' + extensionName + '/' + file;

    fs.readFile(DIR, 'utf-8', (err, file) => {
        if(err) return res.send('pailas');

        res.set('Content-Type', 'application/javascript');
        res.send(file);
    });
    
})


app.get('/charts/extensions/:extensionName', (req, res) => {
    const DIR = EXTENSIONS_DIR + '/' + req.params.extensionName;

    fs.readdir(DIR, (err, files) => {
        if(err) return res.send('pailas');

        res.send(JSON.stringify(files))
    })
})

let number = 0

app.get('/pivot', (req, res) => {
    
    let data='';

    if(number == 0){
        number = 1;
        data = {
            "data": [
                {
                    "Id": 1,
                    "ProductCategoryName": "TV and Video",
                    "ProductSubcategoryName": "Televisions",
                    "ProductName": "Adventure Works 32\" LCD HDTV M130 Black",
                    "UnitPrice": 499.99,
                    "SalesQuantity": 9,
                    "SalesAmount": 4399.912,
                    "DateKey": "2008-04-10T00:00:00",
                    "StoreName": "Contoso Asia Online Store"
                },
                {
                    "Id": 2,
                    "ProductCategoryName": "Audio",
                    "ProductSubcategoryName": "Recording Pen",
                    "ProductName": "WWI 1GBPulse Smart pen E50 Black",
                    "UnitPrice": 149.95,
                    "SalesQuantity": 20,
                    "SalesAmount": 2999,
                    "DateKey": "2009-07-17T00:00:00",
                    "StoreName": "Contoso Moscow  No.1 Store"
                }
            ]
        }
    }else if(number == 1){
        number = 2;
        data = {
            "data": [
                {
                    "key": '',
                    "items": null,
                    "count": 431394,
                    "summary": [
                        1331627851.1445
                    ]
                },
                {
                    "key": 2008,
                    "items": null,
                    "count": 308314,
                    "summary": [
                        1206758126.7615
                    ]
                },
                {
                    "key": 2009,
                    "items": null,
                    "count": 260292,
                    "summary": [
                        1099870096.6043
                    ]
                }
            ],
            "totalCount": 1000000,
            "summary": [
                3638256074.5103
            ]
        }
    }else{
        data = {
            "data": [
                {
                    "key": "Audio",
                    "items": [
                        {
                            "key": '',
                            "items": null,
                            "count": 10270,
                            "summary": [
                                8668454.4331
                            ]
                        },
                        {
                            "key": 2008,
                            "items": null,
                            "count": 11046,
                            "summary": [
                                15481541.7842
                            ]
                        },
                        {
                            "key": 2009,
                            "items": null,
                            "count": 11017,
                            "summary": [
                                20088013.0011
                            ]
                        }
                    ],
                    "summary": [
                        44238009.2184
                    ]
                },
                {
                    "key": "TV and Video",
                    "items": [
                        {
                            "key": '',
                            "items": null,
                            "count": 34997,
                            "summary": [
                                124596885.2716
                            ]
                        },
                        {
                            "key": 2008,
                            "items": null,
                            "count": 27603,
                            "summary": [
                                138675964.7034
                            ]
                        },
                        {
                            "key": 2009,
                            "items": null,
                            "count": 22165,
                            "summary": [
                                135884642.6383
                            ]
                        }
                    ],
                    "summary": [
                        399157492.6133
                    ]
                }
            ],
            "totalCount": 1000000
        }
        number = 0;
    }

    res.send(data);
    
})

app.listen(3000, () => console.log('running in port 3000'));
