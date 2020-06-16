export interface IRoute {
    collapse: boolean;
    layout: string;
    path: string;
    name: string;
    state: string;
}

export class IFirstLayerRoute implements IRoute {
    collapse: boolean = false;
    layout: string = "";
    path: string = "";
    name: string = "";
    miniName: string = "";
    icon: string = "";
    state: string = "";
    component: (() => JSX.Element) | undefined = undefined;
    views: ISecondLayerRoute[] = [];
}

export class ISecondLayerRoute implements IRoute{
    collapse: boolean = false;
    layout: string = "";
    path: string = "";
    name: string = "";
    miniName: string = "";
    state: string = "";
    component: (() => JSX.Element) | undefined = undefined;
}