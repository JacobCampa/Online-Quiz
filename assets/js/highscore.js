document.addEventListener('DOMContentLoaded', () => {
    const highscoreList = document.getElementById('highscore-list');

    // Fetch high scores from storage (you might want to use server-side storage or an API)
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Display high scores
    highScores.forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.name}: ${score.score}`;
        highscoreList.appendChild(listItem);
    });
});

function returnMain () {
    window.location.href = "index.html";
}
