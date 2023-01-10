const addPinModal = document.querySelector('.addPinModal');

document.querySelector('.addPin').addEventListener('click', () => {
    addPinModal.style.opacity = 1;
    addPinModal.style.pointerEvents = 'all';
});

addPinModal.addEventListener('click', event => {
    if (event.target === addPinModal) {
        resetModal();
    }
});

let pinImageBlob = null;

document.querySelector('#uploadImage').addEventListener('change', event =>{
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();

            reader.onload = function() {
                const newImage = new Image();
                newImage.src = reader.result;
                pinImageBlob = reader.result;

                newImage.onload = function() {
                    const modalsPin = document.querySelector('.addPinModal .modalsPin');

                    newImage.classList.add("pinMaxWidth");

                    document.querySelector('.addPinModal .pinImage').appendChild(newImage);
                    document.querySelector('#uploadImageLabel').style.display = 'none';

                    modalsPin.style.display = 'block';

                    if (
                        newImage.getBoundingClientRect().width < newImage.parentElement.getBoundingClientRect().width ||
                        newImage.getBoundingClientRect().height < newImage.parentElement.getBoundingClientRect().height 
                    ) {
                        newImage.classList.remove('pinMaxWidth');
                        newImage.classList.add('pinMaxHeight');
                    }

                    modalsPin.style.opacity = 1;
                }   
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    document.querySelector('#uploadImage').value = '';
} );

document.querySelector('.savePin').addEventListener('click', () => {
    const usersData = {
        author: 'Default',
        board: 'Default',
        title: document.querySelector('#pinTitle').value,
        description: document.querySelector('#pinDescription').value,
        destination: document.querySelector('#pinDestination').value,
        imageBlob: pinImageBlob,
        pinSize: document.querySelector('#pinSize').value
    }

    createPin(usersData);
    resetModal();
});

function createPin(pinDetails) {
    const newPin = document.createElement('DIV');
    const newImage = new Image();

    newImage.src = pinDetails.imageBlob;
    newPin.style.opacity = 0;

    newImage.onload = function() {
        newPin.classList.add('card');
        newImage.classList.add('pinMaxWidth');

        newPin.innerHTML =`
        <div class="pinTitle"> 
        ${pinDetails.title}
        </div>
        <div class="pinModal"> 
            <div class="modalHead">
                <div class="saveCard">Save</div>
            </div>
            <div class="modalFoot">
                <div class="destination">
                    <div class="pinMockIconContainer">
                        <img src="image/upper_right_arrow.png" alt="destination" class="pinMockIcon">
                    </div>
                    <span>${pinDetails.destination}</span>
                </div>
                <div class="pinMockIconContainer">
                    <img src="image/send_arrow.png" alt="send" class="pinMockIcon">
                </div>
                <div class="pinMockIconContainer">
                    <img src="image/elipsis.png" alt="edit" class="pinMockIcon">
                </div>
            </div>
        </div>

        <div class="pinImage">
        </div>
        `;
        document.querySelector('.pinContainer').appendChild(newPin);
        newPin.children[2].appendChild(newImage);
        if (
            newImage.getBoundingClientRect().width < newImage.parentElement.getBoundingClientRect().width ||
            newImage.getBoundingClientRect().height < newImage.parentElement.getBoundingClientRect().height 
        ) {
            newImage.classList.remove('pinMaxWidth');
            newImage.classList.add('pinMaxHeight');
        }

        newPin.style.opacity = 1;
    }

}

function resetModal() {
    const modalsPin = document.querySelector('.addPinModal .modalsPin');
    addPinModal.style.opacity = 0;
    addPinModal.style.pointerEvents = 'none';
    document.querySelector('#uploadImageLabel').style.display = 'block';
    modalsPin.style.display = 'none';
    modalsPin.style.opacity = 0;

    if(modalsPin.children[0].children[0]) {
        modalsPin.children[0].removeChild(modalsPin.children[0].children[0]);
    }

    document.querySelector('#pinTitle').value = '';
    document.querySelector('#pinDescription').value = '';
    document.querySelector('#pinDestination').value = '';
    document.querySelector('#pinSize').value = '';
    pinImageBlob = null;
}