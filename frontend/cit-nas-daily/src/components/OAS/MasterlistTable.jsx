export const MasterlistTable = () => {
    const header = [
        'No.', 'ID Number', 'Last Name', 'First Name',
        'Middle Name', 'Gender', 'Birthdate', 'Course',
        'Year', 'No. of units enrolled in 2nd Sem',
        'Date Started', 'Department Assigned',
        'EA', 'UEA', 'L>10 mins.', 'L>45 mins.',
        'FTP', 'OT', 'FOR MAKE UP', 'REMARKS', 'LATE SUBJECTS'
    ];

    return(
        <div class="overflow-x-auto">
            <table class="table-auto mx-auto mb-8">
                <thead>
                    <tr>
                        {header.map((header) => (
                            <th class="border border-2 border-black text-white text-center uppercase font-semibold bg-primary px-4 py-2" value={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td class="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}