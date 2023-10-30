document.addEventListener('DOMContentLoaded', function() {
    const listViewButton = document.getElementById('list-view-button');
    const boardViewButton = document.getElementById('board-view-button');
    const listView = document.getElementById('list-view');
    const boardView = document.getElementById('board-view');
    const container = document.querySelector('.container');
    const myProfileButton = document.getElementById('myProfileButton');
    const generateScheduleButton = document.getElementById('generateScheduleButton');
    const dashboardButton = document.getElementById('dashboardButton');
    const circleImage = document.querySelector('.circle-image');
    const circleButtons = document.querySelector('.circle-buttons');



    var gifOptions = ["20cat.gif", "40cat.gif", "60cat.gif", "80cat.gif", "100cat.gif"];

    // Get a random index to select a GIF
    var randomIndex = Math.floor(Math.random() * 100) + 1;

    if (randomIndex < 20) {
        randomIndex = 0;
    } else if (randomIndex >= 20 && randomIndex < 40) {
        randomIndex = 1;
    } else if (randomIndex >= 40 && randomIndex < 60) {
        randomIndex = 2;
    } else if (randomIndex >= 60 && randomIndex < 80) {
        randomIndex = 3;
    } else {
        randomIndex = 4;
    }

    // Get the GIF filename based on the random index
    var selectedGif = gifOptions[randomIndex];

    // Set the src attribute of the img element
    var gifImage = document.getElementById("gif");
    gifImage.src = selectedGif;



    listViewButton.addEventListener('click', function() {
        container.style.backgroundColor = '#f1b6dc';
        listView.style.display = 'block';
        boardView.style.display = 'none';
    });

    boardViewButton.addEventListener('click', function() {
        container.style.backgroundColor = '#d9adfe';
        listView.style.display = 'none';
        boardView.style.display = 'block';
    });

    circleImage.addEventListener('click', function(event) {
        if (circleButtons.style.display === 'none' || circleButtons.style.display === '') {
            circleButtons.style.display = 'block';
        } else {
            circleButtons.style.display = 'none';
        }
        event.stopPropagation(); // Prevent document click event from immediately hiding the buttons
    });

    document.addEventListener('click', function(event) {
        if (circleButtons.style.display === 'block' && event.target !== circleImage) {
            circleButtons.style.display = 'none';
        }
    });


    /* Adding Task Button*/
    const addButton = document.createElement('button');
    addButton.textContent = 'New Task';

    addButton.addEventListener('click', function () {
        createTaskBar();
    });

    listView.appendChild(addButton);

    function createTaskBar() {
        const taskBar = document.createElement('div');
        taskBar.classList.add('task-bar');

        const ellipsisButton = document.createElement('button');
        ellipsisButton.textContent = '\u2026'; // You can use your ellipsis character here

        ellipsisButton.addEventListener('click', function () {
            toggleEllipsisView(taskBar);
        });

        taskBar.appendChild(ellipsisButton);

        // Add your task properties here
        const nameProperty = createTaskProperty('Name:', 'Task Name 1');
        const dateProperty = createTaskProperty('Due Date:', 'date');
        const categoryProperty = createTaskProperty('Category:', 'cat');

        taskBar.appendChild(nameProperty);
        taskBar.appendChild(dateProperty);
        taskBar.appendChild(categoryProperty);

        listView.appendChild(taskBar);
    }

    function createTaskProperty(label, value) {
        const taskProperty = document.createElement('div');
        taskProperty.classList.add('task-properties');

        const propertyText = document.createElement('p');
        propertyText.innerHTML = `<strong>${label}</strong> <span class="property-placeholder">${value}</span>`;
        taskProperty.appendChild(propertyText);

        return taskProperty;
    }

});

 