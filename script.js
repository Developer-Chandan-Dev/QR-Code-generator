function generateQRCode() {
  const text = document.getElementById("text-input").value;
  const qrCodeContainer = document.getElementById("qr-code");

  // Clear previous QR code
  qrCodeContainer.innerHTML = "";

  if (text) {
    // Create a new QRCode instance
    new QRCode(qrCodeContainer, {
      text: text,
      width: 200,
      height: 200,
    });
    console.log("QR code generated!");
  } else {
    alert("Please enter some text to generate a QR code!");
  }
}

function downloadQRCode() {
  const qrCodeContainer = document.getElementById("qr-code");
  const canvas = qrCodeContainer.querySelector("canvas");

  if (canvas) {
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL("image/png");

    // Create a link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "qr_code.png"; // Set the default file name

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Remove the link after triggering download
  } else {
    alert("Please generate a QR code first!");
  }
}

function startQRScanner() {
  const qrReader = new Html5Qrcode("qr-reader");
  const qrResultOutput = document.getElementById("result-output");

  qrReader
    .start(
      { facingMode: "environment" }, // Rear camera
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        qrResultOutput.innerText = decodedText; // Show scanned result
        qrReader.stop(); // Stop the scanner after reading the QR code
      },
      (errorMessage) => {
        console.warn(errorMessage); // Optional error handling
      }
    )
    .catch((err) => {
      console.error("Unable to start scanning.", err);
    });
}
