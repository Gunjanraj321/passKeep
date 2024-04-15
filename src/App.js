import React, { useState, useEffect } from 'react'
import List from './Components/List'
import './App.css'


const getData = () => {
  const data = localStorage.getItem('datas')
  if (data) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

const App = () => {
  // datas array of object
  const [datas, setdatas] = useState(getData());

  // input field states
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  //const [toggleSubmit, setToggleSubmit] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const [count,setCount]= useState(datas.length);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title ) {
      setdatas(
        datas.map((data) => {
          if (data.id === editData) {
            return { ...data, title: setTitle, password: setPassword }
          }
          return data;
        })
      )
      //setToggleSubmit(true);
      setTitle('')
      setPassword('')
      setEditData(null);
    }


    let val = {
      id: Math.random().toString(),
      title,
      password
    }
    setdatas([...datas, val,])
    setCount(count+1);
    setTitle('');
    setPassword('');
  }

  function handleDelete(id) {
    const filteredDatas = datas.filter((Element) => {
      return Element.id !== id;
    })
    setdatas(filteredDatas);
    setCount(count-1);
  }

  const handleEdit = (id) => {
    const editDatas = datas.find((i) => i.id === id);
    //setToggleSubmit(true);
    setTitle(editDatas.title)
    setPassword(editDatas.password)
    setEditData(id);
    handleDelete(id);
  }

  useEffect(() => {
    localStorage.setItem('datas', JSON.stringify(datas));
  }, [datas])


  return (
    <div className='container'>
      <h1 className='title'>Password Keeper</h1>
      <p className='title'> count:-{count}</p>
      
      <div>
        <form className='container' onSubmit={submitHandler}>
          <label htmlFor="name">Title:-</label>
          <input type="text" id="name" onChange={(e) => setTitle(e.target.value)} value={title} />

          <label htmlFor="password">Password:-</label>
          <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />&ensp;

          <button type="submit">Submit</button>
        </form>
      </div>
      <List datas={datas} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

export default App;
