
const{ Schema,model} =require ('mongoose');


const UsuarioSchema = Schema({
    

   
    nombre:{
    
        type:String,
        required:[true,'El nombre es Obligartorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio']
    },
    password:{
        type:String,
        required:[true,'El password es obligatorio']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },

});

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid=_id;
    return usuario;
}



module.exports= model('Usuarios',UsuarioSchema);

