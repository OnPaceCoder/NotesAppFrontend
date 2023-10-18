import { useEffect, useState } from 'react'
import Form from './components/Form'
import Card from './components/Card'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


function App() {

  const [notes, setNotes] = useState()
  const queryClient = useQueryClient();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const result = await fetch('http://localhost:5000/api/notes');
      const data = await result.json();

      return data
    }

  })

  const mutation = useMutation({
    mutationFn: async (id) => {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.setQueryData(notes, newNotes)
      // refetch()
      // queryClient.invalidateQueries("notes");
      return queryClient.invalidateQueries(['notes'])
    },
  });



  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message



  return (
    <>
      <div className='max-w-100vh flex'>

        <div className='w-1/4'>

          <Form />
        </div>

        <div className='grid  grid-cols-3  gap-4 w-3/4'>

          {
            data.map((item, index) => (

              <Card key={index} item={item} mutation={mutation} />

            )



            )
          }
        </div>
      </div>
    </>
  )
}

export default App
