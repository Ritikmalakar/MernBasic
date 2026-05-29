import User from "../model/userModels.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export async function registerUser(req,res){
  try{
const {...formData}=req.body;
if(!formData.name||!formData.email||!formData.password){
  return res.status(401).send({
    success:false,
    message:"All Fields Required"
  });
}
  const existUser=await User.findOne({email:formData.email});
  if(existUser){
    return res.status(401).send({
      success:false,
      message:"user Already exist"
    })
  }
  formData.password=await bcrypt.hash(formData.password,10);
  const user=await User.create(formData);
  res.status(200).send({
    success:true,
    message:"register successfull",
    user
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


export async function login(req,res){
  try{
const {email,password}=req.body;
if(!email||!password){
  return res.status(401).send({
    success:false,
    message:"all field required",

  })
}
const user=await User.findOne({email});
if(!user){
  return res.status(401).send({
    success:false,
    message:"user not found"
  })
}
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
  return res.status(401).send({
    success:false,
    message:"Invalid Credential"
  })
}

const token=jwt.sign({id:user._id},process.env.SECRET,{expiresIn:"7d"});
res.cookie("token",token,{
  maxAge:7*24*60*60*1000,
  httpOnly:true
})
res.status(200).send({
  success:true,
  message:"login successfully"
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



export async function googleLogin(req,res){
  try {

    const {
      name,
      email,
      googleId
    } = req.body;

    let user = await User.findOne({
      email
    });

    if(!user){
      user = await User.create({
        name,
        email,
        googleId
      });
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.SECRET,
      {expiresIn:"7d"}
    );

    res.cookie("token",token,{
      httpOnly:true,
      maxAge:7*24*60*60*1000
    });

    res.status(200).send({
      success:true,
      message:"Google Login Success",
      token
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success:false,
      message:"Error"
    });
  }
}