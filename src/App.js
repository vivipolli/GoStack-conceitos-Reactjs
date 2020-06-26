import React, { useEffect, useState } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('repo teste');
  const [url, setUrl] = useState('www.github.com/vivipolli');
  const [techs, setTechs] = useState(['node', 'react', 'postgresql']);

  useEffect(() => {
    api.get('repositories').then(response => {
      setItems(response.data)
    })
  },[])

  async function handleAddRepository() {
    const data = {
      title,
      url,
      techs
    };
    const response = await api.post('repositories', data)
    const project = response.data;
    setItems([...items, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const projects = items.filter(rep => rep.id !== id);
    setItems(projects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {items.map(item => 
        <li key={item.id}>
          {item.title}
          <button onClick={() => handleRemoveRepository(item.id)}>
            Remover
          </button>
        </li>
      )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
