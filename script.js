document.getElementById('birth-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const birthDate = document.getElementById('birthDate').value;
    const birthTime = document.getElementById('birthTime').value;
    const birthLocation = document.getElementById('birthLocation').value;

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Fetching birth chart...';

    // Prepare the payload for your GPT model request
    const data = {
        birthDate: birthDate,
        birthTime: birthTime,
        birthLocation: birthLocation
    };

    try {
        // Call the backend API to get the birth chart analysis (replace with your API endpoint)
        const response = await fetch('https://your-backend-url.com/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        responseDiv.innerHTML = `<p>${result.analysis}</p>`;
    } catch (error) {
        responseDiv.innerHTML = 'Error fetching birth chart. Please try again later.';
        console.error('Error:', error);
    }
});
