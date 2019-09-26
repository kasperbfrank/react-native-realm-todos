import Realm from 'realm';

const UserSchema = {
  name: 'User',
  properties: {
    username: 'string',
  },
};

const TodoSchema = {
  name: 'Todo',
  properties: {
    title: 'string',
    user: 'User?',
  },
};

export default Realm.open({schema: [UserSchema, TodoSchema]});
