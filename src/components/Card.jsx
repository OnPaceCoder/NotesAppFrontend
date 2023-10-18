import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const Card = ({ item, data, mutation }) => {


    const queryClient = useQueryClient();


    const mutationUpdate = useMutation({
        mutationFn: async (newNote) => {
            return fetch(`http://localhost:5000/api/notes/${item._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(newNote)
            }).then((res) => res.json())
        },
        onSuccess: (newNotes) => {

            // Invalidate and refetch
            queryClient.setQueryData(notes, newNotes)
            // queryClient.invalidateQueries("notes")
        },
    })

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(item.title || "");
    const [description, setDescription] = useState(item.description || "");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleDeleteClick = () => {

        mutation.mutate(item._id)
    }
    const handleUpdateClick = (event) => {
        event.preventDefault();
        mutationUpdate.mutate({ title, description })
        setEditMode(false)
    };

    return (
        <div className={`w-auto h-auto  p-3 border border-gray-400 rounded-lg m-4 bg-neutral-100`}>
            <form action='' className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor='title' className='text-lg py-2'>
                        Title
                    </label>
                    {editMode ? (
                        <input type="text" name="title" id="" className='border border-black-2 py-2 rounded-lg px-2 bg-slate-100 text-gray-800' value={title} onChange={handleTitleChange} />
                    ) : (
                        <h2>{title}</h2>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='description' className='text-lg py-2'>
                        Description
                    </label>
                    {editMode ? (

                        <textarea name="" id="" cols="10" rows="2" className='border border-black-2
                    rounded-lg px-2 py-2 bg-slate-100'
                            value={description} onChange={handleDescriptionChange}></textarea>
                    ) : (
                        <p>{description}</p>
                    )}
                </div>
            </form>
            <div className='flex gap-4 mt-3'>
                {editMode ? (
                    <div className='flex gap-4'>
                        <button
                            className='bg-green-400 py-2 px-4 rounded-md active:bg-green-200 duration-100 ease-in-out'
                            type='submit'
                            onClick={handleUpdateClick}
                        >
                            Update
                        </button>
                        <button
                            className='bg-red-400 py-2 px-4 rounded-md active:bg-red-200 duration-100 ease-in-out'
                            type='submit'
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <button
                        className='bg-red-400 py-2 px-4 rounded-md active:bg-red-200 duration-100 ease-in-out'
                        type='button' // Change the type to "button"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Card;
