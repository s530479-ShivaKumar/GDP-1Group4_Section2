function myFunction(id1) {
    var x = document.getElementById("mySelect"+id1).value;
    document.getElementById("selectEmployee"+id1).innerHTML = x;
}
    // document.getElementById("myModal1")
    function myFunction1(idd){
    var y = document.getElementById("mySelect1"+idd).value;
    document.getElementById("selectItem"+idd).innerHTML = y;
    }
    function myFunction2(){
        
    var z = document.getElementById("mySelect2").value;
    document.getElementById("selectColor").innerHTML = z;
}

function emailSent(){
    window.alert("Email sent");
}

function validateMayWeTextYou(){
    var checkedYes = document.getElementById()

}
function removeRow()
{
var inc = document.getElementById('pull');
var table = document.getElementById('pull');
for(var i = 1; i < table.rows.length; i++)
{
    table.rows[i].cells[11].onclick = function()
    {
        var con = confirm("Do you want to delete this performer information");
        if(con === true)
        {
            inc = this.parentElement.rowIndex;
            table.deleteRow(inc);
        }   
    };  
}
 
}