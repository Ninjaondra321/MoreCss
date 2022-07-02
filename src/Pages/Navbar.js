import { useState, useTransition } from "react";
import { SideBar } from "./SideBar";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NavBar = ({ projectName, setCssVariables, setHtmlComponents, downloadUiKit }) => {

    const [ahoj, ReloadPage] = useState(null);


    const [ActiveBarID, setActiveBarID] = useState(0);

    return <div>

        {ahoj && <div></div>}


        <div className="navbar hideScroll">
            <div className="top">
                <NavBarItem id={0} icon="palette" activeID={ActiveBarID} bgColor="#fcba03" setActiveID={setActiveBarID} />
                <NavBarItem id={1} icon="format_size" activeID={ActiveBarID} bgColor="#077ef5" setActiveID={setActiveBarID} />
                <NavBarItem id={2} icon="integration_instructions" activeID={ActiveBarID} bgColor="#42f5e3" setActiveID={setActiveBarID} />
                <NavBarItem id={3} icon="widgets" activeID={ActiveBarID} bgColor="#62f507" setActiveID={setActiveBarID} />
                <NavBarItem id={4} icon="animation" activeID={ActiveBarID} bgColor="#f50707" setActiveID={setActiveBarID} />
            </div>
            <div className="top">
                <NavBarItem id={5} icon="download" activeID={ActiveBarID} bgColor="#998855" setActiveID={setActiveBarID} />

                <Link to="/" style={{ color: "black" }}>
                    <NavBarItem id={500} icon="home" activeID={ActiveBarID} bgColor="#998855" setActiveID={setActiveBarID} />
                </Link>


            </div>



            <SideBar projectName={projectName} downloadUiKit={downloadUiKit} setHtmlComponents={setHtmlComponents} setCssVariables={setCssVariables} tab={ActiveBarID} ReloadPage={ReloadPage} />
        </div>
    </div>
}





export const NavBarItem = ({ id, activeID, icon, bgColor, setActiveID }) => {
    return <div className="navbar-item" onClick={() => setActiveID(id)}>
        {id == activeID &&
            <div className="navbar-item-background " style={{ backgroundColor: bgColor }}></div>
        }
        {id !== activeID &&
            <div className="navbar-item-background " style={{ backgroundColor: null }}></div>
        }
        <span className="material-icons">
            {icon}
        </span>
    </div>

}   