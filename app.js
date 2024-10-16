document.getElementById('testCaseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('testCaseName').value;
    const description = document.getElementById('testCaseDescription').value;

    const li = document.createElement('li');
    li.textContent = `${name}: ${description}`;
    document.getElementById('testCaseList').appendChild(li);

    // Clear the form
    e.target.reset();
});
