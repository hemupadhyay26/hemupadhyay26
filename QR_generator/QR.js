const wrapper= document.querySelector(".wrapper"),
qrinput=wrapper.querySelector(".form input"),
generatebtn=wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");

generatebtn.addEventListener("click", ()=>{
    let qrvalue=qrinput.value;
    // console.log(qrvalue);
    if(!qrvalue) return;
    generatebtn.innerText = "Generating QR Code....."
    qrImg.src=`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrvalue}`;
    qrImg.addEventListener("load",()=>{
        wrapper.classList.add("active");
        generatebtn.innerText="Generate QR Code"
    });
});

qrinput.addEventListener("keyup",()=>{
    if (!qrinput.value) {
        wrapper.classList.remove("active");
    }
});
