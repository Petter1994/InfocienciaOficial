export const getRoutes = (link: string) => {
    switch (link) {
        case 'centros':
            return 'center';
        case 'artículos':
            return 'blog';
        case 'eventos':
            return 'event';
        case 'cursos':
            return 'course';
        case 'acerca':
            return '#about';
        case 'funcionalidades':
            return '#features';
        case 'preguntas frecuentes':
            return '#faq';
        default:
            return '/'
    }
}
