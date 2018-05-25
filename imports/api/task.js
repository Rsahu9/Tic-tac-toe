import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
	'tasks.insert'(data){
		Tasks.insert({
			user: data,
			createdAt: new Date(),
			win: 0,
			loose: 0
		});
	},
});