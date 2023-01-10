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

    console.log(usersData);
});