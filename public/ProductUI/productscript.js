function refreshList() {
   
    $.get('http://localhost:1400/api/products/', (data) => {
      $('#productList').empty()
   if(data.success)
   {
    
      for (let product of data.data) {
          $('#productList').append(
            `<div class="col-sm-3">
    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">Name : ${product.name}</h5>
        <h6>Vendor : ${product.vendorname}</h6>
        <h6>Price : Rs.${product.price}</h6>
        <h6>Quantity : ${product.quantity}</h6>
        <button class="btn btn-danger" onclick="deleteThisProduct(${product.id})">Delete</button>
      </div>
    </div>
  </div> `
          )
        }
   }  
   else
   {
     alert('something went wrong while fetching products')
   }   
    })
  }
  

function populateDropDown()
{
  $.get('http://localhost:1400/api/vendors/', (data) => {
     
    if(data.success)
    {
       for (let vendor of data.data) {
           $('#vendorDropDown').append(
             `<option value=${vendor.id}> ${vendor.name}</option>`
           )
         }
    } 
        
     })
}
  function deleteThisProduct(id)
  {
    let path='http://localhost:1400/api/products/'+id;
    $.ajax({
      url: path,
      type: 'DELETE',
      success:(data) => {
        if(data.success)
        {
          alert('deleted successfully...')
        }
      
       
          refreshList()
       
      }
  });
    
  }
  refreshList()
  populateDropDown()

  $('#addProductButton').click(() => {
   
    let newProduct={};
    newProduct.name=$('#productName').val();
    newProduct.price=$('#price').val();
    newProduct.quantity=$('#quantity').val();
    newProduct.vendorId=parseInt($('#vendorDropDown').val())
    newProduct.vendorname=$('#vendorDropDown option:selected').text()

  
    $.post(
       'http://localhost:1400/api/products/',newProduct,  
      (data) => {
        if (data.success) {
          refreshList()
          alert('added successfully...')
        } else {
          alert(data.message)
        }
      }
    )
  })
  $('#logOut').click(()=>{
     
    alert('you are going to log out')
    localStorage.setItem('userid',null);
    window.location='http://localhost:1400/';
  })

