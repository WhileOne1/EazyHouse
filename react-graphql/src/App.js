import React, { Component } from 'react';
import './App.css';

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const devicesQuery = gql` {
  devices {
    name
    isActive
  }
}`

export default class App extends Component {
    render() {
        return (
            <Query query={devicesQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Laduje dane</div>
                    if (error) return <div>Wystapil blad</div>

                    const devices = data.devices;

                    return (
                        <div>
                            <h1>GraphQL response:</h1>
                            <div>
                                <p>
                                    <span><b>Tytul: </b></span>
                                </p>
                                {devices.map(device =>
                                    <p >
                                        <span dangerouslySetInnerHTML={{  __html:  'nazwa: ' + device.name + ' || czy podłączone: ' + device.isActive }}></span>
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                }}
            </Query>
        );
    }
}