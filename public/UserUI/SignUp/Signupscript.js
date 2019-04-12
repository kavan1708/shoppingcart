$('#signUpButton').click(()=>{
    let user={};
    user.firstname=$('#firstName').val();
    user.lastname=$('#lastName').val();
    user.email=$('#emailId').val();
    user.password=$('#password').val();

   $.post('/api/users/',user,
   (data)=>{
    if(data.success)
    {
       alert('user added Successfully')
    }else
    {
      alert(data.message)
    }
     
   }
   )
})