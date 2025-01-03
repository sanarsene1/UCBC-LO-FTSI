
let members = {};
let adminPassword = null;
let isPasswordSet = false;

function toggleMenu() {
    document.querySelector('.menu').classList.toggle('show');
}

function setPassword() {
    if (adminPassword) {
        alert("Un mot de passe a déjà été défini.");
        return;
    }
    const newPassword = prompt("Entrez votre nouveau mot de passe");
    if (!newPassword || newPassword.length < 6) {
        alert("Le mot de passe doit comporter au moins 6 caractères.");
        return;
    }
    adminPassword = newPassword;
    isPasswordSet = true;
    alert("Le mot de passe a été défini avec succès !");
}

function resetPassword() {
    const currentPassword = prompt("Entrez le mot de passe actuel pour réinitialiser");
    if (currentPassword !== adminPassword) {
        alert("Le mot de passe actuel est incorrect.");
        return;
    }

    const newPassword = prompt("Entrez votre nouveau mot de passe");
    if (!newPassword || newPassword.length < 6) {
        alert("Le mot de passe doit comporter au moins 6 caractères.");
        return;
    }
    adminPassword = newPassword;
    alert("Le mot de passe a été réinitialisé avec succès !");
}

function checkAdminPassword() {
    if (!adminPassword) {
        alert("Aucun mot de passe défini, veuillez le définir d'abord.");
        return false;
    }

    const enteredPassword = prompt("Entrez le mot de passe administrateur");
    if (enteredPassword !== adminPassword) {
        alert("Mot de passe incorrect.");
        return false;
    }
    return true;
}

function addMember() {
    if (adminPassword && !checkAdminPassword()) return;

    const name = document.getElementById("memberName").value.trim();
    if (!name) {
        alert("Veuillez entrer un nom de membre.");
        return;
    }

    if (members[name]) {
        alert("Ce membre existe déjà !");
        return;
    }

    members[name] = Array(52).fill(0);
    alert(`Membre ${name} ajouté avec succès.`);
    document.getElementById("memberName").value = "";
}

function searchMember() {
    const searchName = document.getElementById("searchMemberName").value.trim();
    const table = document.getElementById("resultsTable");
    const tbody = document.getElementById("resultsBody");

    if (!searchName || !members[searchName]) {
        alert("Membre introuvable.");
        table.classList.add("hidden");
        return;
    }

    tbody.innerHTML = "";
    members[searchName].forEach((status, week) => {
        const row = `<tr>
            <td>Semaine ${week + 1}</td>
            <td>${status} FC</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    table.classList.remove("hidden");
}

function modifyMemberPayment() {
    if (adminPassword && !checkAdminPassword()) return;

    const memberName = prompt("Entrez le nom du membre dont vous voulez modifier le paiement");
    if (!members[memberName]) {
        alert("Le membre n'existe pas.");
        return;
    }

    const week = parseInt(prompt("Entrez le numéro de la semaine à modifier (1 à 52)")) - 1;
    if (week < 0 || week > 51) {
        alert("Numéro de semaine invalide.");
        return;
    }

    members[memberName][week] += 500;
    alert(`Montant de la semaine ${week + 1} mis à jour : ${members[memberName][week]} FC.`);
}

function showHelp() {
    alert("Aide :
1. Ajouter un membre avec un mot de passe admin.
2. Rechercher un membre en saisissant son nom.
3. Modifier un paiement d'un membre via l'option d'administration. 
4 développeur: arsenenzanzu19@gmail.com");
}

function showTerms() {
    const termsText = `Politique d'Utilisation:
- Ce système est destiné à gérer les cotisations des étudiants de L0 en FTSI
- Toute tentative de piratage ou de modification illégale des paiements entraînera une exclusion immédiate.
- Si un membre tente de falsifier son statut de paiement, sa cotisation sera réinitialisée, et il pourra être banni.

Veuillez respecter l'intégrité des informations pour un fonctionnement optimal du registre des cotisations.`;

    alert(termsText);
}
