import {createApi, fetchBaseQuery} from  '@reduxjs/toolkit/query/react'

export const ChatsApi = createApi({
    "reducerPath" : "apichats",
     baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5001/"}),
    
     endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
              url: "users",
              method: "GET",
              params: {},
            }),
            transformResponse: (res) => res.sort((a, b) => b.id - a.id),
            providesTags: ["users"],
          }),
          getAllConversations: builder.query({
            query: () => ({
              url: "conversations",
              method: "GET",
              params: {},
            }),
            transformResponse: (res) => res.sort((a, b) => b.id - a.id),
            providesTags: ["users"],
          }),
     })
})

export const {useGetAllUsersQuery,useGetAllConversationsQuery} = ChatsApi