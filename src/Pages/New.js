import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const New = () => {
    const [name, setName] = useState("Projekt 01");
    let navigate = useNavigate();



    function createNewProject(framework) {
        let projects = JSON.parse(localStorage.getItem('MoreeCss-Projekty'))
        let IDs = []

        for (var project of projects) {
            IDs.push(project.id)
        }

        let number = 0
        while (true) {
            number++;
            if (!IDs.includes(number)) {
                break
            }
        }

        console.log(number)

        projects.push({ id: number, nazev: name, framework: framework })

        localStorage.setItem("MoreeCss-Projekty", JSON.stringify(projects))


        navigate("/" + number + "/create", { replace: true });


    }
    return <div>
        <h1>Vyber css framework, který chceš používat</h1>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <div>

            <button onClick={() => createNewProject('bootstrap')}>Bootstrap</button>
            <button onClick={() => createNewProject('uikit')}>UiKit</button>
            <button onClick={() => createNewProject('tailwind')} disabled>Tailwind </button>
            <button onClick={() => createNewProject('bootstrap')}>Bootstrap</button>



        </div>

    </div>
}