const token = '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'; 
const repoOwner = 'Andranik1994';
const repoName = 'gitest';

// Function to add a new test case
async function addTestCase(title, description) {
    const content = `# ${title}\n\n${description}`;
    const fileName = `test-cases/${title.replace(/\s+/g, '_')}.md`;
    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: `Add new test case: ${title}`,
            content: encodedContent
        })
    });

    if (response.ok) {
        alert('Test case added successfully!');
        fetchTestCases(); // Refresh the list of test cases
    } else {
        alert('Failed to add test case.');
    }
}

// Function to fetch and display existing test cases
async function fetchTestCases() {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/test-cases`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });

    if (response.ok) {
        const files = await response.json();
        const testCasesList = document.getElementById('testCasesList');
        testCasesList.innerHTML = '';

        files.forEach(file => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `<a href="${file.html_url}" target="_blank">${file.name}</a>`;
            testCasesList.appendChild(listItem);
        });
    } else {
        alert('Failed to fetch test cases.');
    }
}

// Event listener for form submission
document.getElementById('addTestCaseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('testCaseTitle').value;
    const description = document.getElementById('testCaseDescription').value;

    addTestCase(title, description);
});

// Fetch the list of test cases when the page loads
window.onload = fetchTestCases;
