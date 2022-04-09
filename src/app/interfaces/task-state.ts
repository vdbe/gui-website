export interface State {
    name: string;
    description: string;
    progress: number;
}

export interface updateStateInput {
    name?: string,
    description?: string,
    progress?: number,
}