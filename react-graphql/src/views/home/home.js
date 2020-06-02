import React, { useState, useEffect } from 'react';
import { Query,useQuery, Mutation, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import SwitchComponent from '../../components/switchComponent'
import Indicator from '../../components/statusIndicator'
import {socket} from '../../components/header'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles,makeStyles } from '@material-ui/core/styles';
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
  fridges {
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
const POST_THERMOMETERS = gql`
mutation editThermometer($id: ID!, $name: String!) {
  editThermometer(id: $id,name: $name) {
    id
  }
}
`; 
const POST_FRIDGES = gql`
mutation editFridge($id: ID!, $name: String!) {
  editFridge(id: $id,name: $name) {
    id
  }
}
`; 
const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(false);
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
              <TableCell className={classes.cellMain}> id</TableCell>
              <TableCell className={classes.cellMain} align="right"> Nazwa</TableCell>
              <TableCell className={classes.cellMain} align="right"> status</TableCell>
              <TableCell className={classes.cellMain} align="right"> stan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data.thermometers && data.switches).map(device => (
                

              <TableRow className={classes.row} key={device.id}>
                <TableCell className={classes.cell} align="right">{device.id}</TableCell>
                <TableCell className={classes.cell} align="right"><Popup trigger={<button className={classes.button}> {device.name}</button>} position="right center">
            <div> <Mutation mutation={POST_SWITCHES} >
                                        {(editThermometer, {data}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editThermometer({ variables: { id: device.id, name: input.value } });
                            
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
                <TableCell className={classes.cell} align="right"> <Indicator istrue={device.status}/></TableCell>
                <TableCell className={classes.cell} align="right"> <SwitchComponent  isItOn={device.isOn} switchid={device.id}
                            handleToggle={(e) => {e.preventDefault(); 
                            socket.emit('change-switch-value',{id1: device.id,isOn: !device.isOn})
                            }}/></TableCell>
              </TableRow>
            
          
				                    
                            
                
            ))}
            <TableRow>
              <TableCell className={classes.cellMain}> id</TableCell>
              <TableCell className={classes.cellMain} align="right"> name</TableCell>
              <TableCell className={classes.cellMain} align="right"> status</TableCell>
              <TableCell className={classes.cellMain} align="right"> temeratura</TableCell>
            </TableRow>
            {data.thermometers.map(device => (
              <TableRow className={classes.row} key={device.id}>
              <TableCell className={classes.cell} align="right">{device.id}</TableCell>
              <TableCell className={classes.cell} align="right"> 
              <Popup trigger={<button className={classes.button}> {device.name}</button>} position="right center">
            <div> <Mutation mutation={POST_THERMOMETERS} >
                                        {(editThermometer, {data}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editThermometer({ variables: { id: device.id, name: input.value } });
                            
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
              <TableCell className={classes.cell} align="right"> <Indicator istrue={device.status}/></TableCell>
              <TableCell className={classes.cell} align="right"> {device.value}</TableCell>
            </TableRow>


            ))}
            <TableRow>
              <TableCell className={classes.cellMain}> id</TableCell>
              <TableCell className={classes.cellMain} align="right"> Nazwa</TableCell>
              <TableCell className={classes.cellMain} align="right"> status</TableCell>
              <TableCell className={classes.cellMain} align="right"> temperatura</TableCell>
            </TableRow>
            {data.fridges.map(device => (
              <TableRow className={classes.row} key={device.id}>
              <TableCell className={classes.cell} align="right">{device.id}</TableCell>
              <TableCell className={classes.cell} align="right">
              <Popup trigger={<button className={classes.button}> {device.name}</button>} position="right center">
            <div> <Mutation mutation={POST_FRIDGES} >
                                        {(editFridge, {data}) => (
                                          <div>
                                            
                                            <form
                                              onSubmit={e => {
                                                e.preventDefault();
                                                editFridge({ variables: { id: device.id, name: input.value } });
                            
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
              <TableCell className={classes.cell} align="right"> <Indicator istrue={device.status}/></TableCell>
              <TableCell className={classes.cell} align="right">
                <button onClick={() => {
                socket.emit('change-fridge-value',{id1: device.id,value: device.value + 1})
               }}>
                +
                  </button>

                     <h2>{device.value}*C</h2> 

                <button onClick={() =>{
                     socket.emit('change-fridge-value',{id1: device.id,value: device.value -1})
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