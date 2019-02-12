const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
}= require('graphql') 

//data

// const customers = [
//     {
//         id:'1',
//         name: 'Johne Doe',
//         email: 'email',
//         age: 34
//     },
//     {
//         id:'2',
//         name: 'Rahul Doe',
//         email: 'email',
//         age: 31
//     },
//     {
//         id:'3',
//         name: 'Lallan Doe',
//         email: 'email',
//         age: 32
//     }
// ]

//customer type
const CustomerType = new GraphQLObjectType({
    name:'customer',
    fields: ()=>({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age : {type: GraphQLInt}
    })
})

//Rootquery
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer:{
            type: CustomerType,
            args:{
                id: {type:GraphQLString}
            },
            resolve(parentValue,args){
                // for(let i=0; i<customers.length; i++){
                //     if(customers[i].id== args.id){
                //         return customers[i];
                //     }
                // }

                return axios.get('http:localhost:3000/customers/'+args.id)
                    .then((res)=> res.data)
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue,args){
                return customers
            }
        }
    }
    
})

module.exports = new GraphQLSchema({
    query: RootQuery
})