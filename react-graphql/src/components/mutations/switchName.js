import React from "react";
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Popup from "reactjs-popup";

const SwitchName = ({input,device}) => (
    <Popup trigger={<button className={classes.button}> {device.name}</button>} position="right center">
            <div> <Mutation mutation={POST_SWITCHES} >
                                        {(editSwitch, {data}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editSwitch({ variables: { deviceid: device.deviceid, name: input.value } });
                            
                                                input.value = "";
                                              }}
                                            >
                                              <input type="text" minlength="3"
                                                ref={node => {
                                                  input = node;
                                                }}
                                              />
                                              <button type="submit">Zmień nazwę</button>
                                            </form> 
                                          </div>
                                        )}
                                      </Mutation> </div>
  </Popup> 
  );
  export default SwitchName;