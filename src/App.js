import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'


export default function App() {

const [results, setResults] = useState([]);
const [query, setQuery] = useState('react hooks');
const[loading, setLoading] = useState(false);
const[error, setError] = useState(null)
const searchInputRef = useRef();

useEffect(() => {
  getResults();

}, []);

const getResults = async () => {
  setLoading(true);
  try {
    const response = await axios
    .get(`http://hn.algolia.com/api/v1/search?query=${query}`);

    setResults(response.data.hits);
    setError(null);
  } catch (err) {
    setError(err);
  }
  
  setLoading(false);
};

const handleSearch = async event => {
  event.preventDefault()
  getResults()
}

const handleClearSearch = () => {
  setQuery("");
  searchInputRef.current.focus();
}


  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-50 shadow-lg rounded">
      <img 
        src="https://banner2.cleanpng.com/20180604/pol/kisspng-react-javascript-angularjs-ionic-atom-5b154be6709500.6532453515281223424611.jpg"
        alt="React Logo"
        className="float-right h-12"
       />
      <h1 className="text-grey-darkest font-thin text-3xl">Hooks News</h1>
      <form onSubmit={handleSearch}
      className="mb-2">
        <input 
          type='text'
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type='submit' className="bg-yellow-600 rounded m-1 p-1">Search</button>
        <button type='button' onClick={handleClearSearch} className="bg-green-400 text-white rounded p-1">Clear</button>
      </form>
      {loading ? (
        <div className="font-bold text-yellow-500">Loading results...</div>
        ) :
         <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url} className="text-indigo-600 hover:text-indigo-900">{result.title}</a>
            </li> 
        ))}
      </ul>}

      {error && <div className="text-red-700 font-bold">{error.message}</div>}
    </div>
  )
}