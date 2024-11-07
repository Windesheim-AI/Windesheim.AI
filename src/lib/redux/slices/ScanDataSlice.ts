// import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// export type StageDataState = {
//     stageId: string;
//     courseId: string;
// };


// export const scanDataSlice = createSlice({
//     name: 'courseData',
//     initialState,
//     reducers: {
//         // type {stageId, courseId}
//         completeStage: (
//             state,
//             action: PayloadAction<{
//                 stageId: string;
//                 courseId: string | undefined;
//             }>,
//         ) => {
//             // destruct
//             const { stageId, courseId } = action.payload;
//             if (courseId === undefined) return;
//             state.completedStages.push({
//                 stageId,
//                 courseId,
//             });
//         },
//     },
// });

// export const scanDataActions = scanDataSlice.actions;
