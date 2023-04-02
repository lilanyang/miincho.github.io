fetch('profile2.4.json')
  .then(response => response.json())
  .then(data => {
    // Get the list element
    const matches = document.getElementById('matches');

    // Loop through the data and add each item to the list
    data.forEach(item => {
      const div = document.createElement('div');
      const p = document.createElement('p');
      const img = document.createElement('img');

      // Match and reject drag drop
      $("#matches img").draggable();
      $("#reject").droppable({
        drop: function(event, ui) {
          ui.draggable.hide();
        }
      });


      // Text appear on hover
      img.addEventListener("mouseenter", () => {
        p.innerHTML = item.Name + '<br />' + item.Age + '<br />' + item.Gender + '<br />' + item.Comments;
        p.style.display = "block";
        p.style.backgroundColor = '#d9c58b';
        p.style.color = 'black';
        p.style.position = 'absolute';
        p.style.zIndex = '500';
        p.style.padding = '10px';
        p.style.maxWidth = '120px';
        p.style.marginTop = '40px';
        p.style.marginLeft = '15px';
      });
      

      
      // Hide text when mouse leaves the image
      img.addEventListener("mouseleave", () => {
        p.style.display = "none";
      });

      // Profile info appear on click
      img.addEventListener("click", () => {
        p.textContent = item.Profile;
        p.style.display = "block"
      });

      // Set the src attribute for the image
      img.src = "imgs/" + item.Headshot;

      // Add the div and p elements to the list item
      div.appendChild(img);
      div.appendChild(p);

      // Filter by gender
      const filterMan = document.querySelector('#manBtn');
      const filterAll = document.querySelector('#allBtn');
      const filterWoman = document.querySelector('#womanBtn');
      const filterOther = document.querySelector('#otherBtn');

      filterAll.addEventListener('click', function() {
        div.style.display = "block";
      });

      filterMan.addEventListener('click', function() {
        if (item.Gender == 'Man') {
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      });

      filterWoman.addEventListener('click', function() {
        if (item.Gender == 'Woman') {
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      });

      filterOther.addEventListener('click', function() {
        if (item.Gender != 'Man' && item.Gender != 'Woman') {
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      });

      matches.appendChild(div);
    });
  })
  .catch(error => console.error(error));