const express=require('express')
const router=express.Router();
const Asesorias=require('../models/asesoria')
router.post('/asesorias/',(req,res)=>{
    Asesorias.create(req.body).then(
        response => res.status(201).send(response)
    ).catch(  response => res.status(500).send(response));
});
router.get('/asesorias/',(req,res)=>{
    Asesorias.find().exec().then(
        response => res.status(200).send(response)
    ).catch(  response => res.status(500).send(response));
});
module.exports=router;
