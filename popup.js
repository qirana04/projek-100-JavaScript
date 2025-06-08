document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loadDataBtn').addEventListener('click', loadCSVData);
    document.getElementById('nextBtn').addEventListener('click', goToNextParticipant);
    document.getElementById('backBtn').addEventListener('click', goBackToPreviousParticipant);

});

let participants = [];
let currentIndex = 0;
let checkboxValues = []; 

function loadCSVData() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvData = e.target.result;
            parseCSVData(csvData);
        };

        reader.readAsText(file);
    } else {
        alert('Vui lòng chọn một file CSV.');
    }
}

function parseCSVData(csvData) {
    Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,  // This option skips empty lines
        complete: function (results) {
            participants = results.data.filter(row => Object.values(row).some(cell => cell.trim() !== ''));
            displayParticipantList(currentIndex);
        },
        error: function (error) {
            console.error('Lỗi đọc file CSV:', error.message);
        }
    });
}





function displayParticipantList(index) {
    const participantListDiv = document.getElementById('participantList');
    participantListDiv.innerHTML = '';

    const participant = participants[index];

    if (participant) {
        const table = document.createElement('table');
        table.classList.add('table', 'table-hover');

        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');

        const thIndex = document.createElement('th');
        thIndex.appendChild(document.createTextNode('Index'));
        const thMSSV = document.createElement('th');
        thMSSV.appendChild(document.createTextNode('MSSV'));
        const thName = document.createElement('th');
        thName.appendChild(document.createTextNode('Name'));
        const thCheck = document.createElement('th');
        thCheck.appendChild(document.createTextNode('Check'));

        trHead.appendChild(thIndex);
        trHead.appendChild(thMSSV);
        trHead.appendChild(thName);
        trHead.appendChild(thCheck);
        thead.appendChild(trHead);

        const tbody = document.createElement('tbody');
        const trBody = document.createElement('tr');

        const tdIndex = document.createElement('td');
        tdIndex.rowSpan = 2;
        tdIndex.appendChild(document.createTextNode(`${index + 1}/${participants.length}`));
        trBody.appendChild(tdIndex);

        const tdMSSV = document.createElement('td');
        tdMSSV.classList.add('text-start');
        tdMSSV.rowSpan = 2;
        tdMSSV.appendChild(document.createTextNode(participant.MSSV));
        trBody.appendChild(tdMSSV);

        const tdName = document.createElement('td');
        tdName.classList.add('text-start');
        tdName.appendChild(document.createTextNode(`${participant.NAME} ${participant.Mail}`));
        trBody.appendChild(tdName);

        const tdCheck = document.createElement('td');
        tdCheck.classList.add('align-items-center', 'justify-content-center');
        tdCheck.rowSpan = 2;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `participant_${index}`;
        checkbox.value = JSON.stringify(participant);
        checkbox.checked = checkboxValues[index] || false;

        checkbox.addEventListener('change', function () {
            checkboxValues[index] = this.checked;
        });

        tdCheck.appendChild(checkbox);
        trBody.appendChild(tdCheck);

        tbody.appendChild(trBody);

        table.appendChild(thead);
        table.appendChild(tbody);

        participantListDiv.appendChild(table);
    } else {
        alert('No data available to display.');
    }
}



function goToNextParticipant() {
    if (participants.length === 0) {
        alert('No data available to display.');
        return;
    }

    currentIndex++;

    if (currentIndex >= participants.length) {
        copyToClipboard(JSON.stringify(participants));
        currentIndex = 0;
    }

    displayParticipantList(currentIndex);
}

function copyToClipboard(data) {
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
        data[i].checked = checkboxValues[i]
    }

    const totalStudents = data.length;

    const presentStudents = data.filter(student => student.checked).length;

    const absentStudents = data.filter(student => !student.checked);

    const emailTemplate = `
Dear Ms.Huyen, Ms.Tham, Mr.Thanh

I am sending this email to report today's attendance:

- Total members: ${totalStudents}

- Present: ${presentStudents}

- Absent:  
  a. Authorized: 0
  b. Unauthorized: ${absentStudents.length}
    ${absentStudents.map((student, index) => `     ${index + 1}. ${student.NAME}`).join('\n')}

Thank you for taking the time to read my email. If you have any problems, please contact me directly.

Thank you very much.
`;

    const textarea = document.createElement('textarea');
    textarea.value = emailTemplate;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('Data copied to clipboard.');
}


function goBackToPreviousParticipant() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = participants.length - 1;
    }

    displayParticipantList(currentIndex);
}