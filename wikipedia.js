document.getElementById("searchButton").addEventListener("click", searchWikipedia);

function searchWikipedia() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    if (!searchTerm) {
        alert("Masukkan kata kunci pencarian!");
        return;
    }

    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.query.search);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("results").innerHTML = "<p>Gagal mengambil data. Coba lagi nanti.</p>";
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    
    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>Tidak ada hasil ditemukan.</p>";
        return;
    }

    let html = "";
    results.forEach(result => {
        html += `
            <div class="result-item">
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Baca selengkapnya</a>
            </div>
        `;
    });

    resultsContainer.innerHTML = html;
}