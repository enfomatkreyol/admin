/*function toggleDisplay(option) {
    var fonta = document.querySelector('.font');
    var textalign = document.querySelector('.align');
    var paragraphe = document.querySelector('.scp');

    switch (option) {
        case 'font':
            fonta.style.display = 'block';
            paragraphe.style.display = 'none';
            textalign.style.display = 'none';
            break;
        case 'textAlign':
            fonta.style.display = 'none';
            paragraphe.style.display = 'none';
            textalign.style.display = 'block';
            break;
        case 'insert':
            fonta.style.display = 'none';
            paragraphe.style.display = 'block';
            textalign.style.display = 'none';
            break;

        case 'Close':
            fonta.style.display = 'none';
            paragraphe.style.display = 'none';
            textalign.style.display = 'none';
            break;
        default:
            console.error('Invalid option:', option);
    }
}*/

function home() {
     document.getElementById('home').style.display = 'block';
    document.querySelector('.editoreArticles').style.display = 'none';
    document.querySelector('.editoreCours').style.display = 'none';
}

function edit() {
    document.getElementById('home').style.display = 'none';
   document.querySelector('.editoreArticles').style.display = 'block';
   document.querySelector('.editoreCours').style.display = 'none';
}

function editcours() {
   window.location='/p/drive.html';
}






// font-size de texte
function updateFontSize() {
    var fontSize = document.getElementById('fontSize').value + 'px';
    var paragraphs = document.querySelectorAll("p");
    var h1 = document.querySelectorAll("h1");
    var h2s = document.querySelectorAll("h2");
    
    paragraphs.forEach(function(paragraph) {
        paragraph.style.fontSize = fontSize;
        h1.style.fontSize = fontSize;
        h2.style.fontSize = fontSize;
    });
}

function execCommand(command, showDefaultUI = false, value = null) {
    document.execCommand(command, showDefaultUI, value);
}

function generateCode() {
    const editorContent = document.getElementById('editor').innerHTML;
    const code = `<div style="font-family: Arial, sans-serif; border: 1px solid #ccc; min-height: 200px; padding: 10px;">${editorContent}</div>`;
    
    const htmlCode = `<!-- HTML Code -->\n${code}`;
    const cssCode = `/* CSS Code */\n${document.getElementById('editor').getAttribute('style')}`;

    console.log(htmlCode);
    console.log(cssCode);
}

let url = "https://script.google.com/macros/s/AKfycbz0yrLcLqezuK9Ubk9aQ_HbkFJMNi6BER3RCZ_YOmr_vkaWAcRDFxrXrRBxNjdzi3ko/exec";
let file = document.getElementById("upload");
let img = document.getElementById("img");
let urlParagraph = document.getElementById("url");

file.addEventListener('change', () => {
  let fr = new FileReader();

  fr.addEventListener('loadend', () => {
    let res = fr.result;
    img.src = res;

    let spt = res.split("base64,")[1];
    let obj = {
      base64: spt,
      type: file.files[0].type,
      name: file.files[0].name
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj)
    })
    .then(r => r.text())
    .then(data => {
      console.log(data);
      // Assuming the server returns the direct URL of the uploaded image
      urlParagraph.textContent = "Image URL: " + data;
    });
  });

  fr.readAsDataURL(file.files[0]);
});


//parti description et preview editeur
var descriptionContent = document.getElementById('editor').outerHTML;
var previewElement = document.getElementById('preview');

function execCmd(command, value = null) {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(command, false, value);
    updatePreview();
}

function updatePreview() {
var descriptionContent = document.getElementById('editor').innerHTML;
var previewElement = document.getElementById('preview');
console.log(descriptionContent);
previewElement.innerText=descriptionContent;

}






var soutitletitle = document.getElementById('stitle').value;
var imglink = document.getElementById('imagelink').value;


function categorie() {
    const selectedCategory = document.getElementById('category').value;
    const subcategorySelect = document.getElementById('subcategory');
    const p = document.getElementById('showcategorie');
    
    
    // Clear previous options
    subcategorySelect.innerHTML = '';

    database.ref(selectedCategory).once('value', (snapshot) => {
        const categoryData = snapshot.val();

        if (categoryData) {
            // Assuming categoryData is an object with titles
            Object.keys(categoryData).forEach(title => {
                const option = document.createElement('option');
                option.value = title;
                option.text = title;
                subcategorySelect.add(option);
            });
          
            // Display data in the first paragraph
            const dataToShow = Object.keys(categoryData).join('<br>');
        } else {
            alert('No data found for the selected category.');
        }
    });
}


function subcategory() {
    // You can get the selected category if needed
    const selectedCategory = document.getElementById('category').value;
    
    // You might want to update the subcategory options here if necessary
    // ...

    // Call the function to update the title based on the selected subcategory
    updateTitle();
  }

  function updateTitle() {
    // Get the selected subcategory
    const selectedSubcategory = document.getElementById('subcategory').value;

    // Update the title input value with the selected subcategory
    document.getElementById('title').value = selectedSubcategory;
  }



