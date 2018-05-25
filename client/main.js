import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Tictac from '../imports/ui/Tic-tac.js';

Meteor.startup(() => {
render(<Tictac />, document.getElementById('app'));
});