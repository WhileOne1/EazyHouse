import React, { useState } from 'react';
import { Query } from 'react-apollo'
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
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import 'status-indicator/styles.css'

import DeviceRoom from '../../components/mutations/deviceRoom';
import DeviceName from '../../components/mutations/switchName';
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
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#b0b0b0',
 
    }

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
    background: 'lightgray',
    borderRadius: '2px',
    color: 'black',
  },
  select:{
    position: 'relative',
    fontFamily: 'Arial',
    minWidth: '150px',
    maxWidth: '20%',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: 'auto',
    backgroundColor: "lightgray",
        margin: "10px",
    "&:selected ": {
      backgroundColor: "green"
    }
  },
  div: {
    textAlign: 'center',
  }
});
const GET_SWITCHES_ROOM = gql`

  query ($room: String!){
    switchesbyroom(room: $room) {
      isOn
      deviceid
      device{
      name
      room
      status
      deviceid
      }
    }
    thermometersbyroom(room: $room) {
      value
      valueType
      deviceid
      device{
      name
      room
      status
      deviceid
      }
    }
    fridgesbyroom(room: $room) {
      valueType
      value
      deviceid
      device{
      name
      room
      status
      deviceid
      }
    }
    switchesWithValuesbyroom(room: $room) {
      valueType
      value
      deviceid
      isOn
      device{
      name
      room
      status
      deviceid
      }
    }
    distinctRoom{
      room
    }

  }
  
  


  ` ;
const handleChange = (event) => {
  this.setState({ value: event.target.value });
};
const Rooms = () => {
  const [room, setRoom] = useState("wybierz pokój");
  const classes = useStyles();
return (
<Query query={GET_SWITCHES_ROOM} variables={  {room} } pollInterval={500}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      let input


      return (
        <div>
<div className={classes.div}>
        {<select className={classes.select} value= {room} onChange={(e) => setRoom(e.target.value)} >
        <option  value="wybierz pokój">
        wybierz pokój
            </option>
          {data.distinctRoom.map(device => (
            <option  value={device.room}>
              {device.room}
            </option>

          ))}
        </select>
}
</div>
  
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
            {(data.switchesbyroom).sort((a, b) => (a.device.deviceid > b.device.deviceid) ? 1 : -1).map(data => (
                

              <TableRow className={classes.row} key={data.deviceid}>
                <TableCell className={classes.cell} align="right"><DeviceName data={data.device.name}  data2={data.device.deviceid} /> </TableCell>
                <TableCell className={classes.cell} align="right"><DeviceRoom deviceName={data.device.room} deviceID={data.device.deviceid} /></TableCell>
                <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
                <TableCell className={classes.cell} align="right"> <SwitchComponent  isItOn={data.isOn} switchid={data.device.deviceid}
                            handleToggle={(e) => {e.preventDefault(); 
                            socket.emit('change-switch-value',{id1: data.device.deviceid,isOn: !data.isOn})
                            }}/></TableCell> 
              </TableRow>
            
          
				                    
                            
                
            ))}
            {data.thermometersbyroom.sort((a, b) => (a.device.deviceid > b.device.deviceid) ? 1 : -1).map(data => (
              <TableRow className={classes.row} key={data.device.deviceid}>
              <TableCell className={classes.cell} align="right"> <DeviceName data={data.device.name}  data2={data.device.deviceid} />
              </TableCell>
              <TableCell className={classes.cell} align="right"><DeviceRoom deviceName={data.device.room} deviceID={data.device.deviceid} /></TableCell>
              <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
            <TableCell className={classes.cell} align="right"> <h2>{data.value} {data.valueType}</h2></TableCell>
            </TableRow>


            ))}
             {data.fridgesbyroom.sort((a, b) => (a.device.deviceid > b.device.deviceid) ? 1 : -1).map(data => (
              <TableRow className={classes.row} key={data.device.deviceid}>
              <TableCell className={classes.cell} align="right">
              <DeviceName data={data.device.name}  data2={data.device.deviceid} />
              </TableCell>
              <TableCell className={classes.cell} align="right"><DeviceRoom deviceName={data.device.room} deviceID={data.device.deviceid} /></TableCell>
              <TableCell className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
              <TableCell className={classes.cell} align="right">
                <button onClick={() => {
                socket.emit('change-fridge-value',{id1: data.device.deviceid,value: data.value + 1})
               }}>
                +
                  </button>

                     <h2>{data.value} {data.valueType}</h2> 

                <button onClick={() =>{
                     socket.emit('change-fridge-value',{id1: data.device.deviceid,value: data.value -1})
                    }}>
                  -
            </button> 
            </TableCell>
            </TableRow>


            ))}
            {data.switchesWithValuesbyroom.sort((a, b) => (a.device.deviceid > b.device.deviceid) ? 1 : -1).map(data => (
              <TableRow className={classes.row} key={data.device.deviceid}>
              <TableCell key={data.device.deviceid} className={classes.cell} align="right"><DeviceName key={data.device.deviceid} data={data.device.name}  data2={data.device.deviceid} /></TableCell>
              <TableCell key={data.device.deviceid} className={classes.cell} align="right"><DeviceRoom key={data.device.deviceid} deviceName={data.device.room} deviceID={data.device.deviceid} /></TableCell>
              <TableCell key={data.device.deviceid} className={classes.cell} align="right"> <Indicator istrue={data.device.status}/></TableCell>
              <TableCell key={data.device.deviceid} className={classes.cell} align="right">
              <div className={classes.div}><SwitchComponent  isItOn={data.isOn} switchid={data.device.deviceid}
                            handleToggle={(e) => {e.preventDefault(); 
                            socket.emit('change-switch-value',{id1: data.device.deviceid,isOn: !data.isOn})
                            }}/></div>
                <button onClick={() => {
                socket.emit('change-switchwithvalue-value',{id1: data.device.deviceid,value2: data.value + 1})
               }}>
                +
                  </button>

                     <h2 key={data.device.deviceid}>{data.value} {data.valueType}</h2> 

                <button onClick={() =>{
                     socket.emit('change-switchwithvalue-value',{id1: data.device.deviceid,value2: data.value -1})
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



export default Rooms;
