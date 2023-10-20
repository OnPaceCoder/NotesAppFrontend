import { useEffect, useState } from 'react'
import Form from './components/Form'
import Card from './components/Card'
import { useGetAllNotesQuery } from './slices/notesApiSlice'

function App() {

  const [notes, setNotes] = useState()

  const { data, refetch, isLoading, error } = useGetAllNotesQuery()

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

              <Card key={index} item={item} />

            )



            )
          }
        </div>
      </div>
    </>
  )
}

export default App
