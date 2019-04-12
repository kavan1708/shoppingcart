const route =  require('express').Router();

const Cart=require(__dirname+'/CartModel.js').Carts;
const Product=require(__dirname+'/../Product/ProductModel.js').Products;
route.get('/',(req,res)=>{
    
    Cart.findAll().then((cart)=>{
        res.send({success:true,data:cart,message:'fetched successfully'})
    })
    .catch((error)=>{
        res.send({success:false,data:null,message:error})
    })
})

route.get('/:userId',(req,res)=>{
    let userId=req.params.userId
   
    Cart.findAll({
        where:{
            userId:userId
        }
    }).then((products)=>{
       
        res.send({success:true,data:products,message:'fetched successfully'})
    })
    .catch((error)=>{
        res.send({success:false,data:null,message:error})
    })
})


route.delete('/delete',(req,res)=>{
   
//     let pid=req.body.productId;
//    let uid=req.body.userId;
     let pid=req.query.productId;
    let uid=req.query.userId;
  
   let productId=parseInt(pid);
   let userId=parseInt(uid);
   Cart.findOne({
       where:{
           productId:productId,
           userId:userId
       }
   }).then((cart) => {
       if(cart)
       {
           Cart.destroy({
            where:{
                productId:productId,
                userId:userId
            }
           }).then(()=>{              
               res.send({success:true,message:'deleted successfully'})
           })
           .catch((error)=>{
               res.send({success:false,message:error})
           })
        
       }else
       {
        res.send({success:false,message:'no product exists with this id'})
       }             
      })
      .catch((error)=>{
          res.send({success:false,message:error})
      })
     

})

route.post('/',(req,res)=>{
   
     let pid=req.body.productId;
    let quan=req.body.quantity;
    let uid=req.body.userId;
    let productId=parseInt(pid);
    let userId=parseInt(uid);
    let quantity=parseInt(quan);
    console.log('quantity  '+quantity)
    
  
    Cart.findOne(
        {
            where:{
                productId:productId,
                userId:userId
            }
        }
    ).then((data)=>
    {

        if(data)
        {
          
           let newquantity=data.quantity+quantity;
          // console.log(newquantity)
            Cart.update(
                {quantity: newquantity},
                {where:{
                    productId:productId,
                    userId:userId
                }}
              ).then((returneddata)=>{
                  if(returneddata)
                  {
                    res.send({success:true,data:data,message:'Entered successfully'});
                  }
              }).catch((error)=>{
                res.send({success:false,data:data,message:'some db error'})
              })

        }else
        {
            Cart.create(
                {
                    
                     productId:req.body.productId,
                     quantity:req.body.quantity,
                     userId:req.body.userId
        
                }
             ).then((data)=>
             {
                if(data)
                {
                    res.send({success:true,data:data,message:'Entered successfully'});
                }
                else
                {
                    res.send({success:false,data:data,message:'some error occured'});
                }
        
             })
             .catch((error)=>{
                 res.send({success:false,data:data,message:'some db error'})
             })
        }
    })
   


})



//todo patch
module.exports={
    route
}
