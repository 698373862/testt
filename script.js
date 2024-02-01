let responseData;
document
  .getElementById("downloadButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    downloadPDF();
  });
async function sendText() {
  const textareaValue = document.getElementById("emailText").value;
  document.getElementById("loadingSpinner").style.display = "block";
  try {
    const response = await fetch(
      "https://obscure-oasis-44551-df50cf272e44.herokuapp.com/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailText: textareaValue }),
      }
    );

    responseData = await response.json();
    document.getElementById("loadingSpinner").style.display = "none";
    productNamesList.innerHTML = responseData.productNames
      .map((product) => `<li>${product}</li>`)
      .join("");
    document.getElementById("productDetailsContainer").style.display =
      "block";
    document.getElementById("totalNettoValue").innerText =
      responseData.totalNetto.toFixed(2);
    document.getElementById("downloadButtonContainer").style.display =
      "block";
  } catch (error) {
    console.error("Error sending text:", error);
    document.getElementById("loadingSpinner").style.display = "none";
  }
}

async function downloadPDF() {
  try {
    const pdfResponse = await fetch(
      `https://obscure-oasis-44551-df50cf272e44.herokuapp.com/download-pdf?pdfPath=${encodeURIComponent(
        responseData.pdfPath
      )}`
    );
    const blob = await pdfResponse.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
}