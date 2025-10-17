// Game patch notes data with official sources
const patchNotesData = [
    {
        game: 'grim-dawn',
        gameName: 'Grim Dawn',
        updates: [
            {
                title: 'Latest Patch Notes',
                description: 'Check the Steam Community Announcements for the most recent Grim Dawn updates, balance changes, and bug fixes.',
                link: 'https://store.steampowered.com/news/?appids=219990',
                date: 'Visit for latest'
            },
            {
                title: 'Official Wiki Patch Notes',
                description: 'Browse comprehensive patch history and detailed changelogs on the official Grim Dawn Wiki.',
                link: 'https://grimdawn.fandom.com/wiki/Category:Patch_Notes',
                date: 'Archive'
            }
        ]
    },
    {
        game: 'poe2',
        gameName: 'Path of Exile 2',
        updates: [
            {
                title: 'Official Patch Notes Forum',
                description: 'Visit the official Path of Exile forum for the latest patch notes, hotfixes, and game updates.',
                link: 'https://www.pathofexile.com/forum/view-forum/patch-notes',
                date: 'Visit for latest'
            },
            {
                title: 'Steam News Updates',
                description: 'Follow Path of Exile 2 updates directly through Steam for quick access to recent patches.',
                link: 'https://store.steampowered.com/news/app/2694490',
                date: 'Steam Updates'
            }
        ]
    },
    {
        game: 'soulframe',
        gameName: 'Soulframe',
        updates: [
            {
                title: 'Official Soulframe Patch Notes',
                description: 'Access the official Soulframe patch notes page for all Preludes updates, hotfixes, and new features.',
                link: 'https://www.soulframe.com/en/patch-notes',
                date: 'Visit for latest'
            },
            {
                title: 'Community Forum Updates',
                description: 'Join the discussion and read detailed update notes on the Soulframe community forums.',
                link: 'https://forums.soulframe.com/forum/6-update-notes/',
                date: 'Community'
            }
        ]
    },
    {
        game: 'warframe',
        gameName: 'Warframe',
        updates: [
            {
                title: 'Official Warframe Patch Notes',
                description: 'Stay current with all Warframe updates, including major releases, hotfixes, and balance changes.',
                link: 'https://www.warframe.com/patch-notes',
                date: 'Visit for latest'
            },
            {
                title: 'PC Update Notes Forum',
                description: 'Read detailed PC update notes and community discussions on the official Warframe forums.',
                link: 'https://forums.warframe.com/forum/3-pc-update-notes/',
                date: 'Forum'
            }
        ]
    },
    {
        game: 'space-marine-2',
        gameName: 'Space Marine 2',
        updates: [
            {
                title: 'Focus Entertainment Community',
                description: 'Access official Space Marine 2 patch notes, including new operations, weapons, and balancing updates.',
                link: 'https://community.focus-entmt.com/focus-entertainment/space-marine-2/forums/4-patch-notes',
                date: 'Visit for latest'
            },
            {
                title: 'Steam News Updates',
                description: 'Follow Space Marine 2 updates through Steam for announcements and patch details.',
                link: 'https://store.steampowered.com/news/app/2183900',
                date: 'Steam Updates'
            }
        ]
    }
];

// State management
let currentFilter = 'all';
let allNewsItems = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    loadPatchNotes();
    updateLastUpdatedTime();
}

function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.game;
            filterNews();
        });
    });

    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', () => {
        refreshBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            refreshBtn.style.transform = '';
            loadPatchNotes();
            updateLastUpdatedTime();
        }, 500);
    });
}

function loadPatchNotes() {
    const newsFeed = document.getElementById('newsFeed');
    
    // Clear existing content
    newsFeed.innerHTML = '';
    allNewsItems = [];

    // Generate news cards from data
    patchNotesData.forEach(gameData => {
        gameData.updates.forEach(update => {
            const newsCard = createNewsCard(gameData.game, gameData.gameName, update);
            allNewsItems.push({ element: newsCard, game: gameData.game });
        });
    });

    // Shuffle for variety
    shuffleArray(allNewsItems);

    // Add all items to the feed
    allNewsItems.forEach(item => {
        newsFeed.appendChild(item.element);
    });

    // Apply current filter
    filterNews();
}

function createNewsCard(gameId, gameName, update) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.dataset.game = gameId;

    card.innerHTML = `
        <div class="news-header">
            <span class="game-badge">${gameName}</span>
            <span class="news-date">${update.date}</span>
        </div>
        <div class="news-content">
            <h3 class="news-title">${update.title}</h3>
            <p class="news-description">${update.description}</p>
            <a href="${update.link}" target="_blank" rel="noopener noreferrer" class="news-link">
                Read More →
            </a>
        </div>
    `;

    return card;
}

function filterNews() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        if (currentFilter === 'all' || card.dataset.game === currentFilter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // Check if any cards are visible
    const visibleCards = document.querySelectorAll('.news-card:not(.hidden)');
    const newsFeed = document.getElementById('newsFeed');
    
    if (visibleCards.length === 0) {
        showEmptyState();
    }
}

function showEmptyState() {
    const newsFeed = document.getElementById('newsFeed');
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <div class="empty-state-icon">📭</div>
        <p class="empty-state-text">No patch notes found for this filter.</p>
    `;
    newsFeed.appendChild(emptyState);
}

function updateLastUpdatedTime() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
    });
    lastUpdatedElement.textContent = `Last updated: ${timeString}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Add some helpful information to the console
console.log('%c🎮 Game Patch Notes Feed', 'color: #00ff00; font-size: 20px; font-weight: bold;');
console.log('%cTracking updates for:', 'color: #00ff00; font-weight: bold;');
console.log('- Grim Dawn');
console.log('- Path of Exile 2');
console.log('- Soulframe');
console.log('- Warframe');
console.log('- Space Marine 2');
console.log('%cClick the links to visit official patch notes pages!', 'color: #00cc00; font-style: italic;');
