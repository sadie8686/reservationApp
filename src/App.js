import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import BaseNavigation from './Router';

const App = createAppContainer(BaseNavigation);

export default App;
