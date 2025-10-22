// ====== SEARCH BAR. ======
const pages = [
  { title: "Home", url: "index.html" },
  { title: "About Us", url: "about-us.html" },
  { title: "Contact Us", url: "contact-us.html" },
  { title: "APECO", url: "apeco.html" },
  { title: "Manufacturing", url: "Manufacturing.html" },
  { title: "Industrial Supply", url: "Industrial-Supply.html" },
  { title: "Inspection & Testing", url: "Inspection&Testing.html" },
  { title: "Real Estate", url: "realestate.html" },
  { title: "Trading", url: "trading.html" },
  { title: "Tourism", url: "tourism.html" },
  { title: "Yacht", url: "yacht.html" },
  { title: "Vice President", url: "vicepresident.html"},
  { title: "President", url: "president.html"},
  { title: "Bits", url: "bits.html"},
  { title: "Automobiles", url: "Automobiles.html"},
  { title: "GHI", url: "ghi.html"},
  { title: "ISS", url: "iss.html"},
  { title: "Techno Serve", url: "techno-serve.html"},
  { title: "Services", url: "Service-v2.html"},
  { title: "Saudi Water", url: "saudiwater.html"},
  { title: "GMC", url: "gmc.html"},
  { title: "Al Raya", url: "alraya.html"},
  { title: "Clients", url: "clients.html"},
  { title: "Saudi Oil", url: "saudi-oil.html"},
  { title: "Travel&Tourism", url: "travel&tourism.html"}




];

function searchSite() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = "";

  // hide if empty
  if (!query) {
    resultsDiv.style.display = "none";
    resultsDiv.classList.remove("show");
    return;
  }

  // strict: only starts with the same letters (first letter or more)
  const results = pages.filter(p => {
    const title = p.title.toLowerCase();
    return title.startsWith(query); // must start with query
  });

  // show matching results
  if (results.length > 0) {
    resultsDiv.style.display = "block";
    resultsDiv.classList.add("show");
    results.forEach(r => {
      const link = document.createElement("a");
      link.href = r.url;
      link.textContent = r.title;
      link.className = "result-item";
      resultsDiv.appendChild(link);
    });
  } else {
    resultsDiv.style.display = "block";
    resultsDiv.classList.add("show");
    resultsDiv.innerHTML = "<p class='no-results'>No pages found.</p>";
  }
}
