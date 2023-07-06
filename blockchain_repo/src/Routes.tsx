
export const routes = {
    compose: '/article/compose', 
    view: (id: number | string) => `/article/${id}/view`,
    edit: (id: number | string, version: number | string) => `/article/${id}/version/${version}/edit`,
    profile:(id: number | string)=>`/user/${id}/profile`,
    saveFolder:(id: number | string)=>`/user/${id}/starred`,
}