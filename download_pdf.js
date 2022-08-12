let scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;

let jspdf = document.createElement("script");
jspdf.onload = function() {
    const ratio = 3.8;
    let pdf;
    let elements = document.getElementsByTagName("img");
    for (let i in elements) {
        let img = elements[i];
        let width = img.width;
        let height = img.height;
        if (!/^blob:/.test(img.src)) {
            continue;
        }
        let canvasElement = document.createElement('canvas');
        let con = canvasElement.getContext("2d");
        canvasElement.width = width;
        canvasElement.height = height;
        con.drawImage(img, 0, 0, width, height);
        let imgData = canvasElement.toDataURL("image/jpeg", 1.0);
        if (!pdf)
            pdf = new jsPDF('l', 'mm', [width / ratio, height / ratio]);;
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.addPage();
    }
    let title = document.title.slice(0, -15);
    pdf.save(title);
};
jspdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js';
document.body.appendChild(jspdf);
