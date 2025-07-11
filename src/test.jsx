import { useEffect } from "react"
import { base64Decode } from 'base64-js';

const TEST = () => {

    useEffect(() => {
        const fetchExcel = async () => {
            const response = await fetch('http://localhost:8080/api/export_excel?template=4_1',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(response)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const base64Data = data.file;
                    const fileName = data.filename;
                    const blob = new Blob([atob(base64Data)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                });
        }
        fetchExcel();
    }, []);

    return (
        <div>
            <h1>TEST</h1>
        </div>
    )
}

export default TEST