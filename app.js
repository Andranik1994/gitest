document.getElementById('testCaseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('testCaseName').value;
    const description = document.getElementById('testCaseDescription').value;

    // Create a Markdown file content
    const mdContent = `# ${name}\n\n${description}`;

    // Generate a file name from the test case name
    const fileName = `${name.replace(/\s+/g, '_').toLowerCase()}.md`;

    // Display the test case in the list
    const li = document.createElement('li');
    li.textContent = `${name}: ${description}`;
    document.getElementById('testCaseList').appendChild(li);

    // Here you would trigger a function to save the file to the repository
    saveTestCase(fileName, mdContent);

    // Clear the form
    e.target.reset();
});

// Function to save the Markdown file to the repository
async function saveTestCase(fileName, content) {
    // Note: This requires setting up GitHub API access. You'll need a GitHub token with permissions to push to your repository.
    
    const response = await fetch(`https://api.github.com/repos/Andranik1994/gitest/contents/test-cases/${fileName}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer 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`,  // Replace with your token
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: `Add test case: ${fileName}`,
            content: btoa(content),  // Encode content to Base64
            branch: 'main'  // Specify your branch here
        })
    });
    console.log(fileName)
    if (response.ok) {
        console.log('Test case saved successfully!');
    } else {
        console.error('Failed to save test case:', await response.json());
    }
}
