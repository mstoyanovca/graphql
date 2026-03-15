import graphql from 'graphql'
import { GraphQLObjectType } from 'graphql'
import UserType from './user_type.js'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
        type: UserType,
        resolve(parentValue, args, context) {
            return context.user;
        }
    }
  }
});

export default RootQueryType;
