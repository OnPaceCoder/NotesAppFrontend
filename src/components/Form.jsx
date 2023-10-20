import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useCreateNotesMutation, useGetAllNotesQuery } from '../slices/notesApiSlice';

const Form = () => {

    const [createNotes, { isLoading: loadingCreateProduct }] = useCreateNotesMutation()
    const { data, refetch, isLoading, error } = useGetAllNotesQuery()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && description) {



            try {
                await createNotes({ title, description })
                refetch()
            } catch (error) {
                console.log(error)
            }

        }
        setTitle("")
        setDescription("")

    }


    return (
        <div className=' p-3 border border-gray-400 rounded-lg m-4 bg-neutral-300'>
            <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-lg py-2'>Title</label>
                    <input type="text" name="title" id="" className='border border-black-2 py-2 rounded-lg px-2 bg-slate-100 text-gray-800' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-lg py-2'>Description</label>
                    <textarea name="" id="" cols="20" rows="10" className='border border-black-2
                    rounded-lg px-2 py-2 bg-slate-100'
                        value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <button className='bg-zinc-400 py-2 px-4 rounded-md active:bg-zinc-200 duration-100 ease-in-out' type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}

export default Form