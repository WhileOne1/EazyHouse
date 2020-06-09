import React from "react";
import { Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Popup from "reactjs-popup";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/button';
const useStyles = makeStyles({
  button: {
    background: 'lightgray',
    borderRadius: '2px',
    color: 'black',
  },
  div: {
    textAlign: 'center',
  }
});
const DELETE_DEVICE = gql`
mutation deleteDevice($deviceid: Int!) {
    deleteDevice(deviceid: $deviceid) {
    deviceid
  }
}
`; 
const DeleteDevice = ({deviceID}) => {
  const classes = useStyles();
  let input;
  return(
            <div> <Mutation mutation={DELETE_DEVICE} >
                    {(deletedevice, {data3}) => (
                     <div>
                     <Button variant="contained" className={classes.button} onClick={() =>{deletedevice({ variables: { deviceid: deviceID } })}}> Usuń urządzenie</Button>
                    </div>
)}
                 </Mutation> </div>

  )
};
export default graphql(DELETE_DEVICE)(DeleteDevice);