
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
     
    // Text appear on hover
    img.addEventListener("mouseenter" , () => {
        p.innerHTML = item.Comments + '<br />' + '<br />' + item.Name + '<br />' +  item.Age + '<br />' + item.Gender ;
        p.style.display = "block"
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


    // Add the link to the list item and the list item to the list
    div.appendChild(img);
    div.appendChild(p);
    matches.appendChild(div);
    });
})
.catch(error => console.error(error));







