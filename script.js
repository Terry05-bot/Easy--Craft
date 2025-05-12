function updateCard() {
    const name = document.getElementById('nameInput').value;
    const message = document.getElementById('messageInput').value;
  
    document.getElementById('cardName').textContent = name || "Your Name";
    document.getElementById('cardMessage').textContent = message || "Your message here";
  }
  
function downloadAsImage() {
  html2canvas(document.getElementById("card"), { scale: 3 }).then(canvas => {
    let link = document.createElement("a");
    link.download = "virtual_card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

  
function downloadAsPDF() {
  const { jsPDF } = window.jspdf;
  const card = document.getElementById("card");

  html2canvas(card, { scale: 3 }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save("virtual_card.pdf");
  });
}

  
  document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById('uploadedImage');
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  function changeCardSize(size) {
    const card = document.getElementById('card');
    if (size === 'small') {
      card.style.width = '300px';
      card.style.height = '200px';
    } else if (size === 'medium') {
      card.style.width = '500px';
      card.style.height = '300px';
    } else if (size === 'large') {
      card.style.width = '700px';
      card.style.height = '400px';
    }
  }

  function shareOnTwitter() {
    const text = encodeURIComponent("Check out this awesome card I made!");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  }
  
  function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  }

  function shareOnWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
}

function shareOnInstagram() {
  alert("Instagram doesn't support direct web sharing. Share manually.");
}

function shareOnSnapchat() {
  alert("Snapchat sharing from web is limited. Share manually or via app.");
}


  document.getElementById('bgUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function(e) {
      const card = document.getElementById('card');
      card.style.backgroundImage = `url(${e.target.result})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
    };
    reader.readAsDataURL(file);
  });
  function changeFontStyle(font) {
  document.getElementById('cardName').style.fontFamily = font;
  document.getElementById('cardMessage').style.fontFamily = font;
}

  function changeFontColor(color) {
    document.getElementById('cardName').style.color = color;
    document.getElementById('cardMessage').style.color = color;
  }
      

  // Voice-to-Text Input
const voiceBtn = document.getElementById('voice-btn');

voiceBtn.addEventListener('click', () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Speech Recognition not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;

    // Insert into the selected element or fallback
    const selection = window.getSelection();
    const active = selection.anchorNode;
    if (active && active.nodeType === 3) {
      active.textContent += ' ' + transcript;
    } else if (document.activeElement && document.activeElement.contentEditable === "true") {
      document.execCommand('insertText', false, transcript);
    } else {
      alert('Please click inside a text area or card to dictate.');
    }
  };
});

// Save as Template
function saveTemplate() {
  const content = document.getElementById('card').innerHTML;
  localStorage.setItem('cardTemplate', content);
  alert('Template saved successfully!');
}


// Load Template
function loadTemplate() {
  const content = localStorage.getItem('cardTemplate');
  if (content) {
    document.getElementById('card').innerHTML = content;
    alert('Template loaded!');
  } else {
    alert('No template found!');
  }
}

