import { createNavigationContainerRef, Route } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

class Navigationservice {
    public static GetCurrentScreen(): string {
        return navigationRef.getCurrentRoute().name;
    }

    public static GoTo(key: string, parameters?: any) {
        navigationRef.reset({
            index: 0,
            routes: [{ name: key, params: parameters }]
        })
    }

    public static GoBack() {
        navigationRef.goBack();
    }
}

export interface IRouteProps<T extends object> {
    route: Route<string, T>;
}

export { Navigationservice, navigationRef };