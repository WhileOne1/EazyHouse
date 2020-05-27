const api = {
    device: [
        {	
            id: 1,	
            name: 'urządzenie nr 1',	
            isActive: false	
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
            type: 'thermometer',
            room: 'kuchnia'	,
            status: false,
            value: 22, 	
        },
        
    ]
}

module.exports = api;