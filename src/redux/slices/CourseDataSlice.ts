import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CourseDataState {
    completedStages: {
        stageId: string;
        courseId: string;
    }[];
}

const initialState: CourseDataState = {
    completedStages: [],
};

export const courseDataSlice = createSlice({
    name: 'courseData',
    initialState,
    reducers: {
        // type {stageId, courseId}
        completeStage: (
            state,
            action: PayloadAction<{ stageId: string; courseId: string }>,
        ) => {
            state.completedStages.push({
                stageId: action.payload.stageId,
                courseId: action.payload.courseId,
            });
        },
    },
});

export const courseDataActions = courseDataSlice.actions;
