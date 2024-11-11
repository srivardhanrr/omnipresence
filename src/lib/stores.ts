import { writable } from 'svelte/store';

export const projects: Project[] = [
    {
        title: "Modern Living Space",
        description: "A minimalist apartment design focusing on sustainable materials and natural light",
        category: "Interior Design",
        year: "2024"
    },
    {
        title: "Urban Renewal Center",
        description: "Revitalization project transforming an abandoned warehouse into a community space",
        category: "Architecture",
        year: "2023"
    },
    {
        title: "Skyline Tower",
        description: "Mixed-use development featuring innovative energy-efficient systems",
        category: "Commercial",
        year: "2023"
    }
];

export const currentProjectIndex = writable(0);