const{response, request}=require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarjwt');




const login = async(req=request , res = response)=> {

    const {correo ,password}= req.body

    try{
        //verificar si el emali existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario /Password no son correctos - correo'
            })

        }



        //si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario /Password no son correctos - estado: false'
            })
            
        }

        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario /Password no son correctos - password'
            })
            
        }



        //generar el jwt
        const token = await generarJWT(usuario.id);



        
        res.json({
            usuario,
            token
          
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg:'hable con el administrador'
        })    
    }    
}


module.exports={
    login,
}