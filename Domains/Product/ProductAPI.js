const route =  require('express').Router();
const Products=require(__dirname+'/ProductModel.js').Products;
const Vendor=require(__dirname+'/../Vendor/VendorAPI.js').Vendors;

route.get('/',(req,res)=>{
    Products.findAll().then((product)=>{           
        res.send({success:true,data:product,message:'Products fetched successfully'})       
    })
    .catch((error)=>{
        res.send({success:false,data:null,message:error})
    })
})

route.post('/',(req,res)=>{
    var productName=req.body.name;
    var price=parseFloat(req.body.price);
    var quantity=parseInt(req.body.quantity);
    var vendorId=parseInt(req.body.vendorId);
    var vendorname=req.body.vendorname;
    Products.findOrCreate(
        {
         where:{
             name:productName,
             price:price,
             quantity:quantity,
             VendorId:vendorId,
             vendorname:vendorname
         }           
        }         
     ).then(([data,created])=>{
        if(created)
        {
            res.send({success:true,message:'Product Entered successfully'});
        }
        else
        {
            res.send({success:false,message:'product already exists'});
        }
        
     })
     .catch((error)=>{
         res.send({success:false,message:error})
     })
     
    
})

route.get('/:id',(req,res)=>{
let id = req.params.id;
Products.findByPk(id).then((product) => {
   if(product)
   {
    res.send({success:true,data:product,message:'Product fetched successfully'})
   }else
   {
    res.send({success:false,data:null,message:'no product exists with this id'})
   }
   
  
  })
  .catch((error)=>{
      res.send({success:false,data:null,message:error})
  })
  
})

route.delete('/:id',(req,res)=>{
    let id = req.params.id;
    Products.findByPk(id).then((product) => {
        if(product)
        {
            Products.destroy({
                where: {
                    id:id
                }
            }).then(()=>{              
                res.send({success:true,message:'Product deleted successfully'})
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

//todo patch
module.exports={
    route
}
    