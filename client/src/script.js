document.addEventListener('DOMContentLoaded', function() {
    const listViewButton = document.getElementById('list-view-button');
    const boardViewButton = document.getElementById('board-view-button');
    const listView = document.getElementById('list-view');
    const boardView = document.getElementById('board-view');

    listViewButton.addEventListener('click', function() {
        listView.style.display = 'block';
        boardView.style.display = 'none';
    });

    boardViewButton.addEventListener('click', function() {
        listView.style.display = 'none';
        boardView.style.display = 'block';
    });
});