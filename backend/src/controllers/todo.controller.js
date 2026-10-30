import TodoModel from "../models/todos/todo.model.js";



export async function createTodo(req,res){
    try {
        const {text,priority,dueDate}=req.body
        


        if(!text || !text.trim()){
            return res.status(400).json({message:"Task text is required!"})
        }
       
        const userId=req.user.id  // get logged-in user id from middleware
        const todo= await TodoModel.create({
            text:text.trim(),
            priority,
            dueDate,
            user:userId
        })
        

        return res.status(201).json({message:"Task created successfully",todo})

    } catch (error) {
        console.error("Create Todo Error:", error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}
export async function deleteTodo(req,res){
    try {
        const userId=req.user.id
        const todoId=req.params.id
        const todo=await TodoModel.findOneAndDelete({
            _id:todoId,
            user:userId
        })

        if(!todo){
            return res.status(404).json({message:"Task not found!"})
        }
        return res.status(200).json({message:"Task delete successfull",todo})
        
    } catch (error) {
        console.log("Delete todo Error :",error)
        return res.status(500).json({message:"Internal server error"})
        
    }

}
export async function updateTodo(req,res){
    try {
        const userId=req.user.id
        const todoId=req.params.id
        const {text,priority,dueDate,completed}=req.body
         const updates = {};

    if (text !== undefined) {
      if (typeof text !== "string" || !text.trim()) {
        return res.status(400).json({
          message: "Task text cannot be empty"
        });
      }

      updates.text = text.trim();
    }

    if (priority !== undefined) {
      updates.priority = priority;
    }

    if (dueDate !== undefined) {
      updates.dueDate = dueDate;
    }

    if (completed !== undefined) {
      updates.completed = completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update"
      });
    }

    const todo = await TodoModel.findOneAndUpdate(
      {
        _id: todoId,
        user: userId
      },
      {
        $set: updates
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      todo
    });

  } catch (error) {
    console.error("Update Todo Error:", error);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }       
    }

export async function getOneTodo(req,res){
    try {
        const todoId = req.params.id // from url 
        const userId=req.user.id    // logged in user
        const todo=await TodoModel.findOne({
            _id:todoId,
            user:userId
        })

        if(!todo){
            return res.status(404).json({message:"Task not found!"})
        }
        return res.status(200).json({message:"Task fetch successfully",todo})
    } catch (error) {
        console.log("Get single Todos Error:",error)
        return res.status(500).json({message:"Internal Server Error!"})
    }

}

export async function getAllTodo(req, res) {
  try {
    const userId = req.user.id;

    // Get status from URL query parameters
   const { status, search, priority, sort } = req.query;

   
    const filter = {// logged in user only
      user: userId
    };

   
    if (status === "completed") {
      filter.completed = true;
    }

    if (status === "pending") {
      filter.completed = false;
    }
    if (status && !["completed", "pending"].includes(status)) {
  return res.status(400).json({
    message: "Invalid status. Use completed or pending."
  });
}
        let sortOption = {};

if (sort === "newest") {
  sortOption = { createdAt: -1 };
}

if (sort === "oldest") {
  sortOption = { createdAt: 1 };
}
if (sort && !["newest", "oldest"].includes(sort)) {
  return res.status(400).json({
    message: "Invalid sort. Use newest or oldest."
  });
}



        if (search) {
  filter.text = {
    $regex: search,
    $options: "i"
  };
}
        if (priority) {
  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority. Use low, medium, or high."
    });
  }

  filter.priority = priority;
}

    // Fetch Todos using the filter
    const todos = await TodoModel.find(filter).sort(sortOption);

    return res.status(200).json({
      message: "Todos fetched successfully",
      totalTodos: todos.length,
      todos
    });

  } catch (error) {
    console.error("Get All Todos Error:", error);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
