import { useEffect, useState } from "react";
import dataBase from './example.json'


export default function ContentList() {
  const [content, setContent] = useState([]); // Data for content of database
  const [filterContent,setFilterContent] = useState([]) // Filter data for content of database based on search
  const [search,setSearch] = useState('') // Search value

  useEffect(() => {
    setContent(dataBase) // get file list from data base
    setFilterContent(dataBase) // to filter 
  }, []);

  const searchContent = (e) => { 
      // Filters content function
      setSearch(e.target.value)
      const searchFileFilter = content.filter(file => file.title.toLowerCase().includes(search.toLowerCase()))
      setFilterContent(searchFileFilter)
  }

  return (
    <div>
      <h3>Listen content</h3>
      <div>
        <input style={{
          height : '2rem',
          fontSize: '1rem',
          padding: '0 5px',
        }}
         type="text" placeholder={"Search Content"} value={search} onChange={(e) => searchContent(e)}/>
      </div>
      {filterContent.map((content) => (
        <div key={content.id} style={{ marginBottom: 20 }}>
          <h3>{content.title}</h3>
            <audio controls src={`${content.filepath}`} />
        </div>
      ))}
    </div>
  );
}
