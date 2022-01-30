import React, { useState } from 'react'
import './App.css'


function App() {

  const [currentStorage, setCurrentStorage] = useState(0)

  function changeStorage(storage) {
    setCurrentStorage(storage)
  }


  const [data, setData] = useState({users: [{id: 1, name: "admin", change: false}]})

  let name = React.createRef()

  function maxId(arr) {
    return Math.max.apply(null, arr) + 1
  }

  function dataAdd() {
    let x = []
    for (let index = 0; index < data.users.length; index++) {
      x.push(data.users[index].id)
    }

    setData({users: [...data.users, {id: maxId(x), name: name.current.value, change: false}]})

    if (currentStorage === "localStorage") {
      localStorage.setItem("users", JSON.stringify(data.users))
    }
    name.current.value = ""
  }


  function dataDelete(id) {
    const index = data.users.findIndex(element => element.id === id)
    const newData = data.users
    newData.splice(index, 1)
    setData({users: newData})

    if (currentStorage === "localStorage") {
      localStorage.setItem("users", JSON.stringify(newData))
    }
  }


  let nameEdit = React.createRef()

  function edit(id) {
    const index = data.users.findIndex(element => element.id === id)
    const newData = data.users
    newData[index].change = true
    setData({users: newData})
  }

  function editCancel(id) {
    const index = data.users.findIndex(element => element.id === id)
    const newData = data.users
    newData[index].change = false
    setData({users: newData})
  }

  function editSave(id) {
    const index = data.users.findIndex(element => element.id === id)
    const newData = data.users
    newData[index].name = nameEdit.current.value
    newData[index].change = false
    setData({users: newData})

    if (currentStorage === "localStorage") {
      localStorage.setItem("users", JSON.stringify(newData))
    }
  }


  const [sresult, setSresult] = useState([])

  let searchField = React.createRef()

  function search() {
    let newResult = []
    for (let index = 0; index < data.users.length; index++) {
      const element = data.users[index];
      if (element.name === searchField.current.value) {
        newResult.push(element)
      }
    }
    setSresult(newResult)
    searchField.current.value = ""
  }


  if (!currentStorage) {
    return (
      <>
      <div className={"d-grid gap-2 col-6 mx-auto"}>
        <button className={"btn btn-primary"} type="button"
          onClick={() => { changeStorage("memory") }}>memory</button>
        <button className={"btn btn-primary"} type="button"
          onClick={() => { changeStorage("localStorage") }}>local</button>
      </div>
      </>
    )
  }

  return (
    <>
    <h1>{currentStorage}</h1>
    <div className={"input-group mb-3"}>
      <input type="text" className={"form-control"} placeholder="username" ref={searchField} />
      <button className={"btn btn-outline-secondary"} type="button" id="button-addon2"
        onClick={() => { search() }}>Search</button>
    </div>
    {sresult.map((item, index) => (
      <>
        <h1 key={index}>id-{item.id} user-{item.name}</h1>
      </>
    ))}

    <div className={"input-group mb-3"}>
      <input type="text" className={"form-control"} placeholder="username" ref={name} />
      <button className={"btn btn-outline-secondary"} type="button" id="button-addon2"
        onClick={() => { dataAdd() }}>Add</button>
    </div>

    {data.users.map((item, index) => (
        <>
        <h1 key={index}>id-{item.id} user-{item.name}</h1>

        {item.change
          ? (
              <>
              <div className={"input-group mb-3"}>
                <input type="text" className={"form-control"} placeholder={item.name} ref={nameEdit} />
                <button className={"btn btn-outline-secondary"} type="button" id="button-addon2"
                  onClick={() => { editSave(item.id) }}>Save</button>
                <button className={"btn btn-outline-secondary"} type="button" id="button-addon2"
                  onClick={() => { editCancel(item.id) }}>Cancel</button>
              </div>
              </>
            )
          : (<button onClick={() => { edit(item.id) }} type="button" 
                className={"btn btn-outline-secondary"}>Edit</button>)}

        <button onClick={() => { dataDelete(item.id) }} type="button" 
          className={"btn btn-outline-secondary"}>Delete</button>
        </>
      ))}
    </>
  );
}


export default App
