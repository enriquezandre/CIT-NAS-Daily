export const MonthlySummary = () => {
    return (
        <table class="w-4/5 mx-auto mb-8">
            <tbody>
                <tr>
                    <td class="w-2/5 border px-4 py-2">Number of Lates</td>
                    <td class="border px-4 py-2 text-center">2</td>
                    <td className="w-2/5 border px-4 py-2">Late &gt; 10 Minutes</td>
                    <td class="border px-4 py-2 text-center">1</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2">Number of Unexcused Absences</td>
                    <td class="border px-4 py-2 text-center">1</td>
                    <td class="border px-4 py-2">Late &gt; 45 Minutes </td>
                    <td class="border px-4 py-2 text-center">1</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2">Number of Excused Absences</td>
                    <td class="border px-4 py-2 text-center">1</td>
                    <td class="border px-4 py-2">FTP - Failure to Punch In/Out</td>
                    <td class="border px-4 py-2 text-center">1</td>
                </tr>
            </tbody>
        </table>
    );
}