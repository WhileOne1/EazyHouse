import React, { useState, useEffect } from 'react';
import { Query,useQuery, Mutation, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import SwitchComponent from '../../components/switchComponent'
import {socket} from '../../components/header'

 const GET_SWITCHES = gql` {
    switches {
        id
      name
      isOn
      status
      room
    }
    thermometers {
      id
    name
    value
    status
    room
  },

  }` ;
 const POST_SWITCHES = gql`
mutation editSwitch($id: ID!, $name: String!) {
  editSwitch(id: $id,name: $name) {
    id
  }
}
`;  
const Home = () => {
return (
<Query query={GET_SWITCHES} pollInterval={500}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      let input;
      return (
        <div>
            {data.switches.map(device => (
                <div>
                  <p>
                                    <span><b> {device.name+":"} </b></span>
                                </p>
                                <p>
                                {"id: " + device.id + " status: "+  device.status + " isOn: " + device.isOn + " pokój: " + device.room}
                                </p>
				                    <SwitchComponent  isItOn={device.isOn} switchid={device.id}
                            handleToggle={(e) => {e.preventDefault(); 
                            //editSwitch({variables:{  id: device.id, isOn: !device.isOn } })
                            socket.emit('change-switch-value',{id1: device.id,isOn: !device.isOn})
                            }}/>
                            <Mutation mutation={POST_SWITCHES} >
                        {(editSwitch, {data}) => (
                          <div>
                            
                             <form
                              onSubmit={e => {
                                e.preventDefault();
                                editSwitch({ variables: { id: device.id, name: input.value } });
            
                                input.value = "";
                              }}
                            >
                              <input type="text"
                                ref={node => {
                                  input = node;
                                }}
                              />
                              <button type="submit">Zmień nazwę</button>
                            </form> 
                            
                            

                          </div>
                        )}
                      </Mutation>
                </div>
            ))}
            {data.thermometers.map(device => (
              <div>
                 <p>
                                    <span><b> {device.name+":"} </b></span>
                                </p>
                                <p>
                                {"id: " + device.id + " status: "+  device.status + " isOn: " + device.value + " pokój: " + device.room}
                                </p>



             </div>

            ))}              
        </div>
                          
      );
    }}
  </Query>
        

            
    );

    
};



export default Home;
                          {/* <Mutation mutation={POST_SWITCHES} >
                        {(editSwitch, {data}) => (
                          <div>
                            
                             <form
                              onSubmit={e => {
                                e.preventDefault();
                                editSwitch({ variables: { id: device.id, name: input.value } });
            
                                input.value = "";
                              }}
                            >
                              <input type="text"
                                ref={node => {
                                  input = node;
                                }}
                              />
                              <button type="submit">Zmień nazwę</button>
                            </form> 
                            
                            

                          </div>
                        )}
                      </Mutation> */} 