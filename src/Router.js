import {createStackNavigator, createAppContainer} from 'react-navigation';
import React from 'react';
import ReservationsListScreen from './components/ReservationListScreen';
import AddReservationScreen from './components/AddReservationScreen';

const BaseNavigation = createStackNavigator({
    Reservations: { screen: ReservationsListScreen },
    AddReservation: { screen: AddReservationScreen }
},{
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false
    },
  });

export default BaseNavigation;
