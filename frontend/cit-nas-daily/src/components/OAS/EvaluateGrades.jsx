import React, { useState } from 'react';
import { ShowGrades } from './ShowGrades';

export const EvaluateGrades = ({ show, close }) => {
    const [isViewingShowGrades, setIsViewingShowGrades] = useState(false);

    const openShowGrades = () => {
        setIsViewingShowGrades(true);
    };

    const closeShowGrades = () => {
        setIsViewingShowGrades(false);
    };

    return (
        show && (
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div class="relative w-4/6">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="bg-opacity-50">
                            <div class="flex flex-col items-center justify-center px-20 py-10 rounded-t">
                                <p class="text-4xl text-center w-full font-bold text-primary">
                                    GRADE EVALUATION
                                </p>
                                <button type="button" class="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-lg text-sm px-5 py-2.5 my-10" onClick={openShowGrades}>EVALUATE GRADES</button>
                                <ShowGrades show={isViewingShowGrades} close={closeShowGrades} />
                                <div class="flex flex-row w-full items-center gap-6 mb-10">
                                    <p class="text-xl text-left w-2/4">ALL COURSES PASSED:</p>
                                    <div class="flex flex-row gap-2 justify-center items-center w-1/4">
                                        <input checked id="default-radio-1" type="radio" value="" name="yes-radio" class="h-5 w-5"/>
                                        <label for="default-radio-1" class="ml-2 text-xl font-medium text-green">YES</label>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-center items-center w-1/4">
                                        <input id="default-radio-2" type="radio" value="" name="no-radio" class="h-5 w-5"/>
                                        <label for="default-radio-2" class="ml-2 text-xl font-medium text-red">NO</label>
                                    </div>
                                </div>
                                <div class="flex flex-row w-full items-center mb-10">
                                    <p class="text-xl text-left w-3/4">NUMBER OF COURSES FAILED:</p>
                                    <p class="text-xl text-left w-1/4">_____</p>
                                </div>
                                <button type="button" class="text-white bg-primary hover:bg-secondary hover:text-primary font-medium rounded-xl text-sm px-20 py-2.5">SUBMIT</button>
                                <button type="button" class="text-primary hover:underline font-medium text-sm px-20 py-2.5" onClick={close}>Go Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}