
//container
const container = document.createElement("div");
container.setAttribute('class', 'container h-100');

//row
const row = document.createElement("div");
row.setAttribute('class', 'row h-100 d-flex justify-content-center align-items-center');

//center-Div
const centerDiv = document.createElement("div");
centerDiv.setAttribute('class', 'centerdiv col-11 col-lg-6 h-auto justify-content-center');

//title
const heading1 = document.createElement("h1");
heading1.setAttribute('class', 'h1 text-capitalize my-3 text-center text-info py-2 bg-dark title');
heading1.setAttribute('id', 'title');
heading1.innerHTML = `<i class="fa-solid fa-qrcode"></i> QR Code Generator`;

//description
const description = document.createElement("p");
description.setAttribute('class', 'text-center fw-normal m-0');
description.innerText = `Thank you for using my website! Easily create QR codes from any word or phrase and enjoy the convenience of instant generation.`;

//form

const form = document.createElement("form");

const formRow1 = document.createElement("div");
formRow1.setAttribute('class', 'mb-3 row justify-content-center align-items-center');

let qrLabel = document.createElement("label");
qrLabel.setAttribute('class', 'col-12 col-form-label text-nowrap text-center text-wrap text-danger fw-bold');
qrLabel.setAttribute('for', 'Url');
qrLabel.innerHTML = `Enter URL or Any text <span class="text-dark">*</span> :`;

let qrInputDiv = document.createElement("div");
qrInputDiv.setAttribute('class', 'col-12');
qrInputDiv.innerHTML = `<input
type="text"
class="form-control text-center bg-dark text-info mx-auto w-75"
id="Url"
placeholder="Enter URL/Any text"
required
/>`;
formRow1.append(qrLabel, qrInputDiv);

const formRow2 = document.createElement("div");
formRow2.setAttribute('class', 'my-3 row justify-content-center');

let submitButton = document.createElement("a");
submitButton.setAttribute('href', '#');
submitButton.setAttribute('class', 'btn btn-primary col-5 col-lg-4');
submitButton.setAttribute('onclick', 'getQRCode()');
submitButton.innerHTML = `Submit`;

formRow2.append(submitButton);

form.append(formRow1, formRow2);

//QRImg-Div
const centerDivLast2 = document.createElement("div");
centerDivLast2.setAttribute('class', 'my-3 row justify-content-center');

const qrDiv = document.createElement("div");
qrDiv.setAttribute('class', 'QrDiv bg-secondary p-0 d-flex justify-content-center align-items-center');
qrDiv.setAttribute('id', 'qrDiv');
qrDiv.innerHTML = `<img src="Img/qr_gif2.gif" alt="QR_IMG" class="img-thumbnail" id="qrImg" />`;

centerDivLast2.appendChild(qrDiv);

const centerDivLast1 = document.createElement("div");
centerDivLast1.setAttribute('class', 'mt-3 mb-4 row justify-content-center');

let downloadButton = document.createElement("a");
downloadButton.setAttribute('class', 'btn btn-secondary disabled col-8 col-md-6 col-lg-5');
downloadButton.setAttribute('id', 'buttonDownload');
downloadButton.innerHTML = `Download Your QR Img`;

centerDivLast1.appendChild(downloadButton);

//Appending Main Elements

centerDiv.append(heading1, description, form, centerDivLast2, centerDivLast1);
row.append(centerDiv);
container.appendChild(row);
document.body.appendChild(container);

//Operations
let getQRCode = async () => {
    let url = document.getElementById("Url").value.trim();
    // console.log(url);

    if (url === "" || url === undefined) {
        alert(`You have to give some value in the input field`);
    } else {
        try {
            let response = await fetch(`http://api.qrserver.com/v1/create-qr-code/?data=${url}!&size=400x400`);
            
            if (!response.ok) {
                throw new Error('Network response Error');
            }

            let blob = await response.blob();
            let imageUrl = URL.createObjectURL(blob);

            let qrDiv = document.getElementById("qrDiv");
            qrDiv.setAttribute("class", 'QrDiv bg-success p-0 d-flex justify-content-center align-items-center');

            let img = document.getElementById("qrImg");
            img.setAttribute('src', `${imageUrl}`);

            let buttonDownload = document.getElementById("buttonDownload");
            buttonDownload.removeAttribute("disabled");
            buttonDownload.setAttribute('class', 'btn btn-success col-8 col-md-6 col-lg-5 mt-3');
            buttonDownload.setAttribute('href', imageUrl);
            buttonDownload.setAttribute('download', 'qrcode.png');
        } catch (error) {
            alert('There is a problem while fetching:', error);
        }
    }
    document.getElementById("Url").value = "";
};
