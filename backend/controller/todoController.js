import Todo from "../model/todoModel.js";
//create
// export async function create(req, res) {
//   try {

//     const data = {
//       ...req.body
//     };

//     // image upload
//     if (req.file) {
//       data.image = req.file.path;
//     }

//     // required fields check
//     if (!data.title || !data.price) {
//       return res.status(400).send({
//         success: false,
//         message: "title and price required"
//       });
//     }

//     const todo = await Todo.create(data);

//     res.status(201).send({
//       success: true,
//       message: "created successfully",
//       todo
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "error",
//       error
//     });
//   }
// }







//get
export async function getAll(req,res){
  try{
    const todo=await Todo.find({});
    res.status(200).send({
      success:true,
      message:"fetch",
      todo
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error",
      error
    })
  }
}
//delete
export async function deleteData(req,res){
  try{
const todo=await Todo.findByIdAndDelete(req.params.id)
res.status(200).send({
  success:true,
  message:"successfully deleted"
})
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error",
      error
    })
  }
}
//update


export async function getOne(req,res){
  try{
const todo=await Todo.findById(req.params.id)
res.status(200).send({
  success:true,
  message:"fetch",
  todo
})
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"error",
      error
    })
  }
}


export async function updateData(req, res) {
  try {

    const data = {
      ...req.body
    };

    // new image aaye to update
    if (req.file) {
      data.image = req.file.path;
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true
      }
    );

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "todo not found"
      });
    }

    res.status(200).send({
      success: true,
      message: "updated successfully",
      todo
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error",
      error
    });
  }
}