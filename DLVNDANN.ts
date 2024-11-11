let people = [];

function renderPeople() {
    const peopleList = document.getElementById('peopleList');
    peopleList.innerHTML = '';
    people.forEach((person, index) => {
        const personCard = document.createElement('div');
        personCard.className = 'person-card';

        const personInfo = document.createElement('div');
        personInfo.className = 'person-info';
        personInfo.innerHTML = `<strong>${person.name}</strong>`;

        const personImage = document.createElement('img');
        personImage.src = person.image;
        personImage.alt = person.name;

        const personLink = document.createElement('a');
        personLink.href = person.link;
        personLink.target = '_blank';
        personLink.appendChild(personImage);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Sửa';
        editButton.onclick = () => editPerson(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.onclick = () => deletePerson(index);

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        personCard.appendChild(personLink);
        personCard.appendChild(personInfo);
        personCard.appendChild(actions);

        peopleList.appendChild(personCard);
    });
}

function addPerson() {
    const nameInput = document.getElementById('name');
    const imageInput = document.getElementById('image');
    const linkInput = document.getElementById('link');

    if (nameInput.value && imageInput.files[0] && linkInput.value) {
        const reader = new FileReader();
        reader.onload = function (e) {
            people.push({
                name: nameInput.value,
                image: e.target.result,
                link: linkInput.value
            });
            nameInput.value = '';
            imageInput.value = '';
            linkInput.value = '';
            renderPeople();
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
}

function editPerson(index) {
    const newName = prompt('Nhập tên mới:', people[index].name);
    const newLink = prompt('Nhập đường link mới:', people[index].link);
    const newImageInput = document.createElement('input');
    newImageInput.type = 'file';
    newImageInput.accept = 'image/*';
    newImageInput.onchange = function () {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (newName && newLink) {
                people[index].name = newName;
                people[index].link = newLink;
                people[index].image = e.target.result;
                renderPeople();
            }
        };
        reader.readAsDataURL(newImageInput.files[0]);
    };

    document.body.appendChild(newImageInput);
    newImageInput.click();
    document.body.removeChild(newImageInput);
}

function deletePerson(index) {
    people.splice(index, 1);
    renderPeople();
}
