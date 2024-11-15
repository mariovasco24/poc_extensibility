
export default {
    name: 'Hello!',
    icon: 'https://www.shareicon.net/data/128x128/2015/09/28/647573_chart_512x512.png',
    type: 'visualization',
    key: 'test-hello-world',
    version: '0.0.0',
    actionPanel: {
        sections: [
            {
                // use: 'general',
                title: 'General',
                options: [
                    { componet: 'Tooltip' }, // "componet" intended for reuse Qrvey componets like tooltip section 
                    {
                        label: 'Custom Action',
                        type: 'List', // type to render the proper UI control
                        ref: 'test', //required - name of the model property
                        list: [
                            { label: 'First Action Item', value: 'blue' },
                            { label: 'Another Action Item', value: 'red' },
                        ],
                        onSelect(evt) {
                            // this event is optional
                            console.log(evt)
                            // my logic here
                           
                        }
                    }
                ]
            }

        ]
    },
    render() {
        this.element.innerHTML = 'Hello World!!'
    }
}