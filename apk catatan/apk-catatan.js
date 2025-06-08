        function addNote() {
            const noteText = document.getElementById('noteInput').value.trim();
            if (noteText) {
                const noteElement = document.createElement('div');
                noteElement.className = 'note';
                noteElement.textContent = noteText;
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Hapus';
                deleteButton.onclick = function() {
                    noteElement.remove();
                };
                
                noteElement.appendChild(deleteButton);
                document.getElementById('notesContainer').appendChild(noteElement);
                document.getElementById('noteInput').value = '';
            }
        }