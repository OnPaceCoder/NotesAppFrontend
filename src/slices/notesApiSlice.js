import { apiSlice } from './apiSlice';

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNotes: builder.mutation({
            query: (notes) => ({
                url: "/api/notes",
                method: 'POST',
                body: notes,
            }),

            invalidatesTags: ['notes'],
        }),
        getAllNotes: builder.query({
            query: () => ({
                url: "/api/notes",
            }),
            keepUnusedDataFor: 5,
            providesTags: (result) =>
                result ? result.map(({ _id }) => ({ type: 'notes', _id })) : ['notes'],
        }),
        deleteNotes: builder.mutation({
            query: (noteId) => ({
                url: `/api/notes/${noteId}`,
                method: 'DELETE',
            }),

            invalidatesTags: (result, error, noteId) => [{ type: 'notes', noteId }],
        }),
        updateNotes: builder.mutation({
            query: (data) => ({
                url: `/api/notes/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, noteId) => [{ type: 'notes', noteId }],

        })
    })
})


export const {
    useCreateNotesMutation,
    useGetAllNotesQuery,
    useDeleteNotesMutation,
    useUpdateNotesMutation

} = notesApiSlice