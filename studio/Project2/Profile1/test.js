    //window load PLEASE WORKW[PLEASEWORK]
    function clickFirstPhotoButton() {
      var filter1stPhoto = document.querySelector('#firstPhoto');
      
      // Trigger a click event on the button
      try {
        filter1stPhoto.click();
        console.log('Button clicked');
      } catch (error) {
        console.error(error);
      }
    }
    document.addEventListener("DOMContentLoaded", function() {
      clickFirstPhotoButton();
    });

    window.addEventListener('load', function() {
      clickFirstPhotoButton();
    });
