document.querySelector('#smsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const phoneNumbers = document.querySelector('#phoneNumbers').value.split(',').map(num => num.trim());
    const message = document.querySelector('#message').value;

    // Construct the request body
    const raw = JSON.stringify({
        sender_id: "681624d5-91c7-4ecb-b3ba-807859d51cb5", // Ensure this is secure and fetched from server-side ideally
        message: message,
        recipients: phoneNumbers
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'qJbFfI1vjAEXAjly0u9ipF0N1JYypSPJS4W9yye1',
            'Accept': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    // Send the SMS using the Fetch API
    fetch("https://api.bulkclix.com/api/v1/sms-api/send", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
        })
        .then(result => {
            console.log(result);
            document.getElementById('responseMessage').innerText = "SMS sent successfully!";
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('responseMessage').innerText = "Failed to send SMS.";
        });
});
