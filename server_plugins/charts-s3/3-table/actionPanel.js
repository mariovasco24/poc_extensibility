export default {
    sections: [
        {
            title: 'Radar Options',
            options: [
                {
                    label: 'Radar Shape ',
                    type: 'List', // type to render the proper UI control
                    ref: 'shape', // ref is the name/path inside de chart model
                    reloadData: true,
                    list: [
                        {label: 'Default', value: undefined},
                        {label: 'Circle', value: 'circle'},
                    ],
                    onSelect(evt) {
                        //onSelect is optional, just in case a custom action in needed
                        //this is triggered after onChange
                        console.log('RadarShape::List::onSelect', this, evt)
                    }
                },
                {
                    label: 'Color Theme ',
                    type: 'List', // type to render the proper UI control
                    ref: 'color',
                    list: [
                        {label: 'Default', value: undefined},
                        {label: 'System', value: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C']},
                        {label: 'Orange', value: ['darkorange', 'coral', 'orange']},
                    ]
                }
            ]
        },

        {
            title: 'Lorem ipsum',
            options: [
                {componet: 'Tooltip'}, // "componet" intended for reuse Qrvey componets like tooltip section 
                {
                    label: 'Custom Action',
                    type: 'List', // type to render the proper UI control
                    list: [
                        {label: 'First Action Item', value: 'blue'},
                        {label: 'Another Action Item', value: 'red'},
                    ]
                }
            ]
        }
    ]
}