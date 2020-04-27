import React, { Component } from 'react';
import './App.css';

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const booksQuery = gql` {
  books {
    title
  }
}`

export default class App extends Component {
    render() {
        return (
            <Query query={booksQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Laduje dane</div>
                    if (error) return <div>Wystapil blad</div>

                    const books = data.books;

                    return (
                        <div>
                            <h1>GraphQL response:</h1>
                            <div>
                                <p>
                                    <span><b>Tytul: </b></span>
                                </p>
                                {books.map(book =>
                                    <p >
                                        <span dangerouslySetInnerHTML={{ __html: book.title }}></span>
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