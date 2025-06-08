        document.getElementById('addBtn').addEventListener('click', function() {
            const item = document.getElementById('itemInput').value;
            if (item.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = item;
                document.getElementById('shoppingList').appendChild(li);
                document.getElementById('itemInput').value = '';
            }
        });