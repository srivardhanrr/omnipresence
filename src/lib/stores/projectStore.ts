// src/lib/stores/projectStore.js
import { writable } from 'svelte/store';

export const currentProjectIndex = writable(0);
export const isGridView = writable(false);

export const projects = writable([
    {
        id: 1,
        title: 'DESIGN MATTERS',
        subtitle: 'LONDON DESIGN STUDIO',
        description: 'Minale + Mann is an award winning architectural and interior design studio based in London.',
        image: '/images/featured/design-matters.jpg',
        category: 'RESIDENTIAL',
        year: '2024'
    },
    {
        id: 2,
        title: 'URBAN SPACES',
        subtitle: 'MODERN LIVING',
        description: 'Contemporary urban development featuring innovative living spaces and sustainable design.',
        image: '/images/featured/urban-spaces.jpg',
        category: 'RESIDENTIAL',
        year: '2023'
    },
    {
        id: 3,
        title: 'HERITAGE RESTORED',
        subtitle: 'CONSERVATION PROJECT',
        description: 'Careful restoration and modernization of a Grade II listed building in central London.',
        image: '/images/featured/heritage.jpg',
        category: 'CONSERVATION & HERITAGE',
        year: '2023'
    },
    // Add more projects as needed
]);