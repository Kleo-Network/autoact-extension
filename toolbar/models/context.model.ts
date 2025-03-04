// This file duplicated, if you make any changes here please make the same changes in siebar/models/context.model.ts also.

export interface ContextFormValues {
    title: string;
    description: string;
}

export interface ContextItem extends ContextFormValues {
    id: number;
}
