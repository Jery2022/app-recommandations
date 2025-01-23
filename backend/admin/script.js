const form = document.getElementById('recommendationForm');
const messageDiv = document.getElementById('message');
const recommendationList = document.getElementById('recommendationList');

const userForm = document.getElementById('userForm');
const userMessageDiv = document.getElementById('message');
const userList = document.getElementById('userList');

const meetinForm = document.getElementById('meetingForm');
const meetingMessageDiv = document.getElementById('message');
const meetingList = document.getElementById('meetingList');

function showSection(sectionId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Afficher la section sélectionnée
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}



meetinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('meetingId').value;
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const duration = document.getElementById('duration').value;
    const attendees = document.getElementById('attendees').value.split(',').map(a => a.trim());

    const meetingData = { title, date, location, duration, attendees };

    try {
        let response;
        if (id) {
            response = await fetch(`/api/meetings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(meetingData)
            });
        } else {
            response = await fetch('/api/meetings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(meetingData)
            });
        }

        const result = await response.json();
        if (response.ok) {
            meetingMessageDiv.textContent = 'Réunion enregistrée avec succès !';
            meetingMessageDiv.style.color = 'green';
            loadMeetings();
            meetinForm.reset();
        } else {
            meetingMessageDiv.textContent = result.message;
            meetingMessageDiv.style.color = 'red';
        }
    } catch (error) {
        meetingMessageDiv.textContent = 'Erreur de connexion au serveur.';
        meetingMessageDiv.style.color = 'red';
    }
});

async function loadMeetings() {
    meetingList.innerHTML = '';
    const response = await fetch('http://localhost:5000/api/meetings');
    const meetings = await response.json();

    meetings.forEach(meeting => {
        const li = document.createElement('li');
        li.textContent = `${meeting.title} - Date: ${new Date(meeting.date).toLocaleString()} - Lieu: ${meeting.location} - Durée: ${meeting.duration} min`;
        li.addEventListener('click', () => editMeeting(meeting));
        meetingList.appendChild(li);
    });
}

function editMeeting(meeting) {
    document.getElementById('meetingId').value = meeting._id;
    document.getElementById('title').value = meeting.title;
    document.getElementById('date').value = new Date(meeting.date).toISOString().slice(0, 16);
    document.getElementById('location').value = meeting.location;
    document.getElementById('duration').value = meeting.duration;
    document.getElementById('attendees').value = meeting.attendees.join(', ');
}


/* Gestion du CRUD des recommendations  */

form.addEventListener('submit', async (e) => { 
    e.preventDefault();
    
    const id = document.getElementById('recommendationId').value;
    const content = document.getElementById('content').value;
    const meeting = document.getElementById('meeting').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const status = document.getElementById('status').value;

    const recommendationData = { content, meeting, assignedTo, status };

    try {
        let response;
        if (id) {
            // Mise à jour
            response = await fetch(`/api/recommendations/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recommendationData)
            });
        } else {
            // Création
            response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recommendationData)
            });
        }

        const result = await response.json();
        if (response.ok) {
            messageDiv.textContent = 'Recommandation enregistrée avec succès !';
            messageDiv.style.color = 'green';
            loadRecommendations();
            form.reset();
        } else {
            messageDiv.textContent = result.message || 'Erreur lors de l\'enregistrement.';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.textContent = 'Erreur de connexion au serveur.';
        messageDiv.style.color = 'red';
    }
});

async function loadRecommendations() {
    recommendationList.innerHTML = '';
    //const response = await fetch('/api/recommendations');
    const response = await fetch('http://localhost:5000/api/recommendations');
    const recommendations = await response.json();
    console.log(recommendations.JSON.Object.values);
/*
    recommendations.JSON.Object.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = `${rec.content} - Statut: ${rec.status}`;
        li.addEventListener('click', () => editRecommendation(rec));
        recommendationList.appendChild(li);
    }); */

    // Appelle la fonction pour créer la table des recommendations
   // createTableFromJSON(recommendations);
}

function editRecommendation(rec) {
    document.getElementById('recommendationId').value = rec._id;
    document.getElementById('content').value = rec.content;
    document.getElementById('meeting').value = rec.meeting;
    document.getElementById('assignedTo').value = rec.assignedTo;
    document.getElementById('status').value = rec.status;
}

 // Fonction pour créer la table HTML à partir des données JSON
function createTableFromJSON(jsonData) { // Récupère la référence à l'élément où la table sera ajoutée 
    const tableContainer = document.getElementById('tableContainer'); // Crée l'élément table 
    const table = document.createElement('table'); // Ajoute les en-têtes de colonnes 
    const headerRow = document.createElement('tr'); 
    const headers = Object.keys(jsonData[0]); 
    headers.forEach(headerText => { 
        const header = document.createElement('th'); 
        const textNode = document.createTextNode(headerText); 
        header.appendChild(textNode); 
        headerRow.appendChild(header); 
    }); 
    table.appendChild(headerRow); // Ajoute les lignes de données 
    jsonData.forEach(item => { 
        const row = document.createElement('tr'); 
        Object.values(item).forEach(text => { 
                const cell = document.createElement('td'); 
                const textNode = document.createTextNode(text);
                cell.appendChild(textNode); 
                row.appendChild(cell); 
            }); 
                table.appendChild(row); 
    }); 
    // Ajoute la table à l'élément de conteneur 
    tableContainer.appendChild(table); 
} 


/**
 * Script JS pour la gestion des utilisateurs
 */

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = { name, email, password };

    try {
        let response;
        if (id) {
            response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        } else {
            response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        }

        const result = await response.json();
        if (response.ok) {
            userMessageDiv.textContent = 'Utilisateur enregistré avec succès !';
            userMessageDiv.style.color = 'green';
            loadUsers();
            userForm.reset();
        } else {
            userMessageDiv.textContent = result.message;
            userMessageDiv.style.color = 'red';
        }
    } catch (error) {
        userMessageDiv.textContent = 'Erreur de connexion au serveur.';
        userMessageDiv.style.color = 'red';
    }
});

async function loadUsers() {
    userList.innerHTML = '';
    const response = await fetch('http://localhost:5000/api/users');
    const users = await response.json();
    //afficherUtilisateurs(users);

   
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        li.addEventListener('click', () => editUser(user));
        userList.appendChild(li);
    }); 
}

function editUser(user) {
    document.getElementById('userId').value = user._id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = '';
}

// Fonction pour récupérer et afficher les utilisateurs 
async function afficherUtilisateurs(utilisateurs) { 
    try { 
        utilisateurs.forEach(utilisateur => { 
            console.log(`Nom: ${utilisateur.name}, Email: ${utilisateur.email}, Mot de passe: ${utilisateur.password}`); 
        }); 
    } catch (error) { 
        console.error('Erreur lors de la récupération des utilisateurs:', error); 
    } }


window.onload = loadMeetings;
window.onload = loadRecommendations;
window.onload = loadUsers;
