const api = {
    devices:[
        {
            id: 1,
            name:'thermo',
            room: 'kuchnia',

        },
        {
            id: 4,
            name: 'switch',		
            room: 'kuchnia',

        },
        {
            id: 8,
            name: 'rgb',
            room: 'kuchnia',

        },
    ],
    light: [
        {	
            id: 20,	
            name: 'światło 1',	
            isActive: false	,
            isOn: true,
        },
        
    ],
    thermometer: [
        {	
            id: 1,
            name: 'thermo',		
            room: 'kuchnia'	,
            status: false,
            value: 22, 	
        },
        
    ],
    switch: [
        {
            id: 4,
            name: 'switch',		
            room: 'kuchnia'	,
            status: false,
            isOn: false, 	 
        }
    ],
    rgb: [
        {
            id: 8,
            name: 'rgb',
            room: 'kuchnia',
            status: false,
            isOn: false,
            color: 'Red',
        }
    ],
    fridge: [


    ]
}

module.exports = api;