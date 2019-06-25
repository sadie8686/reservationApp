import React, { Component } from 'react';
import { StyleSheet, Text, View,Button,FlatList } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, graphql  } from 'react-apollo';
import gql from 'graphql-tag';
import { ListItem,Divider } from 'react-native-elements'

const reservationsQuery = gql`
query {
  reservations(orderBy: id_DESC) {
    id,
    name,
    arrivalDate,
    hotelName,
    departureDate
  }
}
`;

const ReservationListView = graphql(reservationsQuery)(props => {
  const { error, reservations } = props.data;
  keyExtractor = (item, index) => index.toString()

  if (error) {
    return <Text>{error}</Text>;
  }
  if (reservations) {
    return <View>
      <ListItem
            title={`Total Reservations: ${reservations.length}`}
        />
        <Divider />
        <FlatList
        keyExtractor={this.keyExtractor}
        data={reservations}
        renderItem={({ item,index }) => (
          <ListItem
            title={item.name}
            subtitle={
              <View style={styles.subtitleView}>
                <Text>{`Hotel Name: ${item.hotelName}`}</Text>
                <Text>{`Arrival Date: ${item.arrivalDate}`}</Text>
                <Text>{`Departure Date: ${item.departureDate}`}</Text>
              </View>
            }
          />
        )}
        ItemSeparatorComponent={({ item,index }) => (
          <Divider />
        )}
      />
      </View>;
  }

  return <Text>Loading...</Text>;
});


const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
    headers: {
      authorization: 'YOUR_TOKEN' // on production you need to store token
      //in storage or in redux persist, for demonstration purposes we do this like that
    }
  }),
  cache: new InMemoryCache()
});

class ReservationListScreen extends React.Component {
    static navigationOptions  = ({ navigation }) => {
      return {
      headerTitle: 'Reservations',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddReservation')}
          title="Add"
          color="#000000"
        />
      )
      };
    };

    render() {
      const {navigate} = this.props.navigation;
      return (
        <ApolloProvider client={client}>
        <ReservationListView />
        </ApolloProvider>
      );
    }
  }
  const styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingTop: 5
    }
  });
  export default ReservationListScreen;