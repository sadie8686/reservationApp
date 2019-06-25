import React, { Component } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, graphql,Mutation,ApolloConsumer  } from 'react-apollo';
import gql from 'graphql-tag';
import { View,StyleSheet,ScrollView,TextInput,Keyboard,Text } from 'react-native';
import { Input,Button } from 'react-native-elements';


const CREATE_RESERVATION = gql`
  mutation createReservation($name: String!,$hotelName: String!,$arrivalDate: String!, $departureDate: String!) {
    createReservation(data: { name: $name, hotelName: $hotelName,arrivalDate: $arrivalDate, departureDate: $departureDate}) {
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
    headers: {
      authorization: 'YOUR_TOKEN'
    }
  }),
  cache: new InMemoryCache()
});

class AddReservationScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = { name: '',hotelName: '',arrivalDate: '',departureDate:'' }
  }

    static navigationOptions = {
      title: 'Add Reservation',
    };
    render() {
      return (
        <ScrollView>
        <View style={styles.inputContainer}>
        <ApolloProvider client={client}>
        <Mutation mutation={CREATE_RESERVATION}>

        {(createReservation, { data }) => (
              <View>
              <Input
                label="Name"
                containerStyle={styles.inputStyle}
                placeholder="Enter your name"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />
              <Input
                label="Hotel Name"
                containerStyle={styles.inputStyle}
                placeholder="Enter hotel name"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={this.state.hotelName}
                onChangeText={text => this.setState({ hotelName: text })}
              />
              <Input
                label="Arrival Date"
                containerStyle={styles.inputStyle}
                placeholder="Enter arrival date"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={this.state.arrivalDate}
                onChangeText={text => this.setState({ arrivalDate: text })}
              />
              <Input
                label="Departure Date"
                containerStyle={styles.inputStyle}
                placeholder="Enter departure date"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={this.state.departureDate}
                onChangeText={text => this.setState({ departureDate: text })}
              />
              <Button
                  onPress={() => {
                    createReservation({
                      variables: {
                        name: this.state.name,
                        hotelName: this.state.hotelName,
                        arrivalDate: this.state.arrivalDate,
                        departureDate: this.state.departureDate
                      }
                    })
                      .then(res => console.log(res.json()))
                      .catch(err => <Text>{err}</Text>);
                    this.setState({ hotelName: '', name: '',arrivalDate:'',departureDate:'' });
                  }}
                  title="Add Reservation"
                />
            </View>
            )}

          </Mutation>
          </ApolloProvider>
        </View>
      </ScrollView>
      );
    }
  }

const styles = StyleSheet.create({
    inputContainer: {
    margin: 15
},
  inputStyle: {
  marginBottom:5
  }
  });
  export default AddReservationScreen;