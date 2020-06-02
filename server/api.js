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
    fridge: [


    ]
}

module.exports = api;