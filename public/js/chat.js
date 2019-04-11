const socket = io();

// Elements
const $messageForm = document.querySelector('#messageForm');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#sendLocation');

socket.on('message', (message) => {
    console.log(message);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //disable form
    $messageFormButton.setAttribute('disabled', 'disabled');
    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        // enable form
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(error)
        {
            return console.log(error);
        }
        console.log('message delivered');
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation)
    {
        return alert('Getlocation is no supported by your browser!');
    }
    $sendLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {latitude: position.coords.latitude, longitude: position.coords.longitude}, (error) => {
            $sendLocationButton.removeAttribute('disabled');
            if (error)
            {
                return console.log(error);
            }
            console.log('location shared');
        })
    })
})