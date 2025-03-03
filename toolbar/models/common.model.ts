export interface ButtonPosition {
    x: number;
    y: number;
}

export interface ContextFormValues {
    title: string;
    description: string;
}

export interface ContextItem extends ContextFormValues {
    id: number;
}

export interface MutliSelectItem {
    id: number | string;
    value: string;
}
