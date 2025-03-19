document.addEventListener("DOMContentLoaded", () => {
  const umbrellaImage = document.getElementById("umbrellaImage");
  const colorButtons = document.querySelectorAll(".color-btn");
  const logoUpload = document.getElementById("logoUpload");
  const uploadText = document.querySelector(".upload-section h3");
  const crossButton = document.querySelector(".cross-button");
  const uploadSection = document.querySelector(".upload-section");
  const body = document.body;
  const loader = document.getElementById("loader");
  let logoElement = null;

  // Color configurations
  const colors = {
      yellow: { button: "yellow", mild: "#fdf5e6" },
      blue: { button: "#2bbdee", mild: "#e6f4f9" },
      pink: { button: "#df5c8c", mild: "#f9e6ef" }
  };

  // Apply transitions to the umbrella image
  umbrellaImage.style.transition = "opacity 0.5s ease-in-out";

  // Handle color selection
  colorButtons.forEach(button => {
    button.addEventListener("click", function () {
      const colorKey = this.getAttribute("data-color");
  
      umbrellaImage.style.opacity = "0";
      if (logoElement) logoElement.style.opacity = "0";
  
      loader.style.display = "block";
  
      setTimeout(() => {
        umbrellaImage.src = `Images&Icons/umbrella-${colorKey}.png`;
  
        umbrellaImage.onload = function () {
          umbrellaImage.style.opacity = "1";
  
          if (logoElement) logoElement.style.opacity = "1";
  
          loader.style.display = "none";
        };
  
        uploadSection.style.backgroundColor = colors[colorKey].button;
        body.style.backgroundColor = colors[colorKey].mild;
  
      }, 2000);
    });
  });
  

  // Handle logo upload
  logoUpload.addEventListener("change", event => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = e => {
          if (logoElement) logoElement.remove();
          
          // Create and add new logo
          logoElement = document.createElement("img");
          logoElement.src = e.target.result;
          logoElement.style.position = "absolute";
          logoElement.style.width = "50px";
          logoElement.style.bottom = "30px";
          logoElement.style.left = "50%";
          logoElement.style.transform = "translateX(-50%)";
          logoElement.style.transition = "opacity 0.3s ease-in-out";
          logoElement.style.opacity = "0";

          umbrellaImage.parentElement.appendChild(logoElement);
          setTimeout(() => logoElement.style.opacity = "1", 100);
          uploadText.textContent = file.name;
      };
      reader.readAsDataURL(file);
  });

  // Handle logo removal
  crossButton.addEventListener("click", () => {
      if (logoElement) {
          logoElement.style.opacity = "0";
          setTimeout(() => {
              logoElement.remove();
              logoElement = null;
          }, 300);
      }
      logoUpload.value = "";
      uploadText.textContent = "UPLOAD LOGO";
  });
});
