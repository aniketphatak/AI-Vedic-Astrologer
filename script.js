// Replace with your OpenAI API key
const apiKey = ''; // Add your OpenAI API Key here

// Event listener for form submission
document.getElementById('chat-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const userInput = document.getElementById('user-input').value;
    addMessageToChatbox('You', userInput);

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Prepare the payload for GPT API request
    const payload = {
        model: 'gpt-3.5-turbo', // Or your Custom GPT model name
        messages: [{ role: 'user', content: userInput }],
        max_tokens: 150
    };

    try {
        // Make request to OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Authenticate with API Key
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const gptMessage = data.choices[0].message.content.trim();
        addMessageToChatbox('Vedic Astrologer', gptMessage);
    } catch (error) {
        console.error('Error fetching GPT response:', error);
        addMessageToChatbox('Vedic Astrologer', 'Sorry, there was an error. Please try again.');
    }
});

// Function to add messages to the chatbox
function addMessageToChatbox(sender, message) {
    const conversationDiv = document.getElementById('conversation');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    conversationDiv.appendChild(messageDiv);

    // Scroll to the bottom of the chatbox
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}
