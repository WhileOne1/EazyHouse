import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import SwitchComponent from '../../components/switchComponent'
//cimport RoomChoice from '../../components/roomChoice'
import Indicator from '../../components/statusIndicator'
import {socket} from '../../components/header'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import 'status-indicator/styles.css'
import Popup from "reactjs-popup";
const useStyles = makeStyles({
  table: {
    minWidth: '650px',
    maxWidth: '90%',
    margin: 'auto',
    backgroundColor: 'silver',

  },
  cell: {
    border: '1px solid',
    width: '20%',
    textAlign: 'center'

  },
  cellMain: {
    border: '1px solid',
    width: '20%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    backgroundColor: 'gray',
    color: 'white'


  },
  row: {
    maxWidth: '100%'
  },
  button: {
    background: 'lightblue',
    borderRadius: '2px',
    color: 'black',
  }
});
 const GET_SWITCHES = gql` {
  switches{
    isOn
  device {
      name
      status
      room
      deviceid
    }
  }
  thermometers{
    value
  device {
      name
      status
      room
      deviceid
    }
  }
  fridges{
    value
  device {
      name
      status
      room
      deviceid
    }
  }
  


  }` ;
 const POST_DEVICE = gql`
mutation editDevice($deviceid: Int!, $name: String!) {
  editDevice(deviceid: $deviceid,name: $name) {
    deviceid
  }
}
`; 
const POST_DEVICE_ROOM = gql`
mutation editDeviceRoom($deviceid: Int!, $room: String!) {
    editDeviceRoom(deviceid: $deviceid,room: $room) {
    deviceid
  }
}
`; 
const Home = () => {
  const classes = useStyles();
return (
<Query query={GET_SWITCHES} pollInterval={500}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      let input;

      return (
        <div>
           <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellMain}> Nazwa</TableCell>
              <TableCell className={classes.cellMain} align="right"> Pokój</TableCell>
              <TableCell className={classes.cellMain} align="right"> status</TableCell>
              <TableCell className={classes.cellMain} align="right"> stan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data.switches).map(data => (
                

              <TableRow className={classes.row} key={data.deviceid}>
                <TableCell className={classes.cell} align="right"><Popup trigger={<button className={classes.button}> {data.device.name}</button>} position="right center">
            <div> <Mutation mutation={POST_DEVICE} >
                                        {(editSwitch, {data}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editSwitch({ variables: { deviceid: data.deviceid, name: input.value } });
                            
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
  </Popup> </TableCell>
                 <TableCell className={classes.cell} align="right"><Popup trigger={<button className={classes.button}> {data.device.room}</button>} position="right center">
            <div> <Mutation mutation={POST_DEVICE_ROOM} >
                                        {(editSwitch, {data2}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editSwitch({ variables: { deviceid: data.device.deviceid, room: input.value } });
                            
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
  </Popup></TableCell>
                <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
                <TableCell className={classes.cell} align="right"> <SwitchComponent  isItOn={data.isOn} switchid={data.device.deviceid}
                            handleToggle={(e) => {e.preventDefault(); 
                            socket.emit('change-switch-value',{id1: data.device.deviceid,isOn: !data.isOn})
                            }}/></TableCell> 
              </TableRow>
            
          
				                    
                            
                
            ))}
           <TableRow>
              <TableCell className={classes.cellMain}> Nazwa</TableCell>
              <TableCell className={classes.cellMain} align="right"> Pokój</TableCell>
              <TableCell className={classes.cellMain} align="right"> status</TableCell>
              <TableCell className={classes.cellMain} align="right"> temperatura</TableCell>
            </TableRow>
            {data.thermometers.map(data => (
              <TableRow className={classes.row} key={data.device.deviceid}>
              <TableCell className={classes.cell} align="right"> 
              <Popup trigger={<button className={classes.button}> {data.device.name}</button>} position="right center">
            <div> <Mutation mutation={POST_DEVICE} >
                                        {(editThermometer, {data}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editThermometer({ variables: { deviceid: data.device.deviceid, name: input.value } });
                            
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
              </TableCell>
              <TableCell className={classes.cell} align="right">{data.device.room}</TableCell>
              <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
              <TableCell className={classes.cell} align="right"> {data.value}</TableCell>
            </TableRow>


            ))}
            <TableRow>
              <TableCell className={classes.cellMain}> Nazwa</TableCell>
              <TableCell className={classes.cellMain} align="right"> Pokój</TableCell>
              <TableCell className={classes.cellMain} align="right"> status</TableCell>
              <TableCell className={classes.cellMain} align="right"> temperatura</TableCell>
            </TableRow> 
             {data.fridges.map(data => (
              <TableRow className={classes.row} key={data.device.deviceid}>
              <TableCell className={classes.cell} align="right">
              <Popup trigger={<button className={classes.button}> {data.device.name}</button>} position="right center">
            <div> <Mutation mutation={POST_DEVICE} >
                                        {(editFridge, {data}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editFridge({ variables: { deviceid: data.device.deviceid, name: input.value } });
                            
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
              </TableCell>
              <TableCell className={classes.cell} align="right">{data.device.room}</TableCell>
              <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
              <TableCell className={classes.cell} align="right">
                <button onClick={() => {
                socket.emit('change-fridge-value',{id1: data.device.deviceid,value: data.value + 1})
               }}>
                +
                  </button>

                     <h2>{data.value}*C</h2> 

                <button onClick={() =>{
                     socket.emit('change-fridge-value',{id1: data.device.deviceid,value: data.value -1})
                    }}>
                  -
            </button> 
            </TableCell>
            </TableRow>


            ))}

            </TableBody>
        </Table>
      </TableContainer>              
        </div>
                          
      );
    }}
  </Query>
        

            
    );

    
};



export default Home;
                                {/* <Mutation mutation={POST_THERMOMETERS} >
                                {(editThermometer, {data}) => (
                                  <div>
                                    
                                    <form
                                      onSubmit={e => {
                                        e.preventDefault();
                                        editThermometer({ variables: { id: device.id, name: input.value } });
                    
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