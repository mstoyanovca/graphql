import graphql from 'graphql'
import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'graphql'
import RootQueryType from './types/root_query_type.js'
import mutation from './mutations.js'

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutation
});

export default schema;
