import type { RouteRecordRaw } from 'vue-router';
export const getTitles = (name: string, routes: Array<RouteRecordRaw>) => {
    const names: string[] = []
    while (true) {
        names.push(name)
        const currentRouterObj = routes.find((item) => item.name === name);
        const parentRouterObj = routes.find((item) => item.name === currentRouterObj?.meta?.parentRouter);
        if (parentRouterObj) {
            name = parentRouterObj.name as string
            continue
        } else {
            break
        }
    }
    return names.reverse()
}