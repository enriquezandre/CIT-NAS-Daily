import GradeImage from "../../assets/image9.png"

export const ShowGrades = ({ show, close }) => {
    return (
        show && (
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div class="relative w-4/6">
                    <div class="flex flex-col bg-white rounded-lg shadow dark:bg-gray-700 px-8 py-20">
                        <img class="rounded-lg" src={GradeImage} alt="image description"></img>
                        <button type="button" class="text-primary hover:underline font-medium text-sm px-20 py-3.5" onClick={close}>Go Back</button>
                    </div>
                </div>
            </div>
        )
    )
}