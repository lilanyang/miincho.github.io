
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

     //match and reject drag drop
    $( function() {
        $( "img" ).draggable();
        $( "#reject" ).droppable({
            drop: function( event, ui ) {
                $( this )
                  .find( "p" )
                    .html( "rejected" );
              },
              
              drop: function(event, ui) {
                var dragedElement = ui.draggable.text();
                var dropped = ui.draggable;
                console.log(dropped);
                dropped.hide();
                console.log(dragedElement);
              }
            });
          } );




/*
          $( function() {
            $( "reject" ).droppable();
            $( "img" ).draggable({
                drop:function( event, ui ) {
                    $( this )
                      .find( "img" )
                      $( this ).hide();
                  }
                });
              } );
*/






    // Text appear on hover
    img.addEventListener("mouseenter" , () => {
        p.innerHTML = item.Name + '<br />' +  item.Age + '<br />' + item.Gender + '<br />'  + item.Comments;
        p.style.display = "block";
        p.style.backgroundColor = '#383838';
        p.style.borderRadius = '15%';
        p.style.color = 'white';
        p.style.position = 'absolute';
        p.style.zIndex = '500';
        p.style.padding = '10px';
        p.style.maxWidth = '120px';
        p.style.marginTop = '40px';
        p.style.marginLeft = '15px';
    })

    img.addEventListener("mouseleave" , () => {
        p.style.display = "none"
    })

    // Profile info appear on click
    img.addEventListener("click" , () => {
        p.textContent = item.Profile ;
        p.style.display = "block"
    })

    // Set the text content and href attributes for the link
    img.src = "imgs/" + item.Headshot;

    // Filter by gender; "other" button not working 
    var filterMan = document.querySelector('#manBtn');
    var filterAll = document.querySelector('#allBtn');
    var filterWoman = document.querySelector('#womanBtn');
    var filterOther = document.querySelector('#otherBtn');

    filterAll.addEventListener('click', function () { {
            img.innerHTML = '<img src="imgs/ + item.Headshot" />';
            img.style.display = "block"
        }
    });

    filterMan.addEventListener('click', function () {
        if (item.Gender == 'Man') {
            img.innerHTML = '<img src="imgs/ + item.Headshot" />';
            img.style.display = "block"
        } else {
            img.style.display = "none"
        }
    });

    filterWoman.addEventListener('click', function () {
        if (item.Gender == 'Woman') {
            img.innerHTML = '<img src="imgs/ + item.Headshot" />';
            img.style.display = "block"
        } else {
            img.style.display = "none"
        }
    });


    filterOther.addEventListener('click', function () {
        if (item.Gender ==  'Woman') {
            img.style.display = "none"
        } 

        if (item.Gender ==  'Man') {
            img.style.display = "none"
        } 
 
    });
    


    // Add the link to the list item and the list item to the list
    div.appendChild(img);
    div.appendChild(p);
    matches.appendChild(div);
    });
})
.catch(error => console.error(error));


