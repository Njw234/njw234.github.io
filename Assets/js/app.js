const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

const grid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll(".filter-btn");

let allProjects = [];
let activeFilter = 'all';

function createProjectCard(p){
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
        <img src="${p.image}" alt="${p.title} preview" />
        <div class="card-body">
            <h3>${p.title}</h3>
            <p>${p.summary}</p>
            <div class="tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <div class="actions">
                      ${p.links.map(l => `<a class="btn ghost" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join("")}
            </div>
        </div>
    `;
    return card;
}

function render(){
    grid.innerHTML = '';
    const filtered = allProjects.filter(p => activeFilter === 'all' ? true : p.category === activeFilter);

    filtered.forEach(p => grid.appendChild(createProjectCard(p)));

}

async function loadProjects(){
    const res = await fetch('Projects.json');
    allProjects = await res.json();
    render();
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeFilter = btn.dataset.filter;
        render();
    });
});

loadProjects();