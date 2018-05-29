import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Tasks.schema = new SimpleSchema({
  user:{
    type: String
  },
  createdAt:{
    type: Date
  },
  win:{
    type: Number
  },
});

Tasks.attachSchema(Tasks.schema);

if(Meteor.isServer){
  Meteor.publish('tasks',function taskpublish(){
    return Tasks.find();
  });
}

Meteor.methods({
	'tasks.insert'(data){
		Tasks.insert({
			user: data,
			createdAt: new Date(),
			win: 0
		});
	},
});