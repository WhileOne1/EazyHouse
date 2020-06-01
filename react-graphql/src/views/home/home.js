import React, { useState, useEffect } from 'react';
import { Query,useQuery, Mutation, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import SwitchComponent from '../../components/switchComponent'
 const GET_SWITCHES = gql` {
    switches {
        id
      name
      isOn
      status
      room
    }

  }` 
  const POST_SWITCHES = gql`
  mutation editSwitchValue($id: ID!, $isOn: boolean!) {
    editSwitchValue(id: $id,isOn: $isOn) {
      isOn
    }
  }
`;
const Home = () => {
    const [value, setValue] = useState(false);

    const {loading, data} = useQuery(GET_SWITCHES)
    
    const [editSwitchValue, {error}] = useMutation(POST_SWITCHES, {
        variables: {value}, refetchQueries: ["switches"]
    })
    if(error){
        console.log('error: ',error)
    }
    if (loading) return <h2>loading...</h2>
    return (
        data.switches.map(({id,name,status,room,isOn}) =>{
                        
            let input;
            
            return(
             <div>
                
                <div>
                    <p>
                        <span><b>{name}: </b></span>
                    </p>
                    
                    
                    <p>
                    {"id: " + id +" nazwa: " + name + " status: "+  status + " isOn: " + isOn + " pokój: " + room }
                    </p>
                   
                   
                   
                </div>
                <SwitchComponent  isItOn={isOn}
                            handleToggle={(e) =>  editSwitchValue({variables:{  id, isOn: true } })}/>
                </div> 
                    )}))
        
/* 
        <Query query={GET_SWITCHES}  pollInterval={500}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Laduje dane</div>
                    if (error) return <div>Wystapil blad</div>

                    const thermometers = data.switches;
                    
        
  
                    
                    
                    return thermometers.map(({id,name,status,room,isOn}) =>{
                        
                        let input;
                        
                        return(
                         <div>
                            <h1>GraphQL response:</h1>
                            <div>
                                <p>
                                    <span><b>Tytul: </b></span>
                                </p>
                                
                                
                                <p>
                                {"id: " + id +" nazwa: " + name + " status: "+  status + " isOn: " + isOn + " pokój: " + room }
                                </p>
                               
                               
                               
                            </div>
                         
                        <Mutation mutation={POST_SWITCHES} key={id}>
                        {editSwitchValue => (
                          <div key={id}>
                            
                             <form
                              onSubmit={e => {
                                e.preventDefault();
                                editSwitchValue({ variables: { id, isOn: input.value } });
            
                                input.value = false;
                              }}
                            >
                              <input type="radio"
                                ref={node => {
                                  input = node;
                                }}
                              />
                              <button type="submit">Update Todo</button>
                            </form>
                              
                            <SwitchComponent  isItOn={isOn}
                            handleToggle={() =>  editSwitchValue({variables:{  id, isOn: true } })}/>
                            
                            

                          </div>
                        )}
                      </Mutation>
                      </div> 
                    )})
                }}
            </Query>
            
    );
     */
};

export default Home;