// Function to save data to Firebase
function save() {
    // Get values from input fields
    const category = document.getElementById('category').value;
    const content = document.getElementById('editor').innerHTML;
    var title = document.getElementById('title').value;
    var soutitle = document.getElementById('stitle').value;
    var image = document.getElementById('imagelink').value;
    var lien = document.getElementById('lien').value;
    var prix = document.getElementById('resultat').textContent;
    var type = document.getElementById('Type').value;
    var details = document.getElementById('details').value;

    // Create an object to store non-empty fields
    var dataToSave = {};

    // Check and add non-empty fields to the data object
    if (title) dataToSave.Title = title;
    if (soutitle) dataToSave.SousTitle = soutitle;
    if (content) dataToSave.Description = content;
    if (image) dataToSave.Image = image;
    if (prix) dataToSave.Prix = prix;
    if (details) dataToSave.Details = details;
    if (lien) dataToSave.Telecharger = lien;
    if (type) dataToSave.Type = type;

    // Check if there are any non-empty fields
    if (Object.keys(dataToSave).length === 0) {
        alert('Please fill in at least one field before saving.');
        return; // Stop the save operation
    }

    // Save data to Firebase
    database.ref(category +"/"+ title).set(dataToSave);

    // Optionally, you can provide feedback to the user that the data has been saved successfully
    alert('Data saved successfully!');
}

// Function to search data in Firebase
function search() {
    const category = document.getElementById('category').value;
    var title = document.getElementById('title').value;
    var soutitle = document.getElementById('stitle');
    var image = document.getElementById('imagelink');
    //var lien = document.getElementById('lien').value;
    var type = document.getElementById('Type');
    var details = document.getElementById('details');
    
    //var imglink = document.getElementById('imagelink').value;
    console.log(title);
    database.ref(category +"/"+ title).once('value', (snapshot) => {
        console.log(category);
        const data = snapshot.val();
        console.log(data);
        if (data) {
            // Display data in the editor or handle it as needed
            document.getElementById('editor').innerHTML = data.Description;
              soutitle.value = data.SousTitle;
              details.value = data.Details;
              type.value = data.Type;
              image.value = data.Image;

        } else {
            alert('No data found for the selected category.');
        }
    });
}

// Function to update data in Firebase
function update() {
  // Get values from input fields
  const category = document.getElementById('category').value;
  const content = document.getElementById('editor').innerHTML;
  const title = document.getElementById('title').value;
  const soutitle = document.getElementById('stitle').value;
  const image = document.getElementById('imagelink').value;
  const lien = document.getElementById('lien').value;
  const prix = document.getElementById('resultat').textContent;
  const type = document.getElementById('Type').value;
  const details = document.getElementById('details').value;

  // Get selected language
  const selectedLanguage = document.getElementById('langue').value;

  // Create an object to store non-empty fields
  const dataToUpdate = {};

  // Based on the selected language, update data accordingly
  switch (selectedLanguage) {
      case 'en':
          if (title) dataToUpdate.EnTitle = title;
          if (soutitle) dataToUpdate.EnSousTitle = soutitle;
          if (content) dataToUpdate.EnDescription = content;
          if (details) dataToUpdate.EnDetails = details;
          break;
      case 'es':
          if (title) dataToUpdate.EsTitle = title;
          if (soutitle) dataToUpdate.EsSousTitle = soutitle;
          if (content) dataToUpdate.EsDescription = content;
          if (details) dataToUpdate.EsDetails = details;
          break;
      case 'fr':
          if (title) dataToUpdate.Title = title;
          if (soutitle) dataToUpdate.SousTitle = soutitle;
          if (content) dataToUpdate.Description = content;
          if (image) dataToUpdate.Image = image;
          if (prix) dataToUpdate.Prix = prix;
          if (details) dataToUpdate.Details = details;
          if (lien) dataToUpdate.Telecharger = lien;
          if (type) dataToUpdate.Type = type;
          break;
      default:
          alert('Please select a language');
          return; // Stop the update operation
  }

  // Check if there are any non-empty fields
  if (Object.keys(dataToUpdate).length === 0) {
      alert('Please fill in at least one field before updating.');
      return; // Stop the update operation
  }

  // Update data in Firebase
  database.ref(category + "/" + title).update(dataToUpdate);

  // Optionally, you can provide feedback to the user that the data has been updated successfully
  alert('Data updated successfully!');
}





function convertToRC() {
  var htgAmount = parseFloat(document.getElementById("prix").value);
  var rcAmount = htgAmount / 0.005; // Taux de conversion HTG à RC
  document.getElementById("resultat").innerHTML = rcAmount;
}