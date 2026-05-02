let extensionsData = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('extensions-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Theme Toggle Logic
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const iconContainer = document.getElementById('theme-icon-container');

    if (isDark) {
      iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2.5a.625.625 0 0 0-.625.625v1.25a.625.625 0 1 0 1.25 0v-1.25A.625.625 0 0 0 10 2.5Zm0 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 1.25a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Zm-5-7.5a.625.625 0 0 0-.625-.625h-1.25a.625.625 0 1 0 0 1.25h1.25A.625.625 0 0 0 5 8.75Zm11.875-.625a.625.625 0 1 0 0 1.25h1.25a.625.625 0 1 0 0-1.25h-1.25Zm-12.02 5.586a.625.625 0 1 0-.884.884l.884.884a.625.625 0 0 0 .884-.884l-.884-.884Zm10.158-9.274a.625.625 0 0 0-.884.884l.884.884a.625.625 0 0 0 .884-.884l-.884-.884Zm-.884 10.158a.625.625 0 0 0 .884.884l.884-.884a.625.625 0 0 0-.884-.884l-.884.884ZM4.855 4.855a.625.625 0 1 0-.884.884l.884.884a.625.625 0 0 0 .884-.884l-.884-.884ZM10 15.625a.625.625 0 0 0-.625.625v1.25a.625.625 0 1 0 1.25 0v-1.25A.625.625 0 0 0 10 15.625Z"/></svg>`; // Sun
    } else {
      iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M12.91 3.51a.625.625 0 0 1 .494.996 5.626 5.626 0 0 0 1.94 8.019 5.625 5.625 0 0 0 2.219.467.625.625 0 0 1 .374 1.135 6.875 6.875 0 1 1-5.632-10.59.625.625 0 0 1 .605-.027Zm-3.528 2.03a5.625 5.625 0 1 0 6.136 9.07 6.877 6.877 0 0 1-6.136-9.07Z" clip-rule="evenodd"/></svg>`; // Moon
    }
  }

  updateThemeIcon();

  // Fetch Data
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      extensionsData = data;
      renderExtensions();
    })
    .catch(err => console.error('Error fetching data:', err));

  // Filtering Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      renderExtensions();
    });
  });

  // Render Function
  function renderExtensions() {
    grid.innerHTML = '';
    let filteredData = extensionsData;

    if (currentFilter === 'active') {
      filteredData = extensionsData.filter(ext => ext.isActive);
    } else if (currentFilter === 'inactive') {
      filteredData = extensionsData.filter(ext => !ext.isActive);
    }

    filteredData.forEach((ext, index) => {
      const card = document.createElement('div');
      card.className = 'card';

      const originalIndex = extensionsData.findIndex(e => e.name === ext.name);

      card.innerHTML = `
        <div class="card-header">
          <div class="card-icon">
            <img src="${ext.logo}" alt="${ext.name} Logo">
          </div>
          <div class="card-info">
            <h2 class="card-title">${ext.name}</h2>
            <p class="card-desc">${ext.description}</p>
          </div>
        </div>
        <div class="card-actions">
          <button class="remove-btn" data-index="${originalIndex}">Remove</button>
          <label class="toggle-switch">
            <input type="checkbox" class="toggle-active" data-index="${originalIndex}" ${ext.isActive ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
      `;
      
      grid.appendChild(card);
    });

    // Attach Event Listeners to generated elements
    document.querySelectorAll('.toggle-active').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const idx = e.target.getAttribute('data-index');
        extensionsData[idx].isActive = e.target.checked;
        if(currentFilter !== 'all') {
          // Add small delay to let the animation play before re-rendering
          setTimeout(renderExtensions, 300);
        }
      });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        extensionsData.splice(idx, 1);
        renderExtensions();
      });
    });
  }
});
