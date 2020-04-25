function myFunction() {
    if (document.getElementById("inputid").value == "1" )
    {
        document.getElementById("downloads").style.display = "none";
        document.getElementById("documents").style.display = "block";
        document.getElementById("inputid").value =2;
        document.getElementById("switchlabel").innerHTML="DOCUMENTS";
    }
    else {
        document.getElementById("downloads").style.display = "block";
        document.getElementById("documents").style.display = "none";
        document.getElementById("switchlabel").innerHTML="DOWNLOADS";
        document.getElementById("inputid").value =1;
    }


}