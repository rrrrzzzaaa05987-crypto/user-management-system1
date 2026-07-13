let usersList = [];

const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const ageInput = document.getElementById('age');
const specialtyInput = document.getElementById('specialty');
const userIdInput = document.getElementById('userId');
const submitBtn = document.getElementById('submitBtn');

const tableSection = document.getElementById('tableSection');
const tableBody = document.querySelector('#usersTable tbody');

userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const age = ageInput.value.trim();
    const specialty = specialtyInput.value.trim();
    const id = userIdInput.value;

    if (id) {
        const userIndex = usersList.findIndex(user => user.id == id);
        if (userIndex !== -1) {
            usersList[userIndex] = { id: Number(id), username, age, specialty };
        }
        submitBtn.textContent = "إضافة البيانات";
        submitBtn.classList.remove('update-mode');
    } else {

        const newUser = {
            id: Date.now(),
            username,
            age,
            specialty
        };
        usersList.push(newUser);
    }

    userForm.reset();
    userIdInput.value = '';
    renderTable();
});

function renderTable() {
    tableBody.innerHTML = '';

    if (usersList.length === 0) {
        tableSection.classList.add('hidden');
        return;
    } else {
        tableSection.classList.remove('hidden');
    }

    usersList.forEach(user => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${user.username}</td>
            <td>${user.age}</td>
            <td>${user.specialty}</td>
            <td>
                <button class="action-btn" onclick="editUser(${user.id})">تحديث</button>
                <span class="separator">-</span>
                <button class="action-btn delete" onclick="deleteUser(${user.id})">حذف</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

window.deleteUser = function (id) {
    usersList = usersList.filter(user => user.id !== id);
    renderTable();
};

window.editUser = function (id) {
    const user = usersList.find(user => user.id === id);
    if (user) {
        usernameInput.value = user.username;
        ageInput.value = user.age;
        specialtyInput.value = user.specialty;
        userIdInput.value = user.id;

        submitBtn.textContent = "حفظ التعديلات";
        submitBtn.classList.add('update-mode');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};