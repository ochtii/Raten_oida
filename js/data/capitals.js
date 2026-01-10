/* ========================================
   CAPITALS.JS - Daten für Hauptstädte Spiel
   ======================================== */

export const capitalsData = [
    // Europa
    { country: 'Österreich', capital: 'Wien', continent: 'Europa', difficulty: 'easy' },
    { country: 'Deutschland', capital: 'Berlin', continent: 'Europa', difficulty: 'easy' },
    { country: 'Frankreich', capital: 'Paris', continent: 'Europa', difficulty: 'easy' },
    { country: 'Italien', capital: 'Rom', continent: 'Europa', difficulty: 'easy' },
    { country: 'Spanien', capital: 'Madrid', continent: 'Europa', difficulty: 'easy' },
    { country: 'Portugal', capital: 'Lissabon', continent: 'Europa', difficulty: 'easy' },
    { country: 'Vereinigtes Königreich', capital: 'London', continent: 'Europa', difficulty: 'easy' },
    { country: 'Niederlande', capital: 'Amsterdam', continent: 'Europa', difficulty: 'easy' },
    { country: 'Belgien', capital: 'Brüssel', continent: 'Europa', difficulty: 'easy' },
    { country: 'Schweiz', capital: 'Bern', continent: 'Europa', difficulty: 'medium' },
    { country: 'Schweden', capital: 'Stockholm', continent: 'Europa', difficulty: 'medium' },
    { country: 'Norwegen', capital: 'Oslo', continent: 'Europa', difficulty: 'medium' },
    { country: 'Dänemark', capital: 'Kopenhagen', continent: 'Europa', difficulty: 'medium' },
    { country: 'Finnland', capital: 'Helsinki', continent: 'Europa', difficulty: 'medium' },
    { country: 'Polen', capital: 'Warschau', continent: 'Europa', difficulty: 'medium' },
    { country: 'Tschechien', capital: 'Prag', continent: 'Europa', difficulty: 'medium' },
    { country: 'Ungarn', capital: 'Budapest', continent: 'Europa', difficulty: 'medium' },
    { country: 'Griechenland', capital: 'Athen', continent: 'Europa', difficulty: 'easy' },
    { country: 'Irland', capital: 'Dublin', continent: 'Europa', difficulty: 'medium' },
    { country: 'Island', capital: 'Reykjavík', continent: 'Europa', difficulty: 'hard' },
    { country: 'Kroatien', capital: 'Zagreb', continent: 'Europa', difficulty: 'hard' },
    { country: 'Slowakei', capital: 'Bratislava', continent: 'Europa', difficulty: 'hard' },
    { country: 'Slowenien', capital: 'Ljubljana', continent: 'Europa', difficulty: 'hard' },
    { country: 'Rumänien', capital: 'Bukarest', continent: 'Europa', difficulty: 'hard' },
    { country: 'Bulgarien', capital: 'Sofia', continent: 'Europa', difficulty: 'hard' },

    // Asien
    { country: 'Japan', capital: 'Tokio', continent: 'Asien', difficulty: 'easy' },
    { country: 'China', capital: 'Peking', continent: 'Asien', difficulty: 'easy' },
    { country: 'Indien', capital: 'Neu-Delhi', continent: 'Asien', difficulty: 'medium' },
    { country: 'Südkorea', capital: 'Seoul', continent: 'Asien', difficulty: 'medium' },
    { country: 'Thailand', capital: 'Bangkok', continent: 'Asien', difficulty: 'medium' },
    { country: 'Vietnam', capital: 'Hanoi', continent: 'Asien', difficulty: 'hard' },
    { country: 'Indonesien', capital: 'Jakarta', continent: 'Asien', difficulty: 'hard' },
    { country: 'Philippinen', capital: 'Manila', continent: 'Asien', difficulty: 'hard' },
    { country: 'Malaysia', capital: 'Kuala Lumpur', continent: 'Asien', difficulty: 'hard' },
    { country: 'Singapur', capital: 'Singapur', continent: 'Asien', difficulty: 'easy' },

    // Amerika
    { country: 'USA', capital: 'Washington D.C.', continent: 'Amerika', difficulty: 'easy' },
    { country: 'Kanada', capital: 'Ottawa', continent: 'Amerika', difficulty: 'medium' },
    { country: 'Mexiko', capital: 'Mexiko-Stadt', continent: 'Amerika', difficulty: 'medium' },
    { country: 'Brasilien', capital: 'Brasília', continent: 'Amerika', difficulty: 'hard' },
    { country: 'Argentinien', capital: 'Buenos Aires', continent: 'Amerika', difficulty: 'medium' },
    { country: 'Chile', capital: 'Santiago', continent: 'Amerika', difficulty: 'hard' },
    { country: 'Peru', capital: 'Lima', continent: 'Amerika', difficulty: 'hard' },
    { country: 'Kolumbien', capital: 'Bogotá', continent: 'Amerika', difficulty: 'hard' },

    // Afrika
    { country: 'Ägypten', capital: 'Kairo', continent: 'Afrika', difficulty: 'easy' },
    { country: 'Südafrika', capital: 'Pretoria', continent: 'Afrika', difficulty: 'hard' },
    { country: 'Nigeria', capital: 'Abuja', continent: 'Afrika', difficulty: 'hard' },
    { country: 'Kenia', capital: 'Nairobi', continent: 'Afrika', difficulty: 'medium' },
    { country: 'Marokko', capital: 'Rabat', continent: 'Afrika', difficulty: 'hard' },
    { country: 'Algerien', capital: 'Algier', continent: 'Afrika', difficulty: 'hard' },

    // Ozeanien
    { country: 'Australien', capital: 'Canberra', continent: 'Ozeanien', difficulty: 'hard' },
    { country: 'Neuseeland', capital: 'Wellington', continent: 'Ozeanien', difficulty: 'hard' }
];

// Helper: Filterung nach Schwierigkeit
export const getCapitalsByDifficulty = (difficulty) => {
    if (difficulty === 'all') return capitalsData;
    return capitalsData.filter(item => item.difficulty === difficulty);
};

// Helper: Filterung nach Kontinent
export const getCapitalsByContinent = (continent) => {
    if (continent === 'all') return capitalsData;
    return capitalsData.filter(item => item.continent === continent);
};

// Helper: Zufälliges Item
export const getRandomCapital = (excludeCountries = []) => {
    const available = capitalsData.filter(item => !excludeCountries.includes(item.country));
    return available[Math.floor(Math.random() * available.length)];
};

// Helper: Falsche Antworten generieren
export const generateWrongAnswers = (correctCapital, count = 3) => {
    const wrongAnswers = [];
    const usedCapitals = [correctCapital];

    while (wrongAnswers.length < count) {
        const random = capitalsData[Math.floor(Math.random() * capitalsData.length)];
        if (!usedCapitals.includes(random.capital)) {
            wrongAnswers.push(random.capital);
            usedCapitals.push(random.capital);
        }
    }

    return wrongAnswers;
};
