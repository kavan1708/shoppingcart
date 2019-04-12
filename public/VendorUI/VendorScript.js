    function refreshList() {
      $.get('http://localhost:1400/api/vendors/', (data) => {
        $('#vendorList').empty()
     if(data.success)
     {
        for (let vendor of data.data) {
            $('#vendorList').append(

        `<li class="list-group-item  d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0">${vendor.name}</h6>
           
          </div>
          <span class="text-muted"><button onclick="deleteThisVendor(${vendor.id})">X</button></span>
        </li>`

              // `<li>VendorName :  ${vendor.name}   <button onclick="deleteThisVendor(${vendor.id})">X</button></li>`
            )
          }
     }
     else
     {
       alert(data.message);
     }   
      })
    }
    refreshList()
    function deleteThisVendor(id)
    {
      let path='http://localhost:1400/api/vendors/'+id;
      $.ajax({
        url: path,
        type: 'DELETE',
        success: (data) => {
          if (data.success) {
            alert('deleted successfully')
            refreshList()
          } else {
            alert(data.message)
          }
        }
    });
      
    }
 
  
    $('#addVendorButton').click(() => {
      $.post(
        'http://localhost:1400/api/vendors/',
        {
          name: $('#vendorName').val()
        },
        (data) => {
          if (data.success) {
            alert('added successfully')
            refreshList()
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
