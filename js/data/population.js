/* ========================================
   POPULATION.JS - Daten für Einwohner Battle
   ======================================== */

export const populationData = [
    // Weltweite Großstädte
    { city: 'Tokio', country: 'Japan', population: 37400000, continent: 'Asien' },
    { city: 'Delhi', country: 'Indien', population: 31400000, continent: 'Asien' },
    { city: 'Shanghai', country: 'China', population: 27800000, continent: 'Asien' },
    { city: 'São Paulo', country: 'Brasilien', population: 22400000, continent: 'Amerika' },
    { city: 'Mumbai', country: 'Indien', population: 20700000, continent: 'Asien' },
    { city: 'Peking', country: 'China', population: 20500000, continent: 'Asien' },
    { city: 'Kairo', country: 'Ägypten', population: 20900000, continent: 'Afrika' },
    { city: 'Dhaka', country: 'Bangladesch', population: 21000000, continent: 'Asien' },
    { city: 'Mexiko-Stadt', country: 'Mexiko', population: 21800000, continent: 'Amerika' },
    { city: 'New York', country: 'USA', population: 18800000, continent: 'Amerika' },
    { city: 'Karatschi', country: 'Pakistan', population: 16000000, continent: 'Asien' },
    { city: 'Buenos Aires', country: 'Argentinien', population: 15200000, continent: 'Amerika' },
    { city: 'Istanbul', country: 'Türkei', population: 15400000, continent: 'Europa/Asien' },
    { city: 'Kalkutta', country: 'Indien', population: 14900000, continent: 'Asien' },
    { city: 'Manila', country: 'Philippinen', population: 14000000, continent: 'Asien' },
    { city: 'Lagos', country: 'Nigeria', population: 14300000, continent: 'Afrika' },
    { city: 'Los Angeles', country: 'USA', population: 12500000, continent: 'Amerika' },
    { city: 'Rio de Janeiro', country: 'Brasilien', population: 13600000, continent: 'Amerika' },
    { city: 'Moskau', country: 'Russland', population: 12600000, continent: 'Europa' },
    { city: 'Osaka', country: 'Japan', population: 19300000, continent: 'Asien' },

    // Europa
    { city: 'London', country: 'Vereinigtes Königreich', population: 9300000, continent: 'Europa' },
    { city: 'Paris', country: 'Frankreich', population: 11000000, continent: 'Europa' },
    { city: 'Madrid', country: 'Spanien', population: 6700000, continent: 'Europa' },
    { city: 'Barcelona', country: 'Spanien', population: 5600000, continent: 'Europa' },
    { city: 'Rom', country: 'Italien', population: 4300000, continent: 'Europa' },
    { city: 'Berlin', country: 'Deutschland', population: 3800000, continent: 'Europa' },
    { city: 'Wien', country: 'Österreich', population: 1900000, continent: 'Europa' },
    { city: 'Hamburg', country: 'Deutschland', population: 1900000, continent: 'Europa' },
    { city: 'München', country: 'Deutschland', population: 1500000, continent: 'Europa' },
    { city: 'Warschau', country: 'Polen', population: 1800000, continent: 'Europa' },
    { city: 'Budapest', country: 'Ungarn', population: 1800000, continent: 'Europa' },
    { city: 'Bukarest', country: 'Rumänien', population: 1900000, continent: 'Europa' },
    { city: 'Prag', country: 'Tschechien', population: 1300000, continent: 'Europa' },
    { city: 'Kopenhagen', country: 'Dänemark', population: 1300000, continent: 'Europa' },
    { city: 'Stockholm', country: 'Schweden', population: 1600000, continent: 'Europa' },
    { city: 'Amsterdam', country: 'Niederlande', population: 1100000, continent: 'Europa' },
    { city: 'Brüssel', country: 'Belgien', population: 1200000, continent: 'Europa' },
    { city: 'Athen', country: 'Griechenland', population: 3200000, continent: 'Europa' },
    { city: 'Lissabon', country: 'Portugal', population: 2900000, continent: 'Europa' },
    { city: 'Dublin', country: 'Irland', population: 1200000, continent: 'Europa' },

    // Weitere Großstädte
    { city: 'Bangkok', country: 'Thailand', population: 10700000, continent: 'Asien' },
    { city: 'Seoul', country: 'Südkorea', population: 9700000, continent: 'Asien' },
    { city: 'Jakarta', country: 'Indonesien', population: 10600000, continent: 'Asien' },
    { city: 'Singapur', country: 'Singapur', population: 5900000, continent: 'Asien' },
    { city: 'Hongkong', country: 'China', population: 7500000, continent: 'Asien' },
    { city: 'Toronto', country: 'Kanada', population: 6200000, continent: 'Amerika' },
    { city: 'Chicago', country: 'USA', population: 8900000, continent: 'Amerika' },
    { city: 'Houston', country: 'USA', population: 7100000, continent: 'Amerika' },
    { city: 'Sydney', country: 'Australien', population: 5300000, continent: 'Ozeanien' },
    { city: 'Melbourne', country: 'Australien', population: 5000000, continent: 'Ozeanien' },

    // Österreichische Städte (für lokalen Bezug)
    { city: 'Graz', country: 'Österreich', population: 290000, continent: 'Europa' },
    { city: 'Linz', country: 'Österreich', population: 210000, continent: 'Europa' },
    { city: 'Salzburg', country: 'Österreich', population: 150000, continent: 'Europa' },
    { city: 'Innsbruck', country: 'Österreich', population: 130000, continent: 'Europa' }
];

// Helper: Zwei zufällige Städte für Vergleich
export const getRandomCityPair = (excludeCities = []) => {
    const available = populationData.filter(city => !excludeCities.includes(city.city));
    
    if (available.length < 2) {
        return getRandomCityPair(); // Reset wenn zu wenig übrig
    }

    const index1 = Math.floor(Math.random() * available.length);
    let index2 = Math.floor(Math.random() * available.length);
    
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * available.length);
    }

    return {
        cityA: available[index1],
        cityB: available[index2]
    };
};

// Helper: Formatiere Einwohnerzahl
export const formatPopulation = (population) => {
    if (population >= 1000000) {
        return `${(population / 1000000).toFixed(1)} Mio.`;
    } else if (population >= 1000) {
        return `${(population / 1000).toFixed(0)}k`;
    }
    return population.toLocaleString('de-AT');
};

// Helper: Sortiere nach Größe
export const sortByPopulation = (ascending = false) => {
    return [...populationData].sort((a, b) => 
        ascending ? a.population - b.population : b.population - a.population
    );
};

// Helper: Filterung nach Kontinent
export const getCitiesByContinent = (continent) => {
    if (continent === 'all') return populationData;
    return populationData.filter(city => city.continent === continent);
};
