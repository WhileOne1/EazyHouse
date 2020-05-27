import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Thermometer from 'react-thermometer-component'
const lightsQuery = gql` {
    thermometers {
      name
      value
    }

  }`

const Home = () => {

    return (

        <Query query={lightsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Laduje dane</div>
                    if (error) return <div>Wystapil blad</div>

                    const thermometers = data.thermometers;
                    
        
  
                    

                    return (
                        <div>
                            <h1>GraphQL response:</h1>
                            <div>
                                <p>
                                    <span><b>Tytul: </b></span>
                                </p>
                                
                                {thermometers.map(device =>
                                
                                    <p >
                                        <span dangerouslySetInnerHTML={{  __html:  'nazwa: ' + device.name + ' ||temperatura: ' + device.value }}></span>
                                    </p>
                                )}
                                
                            </div>
                        </div>
                    )
                }}
            </Query>
            
    );
    
};

export default Home;