export const getRoutes = (link: string) => {
    switch (link) {
        case 'centros':
            return 'center';
        case 'artículo':
            return 'blog';
        case 'eventos':
            return 'event';
        case 'cursos':
            return 'course';
        default:
            return '/'
    }
}
