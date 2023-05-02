const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Pastel = require('./Pastel');
const app=express();

//Settings 
app.set('port',process.env.PORT||3600);
app.set('view engine', 'ejs');


//Middlewares
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

//Conexion a mongodb atlas
mongoose.connect("mongodb+srv://fortijc:0987CXZ-He@cluster0.knyyyxf.mongodb.net/Papeleriadb?retryWrites=true&w=majority")
.then(db=> console.log("Mongodb Connected"))
.catch(err=>console.error(err));

//consulta individual 
app.get("/:cb",async(req,res)=>{
    const pasteleria=await Pasteleria.findOne({codigobarras:req.params.cb});
    res.render('editar',{pasteleria});
})
//actualizar
app.post("/actualizar/:cb",async(req,res)=>{
    await Pasteleria.findOneAndUpdate({codigobarras:req.params.cb},req.body);
    res.redirect("/");
})
//muestra y pinta los datos del index
app.get("/",async(req,res)=>{
    const pasteles=await Pastel.find();
    res.render('index',{pasteles});
});

//Eliminar 
app.get("/eliminar/:cb",async(req,res)=>{
    await Pastel.findOneAndDelete({codigobarras:req.params.cb});
    res.redirect("/"); 
});

//insertar 
app.post("/insertar",async(req,res)=>{
    const pasteleriaInsertado=new Pastel(req.body);
    await pasteleriaInsertado.save();
    res.redirect('/');
});



app.listen(app.get('port'),()=>{
    console.log('servidor escuchando en el puerto 3600');
});