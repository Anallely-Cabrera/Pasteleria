const {Schema,model}=require('mongoose');
const pastelSchema=new Schema({
    codigobarras:{
        require:true,//se solicita y lo inserta si esta
        unique:true,// si se duplicaca tampoco se inserta
        type:String
    },
    sabor:String,
    kilos:Number,
    descripcion:String,
    diseño:String,
    precioventa:Number
},{
    versionkey:false,
    timestamps:true
});

module.exports=model('pastel',pastelSchema);