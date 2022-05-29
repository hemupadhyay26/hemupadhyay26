const txtinput =document.querySelector(".inputs input"),
checkbtn = document.querySelector(".inputs button"),
infotxt= document.querySelector(".info-txt");
let filtertxt;
checkbtn.addEventListener("click",()=>{
    let reversetxt=filtertxt.split("").reverse().join("");
    // console.log(filtertxt, reversetxt);
    infotxt.style.display="block";
    if (reversetxt!=filtertxt) {
        return infotxt.innerHTML=`No <span>'${txtinput.value}'</span> isn't a palindrome!`
    }
    infotxt.innerHTML=`Yes <span>'${txtinput.value}'</span> is a palindrome!`
})
txtinput.addEventListener("keyup" , ()=>{
    filtertxt=txtinput.value.toLowerCase().replace(/[^A-Z0-9]/ig,"")
    // console.log(filtertxt);
    if (filtertxt) {
        return checkbtn.classList.add("active");
    }
    checkbtn.classList.remove("active");
});