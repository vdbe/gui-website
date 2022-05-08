export interface Task {
    nr: number;
    progress: number;
    createdBy: string;
    takenBy: string | null;
    createdAt: Date;
    takenAt: Date | null;
    completedAt: Date | null;
    title: string;
    description: string;
}

export interface CreateTaskInput {
    title: string;
    description: string;
    state: number | string;
}

export interface updateTaskInput {
    progress?: number;
    title?: string;
    description?: string;
}

