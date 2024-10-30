import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {

  const [todo, setToDo] = useState("")
  const [allTodos, setAllTodos] = useState([])

  const [edit, setEdit] = useState(false)
  const [editTodo, setEditTodo] = useState("")

  const handleChange = (e) => {
    console.log(e.target.value)
    setToDo(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios({
      method: "post",
      url: "http://localhost:3002/api/create",
      data: { todo: todo }  //payload

    })
      .then(res => {
        console.log("res", res) //from res.json on server
      })

  }

  const handleGetTodo = (e) => {

    axios({
      method: "get",
      url: "http://localhost:3002/api/gettodo"
    })
      .then(res => {
        console.log("res", res)
        setAllTodos(res.data)
      })

  }

  const handleDelete = (e) => {
    console.log("delete", e.target.id)

    axios({
      method: "delete",
      url: `http://localhost:3002/api/delete/${e.target.id}`
    })
      .then(res => {
        console.log("res", res)
      })

    console.log("filter", allTodos.filter((item) => item._id !== e.target.id))
    setAllTodos(allTodos.filter((item) => item._id !== e.target.id))

  }

  const handleEdit = (e) => {
    setEditTodo(e.target.value)
  }

  const handleEditSubmit = (e) => {

    axios({
      method: 'put',
      url: `http://localhost:3002/api/edit/${e.target.id}`,
      data: { edit: editTodo }
    })
      .then(res => {
        console.log("res", res)
      })


  }


  return (
    <>
      {console.log("TODO", todo, "edit", edit, "editTodo", editTodo)}
      <input placeholder="todo" id="todo" onChange={(e) => handleChange(e)}></input>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>

      <br />
      <button onClick={(e) => handleGetTodo(e)}>Get Todo's</button>

      <hr />
      <br />

      {allTodos.map((item) => {

        return (

          <div key={item._id}>

            {edit ?
              (
                <div>
                  <input onChange={(e) => handleEdit(e)} placeholder={item.todo}></input>
                  <button id={item._id} onClick={(e) => handleEditSubmit(e)}>submit</button>
                </div>
              )
              :
              (

                <p>{item.todo}</p>
              )
            }



            <p id={item._id} onClick={(e) => handleDelete(e)}>X</p>
            <p id={item._id} onClick={(e) => setEdit(!edit)}>Edit</p>

          </div >

        )
      })}



    </>
  )
}

export default App
