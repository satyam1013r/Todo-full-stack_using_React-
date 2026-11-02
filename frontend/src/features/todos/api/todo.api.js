import api from "../../../lib/axios";


//create todo 
export const createTodo=async(data)=>{
    const response=await api.post("/todos",data)
    return response.data
}

// Get all todo
export const getAllTodo=async()=>{
    const response=await api.get("/todos")
    return response.data
}

// Get single Todo
export const getOneTodo=async(id)=>{
    const response=await api.get(`/todos/${id}`)
    return response.data
}

//update 
export const updateTodo=async(data,id)=>{
    const response= await api.patch(`/todos/${id}`)
    return response.data
}

// delete 
export const deleteTodo=async(id)=>{
    const response =await api.delete(`/todos/${id}`)
    return response.data
}