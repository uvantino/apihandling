import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';


function App() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('wood')
  useEffect(() => {
    const controller = new AbortController()//multiple time req hit krne se bchane ke liye we use abortconroller method
   ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('request canceled', error.message)
          return 
        }
        setError(true);
      }

    })()//we will take iify here if we have restriction to use .then
//here we write clean up code
    return () => {
controller.abort()
}
  }, [search])

  // if (error) {
  //   return <h1>something went wrong</h1>
  // }
  // if (loading) {
  //   return <h1>Loading...</h1>
  // }
  return (
    <>
      <h1>api in react</h1>

      <input
      type='text'
      placeholder='search'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}/>

      {loading && <h1>Loading.....</h1>}
      {error && (<h1>Something went wrong</h1>)}
      <h2>Number of Products are: {products.length}</h2>
    </>
  )
}

export default App


