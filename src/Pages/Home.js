import { useState } from "react";
import { Helmet } from "react-helmet";

const Home = () => {
    console.log('Homepage')

    // MoreeCss-Prokekty -----  [ {nazev:"Test", kit:"uikit"} ]

    try {
        let x = localStorage.getItem('MoreeCss-Projekty')
        if (!x) {
            localStorage.setItem('MoreeCss-Projekty', JSON.stringify([{ nazev: "Test", framework: "uikit", id: 0 }]))

        }
    }
    catch {
        localStorage.setItem('MoreeCss-Projekty', [{ nazev: "Test", framework: "uikit", id: 0 }])
    }

    let projekty = JSON.parse(localStorage.getItem('MoreeCss-Projekty'))


    return <div>

        <Helmet>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/css/uikit.min.css" />

            <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/js/uikit.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/js/uikit-icons.min.js"></script>


        </Helmet>
        <div class="uk-section uk-section-default">
            <div class="uk-container uk-container-small uk-position-relative">

                <h1>Homepage</h1>



                <div className="uk-tile uk-tile-primary">
                    <div className="uk-child-width-1-3@s uk-grid-match" uk-grid="">

                        {projekty && projekty.map((obj) => <a href={"/" + obj.id + "/create"}>
                            <div className="uk-card uk-margin uk-card-default uk-card-hover uk-card-body" style={{ height: "200px" }}>
                                <h3 className="uk-card-title" style={{ color: "black" }}>{obj.nazev}</h3>
                                <p>{obj.framework}</p>
                            </div>
                        </a>)}


                        <a href="/new">
                            <div className="uk-card uk-margin uk-card-secondary uk-card-hover uk-card-body" style={{ height: "200px" }}>

                                <h1 className="uk-card-title" style={{ color: "white" }}>+</h1>
                                <h1 className="uk-card-title" style={{ color: "white", marginTop: "0" }}>New</h1>
                                <p>Vytvořit nový projekt</p>
                            </div>
                        </a>









                    </div>
                </div>
            </div>



        </div>

    </div >
}


export default Home;