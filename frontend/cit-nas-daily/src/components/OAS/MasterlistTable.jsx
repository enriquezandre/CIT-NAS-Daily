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
        <div className="overflow-x-auto">
            <table className="table-auto mx-auto mb-8">
                <thead>
                    <tr>
                        {header.map((header, index) => (
                            <th key={index} className="border border-2 border-black text-white text-center uppercase font-semibold bg-primary px-4 py-2" value={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                        <td className="border border-2 border-black text-center px-4 py-2">Lorem Ipsum</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}