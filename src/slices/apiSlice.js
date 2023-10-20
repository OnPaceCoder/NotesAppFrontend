import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';



const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000",

});


export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery,
    tagTypes: ['notes'],
    endpoints: (builder) => ({}),
})