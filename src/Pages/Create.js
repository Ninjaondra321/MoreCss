import { useEffect, useImperativeHandle, useState } from "react";
import { NavBar } from "./Navbar";
import { SideBar } from "./SideBar";
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { useRef } from "react";

import "../Styles/app.css"



import uiKitCSS from "../Styles/uikit-default.txt"
import bootstrapCSS from "../Styles/bootstrap.txt"





const Create = () => {
    let { project } = useParams()

    const [activeBtnGroupID, setActiveBtnGroupID] = useState(0);
    const [html, setHtml] = useState(UiKit_html);


    const [cssKit, setCssKit] = useState();
    const [cssVariables, setCssVariables] = useState();
    const [htmlComponents, setHtmlComponents] = useState();
    const [scripts, setScripts] = useState();

    useEffect(() => {
        let projects = JSON.parse(localStorage.getItem('MoreeCss-Projekty'))
        console.log(projects)
        for (var testProject of projects) {
            if (testProject.id == project) {

                // Set css kit and sctipts
                switch (testProject.framework) {
                    case "uikit":
                        fetch(uiKitCSS).then((response) => response.text()).then((txt) => setCssKit(txt));
                        setScripts('<script src="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/js/uikit.min.js"></script><script src="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/js/uikit-icons.min.js"></script>')
                        break;
                    case "bootstrap":
                        fetch(bootstrapCSS).then((response) => response.text()).then((txt) => setCssKit(txt))
                        setScripts('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>')
                        break;
                }


            }
        }

        console.log(cssKit)

    }, [])


    function downloadUiKit() {
        const element = document.createElement("a");
        const file = new Blob([cssKit], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "cssKit.css";
        document.body.appendChild(element);
        element.click();
    };



    return <div className="">
        <NavBar projectName={project} downloadUiKit={downloadUiKit} setCssVariables={setCssVariables} setHtmlComponents={setHtmlComponents} />

        <Helmet>
            <style>
                {`
                body {font-family: 'Work Sans', sans-serif; font-weight: inherit; }
                `}

            </style>
        </Helmet>



        <div className="sidebar-padding-left">

            <div className="center full-width " style={{ padding: "30px ", paddingBottom: "20px" }}>
                <div className="btn-group">
                    <button id={0} className={activeBtnGroupID == 0 && "active"} onClick={() => setActiveBtnGroupID(0)} >Components</button>
                    <button id={1} className={activeBtnGroupID == 1 && "active"} onClick={() => setActiveBtnGroupID(1)} >Test</button>
                    <button id={2} className={activeBtnGroupID == 2 && "active"} onClick={() => setActiveBtnGroupID(2)} >Custom</button>
                </div>
            </div>


            <div class="center" >

                {activeBtnGroupID == 0 &&
                    <iframe srcDoc={` <!DOCTYPE html>
                    <html>
                      <head>                      
                      <style>`+ cssKit + `</style> 
                      <style>`+ cssVariables + `</style> 
                      ` + scripts +

                        `
                      </head>`+ htmlComponents + `
                    </html>
                    `} style={{ resize: "both", maxWidth: "80vw", maxHeight: "calc(100vh - 125px)" }}>
                    </iframe>
                }
                {activeBtnGroupID == 1 &&
                    <iframe srcDoc={` <!DOCTYPE html>
                    <html>
                      <head>                      
                      <style>`+ cssKit + `</style> 
                      <style>`+ cssVariables + `</style> 
                      <!-- UIkit JS -->
                      <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/js/uikit.min.js"></script>
                      <script src="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/js/uikit-icons.min.js"></script>
                      </head>`+ html + `
                    </html>
                    `} style={{ resize: "both", maxWidth: "80vw", maxHeight: "calc(100vh - 125px)" }}>
                    </iframe>
                }

            </div>
        </div>
    </div >
}

export default Create;


const UiKit_css = `html {
    font-family: var(--font-family);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    background: var(--background-color);
    color: var(--text-secondary-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility
}

:root {
    /*     
    --primary-color: #8800f9;
    --text-color: #222;
    --text-secondary-color: #666;
    --background-color: #fff; */


    /* Colors */
    --primary-color: #0FA6F7;
    --primary-color-tone1: #123456;
    --primary-color-tone2: #0b1a29;

    --secondary-color: #B3157C;
    --secondary-color-tone1: #771454;
    --secondary-color-tone2: #310923;

    --terciary-color: #222;
    --terciary-color-tone: #151515;
    --terciary-color-tone: black;



    --success-color: rgb(4, 211, 49);
    --success-color-tone1: green;
    --success-color-tone2: rgb(5, 77, 5);

    --warn-color: rgb(243, 239, 9);
    --warn-color-tone1: orange;
    --warn-color-tone2: rgb(109, 73, 6);

    --danger-color: rgb(230, 4, 4);
    --danger-color-tone1: rgb(179, 9, 9);
    --danger-color-tone2: #520000;


    /* Text */
    --font-family: ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --text-color: #222;
    --text-secondary-color: #666;

    --text-negative-color: rgb(255, 255, 255);
    --background-color: rgb(255, 255, 255);

    /* Shadow colors */
    --shadow-color-01: rgba(0, 0, 0, 0.08);
    --shadow-color-02: rgba(0, 0, 0, 0.16);

    /* Special varialbes */
    --border-range: 5px;

    /* Animations */


    /* Dark theme */
    /* --text-color: #eee;
    --text-secondary-color: #bbb;
    --background-color: #111;
    --shadow-color-01: rgba(255, 255, 255, 0.08);
    --shadow-color-02: rgba(255, 255, 255, 0.16); */
}





body {
    margin: 0;
    background: var(--background-color);
}

.uk-link,
a {
    color: var(--primary-color);
    text-decoration: none;
    cursor: pointer
}

.uk-link-toggle:hover .uk-link,
.uk-link:hover,
a:hover {
    color: #0f6ecd;
    text-decoration: underline
}

abbr[title] {
    text-decoration: underline dotted;
    -webkit-text-decoration-style: dotted;
    text-decoration-style: dotted
}

b,
strong {
    font-weight: bolder
}

:not(pre)>code,
:not(pre)>kbd,
:not(pre)>samp {
    font-family: 'Roboto Mono', monospace;
    font-size: 12px;
    color: #f0506e;
    white-space: nowrap;
    padding: 2px 6px;
    background: #f8f8f8
}

em {
    color: #f0506e
}

ins {
    background: #ffd;
    color: var(--text-secondary-color);
    text-decoration: none
}

mark {
    background: #ffd;
    color: var(--text-secondary-color)
}

q {
    font-style: italic
}

small {
    font-size: 80%
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
}

sup {
    top: -.5em
}

sub {
    bottom: -.25em
}

audio,
canvas,
iframe,
img,
svg,
video {
    vertical-align: middle
}

canvas,
img,
svg,
video {
    max-width: 100%;
    height: auto;
    box-sizing: border-box
}

img:not([src]) {
    visibility: hidden;
    min-width: 1px
}

iframe {
    border: 0
}

address,
dl,
fieldset,
figure,
ol,
p,
pre,
ul {
    margin: 0 0 20px 0
}

*+address,
*+dl,
*+fieldset,
*+figure,
*+ol,
*+p,
*+pre,
*+ul {
    margin-top: 20px
}

.uk-h1,
.uk-h2,
.uk-h3,
.uk-h4,
.uk-h5,
.uk-h6,
.uk-heading-2xlarge,
.uk-heading-large,
.uk-heading-medium,
.uk-heading-small,
.uk-heading-xlarge,
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0 0 20px 0;
    font-family: var(--font-family);
    font-weight: 300;
    color: var(--text-color);
    text-transform: none
}

*+.uk-h1,
*+.uk-h2,
*+.uk-h3,
*+.uk-h4,
*+.uk-h5,
*+.uk-h6,
*+.uk-heading-2xlarge,
*+.uk-heading-large,
*+.uk-heading-medium,
*+.uk-heading-small,
*+.uk-heading-xlarge,
*+h1,
*+h2,
*+h3,
*+h4,
*+h5,
*+h6 {
    margin-top: 40px
}

.uk-h1,
h1 {
    font-size: 32.3px;
    line-height: 1.2
}

.uk-h2,
h2 {
    font-size: 25.5px;
    line-height: 1.3
}

.uk-h3,
h3 {
    font-size: 24px;
    line-height: 1.4
}

.uk-h4,
h4 {
    font-size: 20px;
    line-height: 1.4
}

.uk-h5,
h5 {
    font-size: 15px;
    line-height: 1.4
}

.uk-h6,
h6 {
    font-size: 14px;
    line-height: 1.4
}

@media (min-width:960px) {

    .uk-h1,
    h1 {
        font-size: 38px
    }

    .uk-h2,
    h2 {
        font-size: 30px
    }
}

ol,
ul {
    padding-left: 30px
}

ol>li>ol,
ol>li>ul,
ul>li>ol,
ul>li>ul {
    margin: 0
}

dt {
    font-weight: 700
}

dd {
    margin-left: 0
}

.uk-hr,
hr {
    overflow: visible;
    text-align: inherit;
    margin: 0 0 20px 0;
    border: 0;
    border-top: 1px solid #e5e5e5
}

*+.uk-hr,
*+hr {
    margin-top: 20px
}

address {
    font-style: normal
}

blockquote {
    margin: 0 0 20px 0;
    font-size: 20px;
    line-height: 1.5;
    font-style: italic;
    color: var(--text-color)
}

*+blockquote {
    margin-top: 20px
}

blockquote p:last-of-type {
    margin-bottom: 0
}

blockquote footer {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-secondary-color)
}

blockquote footer::before {
    content: "â€” "
}

pre {
    font: 12px/1.5 'Roboto Mono', monospace;
    color: var(--text-secondary-color);
    -moz-tab-size: 4;
    tab-size: 4;
    overflow: auto;
    padding: 25px;
    border: 0 solid #e5e5e5;
    border-radius: 0;
    background: #f8f8f8
}

pre code {
    font-family: 'Roboto Mono', monospace
}

:focus {
    outline: 0
}

:focus-visible {
    outline: 2px dotted var(--text-color)
}

::selection {
    background: #39f;
    color: var(--text-negative-color);
    text-shadow: none
}

details,
main {
    display: block
}

summary {
    display: list-item
}

template {
    display: none
}

:root {
    --uk-breakpoint-s: 640px;
    --uk-breakpoint-m: 960px;
    --uk-breakpoint-l: 1200px;
    --uk-breakpoint-xl: 1600px
}

.uk-link-muted a,
.uk-link-toggle .uk-link-muted,
a.uk-link-muted {
    color: #999
}

.uk-link-muted a:hover,
.uk-link-toggle:hover .uk-link-muted,
a.uk-link-muted:hover {
    color: var(--text-secondary-color)
}

.uk-link-text a,
.uk-link-toggle .uk-link-text,
a.uk-link-text {
    color: inherit
}

.uk-link-text a:hover,
.uk-link-toggle:hover .uk-link-text,
a.uk-link-text:hover {
    color: #999
}

.uk-link-heading a,
.uk-link-toggle .uk-link-heading,
a.uk-link-heading {
    color: inherit
}

.uk-link-heading a:hover,
.uk-link-toggle:hover .uk-link-heading,
a.uk-link-heading:hover {
    color: var(--primary-color);
    text-decoration: none
}

.uk-link-reset a,
a.uk-link-reset {
    color: inherit !important;
    text-decoration: none !important
}

.uk-link-toggle {
    color: inherit !important;
    text-decoration: none !important
}

.uk-heading-small {
    font-size: 2.6rem;
    line-height: 1.2
}

.uk-heading-medium {
    font-size: 2.8875rem;
    line-height: 1.1
}

.uk-heading-large {
    font-size: 3.4rem;
    line-height: 1.1
}

.uk-heading-xlarge {
    font-size: 4rem;
    line-height: 1
}

.uk-heading-2xlarge {
    font-size: 6rem;
    line-height: 1
}

@media (min-width:960px) {
    .uk-heading-small {
        font-size: 3.25rem
    }

    .uk-heading-medium {
        font-size: 3.5rem
    }

    .uk-heading-large {
        font-size: 4rem
    }

    .uk-heading-xlarge {
        font-size: 6rem
    }

    .uk-heading-2xlarge {
        font-size: 8rem
    }
}

@media (min-width:1200px) {
    .uk-heading-medium {
        font-size: 4rem
    }

    .uk-heading-large {
        font-size: 6rem
    }

    .uk-heading-xlarge {
        font-size: 8rem
    }

    .uk-heading-2xlarge {
        font-size: 11rem
    }
}

.uk-heading-divider {
    padding-bottom: calc(5px + .1em);
    border-bottom: calc(.2px + .05em) solid #e5e5e5
}

.uk-heading-bullet {
    position: relative
}

.uk-heading-bullet::before {
    content: "";
    display: inline-block;
    position: relative;
    top: calc(-.1 * 1em);
    vertical-align: middle;
    height: calc(4px + .7em);
    margin-right: calc(5px + .2em);
    border-left: calc(5px + .1em) solid #e5e5e5
}

.uk-heading-line {
    overflow: hidden
}

.uk-heading-line>* {
    display: inline-block;
    position: relative
}

.uk-heading-line>::after,
.uk-heading-line>::before {
    content: "";
    position: absolute;
    top: calc(50% - (calc(.2px + .05em)/ 2));
    width: 2000px;
    border-bottom: calc(.2px + .05em) solid #e5e5e5
}

.uk-heading-line>::before {
    right: 100%;
    margin-right: calc(5px + .3em)
}

.uk-heading-line>::after {
    left: 100%;
    margin-left: calc(5px + .3em)
}

[class*=uk-divider] {
    border: none;
    margin-bottom: 20px
}

*+[class*=uk-divider] {
    margin-top: 20px
}

.uk-divider-icon {
    position: relative;
    height: 20px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22none%22%20stroke%3D%22%23e5e5e5%22%20stroke-width%3D%222%22%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%227%22%20%2F%3E%0A%3C%2Fsvg%3E%0A");
    background-repeat: no-repeat;
    background-position: 50% 50%
}

.uk-divider-icon::after,
.uk-divider-icon::before {
    content: "";
    position: absolute;
    top: 50%;
    max-width: calc(50% - (50px / 2));
    border-bottom: 1px solid #e5e5e5
}

.uk-divider-icon::before {
    right: calc(50% + (50px / 2));
    width: 100%
}

.uk-divider-icon::after {
    left: calc(50% + (50px / 2));
    width: 100%
}

.uk-divider-small {
    line-height: 0
}

.uk-divider-small::after {
    content: "";
    display: inline-block;
    width: 100px;
    max-width: 100%;
    border-top: 1px solid #e5e5e5;
    vertical-align: top
}

.uk-divider-vertical {
    width: max-content;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    border-left: 1px solid #e5e5e5
}

.uk-list {
    padding: 0;
    list-style: none
}

.uk-list>*>:last-child {
    margin-bottom: 0
}

.uk-list>*>ul,
.uk-list>:nth-child(n+2) {
    margin-top: 10px
}

.uk-list-circle>*,
.uk-list-decimal>*,
.uk-list-disc>*,
.uk-list-hyphen>*,
.uk-list-square>* {
    padding-left: 30px
}

.uk-list-decimal {
    counter-reset: decimal
}

.uk-list-decimal>* {
    counter-increment: decimal
}

.uk-list-circle>::before,
.uk-list-decimal>::before,
.uk-list-disc>::before,
.uk-list-hyphen>::before,
.uk-list-square>::before {
    content: "";
    position: relative;
    left: -30px;
    width: 30px;
    height: 1.5em;
    margin-bottom: -1.5em;
    display: list-item;
    list-style-position: inside;
    text-align: right
}

.uk-list-disc>::before {
    list-style-type: disc
}

.uk-list-circle>::before {
    list-style-type: circle
}

.uk-list-square>::before {
    list-style-type: square
}

.uk-list-muted>::before {
    color: #999 !important
}

.uk-list-emphasis>::before {
    color: var(--text-color) !important
}

.uk-list-primary>::before {
    color: var(--primary-color) !important
}

.uk-list-secondary>::before {
    color: var(--text-color) !important
}

.uk-list-bullet>* {
    padding-left: 30px
}

.uk-list-bullet>::before {
    content: "";
    display: list-item;
    position: relative;
    left: -30px;
    width: 30px;
    height: 1.5em;
    margin-bottom: -1.5em;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23666%22%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20%2F%3E%0A%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: 50% 50%
}

.uk-list-divider>:nth-child(n+2) {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #e5e5e5
}

.uk-list-striped>* {
    padding: 10px 10px
}

.uk-list-striped>:nth-of-type(odd) {
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5
}

.uk-list-striped>:nth-of-type(odd) {
    background: #f8f8f8
}

.uk-list-striped>:nth-child(n+2) {
    margin-top: 0
}

.uk-list-large>*>ul,
.uk-list-large>:nth-child(n+2) {
    margin-top: 20px
}

.uk-list-collapse>*>ul,
.uk-list-collapse>:nth-child(n+2) {
    margin-top: 0
}

.uk-list-large.uk-list-divider>:nth-child(n+2) {
    margin-top: 20px;
    padding-top: 20px
}

.uk-list-collapse.uk-list-divider>:nth-child(n+2) {
    margin-top: 0;
    padding-top: 0
}

.uk-list-large.uk-list-striped>* {
    padding: 20px 10px
}

.uk-list-collapse.uk-list-striped>* {
    padding-top: 0;
    padding-bottom: 0
}

.uk-list-collapse.uk-list-striped>:nth-child(n+2),
.uk-list-large.uk-list-striped>:nth-child(n+2) {
    margin-top: 0
}

.uk-description-list>dt {
    color: var(--text-color);
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase
}

.uk-description-list>dt:nth-child(n+2) {
    margin-top: 20px
}

.uk-description-list-divider>dt:nth-child(n+2) {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e5e5e5
}

.uk-table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin-bottom: 20px
}

*+.uk-table {
    margin-top: 20px
}

.uk-table th {
    padding: 16px 12px;
    text-align: left;
    vertical-align: bottom;
    font-size: 12px;
    font-weight: 400;
    color: #999;
    text-transform: uppercase
}

.uk-table td {
    padding: 16px 12px;
    vertical-align: top
}

.uk-table td>:last-child {
    margin-bottom: 0
}

.uk-table tfoot {
    font-size: 14px
}

.uk-table caption {
    font-size: 14px;
    text-align: left;
    color: #999
}

.uk-table-middle,
.uk-table-middle td {
    vertical-align: middle !important
}

.uk-table-divider>:first-child>tr:not(:first-child),
.uk-table-divider>:not(:first-child)>tr,
.uk-table-divider>tr:not(:first-child) {
    border-top: 1px solid #e5e5e5
}

.uk-table-striped tbody tr:nth-of-type(odd),
.uk-table-striped>tr:nth-of-type(odd) {
    background: #f8f8f8;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5
}

.uk-table-hover tbody tr:hover,
.uk-table-hover>tr:hover {
    background: #ffd
}

.uk-table tbody tr.uk-active,
.uk-table>tr.uk-active {
    background: #ffd
}

.uk-table-small td,
.uk-table-small th {
    padding: 10px 12px
}

.uk-table-large td,
.uk-table-large th {
    padding: 22px 12px
}

.uk-table-justify td:first-child,
.uk-table-justify th:first-child {
    padding-left: 0
}

.uk-table-justify td:last-child,
.uk-table-justify th:last-child {
    padding-right: 0
}

.uk-table-shrink {
    width: 1px
}

.uk-table-expand {
    min-width: 150px
}

.uk-table-link {
    padding: 0 !important
}

.uk-table-link>a {
    display: block;
    padding: 16px 12px
}

.uk-table-small .uk-table-link>a {
    padding: 10px 12px
}

@media (max-width:959px) {

    .uk-table-responsive,
    .uk-table-responsive tbody,
    .uk-table-responsive td,
    .uk-table-responsive th,
    .uk-table-responsive tr {
        display: block
    }

    .uk-table-responsive thead {
        display: none
    }

    .uk-table-responsive td,
    .uk-table-responsive th {
        width: auto !important;
        max-width: none !important;
        min-width: 0 !important;
        overflow: visible !important;
        white-space: normal !important
    }

    .uk-table-responsive .uk-table-link:not(:first-child)>a,
    .uk-table-responsive td:not(:first-child):not(.uk-table-link),
    .uk-table-responsive th:not(:first-child):not(.uk-table-link) {
        padding-top: 5px !important
    }

    .uk-table-responsive .uk-table-link:not(:last-child)>a,
    .uk-table-responsive td:not(:last-child):not(.uk-table-link),
    .uk-table-responsive th:not(:last-child):not(.uk-table-link) {
        padding-bottom: 5px !important
    }

    .uk-table-justify.uk-table-responsive td,
    .uk-table-justify.uk-table-responsive th {
        padding-left: 0;
        padding-right: 0
    }
}

.uk-table tbody tr {
    transition: background-color .1s linear
}

.uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-table-striped>tr:nth-of-type(even):last-child {
    border-bottom: 1px solid #e5e5e5
}

.uk-icon {
    margin: 0;
    border: none;
    border-radius: 0;
    overflow: visible;
    font: inherit;
    color: inherit;
    text-transform: none;
    padding: 0;
    background-color: transparent;
    display: inline-block;
    fill: currentcolor;
    line-height: 0
}

button.uk-icon:not(:disabled) {
    cursor: pointer
}

.uk-icon::-moz-focus-inner {
    border: 0;
    padding: 0
}

.uk-icon:not(.uk-preserve) [fill*='#']:not(.uk-preserve) {
    fill: currentcolor
}

.uk-icon:not(.uk-preserve) [stroke*='#']:not(.uk-preserve) {
    stroke: currentcolor
}

.uk-icon>* {
    transform: translate(0, 0)
}

.uk-icon-image {
    width: 20px;
    height: 20px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    object-fit: scale-down;
    max-width: none
}

.uk-icon-link {
    color: #999;
    text-decoration: none !important
}

.uk-icon-link:hover {
    color: var(--text-secondary-color)
}

.uk-active>.uk-icon-link,
.uk-icon-link:active {
    color: #595959
}

.uk-icon-button {
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    border-radius: 500px;
    background: #f8f8f8;
    color: #999;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: .1s ease-in-out;
    transition-property: color, background-color
}

.uk-icon-button:hover {
    background-color: #ebebeb;
    color: var(--text-secondary-color)
}

.uk-active>.uk-icon-button,
.uk-icon-button:active {
    background-color: #dfdfdf;
    color: var(--text-secondary-color)
}

.uk-range {
    -webkit-appearance: none;
    box-sizing: border-box;
    margin: 0;
    vertical-align: middle;
    max-width: 100%;
    width: 100%;
    background: 0 0
}

.uk-range:focus {
    outline: 0
}

.uk-range::-moz-focus-outer {
    border: none
}

.uk-range:not(:disabled)::-webkit-slider-thumb {
    cursor: pointer
}

.uk-range:not(:disabled)::-moz-range-thumb {
    cursor: pointer
}

.uk-range::-webkit-slider-runnable-track {
    height: 3px;
    background: #ebebeb;
    border-radius: 500px
}

.uk-range:active::-webkit-slider-runnable-track,
.uk-range:focus::-webkit-slider-runnable-track {
    background: #dedede
}

.uk-range::-moz-range-track {
    height: 3px;
    background: #ebebeb;
    border-radius: 500px
}

.uk-range:focus::-moz-range-track {
    background: #dedede
}

.uk-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -7px;
    height: 15px;
    width: 15px;
    border-radius: 500px;
    background: var(--background-color);
    border: 1px solid #ccc
}

.uk-range::-moz-range-thumb {
    border: none;
    height: 15px;
    width: 15px;
    margin-top: -7px;
    border-radius: 500px;
    background: var(--background-color);
    border: 1px solid #ccc
}

.uk-checkbox,
.uk-input,
.uk-radio,
.uk-select,
.uk-textarea {
    box-sizing: border-box;
    margin: 0;
    border-radius: 0;
    font: inherit
}

.uk-input {
    overflow: visible
}

.uk-select {
    text-transform: none
}

.uk-select optgroup {
    font: inherit;
    font-weight: 700
}

.uk-textarea {
    overflow: auto
}

.uk-input[type=search]::-webkit-search-cancel-button,
.uk-input[type=search]::-webkit-search-decoration {
    -webkit-appearance: none
}

.uk-input[type=number]::-webkit-inner-spin-button,
.uk-input[type=number]::-webkit-outer-spin-button {
    height: auto
}

.uk-input::-moz-placeholder,
.uk-textarea::-moz-placeholder {
    opacity: 1
}

.uk-checkbox:not(:disabled),
.uk-radio:not(:disabled) {
    cursor: pointer
}

.uk-fieldset {
    border: none;
    margin: 0;
    padding: 0
}

.uk-input,
.uk-textarea {
    -webkit-appearance: none
}

.uk-input,
.uk-select,
.uk-textarea {
    max-width: 100%;
    width: 100%;
    border: 0 none;
    padding: 0 10px;
    background: var(--background-color);
    color: var(--text-secondary-color);
    border: 1px solid #e5e5e5;
    transition: .2s ease-in-out;
    transition-property: color, background-color, border
}

.uk-input,
.uk-select:not([multiple]):not([size]) {
    height: 40px;
    vertical-align: middle;
    display: inline-block
}

.uk-input:not(input),
.uk-select:not(select) {
    line-height: 38px
}

.uk-select[multiple],
.uk-select[size],
.uk-textarea {
    padding-top: 6px;
    padding-bottom: 6px;
    vertical-align: top
}

.uk-select[multiple],
.uk-select[size] {
    resize: vertical
}

.uk-input:focus,
.uk-select:focus,
.uk-textarea:focus {
    outline: 0;
    background-color: var(--background-color);
    color: var(--text-secondary-color);
    border-color: var(--primary-color)
}

.uk-input:disabled,
.uk-select:disabled,
.uk-textarea:disabled {
    background-color: #f8f8f8;
    color: #999;
    border-color: #e5e5e5
}

.uk-input::placeholder {
    color: #999
}

.uk-textarea::placeholder {
    color: #999
}

.uk-form-small {
    font-size: 14px
}

.uk-form-small:not(textarea):not([multiple]):not([size]) {
    height: 30px;
    padding-left: 8px;
    padding-right: 8px
}

[multiple].uk-form-small,
[size].uk-form-small,
textarea.uk-form-small {
    padding: 5px 8px
}

.uk-form-small:not(select):not(input):not(textarea) {
    line-height: 28px
}

.uk-form-large {
    font-size: 20px
}

.uk-form-large:not(textarea):not([multiple]):not([size]) {
    height: 55px;
    padding-left: 12px;
    padding-right: 12px
}

[multiple].uk-form-large,
[size].uk-form-large,
textarea.uk-form-large {
    padding: 7px 12px
}

.uk-form-large:not(select):not(input):not(textarea) {
    line-height: 53px
}

.uk-form-danger,
.uk-form-danger:focus {
    color: var(--danger-color);
    border-color: var(--danger-color)
}

.uk-form-success,
.uk-form-success:focus {
    color: #32d296;
    border-color: #32d296
}

.uk-form-blank {
    background: 0 0;
    border-color: transparent
}

.uk-form-blank:focus {
    border-color: #e5e5e5;
    border-style: solid
}

input.uk-form-width-xsmall {
    width: 50px
}

select.uk-form-width-xsmall {
    width: 75px
}

.uk-form-width-small {
    width: 130px
}

.uk-form-width-medium {
    width: 200px
}

.uk-form-width-large {
    width: 500px
}

.uk-select:not([multiple]):not([size]) {
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 20px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A");
    background-repeat: no-repeat;
    background-position: 100% 50%
}

.uk-select:not([multiple]):not([size]) option {
    color: var(--text-secondary-color)
}

.uk-select:not([multiple]):not([size]):disabled {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.uk-input[list] {
    padding-right: 20px;
    background-repeat: no-repeat;
    background-position: 100% 50%
}

.uk-input[list]:focus,
.uk-input[list]:hover {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%2012%208%206%2016%206%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.uk-input[list]::-webkit-calendar-picker-indicator {
    display: none !important
}

.uk-checkbox,
.uk-radio {
    display: inline-block;
    height: 16px;
    width: 16px;
    overflow: hidden;
    margin-top: -4px;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 1px solid #ccc;
    transition: .2s ease-in-out;
    transition-property: background-color, border
}

.uk-radio {
    border-radius: 50%
}

.uk-checkbox:focus,
.uk-radio:focus {
    background-color: rgba(0, 0, 0, 0);
    outline: 0;
    border-color: var(--primary-color)
}

.uk-checkbox:checked,
.uk-checkbox:indeterminate,
.uk-radio:checked {
    background-color: var(--primary-color);
    border-color: transparent
}

.uk-checkbox:checked:focus,
.uk-checkbox:indeterminate:focus,
.uk-radio:checked:focus {
    background-color: #0e6dcd
}

.uk-radio:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23fff%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.uk-checkbox:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23fff%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.uk-checkbox:indeterminate {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23fff%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.uk-checkbox:disabled,
.uk-radio:disabled {
    background-color: #f8f8f8;
    border-color: #e5e5e5
}

.uk-radio:disabled:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23999%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.uk-checkbox:disabled:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23999%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.uk-checkbox:disabled:indeterminate {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23999%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.uk-legend {
    width: 100%;
    color: inherit;
    padding: 0;
    font-size: 24px;
    line-height: 1.4
}

.uk-form-custom {
    display: inline-block;
    position: relative;
    max-width: 100%;
    vertical-align: middle
}

.uk-form-custom input[type=file],
.uk-form-custom select {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    -webkit-appearance: none;
    opacity: 0;
    cursor: pointer
}

.uk-form-custom input[type=file] {
    font-size: 500px;
    overflow: hidden
}

.uk-form-label {
    color: var(--text-color);
    font-size: 14px
}

.uk-form-stacked .uk-form-label {
    display: block;
    margin-bottom: 5px
}

@media (max-width:959px) {
    .uk-form-horizontal .uk-form-label {
        display: block;
        margin-bottom: 5px
    }
}

@media (min-width:960px) {
    .uk-form-horizontal .uk-form-label {
        width: 200px;
        margin-top: 7px;
        float: left
    }

    .uk-form-horizontal .uk-form-controls {
        margin-left: 215px
    }

    .uk-form-horizontal .uk-form-controls-text {
        padding-top: 7px
    }
}

.uk-form-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #999
}

.uk-form-icon:hover {
    color: var(--text-secondary-color)
}

.uk-form-icon:not(a):not(button):not(input) {
    pointer-events: none
}

.uk-form-icon:not(.uk-form-icon-flip)~.uk-input {
    padding-left: 40px !important
}

.uk-form-icon-flip {
    right: 0;
    left: auto
}

.uk-form-icon-flip~.uk-input {
    padding-right: 40px !important
}

.uk-button {
    margin: 0;
    border: none;
    overflow: visible;
    font: inherit;
    color: inherit;
    text-transform: none;
    -webkit-appearance: none;
    border-radius: 0;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 30px;
    vertical-align: middle;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: .1s ease-in-out;
    transition-property: color, background-color, border-color
}

.uk-button:not(:disabled) {
    cursor: pointer
}

.uk-button::-moz-focus-inner {
    border: 0;
    padding: 0
}

.uk-button:hover {
    text-decoration: none
}

.uk-button-default {
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid #e5e5e5
}

.uk-button-default:hover {
    background-color: transparent;
    color: var(--text-color);
    border-color: #b2b2b2
}

.uk-button-default.uk-active,
.uk-button-default:active {
    background-color: transparent;
    color: var(--text-color);
    border-color: #999
}

.uk-button-primary {
    background-color: var(--primary-color);
    color: var(--text-negative-color);
    ;
    border: 1px solid transparent
}

.uk-button-primary:hover {
    background-color: #0f7ae5;
    color: var(--text-negative-color);
}

.uk-button-primary.uk-active,
.uk-button-primary:active {
    background-color: #0e6dcd;
    color: var(--text-negative-color);
}

.uk-button-secondary {
    background-color: var(--text-color);
    color: var(--text-negative-color);
    ;
    border: 1px solid transparent
}

.uk-button-secondary:hover {
    background-color: #151515;
    color: var(--text-negative-color);
}

.uk-button-secondary.uk-active,
.uk-button-secondary:active {
    background-color: #080808;
    color: var(--text-negative-color);
}

.uk-button-danger {
    background-color: #f0506e;
    color: var(--text-negative-color);
    ;
    border: 1px solid transparent
}

.uk-button-danger:hover {
    background-color: #ee395b;
    color: var(--text-negative-color);
}

.uk-button-danger.uk-active,
.uk-button-danger:active {
    background-color: #ec2147;
    color: var(--text-negative-color);
}

.uk-button-danger:disabled,
.uk-button-default:disabled,
.uk-button-primary:disabled,
.uk-button-secondary:disabled {
    background-color: transparent;
    color: #999;
    border-color: #e5e5e5
}

.uk-button-small {
    padding: 0 15px;
    line-height: 28px;
    font-size: 14px
}

.uk-button-large {
    padding: 0 40px;
    line-height: 53px;
    font-size: 14px
}

.uk-button-text {
    padding: 0;
    line-height: 1.5;
    background: 0 0;
    color: var(--text-color);
    position: relative
}

.uk-button-text::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 100%;
    border-bottom: 1px solid var(--text-color);
    transition: right .3s ease-out
}

.uk-button-text:hover {
    color: var(--text-color)
}

.uk-button-text:hover::before {
    right: 0
}

.uk-button-text:disabled {
    color: #999
}

.uk-button-text:disabled::before {
    display: none
}

.uk-button-link {
    padding: 0;
    line-height: 1.5;
    background: 0 0;
    color: var(--text-color)
}

.uk-button-link:hover {
    color: #999;
    text-decoration: none
}

.uk-button-link:disabled {
    color: #999;
    text-decoration: none
}

.uk-button-group {
    display: inline-flex;
    vertical-align: middle;
    position: relative
}

.uk-button-group>.uk-button:nth-child(n+2),
.uk-button-group>div:nth-child(n+2) .uk-button {
    margin-left: -1px
}

.uk-button-group .uk-button.uk-active,
.uk-button-group .uk-button:active,
.uk-button-group .uk-button:hover {
    position: relative;
    z-index: 1
}

.uk-progress {
    vertical-align: baseline;
    display: block;
    width: 100%;
    border: 0;
    background-color: #f8f8f8;
    margin-bottom: 20px;
    height: 15px;
    border-radius: 500px;
    overflow: hidden
}

*+.uk-progress {
    margin-top: 20px
}

.uk-progress::-webkit-progress-bar {
    background-color: transparent
}

.uk-progress::-webkit-progress-value {
    background-color: var(--primary-color);
    transition: width .6s ease
}

.uk-progress::-moz-progress-bar {
    background-color: var(--primary-color);
    transition: width .6s ease
}

.uk-section {
    display: flow-root;
    box-sizing: border-box;
    padding-top: 40px;
    padding-bottom: 40px
}

@media (min-width:960px) {
    .uk-section {
        padding-top: 70px;
        padding-bottom: 70px
    }
}

.uk-section>:last-child {
    margin-bottom: 0
}

.uk-section-xsmall {
    padding-top: 20px;
    padding-bottom: 20px
}

.uk-section-small {
    padding-top: 40px;
    padding-bottom: 40px
}

.uk-section-large {
    padding-top: 70px;
    padding-bottom: 70px
}

@media (min-width:960px) {
    .uk-section-large {
        padding-top: 140px;
        padding-bottom: 140px
    }
}

.uk-section-xlarge {
    padding-top: 140px;
    padding-bottom: 140px
}

@media (min-width:960px) {
    .uk-section-xlarge {
        padding-top: 210px;
        padding-bottom: 210px
    }
}

.uk-section-default {
    background: var(--background-color)
}

.uk-section-muted {
    background: #f8f8f8
}

.uk-section-primary {
    background: var(--primary-color)
}

.uk-section-secondary {
    background: var(--text-color)
}

.uk-container {
    display: flow-root;
    box-sizing: content-box;
    max-width: 1380px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px
}

@media (min-width:640px) {
    .uk-container {
        padding-left: 30px;
        padding-right: 30px
    }
}

@media (min-width:960px) {
    .uk-container {
        padding-left: 40px;
        padding-right: 40px
    }
}

.uk-container>:last-child {
    margin-bottom: 0
}

.uk-container .uk-container {
    padding-left: 0;
    padding-right: 0
}

.uk-container-xsmall {
    max-width: 750px
}

.uk-container-small {
    max-width: 700px
}

.uk-container-large {
    max-width: 1400px
}

.uk-container-xlarge {
    max-width: 1600px
}

.uk-container-expand {
    max-width: none
}

.uk-container-expand-left {
    margin-left: 0
}

.uk-container-expand-right {
    margin-right: 0
}

@media (min-width:640px) {

    .uk-container-expand-left.uk-container-xsmall,
    .uk-container-expand-right.uk-container-xsmall {
        max-width: calc(50% + (750px / 2) - 30px)
    }

    .uk-container-expand-left.uk-container-small,
    .uk-container-expand-right.uk-container-small {
        max-width: calc(50% + (700px / 2) - 30px)
    }
}

@media (min-width:960px) {

    .uk-container-expand-left,
    .uk-container-expand-right {
        max-width: calc(50% + (1380px / 2) - 40px)
    }

    .uk-container-expand-left.uk-container-xsmall,
    .uk-container-expand-right.uk-container-xsmall {
        max-width: calc(50% + (750px / 2) - 40px)
    }

    .uk-container-expand-left.uk-container-small,
    .uk-container-expand-right.uk-container-small {
        max-width: calc(50% + (700px / 2) - 40px)
    }

    .uk-container-expand-left.uk-container-large,
    .uk-container-expand-right.uk-container-large {
        max-width: calc(50% + (1400px / 2) - 40px)
    }

    .uk-container-expand-left.uk-container-xlarge,
    .uk-container-expand-right.uk-container-xlarge {
        max-width: calc(50% + (1600px / 2) - 40px)
    }
}

.uk-container-item-padding-remove-left,
.uk-container-item-padding-remove-right {
    width: calc(100% + 15px)
}

.uk-container-item-padding-remove-left {
    margin-left: -15px
}

.uk-container-item-padding-remove-right {
    margin-right: -15px
}

@media (min-width:640px) {

    .uk-container-item-padding-remove-left,
    .uk-container-item-padding-remove-right {
        width: calc(100% + 30px)
    }

    .uk-container-item-padding-remove-left {
        margin-left: -30px
    }

    .uk-container-item-padding-remove-right {
        margin-right: -30px
    }
}

@media (min-width:960px) {

    .uk-container-item-padding-remove-left,
    .uk-container-item-padding-remove-right {
        width: calc(100% + 40px)
    }

    .uk-container-item-padding-remove-left {
        margin-left: -40px
    }

    .uk-container-item-padding-remove-right {
        margin-right: -40px
    }
}

.uk-tile {
    display: flow-root;
    position: relative;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 40px;
    padding-bottom: 40px
}

@media (min-width:640px) {
    .uk-tile {
        padding-left: 30px;
        padding-right: 30px
    }
}

@media (min-width:960px) {
    .uk-tile {
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 70px;
        padding-bottom: 70px
    }
}

.uk-tile>:last-child {
    margin-bottom: 0
}

.uk-tile-xsmall {
    padding-top: 20px;
    padding-bottom: 20px
}

.uk-tile-small {
    padding-top: 40px;
    padding-bottom: 40px
}

.uk-tile-large {
    padding-top: 70px;
    padding-bottom: 70px
}

@media (min-width:960px) {
    .uk-tile-large {
        padding-top: 140px;
        padding-bottom: 140px
    }
}

.uk-tile-xlarge {
    padding-top: 140px;
    padding-bottom: 140px
}

@media (min-width:960px) {
    .uk-tile-xlarge {
        padding-top: 210px;
        padding-bottom: 210px
    }
}

.uk-tile-default {
    background-color: var(--background-color)
}

.uk-tile-muted {
    background-color: #f8f8f8
}

.uk-tile-primary {
    background-color: var(--primary-color)
}

.uk-tile-secondary {
    background-color: var(--text-color)
}

.uk-card {
    position: relative;
    box-sizing: border-box;
    transition: box-shadow .1s ease-in-out
}

.uk-card-body {
    display: flow-root;
    padding: 30px 30px
}

.uk-card-header {
    display: flow-root;
    padding: 15px 30px
}

.uk-card-footer {
    display: flow-root;
    padding: 15px 30px
}

@media (min-width:1200px) {
    .uk-card-body {
        padding: 40px 40px
    }

    .uk-card-header {
        padding: 20px 40px
    }

    .uk-card-footer {
        padding: 20px 40px
    }
}

.uk-card-body>:last-child,
.uk-card-footer>:last-child,
.uk-card-header>:last-child {
    margin-bottom: 0
}

.uk-card-title {
    font-size: 24px;
    line-height: 1.4
}

.uk-card-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
    height: 22px;
    padding: 0 10px;
    background: var(--primary-color);
    color: var(--text-negative-color);
    ;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    border-radius: 2px;
    text-transform: uppercase
}

.uk-card-badge:first-child+* {
    margin-top: 0
}

.uk-card-hover:not(.uk-card-default):not(.uk-card-primary):not(.uk-card-secondary):hover {
    background-color: var(--background-color);
    box-shadow: 0 14px 25px var(--shadow-color-02)
}

.uk-card-default {
    background-color: var(--background-color);
    color: var(--text-secondary-color);
    box-shadow: 0 5px 15px var(--shadow-color-01)
}

.uk-card-default .uk-card-title {
    color: var(--text-color)
}

.uk-card-default.uk-card-hover:hover {
    background-color: var(--background-color);
    box-shadow: 0 14px 25px var(--shadow-color-02)
}

.uk-card-default .uk-card-header {
    border-bottom: 1px solid #e5e5e5
}

.uk-card-default .uk-card-footer {
    border-top: 1px solid #e5e5e5
}

.uk-card-primary {
    background-color: var(--primary-color);
    color: var(--text-negative-color);
    ;
    box-shadow: 0 5px 15px var(--shadow-color-01)
}

.uk-card-primary .uk-card-title {
    color: var(--text-negative-color);
}

.uk-card-primary.uk-card-hover:hover {
    background-color: var(--primary-color);
    box-shadow: 0 14px 25px var(--shadow-color-02)
}

.uk-card-secondary {
    background-color: var(--text-color);
    color: var(--text-negative-color);
    ;
    box-shadow: 0 5px 15px var(--shadow-color-01)
}

.uk-card-secondary .uk-card-title {
    color: var(--text-negative-color);
}

.uk-card-secondary.uk-card-hover:hover {
    background-color: var(--text-color);
    box-shadow: 0 14px 25px var(--shadow-color-02)
}

.uk-card-small .uk-card-body,
.uk-card-small.uk-card-body {
    padding: 20px 20px
}

.uk-card-small .uk-card-header {
    padding: 13px 20px
}

.uk-card-small .uk-card-footer {
    padding: 13px 20px
}

@media (min-width:1200px) {

    .uk-card-large .uk-card-body,
    .uk-card-large.uk-card-body {
        padding: 70px 70px
    }

    .uk-card-large .uk-card-header {
        padding: 35px 70px
    }

    .uk-card-large .uk-card-footer {
        padding: 35px 70px
    }
}

.uk-card-body>.uk-nav-default {
    margin-left: -30px;
    margin-right: -30px
}

.uk-card-body>.uk-nav-default:only-child {
    margin-top: -15px;
    margin-bottom: -15px
}

.uk-card-body>.uk-nav-default .uk-nav-divider,
.uk-card-body>.uk-nav-default .uk-nav-header,
.uk-card-body>.uk-nav-default>li>a {
    padding-left: 30px;
    padding-right: 30px
}

.uk-card-body>.uk-nav-default .uk-nav-sub {
    padding-left: 45px
}

@media (min-width:1200px) {
    .uk-card-body>.uk-nav-default {
        margin-left: -40px;
        margin-right: -40px
    }

    .uk-card-body>.uk-nav-default:only-child {
        margin-top: -25px;
        margin-bottom: -25px
    }

    .uk-card-body>.uk-nav-default .uk-nav-divider,
    .uk-card-body>.uk-nav-default .uk-nav-header,
    .uk-card-body>.uk-nav-default>li>a {
        padding-left: 40px;
        padding-right: 40px
    }

    .uk-card-body>.uk-nav-default .uk-nav-sub {
        padding-left: 55px
    }
}

.uk-card-small>.uk-nav-default {
    margin-left: -20px;
    margin-right: -20px
}

.uk-card-small>.uk-nav-default:only-child {
    margin-top: -5px;
    margin-bottom: -5px
}

.uk-card-small>.uk-nav-default .uk-nav-divider,
.uk-card-small>.uk-nav-default .uk-nav-header,
.uk-card-small>.uk-nav-default>li>a {
    padding-left: 20px;
    padding-right: 20px
}

.uk-card-small>.uk-nav-default .uk-nav-sub {
    padding-left: 35px
}

@media (min-width:1200px) {
    .uk-card-large>.uk-nav-default {
        margin: 0
    }

    .uk-card-large>.uk-nav-default:only-child {
        margin: 0
    }

    .uk-card-large>.uk-nav-default .uk-nav-divider,
    .uk-card-large>.uk-nav-default .uk-nav-header,
    .uk-card-large>.uk-nav-default>li>a {
        padding-left: 0;
        padding-right: 0
    }

    .uk-card-large>.uk-nav-default .uk-nav-sub {
        padding-left: 15px
    }
}

.uk-close {
    color: #999;
    transition: .1s ease-in-out;
    transition-property: color, opacity
}

.uk-close:hover {
    color: var(--text-secondary-color)
}

.uk-spinner>* {
    animation: uk-spinner-rotate 1.4s linear infinite
}

@keyframes uk-spinner-rotate {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(270deg)
    }
}

.uk-spinner>*>* {
    stroke-dasharray: 88px;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: uk-spinner-dash 1.4s ease-in-out infinite;
    stroke-width: 1;
    stroke-linecap: round
}

@keyframes uk-spinner-dash {
    0% {
        stroke-dashoffset: 88px
    }

    50% {
        stroke-dashoffset: 22px;
        transform: rotate(135deg)
    }

    100% {
        stroke-dashoffset: 88px;
        transform: rotate(450deg)
    }
}

.uk-totop {
    padding: 5px;
    color: #999;
    transition: color .1s ease-in-out
}

.uk-totop:hover {
    color: var(--text-secondary-color)
}

.uk-totop:active {
    color: var(--text-color)
}

.uk-marker {
    padding: 5px;
    background: var(--text-color);
    color: var(--text-negative-color);
    ;
    border-radius: 500px
}

.uk-marker:hover {
    color: var(--text-negative-color);
}

.uk-alert {
    position: relative;
    margin-bottom: 20px;
    padding: 15px 29px 15px 15px;
    background: #f8f8f8;
    color: var(--text-secondary-color)
}

*+.uk-alert {
    margin-top: 20px
}

.uk-alert>:last-child {
    margin-bottom: 0
}

.uk-alert-close {
    position: absolute;
    top: 20px;
    right: 15px;
    color: inherit;
    opacity: .4
}

.uk-alert-close:first-child+* {
    margin-top: 0
}

.uk-alert-close:hover {
    color: inherit;
    opacity: .8
}

.uk-alert-primary {
    background: #d8eafc;
    color: var(--primary-color)
}

.uk-alert-success {
    background: #edfbf6;
    color: #32d296
}

.uk-alert-warning {
    background: var(--background-color)6ee;
    color: #faa05a
}

.uk-alert-danger {
    background: #fef4f6;
    color: #f0506e
}

.uk-alert h1,
.uk-alert h2,
.uk-alert h3,
.uk-alert h4,
.uk-alert h5,
.uk-alert h6 {
    color: inherit
}

.uk-alert a:not([class]) {
    color: inherit;
    text-decoration: underline
}

.uk-alert a:not([class]):hover {
    color: inherit;
    text-decoration: underline
}

.uk-placeholder {
    margin-bottom: 20px;
    padding: 30px 30px;
    background: 0 0;
    border: 1px dashed #e5e5e5
}

*+.uk-placeholder {
    margin-top: 20px
}

.uk-placeholder>:last-child {
    margin-bottom: 0
}

.uk-badge {
    box-sizing: border-box;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 500px;
    vertical-align: middle;
    background: var(--primary-color);
    color: var(--text-negative-color) !important;
    font-size: 11px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 0
}

.uk-badge:hover {
    text-decoration: none
}

.uk-label {
    display: inline-block;
    padding: 0 10px;
    background: var(--primary-color);
    line-height: 1.5;
    font-size: 12px;
    color: var(--text-negative-color);
    ;
    vertical-align: middle;
    white-space: nowrap;
    border-radius: 2px;
    text-transform: uppercase
}

.uk-label-success {
    background-color: var(--success-color);
    color: var(--text-negative-color);
}

.uk-label-warning {
    background-color: var(--warn-color);
    color: var(--text-negative-color);
}

.uk-label-danger {
    background-color: var(--danger-color);
    color: var(--text-negative-color);
}

.uk-overlay {
    padding: 30px 30px
}

.uk-overlay>:last-child {
    margin-bottom: 0
}

.uk-overlay-default {
    background: rgba(255, 255, 255, .8)
}

.uk-overlay-primary {
    background: rgba(34, 34, 34, .8)
}

.uk-article {
    display: flow-root
}

.uk-article>:last-child {
    margin-bottom: 0
}

.uk-article+.uk-article {
    margin-top: 70px
}

.uk-article-title {
    font-size: 32.3px;
    line-height: 1.2
}

@media (min-width:960px) {
    .uk-article-title {
        font-size: 38px
    }
}

.uk-article-meta {
    font-size: 14px;
    line-height: 1.4;
    color: #999
}

.uk-article-meta a {
    color: #999
}

.uk-article-meta a:hover {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-comment-body {
    display: flow-root;
    overflow-wrap: break-word;
    word-wrap: break-word
}

.uk-comment-header {
    display: flow-root;
    margin-bottom: 20px
}

.uk-comment-body>:last-child,
.uk-comment-header>:last-child {
    margin-bottom: 0
}

.uk-comment-title {
    font-size: 20px;
    line-height: 1.4
}

.uk-comment-meta {
    font-size: 14px;
    line-height: 1.4;
    color: #999
}

.uk-comment-list {
    padding: 0;
    list-style: none
}

.uk-comment-list>:nth-child(n+2) {
    margin-top: 70px
}

.uk-comment-list .uk-comment~ul {
    margin: 70px 0 0 0;
    padding-left: 30px;
    list-style: none
}

@media (min-width:960px) {
    .uk-comment-list .uk-comment~ul {
        padding-left: 100px
    }
}

.uk-comment-list .uk-comment~ul>:nth-child(n+2) {
    margin-top: 70px
}

.uk-comment-primary {
    padding: 30px;
    background-color: #f8f8f8
}

.uk-search {
    display: inline-block;
    position: relative;
    max-width: 100%;
    margin: 0
}

.uk-search-input::-webkit-search-cancel-button,
.uk-search-input::-webkit-search-decoration {
    -webkit-appearance: none
}

.uk-search-input::-moz-placeholder {
    opacity: 1
}

.uk-search-input {
    box-sizing: border-box;
    margin: 0;
    border-radius: 0;
    font: inherit;
    overflow: visible;
    -webkit-appearance: none;
    vertical-align: middle;
    width: 100%;
    border: none;
    color: var(--text-secondary-color)
}

.uk-search-input:focus {
    outline: 0
}

.uk-search-input::placeholder {
    color: #999
}

.uk-search .uk-search-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #999
}

.uk-search .uk-search-icon:hover {
    color: #999
}

.uk-search .uk-search-icon:not(a):not(button):not(input) {
    pointer-events: none
}

.uk-search .uk-search-icon-flip {
    right: 0;
    left: auto
}

.uk-search-default {
    width: 240px
}

.uk-search-default .uk-search-input {
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    background: 0 0;
    border: 1px solid #e5e5e5
}

.uk-search-default .uk-search-input:focus {
    background-color: rgba(0, 0, 0, 0);
    border-color: var(--primary-color)
}

.uk-search-default .uk-search-icon {
    width: 40px
}

.uk-search-default .uk-search-icon:not(.uk-search-icon-flip)~.uk-search-input {
    padding-left: 40px
}

.uk-search-default .uk-search-icon-flip~.uk-search-input {
    padding-right: 40px
}

.uk-search-navbar {
    width: 400px
}

.uk-search-navbar .uk-search-input {
    height: 40px;
    background: 0 0;
    font-size: 24px
}

.uk-search-navbar .uk-search-icon {
    width: 40px
}

.uk-search-navbar .uk-search-icon:not(.uk-search-icon-flip)~.uk-search-input {
    padding-left: 40px
}

.uk-search-navbar .uk-search-icon-flip~.uk-search-input {
    padding-right: 40px
}

.uk-search-large {
    width: 500px
}

.uk-search-large .uk-search-input {
    height: 80px;
    background: 0 0;
    font-size: 38px
}

.uk-search-large .uk-search-icon {
    width: 80px
}

.uk-search-large .uk-search-icon:not(.uk-search-icon-flip)~.uk-search-input {
    padding-left: 80px
}

.uk-search-large .uk-search-icon-flip~.uk-search-input {
    padding-right: 80px
}

.uk-search-toggle {
    color: #999
}

.uk-search-toggle:hover {
    color: var(--text-secondary-color)
}

.uk-accordion {
    padding: 0;
    list-style: none
}

.uk-accordion>:nth-child(n+2) {
    margin-top: 20px
}

.uk-accordion-title {
    display: block;
    font-size: 20px;
    line-height: 1.4;
    color: var(--text-color);
    overflow: hidden
}

.uk-accordion-title::before {
    content: "";
    width: 1.4em;
    height: 1.4em;
    margin-left: 10px;
    float: right;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20width%3D%221%22%20height%3D%2213%22%20x%3D%226%22%20y%3D%220%22%20%2F%3E%0A%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: 50% 50%
}

.uk-open>.uk-accordion-title::before {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.uk-accordion-title:hover {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-accordion-content {
    display: flow-root;
    margin-top: 20px
}

.uk-accordion-content>:last-child {
    margin-bottom: 0
}

.uk-drop {
    display: none;
    position: absolute;
    z-index: 1020;
    --uk-position-offset: 20px;
    box-sizing: border-box;
    width: 300px
}

.uk-drop.uk-open {
    display: block
}

.uk-drop-stack .uk-drop-grid>* {
    width: 100% !important
}

.uk-dropdown {
    display: none;
    position: absolute;
    z-index: 1020;
    --uk-position-offset: 10px;
    box-sizing: border-box;
    min-width: 200px;
    max-width: 100vw;
    padding: 25px;
    background: var(--background-color);
    color: var(--text-secondary-color);
    box-shadow: 0 5px 12px rgba(0, 0, 0, .15)
}

.uk-dropdown.uk-open {
    display: block
}

.uk-dropdown-nav {
    font-size: 14px
}

.uk-dropdown-nav>li>a {
    color: #999
}

.uk-dropdown-nav>li.uk-active>a,
.uk-dropdown-nav>li>a:hover {
    color: var(--text-secondary-color)
}

.uk-dropdown-nav .uk-nav-subtitle {
    font-size: 12px
}

.uk-dropdown-nav .uk-nav-header {
    color: var(--text-color)
}

.uk-dropdown-nav .uk-nav-divider {
    border-top: 1px solid #e5e5e5
}

.uk-dropdown-nav .uk-nav-sub a {
    color: #999
}

.uk-dropdown-nav .uk-nav-sub a:hover,
.uk-dropdown-nav .uk-nav-sub li.uk-active>a {
    color: var(--text-secondary-color)
}

.uk-dropdown-stack .uk-dropdown-grid>* {
    width: 100% !important
}

.uk-modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1010;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 15px 15px;
    background: rgba(0, 0, 0, .6);
    opacity: 0;
    transition: opacity .15s linear
}

@media (min-width:640px) {
    .uk-modal {
        padding: 50px 30px
    }
}

@media (min-width:960px) {
    .uk-modal {
        padding-left: 40px;
        padding-right: 40px
    }
}

.uk-modal.uk-open {
    opacity: 1
}

.uk-modal-page {
    overflow: hidden
}

.uk-modal-dialog {
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    width: 600px;
    max-width: 100% !important;
    background: var(--background-color);
    opacity: 0;
    transform: translateY(-100px);
    transition: .3s linear;
    transition-property: opacity, transform
}

.uk-open>.uk-modal-dialog {
    opacity: 1;
    transform: translateY(0)
}

.uk-modal-container .uk-modal-dialog {
    width: 1200px
}

.uk-modal-full {
    padding: 0;
    background: 0 0
}

.uk-modal-full .uk-modal-dialog {
    margin: 0;
    width: 100%;
    max-width: 100%;
    transform: translateY(0)
}

.uk-modal-body {
    display: flow-root;
    padding: 30px 30px
}

.uk-modal-header {
    display: flow-root;
    padding: 15px 30px;
    background: var(--background-color);
    border-bottom: 1px solid #e5e5e5
}

.uk-modal-footer {
    display: flow-root;
    padding: 15px 30px;
    background: var(--background-color);
    border-top: 1px solid #e5e5e5
}

.uk-modal-body>:last-child,
.uk-modal-footer>:last-child,
.uk-modal-header>:last-child {
    margin-bottom: 0
}

.uk-modal-title {
    font-size: 30px;
    line-height: 1.3
}

[class*=uk-modal-close-] {
    position: absolute;
    z-index: 1010;
    top: 10px;
    right: 10px;
    padding: 5px
}

[class*=uk-modal-close-]:first-child+* {
    margin-top: 0
}

.uk-modal-close-outside {
    top: 0;
    right: -5px;
    transform: translate(0, -100%);
    color: var(--text-negative-color);
}

.uk-modal-close-outside:hover {
    color: var(--text-negative-color);
}

@media (min-width:960px) {
    .uk-modal-close-outside {
        right: 0;
        transform: translate(100%, -100%)
    }
}

.uk-modal-close-full {
    top: 0;
    right: 0;
    padding: 20px;
    background: var(--background-color)
}

.uk-slideshow {
    -webkit-tap-highlight-color: transparent
}

.uk-slideshow-items {
    position: relative;
    z-index: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    -webkit-touch-callout: none;
    touch-action: pan-y
}

.uk-slideshow-items>* {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    will-change: transform, opacity
}

.uk-slideshow-items>:not(.uk-active) {
    display: none
}

.uk-slider {
    -webkit-tap-highlight-color: transparent
}

.uk-slider-container {
    overflow: hidden
}

.uk-slider-container-offset {
    margin: -11px -25px -39px -25px;
    padding: 11px 25px 39px 25px
}

.uk-slider-items {
    will-change: transform;
    position: relative;
    touch-action: pan-y
}

.uk-slider-items:not(.uk-grid) {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    -webkit-touch-callout: none
}

.uk-slider-items.uk-grid {
    flex-wrap: nowrap
}

.uk-slider-items>* {
    flex: none;
    max-width: 100%;
    position: relative
}

.uk-sticky {
    position: relative;
    box-sizing: border-box
}

.uk-sticky-fixed {
    z-index: 980;
    margin: 0 !important;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden
}

.uk-sticky[class*=uk-animation-] {
    animation-duration: .2s
}

.uk-sticky.uk-animation-reverse {
    animation-duration: .2s
}

.uk-offcanvas {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000
}

.uk-offcanvas-flip .uk-offcanvas {
    right: 0;
    left: auto
}

.uk-offcanvas-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -270px;
    box-sizing: border-box;
    width: 270px;
    padding: 20px 20px;
    background: var(--background-color);

    color: var(--text-color) !important;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch
}

.uk-nav-divider {
    border-top-color: rgba(117, 117, 117, 0.473) !important
}

.uk-offcanvas-bar * {
    color: var(--text-color) !important;
}

@media (min-width:960px) {
    .uk-offcanvas-bar {
        left: -350px;
        width: 350px;
        padding: 40px 40px
    }
}

.uk-offcanvas-flip .uk-offcanvas-bar {
    left: auto;
    right: -270px
}

@media (min-width:960px) {
    .uk-offcanvas-flip .uk-offcanvas-bar {
        right: -350px
    }
}

.uk-open>.uk-offcanvas-bar {
    left: 0
}

.uk-offcanvas-flip .uk-open>.uk-offcanvas-bar {
    left: auto;
    right: 0
}

.uk-offcanvas-bar-animation {
    transition: left .3s ease-out
}

.uk-offcanvas-flip .uk-offcanvas-bar-animation {
    transition-property: right
}

.uk-offcanvas-reveal {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    overflow: hidden;
    transition: width .3s ease-out
}

.uk-offcanvas-reveal .uk-offcanvas-bar {
    left: 0
}

.uk-offcanvas-flip .uk-offcanvas-reveal .uk-offcanvas-bar {
    left: auto;
    right: 0
}

.uk-open>.uk-offcanvas-reveal {
    width: 270px
}

@media (min-width:960px) {
    .uk-open>.uk-offcanvas-reveal {
        width: 350px
    }
}

.uk-offcanvas-flip .uk-offcanvas-reveal {
    right: 0;
    left: auto
}

.uk-offcanvas-close {
    position: absolute;
    z-index: 1000;
    top: 5px;
    right: 5px;
    padding: 5px
}

@media (min-width:960px) {
    .uk-offcanvas-close {
        top: 20px;
        right: 20px
    }
}

.uk-offcanvas-close:first-child+* {
    margin-top: 0
}

.uk-offcanvas-overlay {
    width: 100vw;
    touch-action: none
}

.uk-offcanvas-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .1);
    opacity: 0;
    transition: opacity .15s linear
}

.uk-offcanvas-overlay.uk-open::before {
    opacity: 1
}

.uk-offcanvas-container,
.uk-offcanvas-page {
    overflow-x: hidden
}

.uk-offcanvas-container {
    position: relative;
    left: 0;
    transition: left .3s ease-out;
    box-sizing: border-box;
    width: 100%
}

:not(.uk-offcanvas-flip).uk-offcanvas-container-animation {
    left: 270px
}

.uk-offcanvas-flip.uk-offcanvas-container-animation {
    left: -270px
}

@media (min-width:960px) {
    :not(.uk-offcanvas-flip).uk-offcanvas-container-animation {
        left: 350px
    }

    .uk-offcanvas-flip.uk-offcanvas-container-animation {
        left: -350px
    }
}

.uk-switcher {
    margin: 0;
    padding: 0;
    list-style: none
}

.uk-switcher>:not(.uk-active) {
    display: none
}

.uk-switcher>*>:last-child {
    margin-bottom: 0
}

.uk-leader {
    overflow: hidden
}

.uk-leader-fill::after {
    display: inline-block;
    margin-left: 15px;
    width: 0;
    content: attr(data-fill);
    white-space: nowrap
}

.uk-leader-fill.uk-leader-hide::after {
    display: none
}

:root {
    --uk-leader-fill-content: '.'
}

.uk-notification {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1040;
    box-sizing: border-box;
    width: 350px
}

.uk-notification-bottom-right,
.uk-notification-top-right {
    left: auto;
    right: 10px
}

.uk-notification-bottom-center,
.uk-notification-top-center {
    left: 50%;
    margin-left: -175px
}

.uk-notification-bottom-center,
.uk-notification-bottom-left,
.uk-notification-bottom-right {
    top: auto;
    bottom: 10px
}

@media (max-width:639px) {
    .uk-notification {
        left: 10px;
        right: 10px;
        width: auto;
        margin: 0
    }
}

.uk-notification-message {
    position: relative;
    padding: 15px;
    background: #f8f8f8;
    color: var(--text-secondary-color);
    font-size: 20px;
    line-height: 1.4;
    cursor: pointer
}

*+.uk-notification-message {
    margin-top: 10px
}

.uk-notification-close {
    display: none;
    position: absolute;
    top: 20px;
    right: 15px
}

.uk-notification-message:hover .uk-notification-close {
    display: block
}

.uk-notification-message-primary {
    color: var(--primary-color)
}

.uk-notification-message-success {
    color: var(--success-color)
}

.uk-notification-message-warning {
    color: var(--warn-color)
}

.uk-notification-message-danger {
    color: var(--danger-color)
}

.uk-tooltip {
    display: none;
    position: absolute;
    z-index: 1030;
    --uk-position-offset: 10px;
    top: 0;
    box-sizing: border-box;
    max-width: 200px;
    padding: 3px 6px;
    background: var(--text-secondary-color);
    border-radius: 2px;
    color: var(--text-negative-color);
    ;
    font-size: 12px
}

.uk-tooltip.uk-active {
    display: block
}

.uk-sortable {
    position: relative
}

.uk-sortable>:last-child {
    margin-bottom: 0
}

.uk-sortable-drag {
    position: fixed !important;
    z-index: 1050 !important;
    pointer-events: none
}

.uk-sortable-placeholder {
    opacity: 0;
    pointer-events: none
}

.uk-sortable-empty {
    min-height: 50px
}

.uk-sortable-handle:hover {
    cursor: move
}

.uk-countdown-number {
    font-variant-numeric: tabular-nums;
    font-size: 2rem;
    line-height: .8
}

@media (min-width:640px) {
    .uk-countdown-number {
        font-size: 4rem
    }
}

@media (min-width:960px) {
    .uk-countdown-number {
        font-size: 6rem
    }
}

.uk-countdown-separator {
    font-size: 1rem;
    line-height: 1.6
}

@media (min-width:640px) {
    .uk-countdown-separator {
        font-size: 2rem
    }
}

@media (min-width:960px) {
    .uk-countdown-separator {
        font-size: 3rem
    }
}

.uk-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none
}

.uk-grid>* {
    margin: 0
}

.uk-grid>*>:last-child {
    margin-bottom: 0
}

.uk-grid {
    margin-left: -30px
}

.uk-grid>* {
    padding-left: 30px
}

*+.uk-grid-margin,
.uk-grid+.uk-grid,
.uk-grid>.uk-grid-margin {
    margin-top: 30px
}

@media (min-width:1200px) {
    .uk-grid {
        margin-left: -40px
    }

    .uk-grid>* {
        padding-left: 40px
    }

    *+.uk-grid-margin,
    .uk-grid+.uk-grid,
    .uk-grid>.uk-grid-margin {
        margin-top: 40px
    }
}

.uk-grid-column-small,
.uk-grid-small {
    margin-left: -15px
}

.uk-grid-column-small>*,
.uk-grid-small>* {
    padding-left: 15px
}

*+.uk-grid-margin-small,
.uk-grid+.uk-grid-row-small,
.uk-grid+.uk-grid-small,
.uk-grid-row-small>.uk-grid-margin,
.uk-grid-small>.uk-grid-margin {
    margin-top: 15px
}

.uk-grid-column-medium,
.uk-grid-medium {
    margin-left: -30px
}

.uk-grid-column-medium>*,
.uk-grid-medium>* {
    padding-left: 30px
}

*+.uk-grid-margin-medium,
.uk-grid+.uk-grid-medium,
.uk-grid+.uk-grid-row-medium,
.uk-grid-medium>.uk-grid-margin,
.uk-grid-row-medium>.uk-grid-margin {
    margin-top: 30px
}

.uk-grid-column-large,
.uk-grid-large {
    margin-left: -40px
}

.uk-grid-column-large>*,
.uk-grid-large>* {
    padding-left: 40px
}

*+.uk-grid-margin-large,
.uk-grid+.uk-grid-large,
.uk-grid+.uk-grid-row-large,
.uk-grid-large>.uk-grid-margin,
.uk-grid-row-large>.uk-grid-margin {
    margin-top: 40px
}

@media (min-width:1200px) {

    .uk-grid-column-large,
    .uk-grid-large {
        margin-left: -70px
    }

    .uk-grid-column-large>*,
    .uk-grid-large>* {
        padding-left: 70px
    }

    *+.uk-grid-margin-large,
    .uk-grid+.uk-grid-large,
    .uk-grid+.uk-grid-row-large,
    .uk-grid-large>.uk-grid-margin,
    .uk-grid-row-large>.uk-grid-margin {
        margin-top: 70px
    }
}

.uk-grid-collapse,
.uk-grid-column-collapse {
    margin-left: 0
}

.uk-grid-collapse>*,
.uk-grid-column-collapse>* {
    padding-left: 0
}

.uk-grid+.uk-grid-collapse,
.uk-grid+.uk-grid-row-collapse,
.uk-grid-collapse>.uk-grid-margin,
.uk-grid-row-collapse>.uk-grid-margin {
    margin-top: 0
}

.uk-grid-divider>* {
    position: relative
}

.uk-grid-divider>:not(.uk-first-column)::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 1px solid #e5e5e5
}

.uk-grid-divider.uk-grid-stack>.uk-grid-margin::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    border-top: 1px solid #e5e5e5
}

.uk-grid-divider {
    margin-left: -60px
}

.uk-grid-divider>* {
    padding-left: 60px
}

.uk-grid-divider>:not(.uk-first-column)::before {
    left: 30px
}

.uk-grid-divider.uk-grid-stack>.uk-grid-margin {
    margin-top: 60px
}

.uk-grid-divider.uk-grid-stack>.uk-grid-margin::before {
    top: -30px;
    left: 60px
}

@media (min-width:1200px) {
    .uk-grid-divider {
        margin-left: -80px
    }

    .uk-grid-divider>* {
        padding-left: 80px
    }

    .uk-grid-divider>:not(.uk-first-column)::before {
        left: 40px
    }

    .uk-grid-divider.uk-grid-stack>.uk-grid-margin {
        margin-top: 80px
    }

    .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before {
        top: -40px;
        left: 80px
    }
}

.uk-grid-divider.uk-grid-column-small,
.uk-grid-divider.uk-grid-small {
    margin-left: -30px
}

.uk-grid-divider.uk-grid-column-small>*,
.uk-grid-divider.uk-grid-small>* {
    padding-left: 30px
}

.uk-grid-divider.uk-grid-column-small>:not(.uk-first-column)::before,
.uk-grid-divider.uk-grid-small>:not(.uk-first-column)::before {
    left: 15px
}

.uk-grid-divider.uk-grid-row-small.uk-grid-stack>.uk-grid-margin,
.uk-grid-divider.uk-grid-small.uk-grid-stack>.uk-grid-margin {
    margin-top: 30px
}

.uk-grid-divider.uk-grid-small.uk-grid-stack>.uk-grid-margin::before {
    top: -15px;
    left: 30px
}

.uk-grid-divider.uk-grid-row-small.uk-grid-stack>.uk-grid-margin::before {
    top: -15px
}

.uk-grid-divider.uk-grid-column-small.uk-grid-stack>.uk-grid-margin::before {
    left: 30px
}

.uk-grid-divider.uk-grid-column-medium,
.uk-grid-divider.uk-grid-medium {
    margin-left: -60px
}

.uk-grid-divider.uk-grid-column-medium>*,
.uk-grid-divider.uk-grid-medium>* {
    padding-left: 60px
}

.uk-grid-divider.uk-grid-column-medium>:not(.uk-first-column)::before,
.uk-grid-divider.uk-grid-medium>:not(.uk-first-column)::before {
    left: 30px
}

.uk-grid-divider.uk-grid-medium.uk-grid-stack>.uk-grid-margin,
.uk-grid-divider.uk-grid-row-medium.uk-grid-stack>.uk-grid-margin {
    margin-top: 60px
}

.uk-grid-divider.uk-grid-medium.uk-grid-stack>.uk-grid-margin::before {
    top: -30px;
    left: 60px
}

.uk-grid-divider.uk-grid-row-medium.uk-grid-stack>.uk-grid-margin::before {
    top: -30px
}

.uk-grid-divider.uk-grid-column-medium.uk-grid-stack>.uk-grid-margin::before {
    left: 60px
}

.uk-grid-divider.uk-grid-column-large,
.uk-grid-divider.uk-grid-large {
    margin-left: -80px
}

.uk-grid-divider.uk-grid-column-large>*,
.uk-grid-divider.uk-grid-large>* {
    padding-left: 80px
}

.uk-grid-divider.uk-grid-column-large>:not(.uk-first-column)::before,
.uk-grid-divider.uk-grid-large>:not(.uk-first-column)::before {
    left: 40px
}

.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin,
.uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin {
    margin-top: 80px
}

.uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin::before {
    top: -40px;
    left: 80px
}

.uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin::before {
    top: -40px
}

.uk-grid-divider.uk-grid-column-large.uk-grid-stack>.uk-grid-margin::before {
    left: 80px
}

@media (min-width:1200px) {

    .uk-grid-divider.uk-grid-column-large,
    .uk-grid-divider.uk-grid-large {
        margin-left: -140px
    }

    .uk-grid-divider.uk-grid-column-large>*,
    .uk-grid-divider.uk-grid-large>* {
        padding-left: 140px
    }

    .uk-grid-divider.uk-grid-column-large>:not(.uk-first-column)::before,
    .uk-grid-divider.uk-grid-large>:not(.uk-first-column)::before {
        left: 70px
    }

    .uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin,
    .uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin {
        margin-top: 140px
    }

    .uk-grid-divider.uk-grid-large.uk-grid-stack>.uk-grid-margin::before {
        top: -70px;
        left: 140px
    }

    .uk-grid-divider.uk-grid-row-large.uk-grid-stack>.uk-grid-margin::before {
        top: -70px
    }

    .uk-grid-divider.uk-grid-column-large.uk-grid-stack>.uk-grid-margin::before {
        left: 140px
    }
}

.uk-grid-item-match,
.uk-grid-match>* {
    display: flex;
    flex-wrap: wrap
}

.uk-grid-item-match>:not([class*=uk-width]),
.uk-grid-match>*>:not([class*=uk-width]) {
    box-sizing: border-box;
    width: 100%;
    flex: auto
}

.uk-nav,
.uk-nav ul {
    margin: 0;
    padding: 0;
    list-style: none
}

.uk-nav li>a {
    display: flex;
    align-items: center;
    column-gap: .25em;
    text-decoration: none
}

.uk-nav>li>a {
    padding: 5px 0
}

ul.uk-nav-sub {
    padding: 5px 0 5px 15px
}

.uk-nav-sub ul {
    padding-left: 15px
}

.uk-nav-sub a {
    padding: 2px 0
}

.uk-nav-parent-icon>.uk-parent>a::after {
    content: "";
    width: 1.5em;
    height: 1.5em;
    margin-left: auto;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.1%22%20points%3D%2210%201%204%207%2010%2013%22%20%2F%3E%0A%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: 50% 50%
}

.uk-nav-parent-icon>.uk-parent.uk-open>a::after {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%221.1%22%20points%3D%221%204%207%2010%2013%204%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.uk-nav-header {
    padding: 5px 0;
    text-transform: uppercase;
    font-size: 12px
}

.uk-nav-header:not(:first-child) {
    margin-top: 20px
}

.uk-nav .uk-nav-divider {
    margin: 5px 0
}

.uk-nav-default {
    font-size: 14px
}

.uk-nav-default>li>a {
    color: #999
}

.uk-nav-default>li>a:hover {
    color: var(--text-secondary-color)
}

.uk-nav-default>li.uk-active>a {
    color: var(--text-color)
}

.uk-nav-default .uk-nav-subtitle {
    font-size: 12px
}

.uk-nav-default .uk-nav-header {
    color: var(--text-color)
}

.uk-nav-default .uk-nav-divider {
    border-top: 1px solid #e5e5e5
}

.uk-nav-default .uk-nav-sub a {
    color: #999
}

.uk-nav-default .uk-nav-sub a:hover {
    color: var(--text-secondary-color)
}

.uk-nav-default .uk-nav-sub li.uk-active>a {
    color: var(--text-color)
}

.uk-nav-primary>li>a {
    font-size: 24px;
    line-height: 1.5;
    color: #999
}

.uk-nav-primary>li>a:hover {
    color: var(--text-secondary-color)
}

.uk-nav-primary>li.uk-active>a {
    color: var(--text-color)
}

.uk-nav-primary .uk-nav-subtitle {
    font-size: 20px
}

.uk-nav-primary .uk-nav-header {
    color: var(--text-color)
}

.uk-nav-primary .uk-nav-divider {
    border-top: 1px solid #e5e5e5
}

.uk-nav-primary .uk-nav-sub a {
    color: #999
}

.uk-nav-primary .uk-nav-sub a:hover {
    color: var(--text-secondary-color)
}

.uk-nav-primary .uk-nav-sub li.uk-active>a {
    color: var(--text-color)
}

.uk-nav-center {
    text-align: center
}

.uk-nav-center li>a {
    justify-content: center
}

.uk-nav-center .uk-nav-sub,
.uk-nav-center .uk-nav-sub ul {
    padding-left: 0
}

.uk-nav-center.uk-nav-parent-icon>.uk-parent>a::after {
    margin-left: 0
}

.uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider) {
    margin-top: 0;
    padding-top: 0;
    border-top: 1px solid #e5e5e5
}

.uk-navbar {
    display: flex;
    position: relative
}

.uk-navbar-container:not(.uk-navbar-transparent) {
    background: #f8f8f8
}

.uk-navbar-center,
.uk-navbar-center-left>*,
.uk-navbar-center-right>*,
.uk-navbar-left,
.uk-navbar-right {
    display: flex;
    align-items: center
}

.uk-navbar-right {
    margin-left: auto
}

.uk-navbar-center:only-child {
    margin-left: auto;
    margin-right: auto;
    position: relative
}

.uk-navbar-center:not(:only-child) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    box-sizing: border-box;
    z-index: 990
}

.uk-navbar-center-left,
.uk-navbar-center-right {
    position: absolute;
    top: 0
}

.uk-navbar-center-left {
    right: 100%
}

.uk-navbar-center-right {
    left: 100%
}

[class*=uk-navbar-center-] {
    width: max-content;
    box-sizing: border-box
}

.uk-navbar-nav {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none
}

.uk-navbar-center:only-child,
.uk-navbar-left,
.uk-navbar-right {
    flex-wrap: wrap
}

.uk-navbar-item,
.uk-navbar-nav>li>a,
.uk-navbar-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: .25em;
    box-sizing: border-box;
    min-height: 80px;
    padding: 0 15px;
    font-size: 14px;
    font-family: var(--font-family);
    text-decoration: none
}

.uk-navbar-nav>li>a {
    color: #999;
    text-transform: uppercase;
    transition: .1s ease-in-out;
    transition-property: color, background-color
}

.uk-navbar-nav>li:hover>a,
.uk-navbar-nav>li>a[aria-expanded=true] {
    color: var(--text-secondary-color)
}

.uk-navbar-nav>li>a:active {
    color: var(--text-color)
}

.uk-navbar-nav>li.uk-active>a {
    color: var(--text-color)
}

.uk-navbar-item {
    color: var(--text-secondary-color)
}

.uk-navbar-item>:last-child {
    margin-bottom: 0
}

.uk-navbar-toggle {
    color: #999
}

.uk-navbar-toggle:hover,
.uk-navbar-toggle[aria-expanded=true] {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-navbar-subtitle {
    font-size: 14px
}

.uk-navbar-justify .uk-navbar-item,
.uk-navbar-justify .uk-navbar-left,
.uk-navbar-justify .uk-navbar-nav,
.uk-navbar-justify .uk-navbar-nav>li,
.uk-navbar-justify .uk-navbar-right,
.uk-navbar-justify .uk-navbar-toggle {
    flex-grow: 1
}

.uk-navbar-dropdown {
    display: none;
    position: absolute;
    z-index: 1020;
    --uk-position-offset: 15px;
    box-sizing: border-box;
    width: 200px;
    max-width: 100vw;
    padding: 25px;
    background: var(--background-color);
    color: var(--text-secondary-color);
    box-shadow: 0 5px 12px rgba(0, 0, 0, .15)
}

.uk-navbar-dropdown.uk-open {
    display: block
}

.uk-navbar-dropdown-grid {
    margin-left: -50px
}

.uk-navbar-dropdown-grid>* {
    padding-left: 50px
}

.uk-navbar-dropdown-grid>.uk-grid-margin {
    margin-top: 50px
}

.uk-navbar-dropdown-stack .uk-navbar-dropdown-grid>* {
    width: 100% !important
}

.uk-navbar-dropdown-width-2:not(.uk-navbar-dropdown-stack) {
    width: 400px
}

.uk-navbar-dropdown-width-3:not(.uk-navbar-dropdown-stack) {
    width: 600px
}

.uk-navbar-dropdown-width-4:not(.uk-navbar-dropdown-stack) {
    width: 800px
}

.uk-navbar-dropdown-width-5:not(.uk-navbar-dropdown-stack) {
    width: 1000px
}

.uk-navbar-dropdown-dropbar {
    --uk-position-offset: 0px;
    margin-bottom: 0;
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: none
}

.uk-navbar-dropdown-nav {
    font-size: 14px
}

.uk-navbar-dropdown-nav>li>a {
    color: #999
}

.uk-navbar-dropdown-nav>li>a:hover {
    color: var(--text-secondary-color)
}

.uk-navbar-dropdown-nav>li.uk-active>a {
    color: var(--text-color)
}

.uk-navbar-dropdown-nav .uk-nav-subtitle {
    font-size: 12px
}

.uk-navbar-dropdown-nav .uk-nav-header {
    color: var(--text-color)
}

.uk-navbar-dropdown-nav .uk-nav-divider {
    border-top: 1px solid #e5e5e5
}

.uk-navbar-dropdown-nav .uk-nav-sub a {
    color: #999
}

.uk-navbar-dropdown-nav .uk-nav-sub a:hover {
    color: var(--text-secondary-color)
}

.uk-navbar-dropdown-nav .uk-nav-sub li.uk-active>a {
    color: var(--text-color)
}

.uk-navbar-dropbar {
    position: absolute;
    z-index: 980;
    left: 0;
    right: 0;
    background: var(--background-color);
    box-shadow: 0 5px 7px rgba(0, 0, 0, .05)
}

.uk-navbar-container>.uk-container .uk-navbar-left {
    margin-left: -15px;
    margin-right: -15px
}

.uk-navbar-container>.uk-container .uk-navbar-right {
    margin-right: -15px
}

.uk-navbar-dropdown-grid>* {
    position: relative
}

.uk-navbar-dropdown-grid>:not(.uk-first-column)::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 25px;
    border-left: 1px solid #e5e5e5
}

.uk-navbar-dropdown-grid.uk-grid-stack>.uk-grid-margin::before {
    content: "";
    position: absolute;
    top: -25px;
    left: 50px;
    right: 0;
    border-top: 1px solid #e5e5e5
}

.uk-subnav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: -20px;
    padding: 0;
    list-style: none
}

.uk-subnav>* {
    flex: none;
    padding-left: 20px;
    position: relative
}

.uk-subnav>*>:first-child {
    display: flex;
    align-items: center;
    column-gap: .25em;
    color: #999;
    font-size: 14px;
    text-transform: uppercase;
    transition: .1s ease-in-out;
    transition-property: color, background-color
}

.uk-subnav>*>a:hover {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-subnav>.uk-active>a {
    color: var(--text-color)
}

.uk-subnav-divider {
    margin-left: -41px
}

.uk-subnav-divider>* {
    display: flex;
    align-items: center
}

.uk-subnav-divider>::before {
    content: "";
    height: 1.5em;
    margin-left: 0;
    margin-right: 20px;
    border-left: 1px solid transparent
}

.uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before {
    border-left-color: #e5e5e5
}

.uk-subnav-pill>*>:first-child {
    padding: 5px 10px;
    background: 0 0;
    color: #999
}

.uk-subnav-pill>*>a:hover {
    background-color: #f8f8f8;
    color: var(--text-secondary-color)
}

.uk-subnav-pill>*>a:active {
    background-color: #f8f8f8;
    color: var(--text-secondary-color)
}

.uk-subnav-pill>.uk-active>a {
    background-color: var(--primary-color);
    color: var(--text-negative-color);
}

.uk-subnav>.uk-disabled>a {
    color: #999
}

.uk-breadcrumb {
    padding: 0;
    list-style: none
}

.uk-breadcrumb>* {
    display: contents
}

.uk-breadcrumb>*>* {
    font-size: 14px;
    color: #999
}

.uk-breadcrumb>*>:hover {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-breadcrumb>:last-child>a:not([href]),
.uk-breadcrumb>:last-child>span {
    color: var(--text-secondary-color)
}

.uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    content: "/";
    display: inline-block;
    margin: 0 20px 0 calc(20px - 4px);
    font-size: 14px;
    color: #999
}

.uk-pagination {
    display: flex;
    flex-wrap: wrap;
    margin-left: 0;
    padding: 0;
    list-style: none
}

.uk-pagination>* {
    flex: none;
    padding-left: 0;
    position: relative
}

.uk-pagination>*>* {
    display: block;
    padding: 5px 10px;
    color: #999;
    transition: color .1s ease-in-out
}

.uk-pagination>*>:hover {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-pagination>.uk-active>* {
    color: var(--text-secondary-color)
}

.uk-pagination>.uk-disabled>* {
    color: #999
}

.uk-tab {
    display: flex;
    flex-wrap: wrap;
    margin-left: -20px;
    padding: 0;
    list-style: none;
    position: relative
}

.uk-tab::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 0;
    border-bottom: 1px solid #e5e5e5
}

.uk-tab>* {
    flex: none;
    padding-left: 20px;
    position: relative
}

.uk-tab>*>a {
    display: flex;
    align-items: center;
    column-gap: .25em;
    justify-content: center;
    padding: 9px 20px;
    color: #999;
    border-bottom: 2px solid transparent;
    font-size: 12px;
    text-transform: uppercase;
    transition: color .1s ease-in-out;
    line-height: 20px
}

.uk-tab>*>a:hover {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-tab>.uk-active>a {
    color: var(--text-color);
    border-color: var(--primary-color)
}

.uk-tab>.uk-disabled>a {
    color: #999
}

.uk-tab-bottom::before {
    top: 0;
    bottom: auto
}

.uk-tab-bottom>*>a {
    border-top: 2px solid transparent;
    border-bottom: none
}

.uk-tab-left,
.uk-tab-right {
    flex-direction: column;
    margin-left: 0
}

.uk-tab-left>*,
.uk-tab-right>* {
    padding-left: 0
}

.uk-tab-left::before {
    top: 0;
    bottom: 0;
    left: auto;
    right: 0;
    border-left: 1px solid #e5e5e5;
    border-bottom: none
}

.uk-tab-right::before {
    top: 0;
    bottom: 0;
    left: 0;
    right: auto;
    border-left: 1px solid #e5e5e5;
    border-bottom: none
}

.uk-tab-left>*>a {
    justify-content: left;
    border-right: 2px solid transparent;
    border-bottom: none
}

.uk-tab-right>*>a {
    justify-content: left;
    border-left: 2px solid transparent;
    border-bottom: none
}

.uk-tab .uk-dropdown {
    margin-left: 40px
}

.uk-slidenav {
    padding: 5px 10px;
    color: rgba(102, 102, 102, .5);
    transition: color .1s ease-in-out
}

.uk-slidenav:hover {
    color: rgba(102, 102, 102, .9)
}

.uk-slidenav:active {
    color: rgba(102, 102, 102, .5)
}

.uk-slidenav-large {
    padding: 10px 10px
}

.uk-slidenav-container {
    display: flex
}

.uk-dotnav {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-left: -12px
}

.uk-dotnav>* {
    flex: none;
    padding-left: 12px
}

.uk-dotnav>*>* {
    display: block;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: 0 0;
    text-indent: 100%;
    overflow: hidden;
    white-space: nowrap;
    border: 1px solid rgba(102, 102, 102, .4);
    transition: .2s ease-in-out;
    transition-property: background-color, border-color
}

.uk-dotnav>*>:hover {
    background-color: rgba(102, 102, 102, .6);
    border-color: transparent
}

.uk-dotnav>*>:active {
    background-color: rgba(102, 102, 102, .2);
    border-color: transparent
}

.uk-dotnav>.uk-active>* {
    background-color: rgba(102, 102, 102, .6);
    border-color: transparent
}

.uk-dotnav-vertical {
    flex-direction: column;
    margin-left: 0;
    margin-top: -12px
}

.uk-dotnav-vertical>* {
    padding-left: 0;
    padding-top: 12px
}

.uk-thumbnav {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-left: -15px
}

.uk-thumbnav>* {
    padding-left: 15px
}

.uk-thumbnav>*>* {
    display: inline-block;
    position: relative
}

.uk-thumbnav>*>::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, .4);
    transition: background-color .1s ease-in-out
}

.uk-thumbnav>*>:hover::after {
    background-color: transparent
}

.uk-thumbnav>.uk-active>::after {
    background-color: transparent
}

.uk-thumbnav-vertical {
    flex-direction: column;
    margin-left: 0;
    margin-top: -15px
}

.uk-thumbnav-vertical>* {
    padding-left: 0;
    padding-top: 15px
}

.uk-iconnav {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-left: -10px
}

.uk-iconnav>* {
    padding-left: 10px
}

.uk-iconnav>*>a {
    display: flex;
    align-items: center;
    column-gap: .25em;
    line-height: 0;
    color: #999;
    text-decoration: none;
    font-size: 14px;
    transition: .1s ease-in-out;
    transition-property: color, background-color
}

.uk-iconnav>*>a:hover {
    color: var(--text-secondary-color)
}

.uk-iconnav>.uk-active>a {
    color: var(--text-secondary-color)
}

.uk-iconnav-vertical {
    flex-direction: column;
    margin-left: 0;
    margin-top: -10px
}

.uk-iconnav-vertical>* {
    padding-left: 0;
    padding-top: 10px
}

.uk-lightbox {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1010;
    background: #000;
    opacity: 0;
    transition: opacity .15s linear;
    touch-action: pinch-zoom
}

.uk-lightbox.uk-open {
    display: block;
    opacity: 1
}

.uk-lightbox :focus {
    outline-color: rgba(255, 255, 255, .7)
}

.uk-lightbox :focus-visible {
    outline-color: rgba(255, 255, 255, .7)
}

.uk-lightbox-page {
    overflow: hidden
}

.uk-lightbox-items>* {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, .7);
    will-change: transform, opacity
}

.uk-lightbox-items>*>* {
    max-width: 100vw;
    max-height: 100vh
}

.uk-lightbox-items>*>:not(iframe) {
    width: auto;
    height: auto
}

.uk-lightbox-items>.uk-active {
    display: flex
}

.uk-lightbox-toolbar {
    padding: 10px 10px;
    background: rgba(0, 0, 0, .3);
    color: rgba(255, 255, 255, .7)
}

.uk-lightbox-toolbar>* {
    color: rgba(255, 255, 255, .7)
}

.uk-lightbox-toolbar-icon {
    padding: 5px;
    color: rgba(255, 255, 255, .7)
}

.uk-lightbox-toolbar-icon:hover {
    color: var(--text-negative-color);
}

.uk-lightbox-button {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, .3);
    color: rgba(255, 255, 255, .7);
    display: inline-flex;
    justify-content: center;
    align-items: center
}

.uk-lightbox-button:hover {
    color: var(--text-negative-color);
}

.uk-lightbox-caption:empty {
    display: none
}

.uk-lightbox-iframe {
    width: 80%;
    height: 80%
}

[class*=uk-animation-] {
    animation: .5s ease-out both
}

.uk-animation-fade {
    animation-name: uk-fade;
    animation-duration: .8s;
    animation-timing-function: linear
}

.uk-animation-scale-up {
    animation-name: uk-fade, uk-scale-up
}

.uk-animation-scale-down {
    animation-name: uk-fade, uk-scale-down
}

.uk-animation-slide-top {
    animation-name: uk-fade, uk-slide-top
}

.uk-animation-slide-bottom {
    animation-name: uk-fade, uk-slide-bottom
}

.uk-animation-slide-left {
    animation-name: uk-fade, uk-slide-left
}

.uk-animation-slide-right {
    animation-name: uk-fade, uk-slide-right
}

.uk-animation-slide-top-small {
    animation-name: uk-fade, uk-slide-top-small
}

.uk-animation-slide-bottom-small {
    animation-name: uk-fade, uk-slide-bottom-small
}

.uk-animation-slide-left-small {
    animation-name: uk-fade, uk-slide-left-small
}

.uk-animation-slide-right-small {
    animation-name: uk-fade, uk-slide-right-small
}

.uk-animation-slide-top-medium {
    animation-name: uk-fade, uk-slide-top-medium
}

.uk-animation-slide-bottom-medium {
    animation-name: uk-fade, uk-slide-bottom-medium
}

.uk-animation-slide-left-medium {
    animation-name: uk-fade, uk-slide-left-medium
}

.uk-animation-slide-right-medium {
    animation-name: uk-fade, uk-slide-right-medium
}

.uk-animation-kenburns {
    animation-name: uk-kenburns;
    animation-duration: 15s
}

.uk-animation-shake {
    animation-name: uk-shake
}

.uk-animation-stroke {
    animation-name: uk-stroke;
    animation-duration: 2s;
    stroke-dasharray: var(--uk-animation-stroke)
}

.uk-animation-reverse {
    animation-direction: reverse;
    animation-timing-function: ease-in
}

.uk-animation-fast {
    animation-duration: .1s
}

.uk-animation-toggle:not(:hover):not(:focus) [class*=uk-animation-] {
    animation-name: none
}

@keyframes uk-fade {
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}

@keyframes uk-scale-up {
    0% {
        transform: scale(.9)
    }

    100% {
        transform: scale(1)
    }
}

@keyframes uk-scale-down {
    0% {
        transform: scale(1.1)
    }

    100% {
        transform: scale(1)
    }
}

@keyframes uk-slide-top {
    0% {
        transform: translateY(-100%)
    }

    100% {
        transform: translateY(0)
    }
}

@keyframes uk-slide-bottom {
    0% {
        transform: translateY(100%)
    }

    100% {
        transform: translateY(0)
    }
}

@keyframes uk-slide-left {
    0% {
        transform: translateX(-100%)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes uk-slide-right {
    0% {
        transform: translateX(100%)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes uk-slide-top-small {
    0% {
        transform: translateY(-10px)
    }

    100% {
        transform: translateY(0)
    }
}

@keyframes uk-slide-bottom-small {
    0% {
        transform: translateY(10px)
    }

    100% {
        transform: translateY(0)
    }
}

@keyframes uk-slide-left-small {
    0% {
        transform: translateX(-10px)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes uk-slide-right-small {
    0% {
        transform: translateX(10px)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes uk-slide-top-medium {
    0% {
        transform: translateY(-50px)
    }

    100% {
        transform: translateY(0)
    }
}

@keyframes uk-slide-bottom-medium {
    0% {
        transform: translateY(50px)
    }

    100% {
        transform: translateY(0)
    }
}

@keyframes uk-slide-left-medium {
    0% {
        transform: translateX(-50px)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes uk-slide-right-medium {
    0% {
        transform: translateX(50px)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes uk-kenburns {
    0% {
        transform: scale(1)
    }

    100% {
        transform: scale(1.2)
    }
}

@keyframes uk-shake {

    0%,
    100% {
        transform: translateX(0)
    }

    10% {
        transform: translateX(-9px)
    }

    20% {
        transform: translateX(8px)
    }

    30% {
        transform: translateX(-7px)
    }

    40% {
        transform: translateX(6px)
    }

    50% {
        transform: translateX(-5px)
    }

    60% {
        transform: translateX(4px)
    }

    70% {
        transform: translateX(-3px)
    }

    80% {
        transform: translateX(2px)
    }

    90% {
        transform: translateX(-1px)
    }
}

@keyframes uk-stroke {
    0% {
        stroke-dashoffset: var(--uk-animation-stroke)
    }

    100% {
        stroke-dashoffset: 0
    }
}

[class*=uk-child-width]>* {
    box-sizing: border-box;
    width: 100%
}

.uk-child-width-1-2>* {
    width: 50%
}

.uk-child-width-1-3>* {
    width: calc(100% * 1 / 3.001)
}

.uk-child-width-1-4>* {
    width: 25%
}

.uk-child-width-1-5>* {
    width: 20%
}

.uk-child-width-1-6>* {
    width: calc(100% * 1 / 6.001)
}

.uk-child-width-auto>* {
    width: auto
}

.uk-child-width-expand>:not([class*=uk-width]) {
    flex: 1;
    min-width: 1px
}

@media (min-width:640px) {
    .uk-child-width-1-1\@s>* {
        width: 100%
    }

    .uk-child-width-1-2\@s>* {
        width: 50%
    }

    .uk-child-width-1-3\@s>* {
        width: calc(100% * 1 / 3.001)
    }

    .uk-child-width-1-4\@s>* {
        width: 25%
    }

    .uk-child-width-1-5\@s>* {
        width: 20%
    }

    .uk-child-width-1-6\@s>* {
        width: calc(100% * 1 / 6.001)
    }

    .uk-child-width-auto\@s>* {
        width: auto
    }

    .uk-child-width-expand\@s>:not([class*=uk-width]) {
        flex: 1;
        min-width: 1px
    }
}

@media (min-width:960px) {
    .uk-child-width-1-1\@m>* {
        width: 100%
    }

    .uk-child-width-1-2\@m>* {
        width: 50%
    }

    .uk-child-width-1-3\@m>* {
        width: calc(100% * 1 / 3.001)
    }

    .uk-child-width-1-4\@m>* {
        width: 25%
    }

    .uk-child-width-1-5\@m>* {
        width: 20%
    }

    .uk-child-width-1-6\@m>* {
        width: calc(100% * 1 / 6.001)
    }

    .uk-child-width-auto\@m>* {
        width: auto
    }

    .uk-child-width-expand\@m>:not([class*=uk-width]) {
        flex: 1;
        min-width: 1px
    }
}

@media (min-width:1200px) {
    .uk-child-width-1-1\@l>* {
        width: 100%
    }

    .uk-child-width-1-2\@l>* {
        width: 50%
    }

    .uk-child-width-1-3\@l>* {
        width: calc(100% * 1 / 3.001)
    }

    .uk-child-width-1-4\@l>* {
        width: 25%
    }

    .uk-child-width-1-5\@l>* {
        width: 20%
    }

    .uk-child-width-1-6\@l>* {
        width: calc(100% * 1 / 6.001)
    }

    .uk-child-width-auto\@l>* {
        width: auto
    }

    .uk-child-width-expand\@l>:not([class*=uk-width]) {
        flex: 1;
        min-width: 1px
    }
}

@media (min-width:1600px) {
    .uk-child-width-1-1\@xl>* {
        width: 100%
    }

    .uk-child-width-1-2\@xl>* {
        width: 50%
    }

    .uk-child-width-1-3\@xl>* {
        width: calc(100% * 1 / 3.001)
    }

    .uk-child-width-1-4\@xl>* {
        width: 25%
    }

    .uk-child-width-1-5\@xl>* {
        width: 20%
    }

    .uk-child-width-1-6\@xl>* {
        width: calc(100% * 1 / 6.001)
    }

    .uk-child-width-auto\@xl>* {
        width: auto
    }

    .uk-child-width-expand\@xl>:not([class*=uk-width]) {
        flex: 1;
        min-width: 1px
    }
}

[class*=uk-width] {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%
}

.uk-width-1-2 {
    width: 50%
}

.uk-width-1-3 {
    width: calc(100% * 1 / 3.001)
}

.uk-width-2-3 {
    width: calc(100% * 2 / 3.001)
}

.uk-width-1-4 {
    width: 25%
}

.uk-width-3-4 {
    width: 75%
}

.uk-width-1-5 {
    width: 20%
}

.uk-width-2-5 {
    width: 40%
}

.uk-width-3-5 {
    width: 60%
}

.uk-width-4-5 {
    width: 80%
}

.uk-width-1-6 {
    width: calc(100% * 1 / 6.001)
}

.uk-width-5-6 {
    width: calc(100% * 5 / 6.001)
}

.uk-width-small {
    width: 150px
}

.uk-width-medium {
    width: 300px
}

.uk-width-large {
    width: 450px
}

.uk-width-xlarge {
    width: 600px
}

.uk-width-2xlarge {
    width: 750px
}

.uk-width-auto {
    width: auto
}

.uk-width-expand {
    flex: 1;
    min-width: 1px
}

@media (min-width:640px) {
    .uk-width-1-1\@s {
        width: 100%
    }

    .uk-width-1-2\@s {
        width: 50%
    }

    .uk-width-1-3\@s {
        width: calc(100% * 1 / 3.001)
    }

    .uk-width-2-3\@s {
        width: calc(100% * 2 / 3.001)
    }

    .uk-width-1-4\@s {
        width: 25%
    }

    .uk-width-3-4\@s {
        width: 75%
    }

    .uk-width-1-5\@s {
        width: 20%
    }

    .uk-width-2-5\@s {
        width: 40%
    }

    .uk-width-3-5\@s {
        width: 60%
    }

    .uk-width-4-5\@s {
        width: 80%
    }

    .uk-width-1-6\@s {
        width: calc(100% * 1 / 6.001)
    }

    .uk-width-5-6\@s {
        width: calc(100% * 5 / 6.001)
    }

    .uk-width-small\@s {
        width: 150px
    }

    .uk-width-medium\@s {
        width: 300px
    }

    .uk-width-large\@s {
        width: 450px
    }

    .uk-width-xlarge\@s {
        width: 600px
    }

    .uk-width-2xlarge\@s {
        width: 750px
    }

    .uk-width-auto\@s {
        width: auto
    }

    .uk-width-expand\@s {
        flex: 1;
        min-width: 1px
    }
}

@media (min-width:960px) {
    .uk-width-1-1\@m {
        width: 100%
    }

    .uk-width-1-2\@m {
        width: 50%
    }

    .uk-width-1-3\@m {
        width: calc(100% * 1 / 3.001)
    }

    .uk-width-2-3\@m {
        width: calc(100% * 2 / 3.001)
    }

    .uk-width-1-4\@m {
        width: 25%
    }

    .uk-width-3-4\@m {
        width: 75%
    }

    .uk-width-1-5\@m {
        width: 20%
    }

    .uk-width-2-5\@m {
        width: 40%
    }

    .uk-width-3-5\@m {
        width: 60%
    }

    .uk-width-4-5\@m {
        width: 80%
    }

    .uk-width-1-6\@m {
        width: calc(100% * 1 / 6.001)
    }

    .uk-width-5-6\@m {
        width: calc(100% * 5 / 6.001)
    }

    .uk-width-small\@m {
        width: 150px
    }

    .uk-width-medium\@m {
        width: 300px
    }

    .uk-width-large\@m {
        width: 450px
    }

    .uk-width-xlarge\@m {
        width: 600px
    }

    .uk-width-2xlarge\@m {
        width: 750px
    }

    .uk-width-auto\@m {
        width: auto
    }

    .uk-width-expand\@m {
        flex: 1;
        min-width: 1px
    }
}

@media (min-width:1200px) {
    .uk-width-1-1\@l {
        width: 100%
    }

    .uk-width-1-2\@l {
        width: 50%
    }

    .uk-width-1-3\@l {
        width: calc(100% * 1 / 3.001)
    }

    .uk-width-2-3\@l {
        width: calc(100% * 2 / 3.001)
    }

    .uk-width-1-4\@l {
        width: 25%
    }

    .uk-width-3-4\@l {
        width: 75%
    }

    .uk-width-1-5\@l {
        width: 20%
    }

    .uk-width-2-5\@l {
        width: 40%
    }

    .uk-width-3-5\@l {
        width: 60%
    }

    .uk-width-4-5\@l {
        width: 80%
    }

    .uk-width-1-6\@l {
        width: calc(100% * 1 / 6.001)
    }

    .uk-width-5-6\@l {
        width: calc(100% * 5 / 6.001)
    }

    .uk-width-small\@l {
        width: 150px
    }

    .uk-width-medium\@l {
        width: 300px
    }

    .uk-width-large\@l {
        width: 450px
    }

    .uk-width-xlarge\@l {
        width: 600px
    }

    .uk-width-2xlarge\@l {
        width: 750px
    }

    .uk-width-auto\@l {
        width: auto
    }

    .uk-width-expand\@l {
        flex: 1;
        min-width: 1px
    }
}

@media (min-width:1600px) {
    .uk-width-1-1\@xl {
        width: 100%
    }

    .uk-width-1-2\@xl {
        width: 50%
    }

    .uk-width-1-3\@xl {
        width: calc(100% * 1 / 3.001)
    }

    .uk-width-2-3\@xl {
        width: calc(100% * 2 / 3.001)
    }

    .uk-width-1-4\@xl {
        width: 25%
    }

    .uk-width-3-4\@xl {
        width: 75%
    }

    .uk-width-1-5\@xl {
        width: 20%
    }

    .uk-width-2-5\@xl {
        width: 40%
    }

    .uk-width-3-5\@xl {
        width: 60%
    }

    .uk-width-4-5\@xl {
        width: 80%
    }

    .uk-width-1-6\@xl {
        width: calc(100% * 1 / 6.001)
    }

    .uk-width-5-6\@xl {
        width: calc(100% * 5 / 6.001)
    }

    .uk-width-small\@xl {
        width: 150px
    }

    .uk-width-medium\@xl {
        width: 300px
    }

    .uk-width-large\@xl {
        width: 450px
    }

    .uk-width-xlarge\@xl {
        width: 600px
    }

    .uk-width-2xlarge\@xl {
        width: 750px
    }

    .uk-width-auto\@xl {
        width: auto
    }

    .uk-width-expand\@xl {
        flex: 1;
        min-width: 1px
    }
}

.uk-width-max-content {
    width: max-content
}

.uk-width-min-content {
    width: min-content
}

[class*=uk-height] {
    box-sizing: border-box
}

.uk-height-1-1 {
    height: 100%
}

.uk-height-viewport {
    min-height: 100vh
}

.uk-height-viewport-2 {
    min-height: 200vh
}

.uk-height-viewport-3 {
    min-height: 300vh
}

.uk-height-viewport-4 {
    min-height: 400vh
}

.uk-height-small {
    height: 150px
}

.uk-height-medium {
    height: 300px
}

.uk-height-large {
    height: 450px
}

.uk-height-max-small {
    max-height: 150px
}

.uk-height-max-medium {
    max-height: 300px
}

.uk-height-max-large {
    max-height: 450px
}

.uk-text-lead {
    font-size: 24px;
    line-height: 1.5;
    color: var(--text-color);
    font-weight: 300
}

.uk-text-meta {
    font-size: 14px;
    line-height: 1.4;
    color: #999
}

.uk-text-meta a {
    color: #999
}

.uk-text-meta a:hover {
    color: var(--text-secondary-color);
    text-decoration: none
}

.uk-text-small {
    font-size: 14px;
    line-height: 1.5
}

.uk-text-large {
    font-size: 24px;
    line-height: 1.5;
    font-weight: 300
}

.uk-text-default {
    font-size: 15px;
    line-height: 1.5
}

.uk-text-light {
    font-weight: 300
}

.uk-text-normal {
    font-weight: 400
}

.uk-text-bold {
    font-weight: 700
}

.uk-text-lighter {
    font-weight: lighter
}

.uk-text-bolder {
    font-weight: bolder
}

.uk-text-italic {
    font-style: italic
}

.uk-text-capitalize {
    text-transform: capitalize !important
}

.uk-text-uppercase {
    text-transform: uppercase !important
}

.uk-text-lowercase {
    text-transform: lowercase !important
}

.uk-text-decoration-none {
    text-decoration: none !important
}

.uk-text-muted {
    color: #999 !important
}

.uk-text-emphasis {
    color: var(--text-color) !important
}

.uk-text-primary {
    color: var(--primary-color) !important
}

.uk-text-secondary {
    color: var(--text-color) !important
}

.uk-text-success {
    color: var(--success-color) !important
}

.uk-text-warning {
    color: var(--warn-color) !important
}

.uk-text-danger {
    color: var(--success-color) !important
}

.uk-text-background {
    -webkit-background-clip: text;
    color: transparent !important;
    display: inline-block;
    background-color: var(--primary-color)
}

.uk-text-left {
    text-align: left !important
}

.uk-text-right {
    text-align: right !important
}

.uk-text-center {
    text-align: center !important
}

.uk-text-justify {
    text-align: justify !important
}

@media (min-width:640px) {
    .uk-text-left\@s {
        text-align: left !important
    }

    .uk-text-right\@s {
        text-align: right !important
    }

    .uk-text-center\@s {
        text-align: center !important
    }
}

@media (min-width:960px) {
    .uk-text-left\@m {
        text-align: left !important
    }

    .uk-text-right\@m {
        text-align: right !important
    }

    .uk-text-center\@m {
        text-align: center !important
    }
}

@media (min-width:1200px) {
    .uk-text-left\@l {
        text-align: left !important
    }

    .uk-text-right\@l {
        text-align: right !important
    }

    .uk-text-center\@l {
        text-align: center !important
    }
}

@media (min-width:1600px) {
    .uk-text-left\@xl {
        text-align: left !important
    }

    .uk-text-right\@xl {
        text-align: right !important
    }

    .uk-text-center\@xl {
        text-align: center !important
    }
}

.uk-text-top {
    vertical-align: top !important
}

.uk-text-middle {
    vertical-align: middle !important
}

.uk-text-bottom {
    vertical-align: bottom !important
}

.uk-text-baseline {
    vertical-align: baseline !important
}

.uk-text-nowrap {
    white-space: nowrap
}

.uk-text-truncate {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

td.uk-text-truncate,
th.uk-text-truncate {
    max-width: 0
}

.uk-text-break {
    overflow-wrap: break-word
}

td.uk-text-break,
th.uk-text-break {
    word-break: break-word
}

[class*=uk-column-] {
    column-gap: 30px
}

@media (min-width:1200px) {
    [class*=uk-column-] {
        column-gap: 40px
    }
}

[class*=uk-column-] img {
    transform: translate3d(0, 0, 0)
}

.uk-column-divider {
    column-rule: 1px solid #e5e5e5;
    column-gap: 60px
}

@media (min-width:1200px) {
    .uk-column-divider {
        column-gap: 80px
    }
}

.uk-column-1-2 {
    column-count: 2
}

.uk-column-1-3 {
    column-count: 3
}

.uk-column-1-4 {
    column-count: 4
}

.uk-column-1-5 {
    column-count: 5
}

.uk-column-1-6 {
    column-count: 6
}

@media (min-width:640px) {
    .uk-column-1-2\@s {
        column-count: 2
    }

    .uk-column-1-3\@s {
        column-count: 3
    }

    .uk-column-1-4\@s {
        column-count: 4
    }

    .uk-column-1-5\@s {
        column-count: 5
    }

    .uk-column-1-6\@s {
        column-count: 6
    }
}

@media (min-width:960px) {
    .uk-column-1-2\@m {
        column-count: 2
    }

    .uk-column-1-3\@m {
        column-count: 3
    }

    .uk-column-1-4\@m {
        column-count: 4
    }

    .uk-column-1-5\@m {
        column-count: 5
    }

    .uk-column-1-6\@m {
        column-count: 6
    }
}

@media (min-width:1200px) {
    .uk-column-1-2\@l {
        column-count: 2
    }

    .uk-column-1-3\@l {
        column-count: 3
    }

    .uk-column-1-4\@l {
        column-count: 4
    }

    .uk-column-1-5\@l {
        column-count: 5
    }

    .uk-column-1-6\@l {
        column-count: 6
    }
}

@media (min-width:1600px) {
    .uk-column-1-2\@xl {
        column-count: 2
    }

    .uk-column-1-3\@xl {
        column-count: 3
    }

    .uk-column-1-4\@xl {
        column-count: 4
    }

    .uk-column-1-5\@xl {
        column-count: 5
    }

    .uk-column-1-6\@xl {
        column-count: 6
    }
}

.uk-column-span {
    column-span: all
}

[data-uk-cover],
[uk-cover] {
    max-width: none;
    position: absolute;
    left: 50%;
    top: 50%;
    --uk-position-translate-x: -50%;
    --uk-position-translate-y: -50%;
    transform: translate(var(--uk-position-translate-x), var(--uk-position-translate-y))
}

iframe[data-uk-cover],
iframe[uk-cover] {
    pointer-events: none
}

.uk-cover-container {
    overflow: hidden;
    position: relative
}

.uk-background-default {
    background-color: var(--background-color)
}

.uk-background-muted {
    background-color: #f8f8f8
}

.uk-background-primary {
    background-color: var(--primary-color)
}

.uk-background-secondary {
    background-color: var(--text-color)
}

.uk-background-contain,
.uk-background-cover,
.uk-background-height-1-1,
.uk-background-width-1-1 {
    background-position: 50% 50%;
    background-repeat: no-repeat
}

.uk-background-cover {
    background-size: cover
}

.uk-background-contain {
    background-size: contain
}

.uk-background-width-1-1 {
    background-size: 100%
}

.uk-background-height-1-1 {
    background-size: auto 100%
}

.uk-background-top-left {
    background-position: 0 0
}

.uk-background-top-center {
    background-position: 50% 0
}

.uk-background-top-right {
    background-position: 100% 0
}

.uk-background-center-left {
    background-position: 0 50%
}

.uk-background-center-center {
    background-position: 50% 50%
}

.uk-background-center-right {
    background-position: 100% 50%
}

.uk-background-bottom-left {
    background-position: 0 100%
}

.uk-background-bottom-center {
    background-position: 50% 100%
}

.uk-background-bottom-right {
    background-position: 100% 100%
}

.uk-background-norepeat {
    background-repeat: no-repeat
}

.uk-background-fixed {
    background-attachment: fixed;
    backface-visibility: hidden
}

@media (pointer:coarse) {
    .uk-background-fixed {
        background-attachment: scroll
    }
}

@media (max-width:639px) {
    .uk-background-image\@s {
        background-image: none !important
    }
}

@media (max-width:959px) {
    .uk-background-image\@m {
        background-image: none !important
    }
}

@media (max-width:1199px) {
    .uk-background-image\@l {
        background-image: none !important
    }
}

@media (max-width:1599px) {
    .uk-background-image\@xl {
        background-image: none !important
    }
}

.uk-background-blend-multiply {
    background-blend-mode: multiply
}

.uk-background-blend-screen {
    background-blend-mode: screen
}

.uk-background-blend-overlay {
    background-blend-mode: overlay
}

.uk-background-blend-darken {
    background-blend-mode: darken
}

.uk-background-blend-lighten {
    background-blend-mode: lighten
}

.uk-background-blend-color-dodge {
    background-blend-mode: color-dodge
}

.uk-background-blend-color-burn {
    background-blend-mode: color-burn
}

.uk-background-blend-hard-light {
    background-blend-mode: hard-light
}

.uk-background-blend-soft-light {
    background-blend-mode: soft-light
}

.uk-background-blend-difference {
    background-blend-mode: difference
}

.uk-background-blend-exclusion {
    background-blend-mode: exclusion
}

.uk-background-blend-hue {
    background-blend-mode: hue
}

.uk-background-blend-saturation {
    background-blend-mode: saturation
}

.uk-background-blend-color {
    background-blend-mode: color
}

.uk-background-blend-luminosity {
    background-blend-mode: luminosity
}

[class*=uk-align] {
    display: block;
    margin-bottom: 30px
}

*+[class*=uk-align] {
    margin-top: 30px
}

.uk-align-center {
    margin-left: auto;
    margin-right: auto
}

.uk-align-left {
    margin-top: 0;
    margin-right: 30px;
    float: left
}

.uk-align-right {
    margin-top: 0;
    margin-left: 30px;
    float: right
}

@media (min-width:640px) {
    .uk-align-left\@s {
        margin-top: 0;
        margin-right: 30px;
        float: left
    }

    .uk-align-right\@s {
        margin-top: 0;
        margin-left: 30px;
        float: right
    }
}

@media (min-width:960px) {
    .uk-align-left\@m {
        margin-top: 0;
        margin-right: 30px;
        float: left
    }

    .uk-align-right\@m {
        margin-top: 0;
        margin-left: 30px;
        float: right
    }
}

@media (min-width:1200px) {
    .uk-align-left\@l {
        margin-top: 0;
        float: left
    }

    .uk-align-right\@l {
        margin-top: 0;
        float: right
    }

    .uk-align-left,
    .uk-align-left\@l,
    .uk-align-left\@m,
    .uk-align-left\@s {
        margin-right: 40px
    }

    .uk-align-right,
    .uk-align-right\@l,
    .uk-align-right\@m,
    .uk-align-right\@s {
        margin-left: 40px
    }
}

@media (min-width:1600px) {
    .uk-align-left\@xl {
        margin-top: 0;
        margin-right: 40px;
        float: left
    }

    .uk-align-right\@xl {
        margin-top: 0;
        margin-left: 40px;
        float: right
    }
}

.uk-svg,
.uk-svg:not(.uk-preserve) [fill*='#']:not(.uk-preserve) {
    fill: currentcolor
}

.uk-svg:not(.uk-preserve) [stroke*='#']:not(.uk-preserve) {
    stroke: currentcolor
}

.uk-svg {
    transform: translate(0, 0)
}

.uk-panel {
    display: flow-root;
    position: relative;
    box-sizing: border-box
}

.uk-panel>:last-child {
    margin-bottom: 0
}

.uk-panel-scrollable {
    height: 170px;
    padding: 10px;
    border: 1px solid #e5e5e5;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    resize: both
}

.uk-clearfix::before {
    content: "";
    display: table-cell
}

.uk-clearfix::after {
    content: "";
    display: table;
    clear: both
}

.uk-float-left {
    float: left
}

.uk-float-right {
    float: right
}

[class*=uk-float-] {
    max-width: 100%
}

.uk-overflow-hidden {
    overflow: hidden
}

.uk-overflow-auto {
    overflow: auto;
    -webkit-overflow-scrolling: touch
}

.uk-overflow-auto>:last-child {
    margin-bottom: 0
}

.uk-resize {
    resize: both
}

.uk-resize-horizontal {
    resize: horizontal
}

.uk-resize-vertical {
    resize: vertical
}

.uk-display-block {
    display: block !important
}

.uk-display-inline {
    display: inline !important
}

.uk-display-inline-block {
    display: inline-block !important
}

[class*=uk-inline] {
    display: inline-block;
    position: relative;
    max-width: 100%;
    vertical-align: middle;
    -webkit-backface-visibility: hidden
}

.uk-inline-clip {
    overflow: hidden
}

.uk-preserve-width,
.uk-preserve-width canvas,
.uk-preserve-width img,
.uk-preserve-width svg,
.uk-preserve-width video {
    max-width: none
}

.uk-responsive-height,
.uk-responsive-width {
    box-sizing: border-box
}

.uk-responsive-width {
    max-width: 100% !important;
    height: auto
}

.uk-responsive-height {
    max-height: 100%;
    width: auto;
    max-width: none
}

[data-uk-responsive],
[uk-responsive] {
    max-width: 100%
}

.uk-object-cover {
    object-fit: cover
}

.uk-object-contain {
    object-fit: contain
}

.uk-object-fill {
    object-fit: fill
}

.uk-object-none {
    object-fit: none
}

.uk-object-scale-down {
    object-fit: scale-down
}

.uk-object-top-left {
    object-position: 0 0
}

.uk-object-top-center {
    object-position: 50% 0
}

.uk-object-top-right {
    object-position: 100% 0
}

.uk-object-center-left {
    object-position: 0 50%
}

.uk-object-center-center {
    object-position: 50% 50%
}

.uk-object-center-right {
    object-position: 100% 50%
}

.uk-object-bottom-left {
    object-position: 0 100%
}

.uk-object-bottom-center {
    object-position: 50% 100%
}

.uk-object-bottom-right {
    object-position: 100% 100%
}

.uk-border-circle {
    border-radius: 50%
}

.uk-border-pill {
    border-radius: 500px
}

.uk-border-rounded {
    border-radius: 5px
}

.uk-inline-clip[class*=uk-border-] {
    -webkit-transform: translateZ(0)
}

.uk-box-shadow-small {
    box-shadow: 0 2px 8px var(--shadow-color-01)
}

.uk-box-shadow-medium {
    box-shadow: 0 5px 15px var(--shadow-color-01)
}

.uk-box-shadow-large {
    box-shadow: 0 14px 25px var(--shadow-color-02)
}

.uk-box-shadow-xlarge {
    box-shadow: 0 28px 50px var(--shadow-color-02)
}

[class*=uk-box-shadow-hover] {
    transition: box-shadow .1s ease-in-out
}

.uk-box-shadow-hover-small:hover {
    box-shadow: 0 2px 8px var(--shadow-color-01)
}

.uk-box-shadow-hover-medium:hover {
    box-shadow: 0 5px 15px var(--shadow-color-01)
}

.uk-box-shadow-hover-large:hover {
    box-shadow: 0 14px 25px var(--shadow-color-02)
}

.uk-box-shadow-hover-xlarge:hover {
    box-shadow: 0 28px 50px var(--shadow-color-02)
}

@supports (filter:blur(0)) {
    .uk-box-shadow-bottom {
        display: inline-block;
        position: relative;
        z-index: 0;
        max-width: 100%;
        vertical-align: middle
    }

    .uk-box-shadow-bottom::after {
        content: "";
        position: absolute;
        bottom: -30px;
        left: 0;
        right: 0;
        z-index: -1;
        height: 30px;
        border-radius: 100%;
        background: #444;
        filter: blur(20px);
        will-change: filter
    }
}

.uk-dropcap::first-letter,
.uk-dropcap>p:first-of-type::first-letter {
    display: block;
    margin-right: 10px;
    float: left;
    font-size: 4.5em;
    line-height: 1;
    margin-bottom: -2px
}

@-moz-document url-prefix() {

    .uk-dropcap::first-letter,
    .uk-dropcap>p:first-of-type::first-letter {
        margin-top: 1.1%
    }
}

.uk-logo {
    font-size: 24px;
    font-family: var(--font-family);
    color: var(--text-color);
    text-decoration: none
}

.uk-logo:hover {
    color: var(--text-color);
    text-decoration: none
}

.uk-logo>:where(img, svg, video) {
    display: block
}

.uk-logo-inverse {
    display: none
}

.uk-disabled {
    pointer-events: none
}

.uk-drag,
.uk-drag * {
    cursor: move
}

.uk-drag iframe {
    pointer-events: none
}

.uk-dragover {
    box-shadow: 0 0 20px rgba(100, 100, 100, .3)
}

.uk-blend-multiply {
    mix-blend-mode: multiply
}

.uk-blend-screen {
    mix-blend-mode: screen
}

.uk-blend-overlay {
    mix-blend-mode: overlay
}

.uk-blend-darken {
    mix-blend-mode: darken
}

.uk-blend-lighten {
    mix-blend-mode: lighten
}

.uk-blend-color-dodge {
    mix-blend-mode: color-dodge
}

.uk-blend-color-burn {
    mix-blend-mode: color-burn
}

.uk-blend-hard-light {
    mix-blend-mode: hard-light
}

.uk-blend-soft-light {
    mix-blend-mode: soft-light
}

.uk-blend-difference {
    mix-blend-mode: difference
}

.uk-blend-exclusion {
    mix-blend-mode: exclusion
}

.uk-blend-hue {
    mix-blend-mode: hue
}

.uk-blend-saturation {
    mix-blend-mode: saturation
}

.uk-blend-color {
    mix-blend-mode: color
}

.uk-blend-luminosity {
    mix-blend-mode: luminosity
}

.uk-transform-center {
    transform: translate(-50%, -50%)
}

.uk-transform-origin-top-left {
    transform-origin: 0 0
}

.uk-transform-origin-top-center {
    transform-origin: 50% 0
}

.uk-transform-origin-top-right {
    transform-origin: 100% 0
}

.uk-transform-origin-center-left {
    transform-origin: 0 50%
}

.uk-transform-origin-center-right {
    transform-origin: 100% 50%
}

.uk-transform-origin-bottom-left {
    transform-origin: 0 100%
}

.uk-transform-origin-bottom-center {
    transform-origin: 50% 100%
}

.uk-transform-origin-bottom-right {
    transform-origin: 100% 100%
}

.uk-flex {
    display: flex
}

.uk-flex-inline {
    display: inline-flex
}

.uk-flex-left {
    justify-content: flex-start
}

.uk-flex-center {
    justify-content: center
}

.uk-flex-right {
    justify-content: flex-end
}

.uk-flex-between {
    justify-content: space-between
}

.uk-flex-around {
    justify-content: space-around
}

@media (min-width:640px) {
    .uk-flex-left\@s {
        justify-content: flex-start
    }

    .uk-flex-center\@s {
        justify-content: center
    }

    .uk-flex-right\@s {
        justify-content: flex-end
    }

    .uk-flex-between\@s {
        justify-content: space-between
    }

    .uk-flex-around\@s {
        justify-content: space-around
    }
}

@media (min-width:960px) {
    .uk-flex-left\@m {
        justify-content: flex-start
    }

    .uk-flex-center\@m {
        justify-content: center
    }

    .uk-flex-right\@m {
        justify-content: flex-end
    }

    .uk-flex-between\@m {
        justify-content: space-between
    }

    .uk-flex-around\@m {
        justify-content: space-around
    }
}

@media (min-width:1200px) {
    .uk-flex-left\@l {
        justify-content: flex-start
    }

    .uk-flex-center\@l {
        justify-content: center
    }

    .uk-flex-right\@l {
        justify-content: flex-end
    }

    .uk-flex-between\@l {
        justify-content: space-between
    }

    .uk-flex-around\@l {
        justify-content: space-around
    }
}

@media (min-width:1600px) {
    .uk-flex-left\@xl {
        justify-content: flex-start
    }

    .uk-flex-center\@xl {
        justify-content: center
    }

    .uk-flex-right\@xl {
        justify-content: flex-end
    }

    .uk-flex-between\@xl {
        justify-content: space-between
    }

    .uk-flex-around\@xl {
        justify-content: space-around
    }
}

.uk-flex-stretch {
    align-items: stretch
}

.uk-flex-top {
    align-items: flex-start
}

.uk-flex-middle {
    align-items: center
}

.uk-flex-bottom {
    align-items: flex-end
}

.uk-flex-row {
    flex-direction: row
}

.uk-flex-row-reverse {
    flex-direction: row-reverse
}

.uk-flex-column {
    flex-direction: column
}

.uk-flex-column-reverse {
    flex-direction: column-reverse
}

.uk-flex-nowrap {
    flex-wrap: nowrap
}

.uk-flex-wrap {
    flex-wrap: wrap
}

.uk-flex-wrap-reverse {
    flex-wrap: wrap-reverse
}

.uk-flex-wrap-stretch {
    align-content: stretch
}

.uk-flex-wrap-top {
    align-content: flex-start
}

.uk-flex-wrap-middle {
    align-content: center
}

.uk-flex-wrap-bottom {
    align-content: flex-end
}

.uk-flex-wrap-between {
    align-content: space-between
}

.uk-flex-wrap-around {
    align-content: space-around
}

.uk-flex-first {
    order: -1
}

.uk-flex-last {
    order: 99
}

@media (min-width:640px) {
    .uk-flex-first\@s {
        order: -1
    }

    .uk-flex-last\@s {
        order: 99
    }
}

@media (min-width:960px) {
    .uk-flex-first\@m {
        order: -1
    }

    .uk-flex-last\@m {
        order: 99
    }
}

@media (min-width:1200px) {
    .uk-flex-first\@l {
        order: -1
    }

    .uk-flex-last\@l {
        order: 99
    }
}

@media (min-width:1600px) {
    .uk-flex-first\@xl {
        order: -1
    }

    .uk-flex-last\@xl {
        order: 99
    }
}

.uk-flex-none {
    flex: none
}

.uk-flex-auto {
    flex: auto
}

.uk-flex-1 {
    flex: 1
}

.uk-margin {
    margin-bottom: 20px
}

*+.uk-margin {
    margin-top: 20px !important
}

.uk-margin-top {
    margin-top: 20px !important
}

.uk-margin-bottom {
    margin-bottom: 20px !important
}

.uk-margin-left {
    margin-left: 20px !important
}

.uk-margin-right {
    margin-right: 20px !important
}

.uk-margin-small {
    margin-bottom: 10px
}

*+.uk-margin-small {
    margin-top: 10px !important
}

.uk-margin-small-top {
    margin-top: 10px !important
}

.uk-margin-small-bottom {
    margin-bottom: 10px !important
}

.uk-margin-small-left {
    margin-left: 10px !important
}

.uk-margin-small-right {
    margin-right: 10px !important
}

.uk-margin-medium {
    margin-bottom: 40px
}

*+.uk-margin-medium {
    margin-top: 40px !important
}

.uk-margin-medium-top {
    margin-top: 40px !important
}

.uk-margin-medium-bottom {
    margin-bottom: 40px !important
}

.uk-margin-medium-left {
    margin-left: 40px !important
}

.uk-margin-medium-right {
    margin-right: 40px !important
}

.uk-margin-large {
    margin-bottom: 40px
}

*+.uk-margin-large {
    margin-top: 40px !important
}

.uk-margin-large-top {
    margin-top: 40px !important
}

.uk-margin-large-bottom {
    margin-bottom: 40px !important
}

.uk-margin-large-left {
    margin-left: 40px !important
}

.uk-margin-large-right {
    margin-right: 40px !important
}

@media (min-width:1200px) {
    .uk-margin-large {
        margin-bottom: 70px
    }

    *+.uk-margin-large {
        margin-top: 70px !important
    }

    .uk-margin-large-top {
        margin-top: 70px !important
    }

    .uk-margin-large-bottom {
        margin-bottom: 70px !important
    }

    .uk-margin-large-left {
        margin-left: 70px !important
    }

    .uk-margin-large-right {
        margin-right: 70px !important
    }
}

.uk-margin-xlarge {
    margin-bottom: 70px
}

*+.uk-margin-xlarge {
    margin-top: 70px !important
}

.uk-margin-xlarge-top {
    margin-top: 70px !important
}

.uk-margin-xlarge-bottom {
    margin-bottom: 70px !important
}

.uk-margin-xlarge-left {
    margin-left: 70px !important
}

.uk-margin-xlarge-right {
    margin-right: 70px !important
}

@media (min-width:1200px) {
    .uk-margin-xlarge {
        margin-bottom: 140px
    }

    *+.uk-margin-xlarge {
        margin-top: 140px !important
    }

    .uk-margin-xlarge-top {
        margin-top: 140px !important
    }

    .uk-margin-xlarge-bottom {
        margin-bottom: 140px !important
    }

    .uk-margin-xlarge-left {
        margin-left: 140px !important
    }

    .uk-margin-xlarge-right {
        margin-right: 140px !important
    }
}

.uk-margin-auto {
    margin-left: auto !important;
    margin-right: auto !important
}

.uk-margin-auto-top {
    margin-top: auto !important
}

.uk-margin-auto-bottom {
    margin-bottom: auto !important
}

.uk-margin-auto-left {
    margin-left: auto !important
}

.uk-margin-auto-right {
    margin-right: auto !important
}

.uk-margin-auto-vertical {
    margin-top: auto !important;
    margin-bottom: auto !important
}

@media (min-width:640px) {
    .uk-margin-auto\@s {
        margin-left: auto !important;
        margin-right: auto !important
    }

    .uk-margin-auto-left\@s {
        margin-left: auto !important
    }

    .uk-margin-auto-right\@s {
        margin-right: auto !important
    }
}

@media (min-width:960px) {
    .uk-margin-auto\@m {
        margin-left: auto !important;
        margin-right: auto !important
    }

    .uk-margin-auto-left\@m {
        margin-left: auto !important
    }

    .uk-margin-auto-right\@m {
        margin-right: auto !important
    }
}

@media (min-width:1200px) {
    .uk-margin-auto\@l {
        margin-left: auto !important;
        margin-right: auto !important
    }

    .uk-margin-auto-left\@l {
        margin-left: auto !important
    }

    .uk-margin-auto-right\@l {
        margin-right: auto !important
    }
}

@media (min-width:1600px) {
    .uk-margin-auto\@xl {
        margin-left: auto !important;
        margin-right: auto !important
    }

    .uk-margin-auto-left\@xl {
        margin-left: auto !important
    }

    .uk-margin-auto-right\@xl {
        margin-right: auto !important
    }
}

.uk-margin-remove {
    margin: 0 !important
}

.uk-margin-remove-top {
    margin-top: 0 !important
}

.uk-margin-remove-bottom {
    margin-bottom: 0 !important
}

.uk-margin-remove-left {
    margin-left: 0 !important
}

.uk-margin-remove-right {
    margin-right: 0 !important
}

.uk-margin-remove-vertical {
    margin-top: 0 !important;
    margin-bottom: 0 !important
}

.uk-margin-remove-adjacent+*,
.uk-margin-remove-first-child>:first-child {
    margin-top: 0 !important
}

.uk-margin-remove-last-child>:last-child {
    margin-bottom: 0 !important
}

@media (min-width:640px) {
    .uk-margin-remove-left\@s {
        margin-left: 0 !important
    }

    .uk-margin-remove-right\@s {
        margin-right: 0 !important
    }
}

@media (min-width:960px) {
    .uk-margin-remove-left\@m {
        margin-left: 0 !important
    }

    .uk-margin-remove-right\@m {
        margin-right: 0 !important
    }
}

@media (min-width:1200px) {
    .uk-margin-remove-left\@l {
        margin-left: 0 !important
    }

    .uk-margin-remove-right\@l {
        margin-right: 0 !important
    }
}

@media (min-width:1600px) {
    .uk-margin-remove-left\@xl {
        margin-left: 0 !important
    }

    .uk-margin-remove-right\@xl {
        margin-right: 0 !important
    }
}

.uk-padding {
    padding: 30px
}

@media (min-width:1200px) {
    .uk-padding {
        padding: 40px
    }
}

.uk-padding-small {
    padding: 15px
}

.uk-padding-large {
    padding: 40px
}

@media (min-width:1200px) {
    .uk-padding-large {
        padding: 70px
    }
}

.uk-padding-remove {
    padding: 0 !important
}

.uk-padding-remove-top {
    padding-top: 0 !important
}

.uk-padding-remove-bottom {
    padding-bottom: 0 !important
}

.uk-padding-remove-left {
    padding-left: 0 !important
}

.uk-padding-remove-right {
    padding-right: 0 !important
}

.uk-padding-remove-vertical {
    padding-top: 0 !important;
    padding-bottom: 0 !important
}

.uk-padding-remove-horizontal {
    padding-left: 0 !important;
    padding-right: 0 !important
}

:root {
    --uk-position-margin-offset: 0px
}

[class*=uk-position-top],
[class*=uk-position-bottom],
[class*=uk-position-left],
[class*=uk-position-right],
[class*=uk-position-center] {
    position: absolute !important;
    max-width: calc(100% - (var(--uk-position-margin-offset) * 2));
    box-sizing: border-box
}

.uk-position-top {
    top: 0;
    left: 0;
    right: 0
}

.uk-position-bottom {
    bottom: 0;
    left: 0;
    right: 0
}

.uk-position-left {
    top: 0;
    bottom: 0;
    left: 0
}

.uk-position-right {
    top: 0;
    bottom: 0;
    right: 0
}

.uk-position-top-left {
    top: 0;
    left: 0
}

.uk-position-top-right {
    top: 0;
    right: 0
}

.uk-position-bottom-left {
    bottom: 0;
    left: 0
}

.uk-position-bottom-right {
    bottom: 0;
    right: 0
}

.uk-position-center {
    top: calc(50% - var(--uk-position-margin-offset));
    left: calc(50% - var(--uk-position-margin-offset));
    --uk-position-translate-x: -50%;
    --uk-position-translate-y: -50%;
    transform: translate(var(--uk-position-translate-x), var(--uk-position-translate-y));
    width: max-content
}

[class*=uk-position-center-left],
[class*=uk-position-center-right] {
    top: calc(50% - var(--uk-position-margin-offset));
    --uk-position-translate-y: -50%;
    transform: translate(0, var(--uk-position-translate-y))
}

.uk-position-center-left {
    left: 0
}

.uk-position-center-right {
    right: 0
}

.uk-position-center-left-out {
    right: 100%;
    width: max-content
}

.uk-position-center-right-out {
    left: 100%;
    width: max-content
}

.uk-position-bottom-center,
.uk-position-top-center {
    left: calc(50% - var(--uk-position-margin-offset));
    --uk-position-translate-x: -50%;
    transform: translate(var(--uk-position-translate-x), 0);
    width: max-content
}

.uk-position-top-center {
    top: 0
}

.uk-position-bottom-center {
    bottom: 0
}

.uk-position-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0
}

.uk-position-small {
    margin: 15px;
    --uk-position-margin-offset: 15px
}

.uk-position-medium {
    margin: 30px;
    --uk-position-margin-offset: 30px
}

.uk-position-large {
    margin: 30px;
    --uk-position-margin-offset: 30px
}

@media (min-width:1200px) {
    .uk-position-large {
        margin: 50px;
        --uk-position-margin-offset: 50px
    }
}

.uk-position-relative {
    position: relative !important
}

.uk-position-absolute {
    position: absolute !important
}

.uk-position-fixed {
    position: fixed !important
}

.uk-position-sticky {
    position: sticky !important
}

.uk-position-z-index {
    z-index: 1
}

.uk-position-z-index-negative {
    z-index: -1
}

:where(.uk-transition-fade),
:where([class*=uk-transition-scale]),
:where([class*=uk-transition-slide]) {
    --uk-position-translate-x: 0;
    --uk-position-translate-y: 0
}

.uk-transition-fade,
[class*=uk-transition-scale],
[class*=uk-transition-slide] {
    --uk-translate-x: 0;
    --uk-translate-y: 0;
    --uk-scale-x: 1;
    --uk-scale-y: 1;
    transform: translate(var(--uk-position-translate-x), var(--uk-position-translate-y)) translate(var(--uk-translate-x), var(--uk-translate-y)) scale(var(--uk-scale-x), var(--uk-scale-y));
    transition: .3s ease-out;
    transition-property: opacity, transform, filter;
    opacity: 0
}

.uk-transition-active.uk-active .uk-transition-fade,
.uk-transition-toggle .uk-transition-fade:focus-within,
.uk-transition-toggle:focus .uk-transition-fade,
.uk-transition-toggle:hover .uk-transition-fade {
    opacity: 1
}

[class*=uk-transition-scale] {
    -webkit-backface-visibility: hidden
}

.uk-transition-scale-up {
    --uk-scale-x: 1;
    --uk-scale-y: 1
}

.uk-transition-scale-down {
    --uk-scale-x: 1.03;
    --uk-scale-y: 1.03
}

.uk-transition-active.uk-active .uk-transition-scale-up,
.uk-transition-toggle .uk-transition-scale-up:focus-within,
.uk-transition-toggle:focus .uk-transition-scale-up,
.uk-transition-toggle:hover .uk-transition-scale-up {
    --uk-scale-x: 1.03;
    --uk-scale-y: 1.03;
    opacity: 1
}

.uk-transition-active.uk-active .uk-transition-scale-down,
.uk-transition-toggle .uk-transition-scale-down:focus-within,
.uk-transition-toggle:focus .uk-transition-scale-down,
.uk-transition-toggle:hover .uk-transition-scale-down {
    --uk-scale-x: 1;
    --uk-scale-y: 1;
    opacity: 1
}

.uk-transition-slide-top {
    --uk-translate-y: -100%
}

.uk-transition-slide-bottom {
    --uk-translate-y: 100%
}

.uk-transition-slide-left {
    --uk-translate-x: -100%
}

.uk-transition-slide-right {
    --uk-translate-x: 100%
}

.uk-transition-slide-top-small {
    --uk-translate-y: calc(-1 * 10px)
}

.uk-transition-slide-bottom-small {
    --uk-translate-y: 10px
}

.uk-transition-slide-left-small {
    --uk-translate-x: calc(-1 * 10px)
}

.uk-transition-slide-right-small {
    --uk-translate-x: 10px
}

.uk-transition-slide-top-medium {
    --uk-translate-y: calc(-1 * 50px)
}

.uk-transition-slide-bottom-medium {
    --uk-translate-y: 50px
}

.uk-transition-slide-left-medium {
    --uk-translate-x: calc(-1 * 50px)
}

.uk-transition-slide-right-medium {
    --uk-translate-x: 50px
}

.uk-transition-active.uk-active [class*=uk-transition-slide],
.uk-transition-toggle [class*=uk-transition-slide]:focus-within,
.uk-transition-toggle:focus [class*=uk-transition-slide],
.uk-transition-toggle:hover [class*=uk-transition-slide] {
    --uk-translate-x: 0;
    --uk-translate-y: 0;
    opacity: 1
}

.uk-transition-opaque {
    opacity: 1
}

.uk-transition-slow {
    transition-duration: .7s
}

.uk-hidden,
[hidden] {
    display: none !important
}

@media (min-width:640px) {
    .uk-hidden\@s {
        display: none !important
    }
}

@media (min-width:960px) {
    .uk-hidden\@m {
        display: none !important
    }
}

@media (min-width:1200px) {
    .uk-hidden\@l {
        display: none !important
    }
}

@media (min-width:1600px) {
    .uk-hidden\@xl {
        display: none !important
    }
}

@media (max-width:639px) {
    .uk-visible\@s {
        display: none !important
    }
}

@media (max-width:959px) {
    .uk-visible\@m {
        display: none !important
    }
}

@media (max-width:1199px) {
    .uk-visible\@l {
        display: none !important
    }
}

@media (max-width:1599px) {
    .uk-visible\@xl {
        display: none !important
    }
}

.uk-invisible {
    visibility: hidden !important
}

.uk-visible-toggle:not(:hover):not(:focus) .uk-hidden-hover:not(:focus-within) {
    position: absolute !important;
    width: 0 !important;
    height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important
}

.uk-visible-toggle:not(:hover):not(:focus) .uk-invisible-hover:not(:focus-within) {
    opacity: 0 !important
}

@media (hover:none) {
    .uk-hidden-touch {
        display: none !important
    }
}

@media (hover) {
    .uk-hidden-notouch {
        display: none !important
    }
}

.tm-navbar-container:not(.uk-navbar-transparent),
.uk-card-primary.uk-card-body,
.uk-card-primary>:not([class*=uk-card-media]),
.uk-card-secondary.uk-card-body,
.uk-card-secondary>:not([class*=uk-card-media]),
.uk-light,
.uk-overlay-primary,
.uk-section-primary:not(.uk-preserve-color),
.uk-section-secondary:not(.uk-preserve-color),
.uk-tile-primary:not(.uk-preserve-color),
.uk-tile-secondary:not(.uk-preserve-color) {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-link,
.tm-navbar-container:not(.uk-navbar-transparent) a,
.uk-card-primary.uk-card-body .uk-link,
.uk-card-primary.uk-card-body a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link,
.uk-card-primary>:not([class*=uk-card-media]) a,
.uk-card-secondary.uk-card-body .uk-link,
.uk-card-secondary.uk-card-body a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link,
.uk-card-secondary>:not([class*=uk-card-media]) a,
.uk-light .uk-link,
.uk-light a,
.uk-overlay-primary .uk-link,
.uk-overlay-primary a,
.uk-section-primary:not(.uk-preserve-color) .uk-link,
.uk-section-primary:not(.uk-preserve-color) a,
.uk-section-secondary:not(.uk-preserve-color) .uk-link,
.uk-section-secondary:not(.uk-preserve-color) a,
.uk-tile-primary:not(.uk-preserve-color) .uk-link,
.uk-tile-primary:not(.uk-preserve-color) a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link,
.uk-tile-secondary:not(.uk-preserve-color) a {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-toggle:hover .uk-link,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-link:hover,
.tm-navbar-container:not(.uk-navbar-transparent) a:hover,
.uk-card-primary.uk-card-body .uk-link-toggle:hover .uk-link,
.uk-card-primary.uk-card-body .uk-link:hover,
.uk-card-primary.uk-card-body a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link:hover,
.uk-card-primary>:not([class*=uk-card-media]) a:hover,
.uk-card-secondary.uk-card-body .uk-link-toggle:hover .uk-link,
.uk-card-secondary.uk-card-body .uk-link:hover,
.uk-card-secondary.uk-card-body a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link:hover,
.uk-card-secondary>:not([class*=uk-card-media]) a:hover,
.uk-light .uk-link-toggle:hover .uk-link,
.uk-light .uk-link:hover,
.uk-light a:hover,
.uk-overlay-primary .uk-link-toggle:hover .uk-link,
.uk-overlay-primary .uk-link:hover,
.uk-overlay-primary a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link,
.uk-section-primary:not(.uk-preserve-color) .uk-link:hover,
.uk-section-primary:not(.uk-preserve-color) a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link,
.uk-section-secondary:not(.uk-preserve-color) .uk-link:hover,
.uk-section-secondary:not(.uk-preserve-color) a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link,
.uk-tile-primary:not(.uk-preserve-color) .uk-link:hover,
.uk-tile-primary:not(.uk-preserve-color) a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link:hover,
.uk-tile-secondary:not(.uk-preserve-color) a:hover {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) :not(pre)>code,
.tm-navbar-container:not(.uk-navbar-transparent) :not(pre)>kbd,
.tm-navbar-container:not(.uk-navbar-transparent) :not(pre)>samp,
.uk-card-primary.uk-card-body :not(pre)>code,
.uk-card-primary.uk-card-body :not(pre)>kbd,
.uk-card-primary.uk-card-body :not(pre)>samp,
.uk-card-primary>:not([class*=uk-card-media]) :not(pre)>code,
.uk-card-primary>:not([class*=uk-card-media]) :not(pre)>kbd,
.uk-card-primary>:not([class*=uk-card-media]) :not(pre)>samp,
.uk-card-secondary.uk-card-body :not(pre)>code,
.uk-card-secondary.uk-card-body :not(pre)>kbd,
.uk-card-secondary.uk-card-body :not(pre)>samp,
.uk-card-secondary>:not([class*=uk-card-media]) :not(pre)>code,
.uk-card-secondary>:not([class*=uk-card-media]) :not(pre)>kbd,
.uk-card-secondary>:not([class*=uk-card-media]) :not(pre)>samp,
.uk-light :not(pre)>code,
.uk-light :not(pre)>kbd,
.uk-light :not(pre)>samp,
.uk-overlay-primary :not(pre)>code,
.uk-overlay-primary :not(pre)>kbd,
.uk-overlay-primary :not(pre)>samp,
.uk-section-primary:not(.uk-preserve-color) :not(pre)>code,
.uk-section-primary:not(.uk-preserve-color) :not(pre)>kbd,
.uk-section-primary:not(.uk-preserve-color) :not(pre)>samp,
.uk-section-secondary:not(.uk-preserve-color) :not(pre)>code,
.uk-section-secondary:not(.uk-preserve-color) :not(pre)>kbd,
.uk-section-secondary:not(.uk-preserve-color) :not(pre)>samp,
.uk-tile-primary:not(.uk-preserve-color) :not(pre)>code,
.uk-tile-primary:not(.uk-preserve-color) :not(pre)>kbd,
.uk-tile-primary:not(.uk-preserve-color) :not(pre)>samp,
.uk-tile-secondary:not(.uk-preserve-color) :not(pre)>code,
.uk-tile-secondary:not(.uk-preserve-color) :not(pre)>kbd,
.uk-tile-secondary:not(.uk-preserve-color) :not(pre)>samp {
    color: rgba(255, 255, 255, .8);
    background: rgba(255, 255, 255, .1)
}

.tm-navbar-container:not(.uk-navbar-transparent) em,
.uk-card-primary.uk-card-body em,
.uk-card-primary>:not([class*=uk-card-media]) em,
.uk-card-secondary.uk-card-body em,
.uk-card-secondary>:not([class*=uk-card-media]) em,
.uk-light em,
.uk-overlay-primary em,
.uk-section-primary:not(.uk-preserve-color) em,
.uk-section-secondary:not(.uk-preserve-color) em,
.uk-tile-primary:not(.uk-preserve-color) em,
.uk-tile-secondary:not(.uk-preserve-color) em {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-h1,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-h2,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-h3,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-h4,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-h5,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-h6,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-2xlarge,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-large,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-medium,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-small,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-xlarge,
.tm-navbar-container:not(.uk-navbar-transparent) h1,
.tm-navbar-container:not(.uk-navbar-transparent) h2,
.tm-navbar-container:not(.uk-navbar-transparent) h3,
.tm-navbar-container:not(.uk-navbar-transparent) h4,
.tm-navbar-container:not(.uk-navbar-transparent) h5,
.tm-navbar-container:not(.uk-navbar-transparent) h6,
.uk-card-primary.uk-card-body .uk-h1,
.uk-card-primary.uk-card-body .uk-h2,
.uk-card-primary.uk-card-body .uk-h3,
.uk-card-primary.uk-card-body .uk-h4,
.uk-card-primary.uk-card-body .uk-h5,
.uk-card-primary.uk-card-body .uk-h6,
.uk-card-primary.uk-card-body .uk-heading-2xlarge,
.uk-card-primary.uk-card-body .uk-heading-large,
.uk-card-primary.uk-card-body .uk-heading-medium,
.uk-card-primary.uk-card-body .uk-heading-small,
.uk-card-primary.uk-card-body .uk-heading-xlarge,
.uk-card-primary.uk-card-body h1,
.uk-card-primary.uk-card-body h2,
.uk-card-primary.uk-card-body h3,
.uk-card-primary.uk-card-body h4,
.uk-card-primary.uk-card-body h5,
.uk-card-primary.uk-card-body h6,
.uk-card-primary>:not([class*=uk-card-media]) .uk-h1,
.uk-card-primary>:not([class*=uk-card-media]) .uk-h2,
.uk-card-primary>:not([class*=uk-card-media]) .uk-h3,
.uk-card-primary>:not([class*=uk-card-media]) .uk-h4,
.uk-card-primary>:not([class*=uk-card-media]) .uk-h5,
.uk-card-primary>:not([class*=uk-card-media]) .uk-h6,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-2xlarge,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-large,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-medium,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-small,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-xlarge,
.uk-card-primary>:not([class*=uk-card-media]) h1,
.uk-card-primary>:not([class*=uk-card-media]) h2,
.uk-card-primary>:not([class*=uk-card-media]) h3,
.uk-card-primary>:not([class*=uk-card-media]) h4,
.uk-card-primary>:not([class*=uk-card-media]) h5,
.uk-card-primary>:not([class*=uk-card-media]) h6,
.uk-card-secondary.uk-card-body .uk-h1,
.uk-card-secondary.uk-card-body .uk-h2,
.uk-card-secondary.uk-card-body .uk-h3,
.uk-card-secondary.uk-card-body .uk-h4,
.uk-card-secondary.uk-card-body .uk-h5,
.uk-card-secondary.uk-card-body .uk-h6,
.uk-card-secondary.uk-card-body .uk-heading-2xlarge,
.uk-card-secondary.uk-card-body .uk-heading-large,
.uk-card-secondary.uk-card-body .uk-heading-medium,
.uk-card-secondary.uk-card-body .uk-heading-small,
.uk-card-secondary.uk-card-body .uk-heading-xlarge,
.uk-card-secondary.uk-card-body h1,
.uk-card-secondary.uk-card-body h2,
.uk-card-secondary.uk-card-body h3,
.uk-card-secondary.uk-card-body h4,
.uk-card-secondary.uk-card-body h5,
.uk-card-secondary.uk-card-body h6,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-h1,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-h2,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-h3,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-h4,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-h5,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-h6,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-2xlarge,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-large,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-medium,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-small,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-xlarge,
.uk-card-secondary>:not([class*=uk-card-media]) h1,
.uk-card-secondary>:not([class*=uk-card-media]) h2,
.uk-card-secondary>:not([class*=uk-card-media]) h3,
.uk-card-secondary>:not([class*=uk-card-media]) h4,
.uk-card-secondary>:not([class*=uk-card-media]) h5,
.uk-card-secondary>:not([class*=uk-card-media]) h6,
.uk-light .uk-h1,
.uk-light .uk-h2,
.uk-light .uk-h3,
.uk-light .uk-h4,
.uk-light .uk-h5,
.uk-light .uk-h6,
.uk-light .uk-heading-2xlarge,
.uk-light .uk-heading-large,
.uk-light .uk-heading-medium,
.uk-light .uk-heading-small,
.uk-light .uk-heading-xlarge,
.uk-light h1,
.uk-light h2,
.uk-light h3,
.uk-light h4,
.uk-light h5,
.uk-light h6,
.uk-overlay-primary .uk-h1,
.uk-overlay-primary .uk-h2,
.uk-overlay-primary .uk-h3,
.uk-overlay-primary .uk-h4,
.uk-overlay-primary .uk-h5,
.uk-overlay-primary .uk-h6,
.uk-overlay-primary .uk-heading-2xlarge,
.uk-overlay-primary .uk-heading-large,
.uk-overlay-primary .uk-heading-medium,
.uk-overlay-primary .uk-heading-small,
.uk-overlay-primary .uk-heading-xlarge,
.uk-overlay-primary h1,
.uk-overlay-primary h2,
.uk-overlay-primary h3,
.uk-overlay-primary h4,
.uk-overlay-primary h5,
.uk-overlay-primary h6,
.uk-section-primary:not(.uk-preserve-color) .uk-h1,
.uk-section-primary:not(.uk-preserve-color) .uk-h2,
.uk-section-primary:not(.uk-preserve-color) .uk-h3,
.uk-section-primary:not(.uk-preserve-color) .uk-h4,
.uk-section-primary:not(.uk-preserve-color) .uk-h5,
.uk-section-primary:not(.uk-preserve-color) .uk-h6,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-2xlarge,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-large,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-medium,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-small,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-xlarge,
.uk-section-primary:not(.uk-preserve-color) h1,
.uk-section-primary:not(.uk-preserve-color) h2,
.uk-section-primary:not(.uk-preserve-color) h3,
.uk-section-primary:not(.uk-preserve-color) h4,
.uk-section-primary:not(.uk-preserve-color) h5,
.uk-section-primary:not(.uk-preserve-color) h6,
.uk-section-secondary:not(.uk-preserve-color) .uk-h1,
.uk-section-secondary:not(.uk-preserve-color) .uk-h2,
.uk-section-secondary:not(.uk-preserve-color) .uk-h3,
.uk-section-secondary:not(.uk-preserve-color) .uk-h4,
.uk-section-secondary:not(.uk-preserve-color) .uk-h5,
.uk-section-secondary:not(.uk-preserve-color) .uk-h6,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-2xlarge,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-large,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-medium,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-small,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-xlarge,
.uk-section-secondary:not(.uk-preserve-color) h1,
.uk-section-secondary:not(.uk-preserve-color) h2,
.uk-section-secondary:not(.uk-preserve-color) h3,
.uk-section-secondary:not(.uk-preserve-color) h4,
.uk-section-secondary:not(.uk-preserve-color) h5,
.uk-section-secondary:not(.uk-preserve-color) h6,
.uk-tile-primary:not(.uk-preserve-color) .uk-h1,
.uk-tile-primary:not(.uk-preserve-color) .uk-h2,
.uk-tile-primary:not(.uk-preserve-color) .uk-h3,
.uk-tile-primary:not(.uk-preserve-color) .uk-h4,
.uk-tile-primary:not(.uk-preserve-color) .uk-h5,
.uk-tile-primary:not(.uk-preserve-color) .uk-h6,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-2xlarge,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-large,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-medium,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-small,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-xlarge,
.uk-tile-primary:not(.uk-preserve-color) h1,
.uk-tile-primary:not(.uk-preserve-color) h2,
.uk-tile-primary:not(.uk-preserve-color) h3,
.uk-tile-primary:not(.uk-preserve-color) h4,
.uk-tile-primary:not(.uk-preserve-color) h5,
.uk-tile-primary:not(.uk-preserve-color) h6,
.uk-tile-secondary:not(.uk-preserve-color) .uk-h1,
.uk-tile-secondary:not(.uk-preserve-color) .uk-h2,
.uk-tile-secondary:not(.uk-preserve-color) .uk-h3,
.uk-tile-secondary:not(.uk-preserve-color) .uk-h4,
.uk-tile-secondary:not(.uk-preserve-color) .uk-h5,
.uk-tile-secondary:not(.uk-preserve-color) .uk-h6,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-2xlarge,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-large,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-medium,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-small,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-xlarge,
.uk-tile-secondary:not(.uk-preserve-color) h1,
.uk-tile-secondary:not(.uk-preserve-color) h2,
.uk-tile-secondary:not(.uk-preserve-color) h3,
.uk-tile-secondary:not(.uk-preserve-color) h4,
.uk-tile-secondary:not(.uk-preserve-color) h5,
.uk-tile-secondary:not(.uk-preserve-color) h6 {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) blockquote,
.uk-card-primary.uk-card-body blockquote,
.uk-card-primary>:not([class*=uk-card-media]) blockquote,
.uk-card-secondary.uk-card-body blockquote,
.uk-card-secondary>:not([class*=uk-card-media]) blockquote,
.uk-light blockquote,
.uk-overlay-primary blockquote,
.uk-section-primary:not(.uk-preserve-color) blockquote,
.uk-section-secondary:not(.uk-preserve-color) blockquote,
.uk-tile-primary:not(.uk-preserve-color) blockquote,
.uk-tile-secondary:not(.uk-preserve-color) blockquote {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) blockquote footer,
.uk-card-primary.uk-card-body blockquote footer,
.uk-card-primary>:not([class*=uk-card-media]) blockquote footer,
.uk-card-secondary.uk-card-body blockquote footer,
.uk-card-secondary>:not([class*=uk-card-media]) blockquote footer,
.uk-light blockquote footer,
.uk-overlay-primary blockquote footer,
.uk-section-primary:not(.uk-preserve-color) blockquote footer,
.uk-section-secondary:not(.uk-preserve-color) blockquote footer,
.uk-tile-primary:not(.uk-preserve-color) blockquote footer,
.uk-tile-secondary:not(.uk-preserve-color) blockquote footer {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-hr,
.tm-navbar-container:not(.uk-navbar-transparent) hr,
.uk-card-primary.uk-card-body .uk-hr,
.uk-card-primary.uk-card-body hr,
.uk-card-primary>:not([class*=uk-card-media]) .uk-hr,
.uk-card-primary>:not([class*=uk-card-media]) hr,
.uk-card-secondary.uk-card-body .uk-hr,
.uk-card-secondary.uk-card-body hr,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-hr,
.uk-card-secondary>:not([class*=uk-card-media]) hr,
.uk-light .uk-hr,
.uk-light hr,
.uk-overlay-primary .uk-hr,
.uk-overlay-primary hr,
.uk-section-primary:not(.uk-preserve-color) .uk-hr,
.uk-section-primary:not(.uk-preserve-color) hr,
.uk-section-secondary:not(.uk-preserve-color) .uk-hr,
.uk-section-secondary:not(.uk-preserve-color) hr,
.uk-tile-primary:not(.uk-preserve-color) .uk-hr,
.uk-tile-primary:not(.uk-preserve-color) hr,
.uk-tile-secondary:not(.uk-preserve-color) .uk-hr,
.uk-tile-secondary:not(.uk-preserve-color) hr {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) :focus,
.uk-card-primary.uk-card-body :focus,
.uk-card-primary>:not([class*=uk-card-media]) :focus,
.uk-card-secondary.uk-card-body :focus,
.uk-card-secondary>:not([class*=uk-card-media]) :focus,
.uk-light :focus,
.uk-overlay-primary :focus,
.uk-section-primary:not(.uk-preserve-color) :focus,
.uk-section-secondary:not(.uk-preserve-color) :focus,
.uk-tile-primary:not(.uk-preserve-color) :focus,
.uk-tile-secondary:not(.uk-preserve-color) :focus {
    outline-color: var(--background-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) :focus-visible,
.uk-card-primary.uk-card-body :focus-visible,
.uk-card-primary>:not([class*=uk-card-media]) :focus-visible,
.uk-card-secondary.uk-card-body :focus-visible,
.uk-card-secondary>:not([class*=uk-card-media]) :focus-visible,
.uk-light :focus-visible,
.uk-overlay-primary :focus-visible,
.uk-section-primary:not(.uk-preserve-color) :focus-visible,
.uk-section-secondary:not(.uk-preserve-color) :focus-visible,
.uk-tile-primary:not(.uk-preserve-color) :focus-visible,
.uk-tile-secondary:not(.uk-preserve-color) :focus-visible {
    outline-color: var(--background-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-muted a,
.tm-navbar-container:not(.uk-navbar-transparent) a.uk-link-muted,
.uk-card-primary.uk-card-body .uk-link-muted a,
.uk-card-primary.uk-card-body a.uk-link-muted,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-muted a,
.uk-card-primary>:not([class*=uk-card-media]) a.uk-link-muted,
.uk-card-secondary.uk-card-body .uk-link-muted a,
.uk-card-secondary.uk-card-body a.uk-link-muted,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-muted a,
.uk-card-secondary>:not([class*=uk-card-media]) a.uk-link-muted,
.uk-light .uk-link-muted a,
.uk-light a.uk-link-muted,
.uk-overlay-primary .uk-link-muted a,
.uk-overlay-primary a.uk-link-muted,
.uk-section-primary:not(.uk-preserve-color) .uk-link-muted a,
.uk-section-primary:not(.uk-preserve-color) a.uk-link-muted,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-muted a,
.uk-section-secondary:not(.uk-preserve-color) a.uk-link-muted,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-muted a,
.uk-tile-primary:not(.uk-preserve-color) a.uk-link-muted,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-muted a,
.uk-tile-secondary:not(.uk-preserve-color) a.uk-link-muted {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-muted a:hover,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-toggle:hover .uk-link-muted,
.tm-navbar-container:not(.uk-navbar-transparent) a.uk-link-muted:hover,
.uk-card-primary.uk-card-body .uk-link-muted a:hover,
.uk-card-primary.uk-card-body .uk-link-toggle:hover .uk-link-muted,
.uk-card-primary.uk-card-body a.uk-link-muted:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-muted a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link-muted,
.uk-card-primary>:not([class*=uk-card-media]) a.uk-link-muted:hover,
.uk-card-secondary.uk-card-body .uk-link-muted a:hover,
.uk-card-secondary.uk-card-body .uk-link-toggle:hover .uk-link-muted,
.uk-card-secondary.uk-card-body a.uk-link-muted:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-muted a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link-muted,
.uk-card-secondary>:not([class*=uk-card-media]) a.uk-link-muted:hover,
.uk-light .uk-link-muted a:hover,
.uk-light .uk-link-toggle:hover .uk-link-muted,
.uk-light a.uk-link-muted:hover,
.uk-overlay-primary .uk-link-muted a:hover,
.uk-overlay-primary .uk-link-toggle:hover .uk-link-muted,
.uk-overlay-primary a.uk-link-muted:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-link-muted a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-muted,
.uk-section-primary:not(.uk-preserve-color) a.uk-link-muted:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-muted a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-muted,
.uk-section-secondary:not(.uk-preserve-color) a.uk-link-muted:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-muted a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-muted,
.uk-tile-primary:not(.uk-preserve-color) a.uk-link-muted:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-muted a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-muted,
.uk-tile-secondary:not(.uk-preserve-color) a.uk-link-muted:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-text a:hover,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-toggle:hover .uk-link-text,
.tm-navbar-container:not(.uk-navbar-transparent) a.uk-link-text:hover,
.uk-card-primary.uk-card-body .uk-link-text a:hover,
.uk-card-primary.uk-card-body .uk-link-toggle:hover .uk-link-text,
.uk-card-primary.uk-card-body a.uk-link-text:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-text a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link-text,
.uk-card-primary>:not([class*=uk-card-media]) a.uk-link-text:hover,
.uk-card-secondary.uk-card-body .uk-link-text a:hover,
.uk-card-secondary.uk-card-body .uk-link-toggle:hover .uk-link-text,
.uk-card-secondary.uk-card-body a.uk-link-text:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-text a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link-text,
.uk-card-secondary>:not([class*=uk-card-media]) a.uk-link-text:hover,
.uk-light .uk-link-text a:hover,
.uk-light .uk-link-toggle:hover .uk-link-text,
.uk-light a.uk-link-text:hover,
.uk-overlay-primary .uk-link-text a:hover,
.uk-overlay-primary .uk-link-toggle:hover .uk-link-text,
.uk-overlay-primary a.uk-link-text:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-link-text a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-text,
.uk-section-primary:not(.uk-preserve-color) a.uk-link-text:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-text a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-text,
.uk-section-secondary:not(.uk-preserve-color) a.uk-link-text:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-text a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-text,
.uk-tile-primary:not(.uk-preserve-color) a.uk-link-text:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-text a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-text,
.uk-tile-secondary:not(.uk-preserve-color) a.uk-link-text:hover {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-heading a:hover,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-link-toggle:hover .uk-link-heading,
.tm-navbar-container:not(.uk-navbar-transparent) a.uk-link-heading:hover,
.uk-card-primary.uk-card-body .uk-link-heading a:hover,
.uk-card-primary.uk-card-body .uk-link-toggle:hover .uk-link-heading,
.uk-card-primary.uk-card-body a.uk-link-heading:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-heading a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link-heading,
.uk-card-primary>:not([class*=uk-card-media]) a.uk-link-heading:hover,
.uk-card-secondary.uk-card-body .uk-link-heading a:hover,
.uk-card-secondary.uk-card-body .uk-link-toggle:hover .uk-link-heading,
.uk-card-secondary.uk-card-body a.uk-link-heading:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-heading a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-link-toggle:hover .uk-link-heading,
.uk-card-secondary>:not([class*=uk-card-media]) a.uk-link-heading:hover,
.uk-light .uk-link-heading a:hover,
.uk-light .uk-link-toggle:hover .uk-link-heading,
.uk-light a.uk-link-heading:hover,
.uk-overlay-primary .uk-link-heading a:hover,
.uk-overlay-primary .uk-link-toggle:hover .uk-link-heading,
.uk-overlay-primary a.uk-link-heading:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-link-heading a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-heading,
.uk-section-primary:not(.uk-preserve-color) a.uk-link-heading:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-heading a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-heading,
.uk-section-secondary:not(.uk-preserve-color) a.uk-link-heading:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-heading a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-heading,
.uk-tile-primary:not(.uk-preserve-color) a.uk-link-heading:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-heading a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-link-toggle:hover .uk-link-heading,
.uk-tile-secondary:not(.uk-preserve-color) a.uk-link-heading:hover {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-divider,
.uk-card-primary.uk-card-body .uk-heading-divider,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-divider,
.uk-card-secondary.uk-card-body .uk-heading-divider,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-divider,
.uk-light .uk-heading-divider,
.uk-overlay-primary .uk-heading-divider,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-divider,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-divider,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-divider,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-divider {
    border-bottom-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-bullet::before,
.uk-card-primary.uk-card-body .uk-heading-bullet::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-bullet::before,
.uk-card-secondary.uk-card-body .uk-heading-bullet::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-bullet::before,
.uk-light .uk-heading-bullet::before,
.uk-overlay-primary .uk-heading-bullet::before,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-bullet::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-bullet::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-bullet::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-bullet::before {
    border-left-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-line>::after,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-heading-line>::before,
.uk-card-primary.uk-card-body .uk-heading-line>::after,
.uk-card-primary.uk-card-body .uk-heading-line>::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-line>::after,
.uk-card-primary>:not([class*=uk-card-media]) .uk-heading-line>::before,
.uk-card-secondary.uk-card-body .uk-heading-line>::after,
.uk-card-secondary.uk-card-body .uk-heading-line>::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-line>::after,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-heading-line>::before,
.uk-light .uk-heading-line>::after,
.uk-light .uk-heading-line>::before,
.uk-overlay-primary .uk-heading-line>::after,
.uk-overlay-primary .uk-heading-line>::before,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-line>::after,
.uk-section-primary:not(.uk-preserve-color) .uk-heading-line>::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-line>::after,
.uk-section-secondary:not(.uk-preserve-color) .uk-heading-line>::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-line>::after,
.uk-tile-primary:not(.uk-preserve-color) .uk-heading-line>::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-line>::after,
.uk-tile-secondary:not(.uk-preserve-color) .uk-heading-line>::before {
    border-bottom-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-divider-icon,
.uk-card-primary.uk-card-body .uk-divider-icon,
.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-icon,
.uk-card-secondary.uk-card-body .uk-divider-icon,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-icon,
.uk-light .uk-divider-icon,
.uk-overlay-primary .uk-divider-icon,
.uk-section-primary:not(.uk-preserve-color) .uk-divider-icon,
.uk-section-secondary:not(.uk-preserve-color) .uk-divider-icon,
.uk-tile-primary:not(.uk-preserve-color) .uk-divider-icon,
.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-icon {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22none%22%20stroke%3D%22rgba%28255,%20255,%20255,%200.2%29%22%20stroke-width%3D%222%22%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%227%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-divider-icon::after,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-divider-icon::before,
.uk-card-primary.uk-card-body .uk-divider-icon::after,
.uk-card-primary.uk-card-body .uk-divider-icon::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-icon::after,
.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-icon::before,
.uk-card-secondary.uk-card-body .uk-divider-icon::after,
.uk-card-secondary.uk-card-body .uk-divider-icon::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-icon::after,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-icon::before,
.uk-light .uk-divider-icon::after,
.uk-light .uk-divider-icon::before,
.uk-overlay-primary .uk-divider-icon::after,
.uk-overlay-primary .uk-divider-icon::before,
.uk-section-primary:not(.uk-preserve-color) .uk-divider-icon::after,
.uk-section-primary:not(.uk-preserve-color) .uk-divider-icon::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-divider-icon::after,
.uk-section-secondary:not(.uk-preserve-color) .uk-divider-icon::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-divider-icon::after,
.uk-tile-primary:not(.uk-preserve-color) .uk-divider-icon::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-icon::after,
.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-icon::before {
    border-bottom-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-divider-small::after,
.uk-card-primary.uk-card-body .uk-divider-small::after,
.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-small::after,
.uk-card-secondary.uk-card-body .uk-divider-small::after,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-small::after,
.uk-light .uk-divider-small::after,
.uk-overlay-primary .uk-divider-small::after,
.uk-section-primary:not(.uk-preserve-color) .uk-divider-small::after,
.uk-section-secondary:not(.uk-preserve-color) .uk-divider-small::after,
.uk-tile-primary:not(.uk-preserve-color) .uk-divider-small::after,
.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-small::after {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-divider-vertical,
.uk-card-primary.uk-card-body .uk-divider-vertical,
.uk-card-primary>:not([class*=uk-card-media]) .uk-divider-vertical,
.uk-card-secondary.uk-card-body .uk-divider-vertical,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-divider-vertical,
.uk-light .uk-divider-vertical,
.uk-overlay-primary .uk-divider-vertical,
.uk-section-primary:not(.uk-preserve-color) .uk-divider-vertical,
.uk-section-secondary:not(.uk-preserve-color) .uk-divider-vertical,
.uk-tile-primary:not(.uk-preserve-color) .uk-divider-vertical,
.uk-tile-secondary:not(.uk-preserve-color) .uk-divider-vertical {
    border-left-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-muted>::before,
.uk-card-primary.uk-card-body .uk-list-muted>::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-muted>::before,
.uk-card-secondary.uk-card-body .uk-list-muted>::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-muted>::before,
.uk-light .uk-list-muted>::before,
.uk-overlay-primary .uk-list-muted>::before,
.uk-section-primary:not(.uk-preserve-color) .uk-list-muted>::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-list-muted>::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-list-muted>::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-muted>::before {
    color: rgba(255, 255, 255, .6) !important
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-emphasis>::before,
.uk-card-primary.uk-card-body .uk-list-emphasis>::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-emphasis>::before,
.uk-card-secondary.uk-card-body .uk-list-emphasis>::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-emphasis>::before,
.uk-light .uk-list-emphasis>::before,
.uk-overlay-primary .uk-list-emphasis>::before,
.uk-section-primary:not(.uk-preserve-color) .uk-list-emphasis>::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-list-emphasis>::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-list-emphasis>::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-emphasis>::before {
    color: var(--text-negative-color) !important
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-primary>::before,
.uk-card-primary.uk-card-body .uk-list-primary>::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-primary>::before,
.uk-card-secondary.uk-card-body .uk-list-primary>::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-primary>::before,
.uk-light .uk-list-primary>::before,
.uk-overlay-primary .uk-list-primary>::before,
.uk-section-primary:not(.uk-preserve-color) .uk-list-primary>::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-list-primary>::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-list-primary>::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-primary>::before {
    color: var(--text-negative-color) !important
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-secondary>::before,
.uk-card-primary.uk-card-body .uk-list-secondary>::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-secondary>::before,
.uk-card-secondary.uk-card-body .uk-list-secondary>::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-secondary>::before,
.uk-light .uk-list-secondary>::before,
.uk-overlay-primary .uk-list-secondary>::before,
.uk-section-primary:not(.uk-preserve-color) .uk-list-secondary>::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-list-secondary>::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-list-secondary>::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-secondary>::before {
    color: var(--text-negative-color) !important
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-bullet>::before,
.uk-card-primary.uk-card-body .uk-list-bullet>::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-bullet>::before,
.uk-card-secondary.uk-card-body .uk-list-bullet>::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-bullet>::before,
.uk-light .uk-list-bullet>::before,
.uk-overlay-primary .uk-list-bullet>::before,
.uk-section-primary:not(.uk-preserve-color) .uk-list-bullet>::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-list-bullet>::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-list-bullet>::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-bullet>::before {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewBox%3D%220%200%206%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-divider>:nth-child(n+2),
.uk-card-primary.uk-card-body .uk-list-divider>:nth-child(n+2),
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-divider>:nth-child(n+2),
.uk-card-secondary.uk-card-body .uk-list-divider>:nth-child(n+2),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-divider>:nth-child(n+2),
.uk-light .uk-list-divider>:nth-child(n+2),
.uk-overlay-primary .uk-list-divider>:nth-child(n+2),
.uk-section-primary:not(.uk-preserve-color) .uk-list-divider>:nth-child(n+2),
.uk-section-secondary:not(.uk-preserve-color) .uk-list-divider>:nth-child(n+2),
.uk-tile-primary:not(.uk-preserve-color) .uk-list-divider>:nth-child(n+2),
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-divider>:nth-child(n+2) {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-striped>:nth-of-type(odd),
.uk-card-primary.uk-card-body .uk-list-striped>:nth-of-type(odd),
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-striped>:nth-of-type(odd),
.uk-card-secondary.uk-card-body .uk-list-striped>:nth-of-type(odd),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-striped>:nth-of-type(odd),
.uk-light .uk-list-striped>:nth-of-type(odd),
.uk-overlay-primary .uk-list-striped>:nth-of-type(odd),
.uk-section-primary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd),
.uk-section-secondary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd),
.uk-tile-primary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd),
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd) {
    border-top-color: rgba(255, 255, 255, .2);
    border-bottom-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-list-striped>:nth-of-type(odd),
.uk-card-primary.uk-card-body .uk-list-striped>:nth-of-type(odd),
.uk-card-primary>:not([class*=uk-card-media]) .uk-list-striped>:nth-of-type(odd),
.uk-card-secondary.uk-card-body .uk-list-striped>:nth-of-type(odd),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-list-striped>:nth-of-type(odd),
.uk-light .uk-list-striped>:nth-of-type(odd),
.uk-overlay-primary .uk-list-striped>:nth-of-type(odd),
.uk-section-primary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd),
.uk-section-secondary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd),
.uk-tile-primary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd),
.uk-tile-secondary:not(.uk-preserve-color) .uk-list-striped>:nth-of-type(odd) {
    background-color: rgba(255, 255, 255, .1)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-table th,
.uk-card-primary.uk-card-body .uk-table th,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table th,
.uk-card-secondary.uk-card-body .uk-table th,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table th,
.uk-light .uk-table th,
.uk-overlay-primary .uk-table th,
.uk-section-primary:not(.uk-preserve-color) .uk-table th,
.uk-section-secondary:not(.uk-preserve-color) .uk-table th,
.uk-tile-primary:not(.uk-preserve-color) .uk-table th,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table th {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-table caption,
.uk-card-primary.uk-card-body .uk-table caption,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table caption,
.uk-card-secondary.uk-card-body .uk-table caption,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table caption,
.uk-light .uk-table caption,
.uk-overlay-primary .uk-table caption,
.uk-section-primary:not(.uk-preserve-color) .uk-table caption,
.uk-section-secondary:not(.uk-preserve-color) .uk-table caption,
.uk-tile-primary:not(.uk-preserve-color) .uk-table caption,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table caption {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-table tbody tr.uk-active,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-table>tr.uk-active,
.uk-card-primary.uk-card-body .uk-table tbody tr.uk-active,
.uk-card-primary.uk-card-body .uk-table>tr.uk-active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table tbody tr.uk-active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table>tr.uk-active,
.uk-card-secondary.uk-card-body .uk-table tbody tr.uk-active,
.uk-card-secondary.uk-card-body .uk-table>tr.uk-active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table tbody tr.uk-active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table>tr.uk-active,
.uk-light .uk-table tbody tr.uk-active,
.uk-light .uk-table>tr.uk-active,
.uk-overlay-primary .uk-table tbody tr.uk-active,
.uk-overlay-primary .uk-table>tr.uk-active,
.uk-section-primary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,
.uk-section-primary:not(.uk-preserve-color) .uk-table>tr.uk-active,
.uk-section-secondary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,
.uk-section-secondary:not(.uk-preserve-color) .uk-table>tr.uk-active,
.uk-tile-primary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,
.uk-tile-primary:not(.uk-preserve-color) .uk-table>tr.uk-active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table tbody tr.uk-active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table>tr.uk-active {
    background: rgba(255, 255, 255, .08)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-divider>:first-child>tr:not(:first-child),
.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-divider>:not(:first-child)>tr,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-divider>tr:not(:first-child),
.uk-card-primary.uk-card-body .uk-table-divider>:first-child>tr:not(:first-child),
.uk-card-primary.uk-card-body .uk-table-divider>:not(:first-child)>tr,
.uk-card-primary.uk-card-body .uk-table-divider>tr:not(:first-child),
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-divider>:first-child>tr:not(:first-child),
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-divider>:not(:first-child)>tr,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-divider>tr:not(:first-child),
.uk-card-secondary.uk-card-body .uk-table-divider>:first-child>tr:not(:first-child),
.uk-card-secondary.uk-card-body .uk-table-divider>:not(:first-child)>tr,
.uk-card-secondary.uk-card-body .uk-table-divider>tr:not(:first-child),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-divider>:first-child>tr:not(:first-child),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-divider>:not(:first-child)>tr,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-divider>tr:not(:first-child),
.uk-light .uk-table-divider>:first-child>tr:not(:first-child),
.uk-light .uk-table-divider>:not(:first-child)>tr,
.uk-light .uk-table-divider>tr:not(:first-child),
.uk-overlay-primary .uk-table-divider>:first-child>tr:not(:first-child),
.uk-overlay-primary .uk-table-divider>:not(:first-child)>tr,
.uk-overlay-primary .uk-table-divider>tr:not(:first-child),
.uk-section-primary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),
.uk-section-primary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,
.uk-section-primary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child),
.uk-section-secondary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),
.uk-section-secondary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,
.uk-section-secondary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child),
.uk-tile-primary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),
.uk-tile-primary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,
.uk-tile-primary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child),
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-divider>:first-child>tr:not(:first-child),
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-divider>:not(:first-child)>tr,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-divider>tr:not(:first-child) {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-striped tbody tr:nth-of-type(odd),
.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-striped>tr:nth-of-type(odd),
.uk-card-primary.uk-card-body .uk-table-striped tbody tr:nth-of-type(odd),
.uk-card-primary.uk-card-body .uk-table-striped>tr:nth-of-type(odd),
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-striped tbody tr:nth-of-type(odd),
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-striped>tr:nth-of-type(odd),
.uk-card-secondary.uk-card-body .uk-table-striped tbody tr:nth-of-type(odd),
.uk-card-secondary.uk-card-body .uk-table-striped>tr:nth-of-type(odd),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-striped tbody tr:nth-of-type(odd),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-striped>tr:nth-of-type(odd),
.uk-light .uk-table-striped tbody tr:nth-of-type(odd),
.uk-light .uk-table-striped>tr:nth-of-type(odd),
.uk-overlay-primary .uk-table-striped tbody tr:nth-of-type(odd),
.uk-overlay-primary .uk-table-striped>tr:nth-of-type(odd),
.uk-section-primary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),
.uk-section-primary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd),
.uk-section-secondary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),
.uk-section-secondary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd),
.uk-tile-primary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),
.uk-tile-primary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd),
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(odd),
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(odd) {
    background: rgba(255, 255, 255, .1);
    border-top-color: rgba(255, 255, 255, .2);
    border-bottom-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-hover tbody tr:hover,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-hover>tr:hover,
.uk-card-primary.uk-card-body .uk-table-hover tbody tr:hover,
.uk-card-primary.uk-card-body .uk-table-hover>tr:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-hover tbody tr:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-hover>tr:hover,
.uk-card-secondary.uk-card-body .uk-table-hover tbody tr:hover,
.uk-card-secondary.uk-card-body .uk-table-hover>tr:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-hover tbody tr:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-hover>tr:hover,
.uk-light .uk-table-hover tbody tr:hover,
.uk-light .uk-table-hover>tr:hover,
.uk-overlay-primary .uk-table-hover tbody tr:hover,
.uk-overlay-primary .uk-table-hover>tr:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-table-hover>tr:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-table-hover>tr:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-table-hover>tr:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-hover tbody tr:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-hover>tr:hover {
    background: rgba(255, 255, 255, .08)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-icon-link,
.uk-card-primary.uk-card-body .uk-icon-link,
.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-link,
.uk-card-secondary.uk-card-body .uk-icon-link,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-link,
.uk-light .uk-icon-link,
.uk-overlay-primary .uk-icon-link,
.uk-section-primary:not(.uk-preserve-color) .uk-icon-link,
.uk-section-secondary:not(.uk-preserve-color) .uk-icon-link,
.uk-tile-primary:not(.uk-preserve-color) .uk-icon-link,
.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-link {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-icon-link:hover,
.uk-card-primary.uk-card-body .uk-icon-link:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-link:hover,
.uk-card-secondary.uk-card-body .uk-icon-link:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-link:hover,
.uk-light .uk-icon-link:hover,
.uk-overlay-primary .uk-icon-link:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-icon-link:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-icon-link:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-icon-link:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-link:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-active>.uk-icon-link,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-icon-link:active,
.uk-card-primary.uk-card-body .uk-active>.uk-icon-link,
.uk-card-primary.uk-card-body .uk-icon-link:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-active>.uk-icon-link,
.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-link:active,
.uk-card-secondary.uk-card-body .uk-active>.uk-icon-link,
.uk-card-secondary.uk-card-body .uk-icon-link:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-active>.uk-icon-link,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-link:active,
.uk-light .uk-active>.uk-icon-link,
.uk-light .uk-icon-link:active,
.uk-overlay-primary .uk-active>.uk-icon-link,
.uk-overlay-primary .uk-icon-link:active,
.uk-section-primary:not(.uk-preserve-color) .uk-active>.uk-icon-link,
.uk-section-primary:not(.uk-preserve-color) .uk-icon-link:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-active>.uk-icon-link,
.uk-section-secondary:not(.uk-preserve-color) .uk-icon-link:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-active>.uk-icon-link,
.uk-tile-primary:not(.uk-preserve-color) .uk-icon-link:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-active>.uk-icon-link,
.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-link:active {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-icon-button,
.uk-card-primary.uk-card-body .uk-icon-button,
.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-button,
.uk-card-secondary.uk-card-body .uk-icon-button,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-button,
.uk-light .uk-icon-button,
.uk-overlay-primary .uk-icon-button,
.uk-section-primary:not(.uk-preserve-color) .uk-icon-button,
.uk-section-secondary:not(.uk-preserve-color) .uk-icon-button,
.uk-tile-primary:not(.uk-preserve-color) .uk-icon-button,
.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-button {
    background-color: rgba(255, 255, 255, .1);
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-icon-button:hover,
.uk-card-primary.uk-card-body .uk-icon-button:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-button:hover,
.uk-card-secondary.uk-card-body .uk-icon-button:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-button:hover,
.uk-light .uk-icon-button:hover,
.uk-overlay-primary .uk-icon-button:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-icon-button:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-icon-button:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-icon-button:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-button:hover {
    background-color: rgba(255, 255, 255, .15);
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-icon-button:active,
.uk-card-primary.uk-card-body .uk-icon-button:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-icon-button:active,
.uk-card-secondary.uk-card-body .uk-icon-button:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-icon-button:active,
.uk-light .uk-icon-button:active,
.uk-overlay-primary .uk-icon-button:active,
.uk-section-primary:not(.uk-preserve-color) .uk-icon-button:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-icon-button:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-icon-button:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-icon-button:active {
    background-color: rgba(255, 255, 255, .2);
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-input,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-select,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-textarea,
.uk-card-primary.uk-card-body .uk-input,
.uk-card-primary.uk-card-body .uk-select,
.uk-card-primary.uk-card-body .uk-textarea,
.uk-card-primary>:not([class*=uk-card-media]) .uk-input,
.uk-card-primary>:not([class*=uk-card-media]) .uk-select,
.uk-card-primary>:not([class*=uk-card-media]) .uk-textarea,
.uk-card-secondary.uk-card-body .uk-input,
.uk-card-secondary.uk-card-body .uk-select,
.uk-card-secondary.uk-card-body .uk-textarea,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-input,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-select,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-textarea,
.uk-light .uk-input,
.uk-light .uk-select,
.uk-light .uk-textarea,
.uk-overlay-primary .uk-input,
.uk-overlay-primary .uk-select,
.uk-overlay-primary .uk-textarea,
.uk-section-primary:not(.uk-preserve-color) .uk-input,
.uk-section-primary:not(.uk-preserve-color) .uk-select,
.uk-section-primary:not(.uk-preserve-color) .uk-textarea,
.uk-section-secondary:not(.uk-preserve-color) .uk-input,
.uk-section-secondary:not(.uk-preserve-color) .uk-select,
.uk-section-secondary:not(.uk-preserve-color) .uk-textarea,
.uk-tile-primary:not(.uk-preserve-color) .uk-input,
.uk-tile-primary:not(.uk-preserve-color) .uk-select,
.uk-tile-primary:not(.uk-preserve-color) .uk-textarea,
.uk-tile-secondary:not(.uk-preserve-color) .uk-input,
.uk-tile-secondary:not(.uk-preserve-color) .uk-select,
.uk-tile-secondary:not(.uk-preserve-color) .uk-textarea {
    background-color: rgba(255, 255, 255, .1);
    color: rgba(255, 255, 255, .8);
    background-clip: padding-box;
    border-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-input:focus,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-select:focus,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-textarea:focus,
.uk-card-primary.uk-card-body .uk-input:focus,
.uk-card-primary.uk-card-body .uk-select:focus,
.uk-card-primary.uk-card-body .uk-textarea:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-input:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-select:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-textarea:focus,
.uk-card-secondary.uk-card-body .uk-input:focus,
.uk-card-secondary.uk-card-body .uk-select:focus,
.uk-card-secondary.uk-card-body .uk-textarea:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-input:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-select:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-textarea:focus,
.uk-light .uk-input:focus,
.uk-light .uk-select:focus,
.uk-light .uk-textarea:focus,
.uk-overlay-primary .uk-input:focus,
.uk-overlay-primary .uk-select:focus,
.uk-overlay-primary .uk-textarea:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-input:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-select:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-textarea:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-input:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-select:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-textarea:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-input:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-select:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-textarea:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-input:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-select:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-textarea:focus {
    background-color: rgba(255, 255, 255, .15);
    color: rgba(255, 255, 255, .8);
    border-color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-input::placeholder,
.uk-card-primary.uk-card-body .uk-input::placeholder,
.uk-card-primary>:not([class*=uk-card-media]) .uk-input::placeholder,
.uk-card-secondary.uk-card-body .uk-input::placeholder,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-input::placeholder,
.uk-light .uk-input::placeholder,
.uk-overlay-primary .uk-input::placeholder,
.uk-section-primary:not(.uk-preserve-color) .uk-input::placeholder,
.uk-section-secondary:not(.uk-preserve-color) .uk-input::placeholder,
.uk-tile-primary:not(.uk-preserve-color) .uk-input::placeholder,
.uk-tile-secondary:not(.uk-preserve-color) .uk-input::placeholder {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-textarea::placeholder,
.uk-card-primary.uk-card-body .uk-textarea::placeholder,
.uk-card-primary>:not([class*=uk-card-media]) .uk-textarea::placeholder,
.uk-card-secondary.uk-card-body .uk-textarea::placeholder,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-textarea::placeholder,
.uk-light .uk-textarea::placeholder,
.uk-overlay-primary .uk-textarea::placeholder,
.uk-section-primary:not(.uk-preserve-color) .uk-textarea::placeholder,
.uk-section-secondary:not(.uk-preserve-color) .uk-textarea::placeholder,
.uk-tile-primary:not(.uk-preserve-color) .uk-textarea::placeholder,
.uk-tile-secondary:not(.uk-preserve-color) .uk-textarea::placeholder {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-select:not([multiple]):not([size]),
.uk-card-primary.uk-card-body .uk-select:not([multiple]):not([size]),
.uk-card-primary>:not([class*=uk-card-media]) .uk-select:not([multiple]):not([size]),
.uk-card-secondary.uk-card-body .uk-select:not([multiple]):not([size]),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-select:not([multiple]):not([size]),
.uk-light .uk-select:not([multiple]):not([size]),
.uk-overlay-primary .uk-select:not([multiple]):not([size]),
.uk-section-primary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]),
.uk-section-secondary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]),
.uk-tile-primary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]),
.uk-tile-secondary:not(.uk-preserve-color) .uk-select:not([multiple]):not([size]) {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20points%3D%2212%201%209%206%2015%206%22%20%2F%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20points%3D%2212%2013%209%208%2015%208%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-input[list]:focus,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-input[list]:hover,
.uk-card-primary.uk-card-body .uk-input[list]:focus,
.uk-card-primary.uk-card-body .uk-input[list]:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-input[list]:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-input[list]:hover,
.uk-card-secondary.uk-card-body .uk-input[list]:focus,
.uk-card-secondary.uk-card-body .uk-input[list]:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-input[list]:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-input[list]:hover,
.uk-light .uk-input[list]:focus,
.uk-light .uk-input[list]:hover,
.uk-overlay-primary .uk-input[list]:focus,
.uk-overlay-primary .uk-input[list]:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-input[list]:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-input[list]:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-input[list]:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-input[list]:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-input[list]:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-input[list]:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-input[list]:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-input[list]:hover {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20points%3D%2212%2012%208%206%2016%206%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-radio,
.uk-card-primary.uk-card-body .uk-checkbox,
.uk-card-primary.uk-card-body .uk-radio,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox,
.uk-card-primary>:not([class*=uk-card-media]) .uk-radio,
.uk-card-secondary.uk-card-body .uk-checkbox,
.uk-card-secondary.uk-card-body .uk-radio,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio,
.uk-light .uk-checkbox,
.uk-light .uk-radio,
.uk-overlay-primary .uk-checkbox,
.uk-overlay-primary .uk-radio,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox,
.uk-section-primary:not(.uk-preserve-color) .uk-radio,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox,
.uk-section-secondary:not(.uk-preserve-color) .uk-radio,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox,
.uk-tile-primary:not(.uk-preserve-color) .uk-radio,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox,
.uk-tile-secondary:not(.uk-preserve-color) .uk-radio {
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox:focus,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-radio:focus,
.uk-card-primary.uk-card-body .uk-checkbox:focus,
.uk-card-primary.uk-card-body .uk-radio:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:focus,
.uk-card-secondary.uk-card-body .uk-checkbox:focus,
.uk-card-secondary.uk-card-body .uk-radio:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:focus,
.uk-light .uk-checkbox:focus,
.uk-light .uk-radio:focus,
.uk-overlay-primary .uk-checkbox:focus,
.uk-overlay-primary .uk-radio:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-radio:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-radio:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-radio:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:focus {
    background-color: rgba(255, 255, 255, .15);
    border-color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox:checked,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox:indeterminate,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-radio:checked,
.uk-card-primary.uk-card-body .uk-checkbox:checked,
.uk-card-primary.uk-card-body .uk-checkbox:indeterminate,
.uk-card-primary.uk-card-body .uk-radio:checked,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:checked,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,
.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:checked,
.uk-card-secondary.uk-card-body .uk-checkbox:checked,
.uk-card-secondary.uk-card-body .uk-checkbox:indeterminate,
.uk-card-secondary.uk-card-body .uk-radio:checked,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:checked,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:checked,
.uk-light .uk-checkbox:checked,
.uk-light .uk-checkbox:indeterminate,
.uk-light .uk-radio:checked,
.uk-overlay-primary .uk-checkbox:checked,
.uk-overlay-primary .uk-checkbox:indeterminate,
.uk-overlay-primary .uk-radio:checked,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:checked,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,
.uk-section-primary:not(.uk-preserve-color) .uk-radio:checked,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:checked,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate,
.uk-section-secondary:not(.uk-preserve-color) .uk-radio:checked,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:checked,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,
.uk-tile-primary:not(.uk-preserve-color) .uk-radio:checked,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:checked,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate,
.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:checked {
    background-color: var(--background-color);
    border-color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox:checked:focus,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox:indeterminate:focus,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-radio:checked:focus,
.uk-card-primary.uk-card-body .uk-checkbox:checked:focus,
.uk-card-primary.uk-card-body .uk-checkbox:indeterminate:focus,
.uk-card-primary.uk-card-body .uk-radio:checked:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:checked:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:checked:focus,
.uk-card-secondary.uk-card-body .uk-checkbox:checked:focus,
.uk-card-secondary.uk-card-body .uk-checkbox:indeterminate:focus,
.uk-card-secondary.uk-card-body .uk-radio:checked:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:checked:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:checked:focus,
.uk-light .uk-checkbox:checked:focus,
.uk-light .uk-checkbox:indeterminate:focus,
.uk-light .uk-radio:checked:focus,
.uk-overlay-primary .uk-checkbox:checked:focus,
.uk-overlay-primary .uk-checkbox:indeterminate:focus,
.uk-overlay-primary .uk-radio:checked:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:checked:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-radio:checked:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:checked:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-radio:checked:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:checked:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-radio:checked:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:checked:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:checked:focus {
    background-color: var(--background-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-radio:checked,
.uk-card-primary.uk-card-body .uk-radio:checked,
.uk-card-primary>:not([class*=uk-card-media]) .uk-radio:checked,
.uk-card-secondary.uk-card-body .uk-radio:checked,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-radio:checked,
.uk-light .uk-radio:checked,
.uk-overlay-primary .uk-radio:checked,
.uk-section-primary:not(.uk-preserve-color) .uk-radio:checked,
.uk-section-secondary:not(.uk-preserve-color) .uk-radio:checked,
.uk-tile-primary:not(.uk-preserve-color) .uk-radio:checked,
.uk-tile-secondary:not(.uk-preserve-color) .uk-radio:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20fill%3D%22%23666%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox:checked,
.uk-card-primary.uk-card-body .uk-checkbox:checked,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:checked,
.uk-card-secondary.uk-card-body .uk-checkbox:checked,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:checked,
.uk-light .uk-checkbox:checked,
.uk-overlay-primary .uk-checkbox:checked,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:checked,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:checked,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:checked,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:checked {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-checkbox:indeterminate,
.uk-card-primary.uk-card-body .uk-checkbox:indeterminate,
.uk-card-primary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,
.uk-card-secondary.uk-card-body .uk-checkbox:indeterminate,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-checkbox:indeterminate,
.uk-light .uk-checkbox:indeterminate,
.uk-overlay-primary .uk-checkbox:indeterminate,
.uk-section-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,
.uk-section-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate,
.uk-tile-primary:not(.uk-preserve-color) .uk-checkbox:indeterminate,
.uk-tile-secondary:not(.uk-preserve-color) .uk-checkbox:indeterminate {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22%23666%22%20x%3D%223%22%20y%3D%228%22%20width%3D%2210%22%20height%3D%221%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-form-label,
.uk-card-primary.uk-card-body .uk-form-label,
.uk-card-primary>:not([class*=uk-card-media]) .uk-form-label,
.uk-card-secondary.uk-card-body .uk-form-label,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-form-label,
.uk-light .uk-form-label,
.uk-overlay-primary .uk-form-label,
.uk-section-primary:not(.uk-preserve-color) .uk-form-label,
.uk-section-secondary:not(.uk-preserve-color) .uk-form-label,
.uk-tile-primary:not(.uk-preserve-color) .uk-form-label,
.uk-tile-secondary:not(.uk-preserve-color) .uk-form-label {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-form-icon,
.uk-card-primary.uk-card-body .uk-form-icon,
.uk-card-primary>:not([class*=uk-card-media]) .uk-form-icon,
.uk-card-secondary.uk-card-body .uk-form-icon,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-form-icon,
.uk-light .uk-form-icon,
.uk-overlay-primary .uk-form-icon,
.uk-section-primary:not(.uk-preserve-color) .uk-form-icon,
.uk-section-secondary:not(.uk-preserve-color) .uk-form-icon,
.uk-tile-primary:not(.uk-preserve-color) .uk-form-icon,
.uk-tile-secondary:not(.uk-preserve-color) .uk-form-icon {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-form-icon:hover,
.uk-card-primary.uk-card-body .uk-form-icon:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-form-icon:hover,
.uk-card-secondary.uk-card-body .uk-form-icon:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-form-icon:hover,
.uk-light .uk-form-icon:hover,
.uk-overlay-primary .uk-form-icon:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-form-icon:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-form-icon:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-form-icon:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-form-icon:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-default,
.uk-card-primary.uk-card-body .uk-button-default,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default,
.uk-card-secondary.uk-card-body .uk-button-default,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default,
.uk-light .uk-button-default,
.uk-overlay-primary .uk-button-default,
.uk-section-primary:not(.uk-preserve-color) .uk-button-default,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-default,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-default,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default {
    background-color: transparent;
    color: var(--text-negative-color);
    ;
    border-color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-default:hover,
.uk-card-primary.uk-card-body .uk-button-default:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default:hover,
.uk-card-secondary.uk-card-body .uk-button-default:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default:hover,
.uk-light .uk-button-default:hover,
.uk-overlay-primary .uk-button-default:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-button-default:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-default:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-default:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default:hover {
    background-color: transparent;
    color: var(--text-negative-color);
    ;
    border-color: var(--background-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-default.uk-active,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-default:active,
.uk-card-primary.uk-card-body .uk-button-default.uk-active,
.uk-card-primary.uk-card-body .uk-button-default:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default.uk-active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-default:active,
.uk-card-secondary.uk-card-body .uk-button-default.uk-active,
.uk-card-secondary.uk-card-body .uk-button-default:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default.uk-active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-default:active,
.uk-light .uk-button-default.uk-active,
.uk-light .uk-button-default:active,
.uk-overlay-primary .uk-button-default.uk-active,
.uk-overlay-primary .uk-button-default:active,
.uk-section-primary:not(.uk-preserve-color) .uk-button-default.uk-active,
.uk-section-primary:not(.uk-preserve-color) .uk-button-default:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-default.uk-active,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-default:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-default.uk-active,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-default:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default.uk-active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-default:active {
    background-color: transparent;
    color: var(--text-negative-color);
    ;
    border-color: var(--background-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-primary,
.uk-card-primary.uk-card-body .uk-button-primary,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary,
.uk-card-secondary.uk-card-body .uk-button-primary,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary,
.uk-light .uk-button-primary,
.uk-overlay-primary .uk-button-primary,
.uk-section-primary:not(.uk-preserve-color) .uk-button-primary,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary {
    background-color: var(--background-color);
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-primary:hover,
.uk-card-primary.uk-card-body .uk-button-primary:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary:hover,
.uk-card-secondary.uk-card-body .uk-button-primary:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary:hover,
.uk-light .uk-button-primary:hover,
.uk-overlay-primary .uk-button-primary:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-button-primary:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary:hover {
    background-color: #f2f2f2;
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-primary.uk-active,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-primary:active,
.uk-card-primary.uk-card-body .uk-button-primary.uk-active,
.uk-card-primary.uk-card-body .uk-button-primary:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary.uk-active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-primary:active,
.uk-card-secondary.uk-card-body .uk-button-primary.uk-active,
.uk-card-secondary.uk-card-body .uk-button-primary:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary.uk-active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-primary:active,
.uk-light .uk-button-primary.uk-active,
.uk-light .uk-button-primary:active,
.uk-overlay-primary .uk-button-primary.uk-active,
.uk-overlay-primary .uk-button-primary:active,
.uk-section-primary:not(.uk-preserve-color) .uk-button-primary.uk-active,
.uk-section-primary:not(.uk-preserve-color) .uk-button-primary:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary.uk-active,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-primary:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary.uk-active,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-primary:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary.uk-active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-primary:active {
    background-color: #e6e6e6;
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-secondary,
.uk-card-primary.uk-card-body .uk-button-secondary,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary,
.uk-card-secondary.uk-card-body .uk-button-secondary,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary,
.uk-light .uk-button-secondary,
.uk-overlay-primary .uk-button-secondary,
.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary {
    background-color: var(--background-color);
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-secondary:hover,
.uk-card-primary.uk-card-body .uk-button-secondary:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary:hover,
.uk-card-secondary.uk-card-body .uk-button-secondary:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary:hover,
.uk-light .uk-button-secondary:hover,
.uk-overlay-primary .uk-button-secondary:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary:hover {
    background-color: #f2f2f2;
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-secondary.uk-active,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-secondary:active,
.uk-card-primary.uk-card-body .uk-button-secondary.uk-active,
.uk-card-primary.uk-card-body .uk-button-secondary:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary.uk-active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-secondary:active,
.uk-card-secondary.uk-card-body .uk-button-secondary.uk-active,
.uk-card-secondary.uk-card-body .uk-button-secondary:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary.uk-active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-secondary:active,
.uk-light .uk-button-secondary.uk-active,
.uk-light .uk-button-secondary:active,
.uk-overlay-primary .uk-button-secondary.uk-active,
.uk-overlay-primary .uk-button-secondary:active,
.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary.uk-active,
.uk-section-primary:not(.uk-preserve-color) .uk-button-secondary:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary.uk-active,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-secondary:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary.uk-active,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-secondary:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary.uk-active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-secondary:active {
    background-color: #e6e6e6;
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-text,
.uk-card-primary.uk-card-body .uk-button-text,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text,
.uk-card-secondary.uk-card-body .uk-button-text,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text,
.uk-light .uk-button-text,
.uk-overlay-primary .uk-button-text,
.uk-section-primary:not(.uk-preserve-color) .uk-button-text,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-text,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-text,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-text::before,
.uk-card-primary.uk-card-body .uk-button-text::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text::before,
.uk-card-secondary.uk-card-body .uk-button-text::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text::before,
.uk-light .uk-button-text::before,
.uk-overlay-primary .uk-button-text::before,
.uk-section-primary:not(.uk-preserve-color) .uk-button-text::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-text::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-text::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text::before {
    border-bottom-color: var(--background-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-text:hover,
.uk-card-primary.uk-card-body .uk-button-text:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text:hover,
.uk-card-secondary.uk-card-body .uk-button-text:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text:hover,
.uk-light .uk-button-text:hover,
.uk-overlay-primary .uk-button-text:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-button-text:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-text:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-text:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text:hover {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-text:disabled,
.uk-card-primary.uk-card-body .uk-button-text:disabled,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-text:disabled,
.uk-card-secondary.uk-card-body .uk-button-text:disabled,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-text:disabled,
.uk-light .uk-button-text:disabled,
.uk-overlay-primary .uk-button-text:disabled,
.uk-section-primary:not(.uk-preserve-color) .uk-button-text:disabled,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-text:disabled,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-text:disabled,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-text:disabled {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-link,
.uk-card-primary.uk-card-body .uk-button-link,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-link,
.uk-card-secondary.uk-card-body .uk-button-link,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-link,
.uk-light .uk-button-link,
.uk-overlay-primary .uk-button-link,
.uk-section-primary:not(.uk-preserve-color) .uk-button-link,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-link,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-link,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-link {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-button-link:hover,
.uk-card-primary.uk-card-body .uk-button-link:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-button-link:hover,
.uk-card-secondary.uk-card-body .uk-button-link:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-button-link:hover,
.uk-light .uk-button-link:hover,
.uk-overlay-primary .uk-button-link:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-button-link:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-button-link:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-button-link:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-button-link:hover {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent).uk-card-badge,
.uk-card-primary.uk-card-body.uk-card-badge,
.uk-card-primary>:not([class*=uk-card-media]).uk-card-badge,
.uk-card-secondary.uk-card-body.uk-card-badge,
.uk-card-secondary>:not([class*=uk-card-media]).uk-card-badge,
.uk-light.uk-card-badge,
.uk-overlay-primary.uk-card-badge,
.uk-section-primary:not(.uk-preserve-color).uk-card-badge,
.uk-section-secondary:not(.uk-preserve-color).uk-card-badge,
.uk-tile-primary:not(.uk-preserve-color).uk-card-badge,
.uk-tile-secondary:not(.uk-preserve-color).uk-card-badge {
    background-color: var(--background-color);
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-close,
.uk-card-primary.uk-card-body .uk-close,
.uk-card-primary>:not([class*=uk-card-media]) .uk-close,
.uk-card-secondary.uk-card-body .uk-close,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-close,
.uk-light .uk-close,
.uk-overlay-primary .uk-close,
.uk-section-primary:not(.uk-preserve-color) .uk-close,
.uk-section-secondary:not(.uk-preserve-color) .uk-close,
.uk-tile-primary:not(.uk-preserve-color) .uk-close,
.uk-tile-secondary:not(.uk-preserve-color) .uk-close {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-close:hover,
.uk-card-primary.uk-card-body .uk-close:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-close:hover,
.uk-card-secondary.uk-card-body .uk-close:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-close:hover,
.uk-light .uk-close:hover,
.uk-overlay-primary .uk-close:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-close:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-close:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-close:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-close:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-totop,
.uk-card-primary.uk-card-body .uk-totop,
.uk-card-primary>:not([class*=uk-card-media]) .uk-totop,
.uk-card-secondary.uk-card-body .uk-totop,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-totop,
.uk-light .uk-totop,
.uk-overlay-primary .uk-totop,
.uk-section-primary:not(.uk-preserve-color) .uk-totop,
.uk-section-secondary:not(.uk-preserve-color) .uk-totop,
.uk-tile-primary:not(.uk-preserve-color) .uk-totop,
.uk-tile-secondary:not(.uk-preserve-color) .uk-totop {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-totop:hover,
.uk-card-primary.uk-card-body .uk-totop:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-totop:hover,
.uk-card-secondary.uk-card-body .uk-totop:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-totop:hover,
.uk-light .uk-totop:hover,
.uk-overlay-primary .uk-totop:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-totop:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-totop:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-totop:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-totop:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-totop:active,
.uk-card-primary.uk-card-body .uk-totop:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-totop:active,
.uk-card-secondary.uk-card-body .uk-totop:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-totop:active,
.uk-light .uk-totop:active,
.uk-overlay-primary .uk-totop:active,
.uk-section-primary:not(.uk-preserve-color) .uk-totop:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-totop:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-totop:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-totop:active {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-marker,
.uk-card-primary.uk-card-body .uk-marker,
.uk-card-primary>:not([class*=uk-card-media]) .uk-marker,
.uk-card-secondary.uk-card-body .uk-marker,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-marker,
.uk-light .uk-marker,
.uk-overlay-primary .uk-marker,
.uk-section-primary:not(.uk-preserve-color) .uk-marker,
.uk-section-secondary:not(.uk-preserve-color) .uk-marker,
.uk-tile-primary:not(.uk-preserve-color) .uk-marker,
.uk-tile-secondary:not(.uk-preserve-color) .uk-marker {
    background: #f8f8f8;
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-marker:hover,
.uk-card-primary.uk-card-body .uk-marker:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-marker:hover,
.uk-card-secondary.uk-card-body .uk-marker:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-marker:hover,
.uk-light .uk-marker:hover,
.uk-overlay-primary .uk-marker:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-marker:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-marker:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-marker:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-marker:hover {
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-badge,
.uk-card-primary.uk-card-body .uk-badge,
.uk-card-primary>:not([class*=uk-card-media]) .uk-badge,
.uk-card-secondary.uk-card-body .uk-badge,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-badge,
.uk-light .uk-badge,
.uk-overlay-primary .uk-badge,
.uk-section-primary:not(.uk-preserve-color) .uk-badge,
.uk-section-secondary:not(.uk-preserve-color) .uk-badge,
.uk-tile-primary:not(.uk-preserve-color) .uk-badge,
.uk-tile-secondary:not(.uk-preserve-color) .uk-badge {
    background-color: var(--background-color);
    color: var(--text-secondary-color) !important
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-label,
.uk-card-primary.uk-card-body .uk-label,
.uk-card-primary>:not([class*=uk-card-media]) .uk-label,
.uk-card-secondary.uk-card-body .uk-label,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-label,
.uk-light .uk-label,
.uk-overlay-primary .uk-label,
.uk-section-primary:not(.uk-preserve-color) .uk-label,
.uk-section-secondary:not(.uk-preserve-color) .uk-label,
.uk-tile-primary:not(.uk-preserve-color) .uk-label,
.uk-tile-secondary:not(.uk-preserve-color) .uk-label {
    background-color: var(--background-color);
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-article-meta,
.uk-card-primary.uk-card-body .uk-article-meta,
.uk-card-primary>:not([class*=uk-card-media]) .uk-article-meta,
.uk-card-secondary.uk-card-body .uk-article-meta,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-article-meta,
.uk-light .uk-article-meta,
.uk-overlay-primary .uk-article-meta,
.uk-section-primary:not(.uk-preserve-color) .uk-article-meta,
.uk-section-secondary:not(.uk-preserve-color) .uk-article-meta,
.uk-tile-primary:not(.uk-preserve-color) .uk-article-meta,
.uk-tile-secondary:not(.uk-preserve-color) .uk-article-meta {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-input,
.uk-card-primary.uk-card-body .uk-search-input,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-input,
.uk-card-secondary.uk-card-body .uk-search-input,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-input,
.uk-light .uk-search-input,
.uk-overlay-primary .uk-search-input,
.uk-section-primary:not(.uk-preserve-color) .uk-search-input,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-input,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-input,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-input {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-input::placeholder,
.uk-card-primary.uk-card-body .uk-search-input::placeholder,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-input::placeholder,
.uk-card-secondary.uk-card-body .uk-search-input::placeholder,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-input::placeholder,
.uk-light .uk-search-input::placeholder,
.uk-overlay-primary .uk-search-input::placeholder,
.uk-section-primary:not(.uk-preserve-color) .uk-search-input::placeholder,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-input::placeholder,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-input::placeholder,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-input::placeholder {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search .uk-search-icon,
.uk-card-primary.uk-card-body .uk-search .uk-search-icon,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search .uk-search-icon,
.uk-card-secondary.uk-card-body .uk-search .uk-search-icon,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search .uk-search-icon,
.uk-light .uk-search .uk-search-icon,
.uk-overlay-primary .uk-search .uk-search-icon,
.uk-section-primary:not(.uk-preserve-color) .uk-search .uk-search-icon,
.uk-section-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon,
.uk-tile-primary:not(.uk-preserve-color) .uk-search .uk-search-icon,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search .uk-search-icon:hover,
.uk-card-primary.uk-card-body .uk-search .uk-search-icon:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search .uk-search-icon:hover,
.uk-card-secondary.uk-card-body .uk-search .uk-search-icon:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search .uk-search-icon:hover,
.uk-light .uk-search .uk-search-icon:hover,
.uk-overlay-primary .uk-search .uk-search-icon:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search .uk-search-icon:hover {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-default .uk-search-input,
.uk-card-primary.uk-card-body .uk-search-default .uk-search-input,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input,
.uk-card-secondary.uk-card-body .uk-search-default .uk-search-input,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input,
.uk-light .uk-search-default .uk-search-input,
.uk-overlay-primary .uk-search-default .uk-search-input,
.uk-section-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input {
    background-color: transparent;
    border-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-default .uk-search-input:focus,
.uk-card-primary.uk-card-body .uk-search-default .uk-search-input:focus,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input:focus,
.uk-card-secondary.uk-card-body .uk-search-default .uk-search-input:focus,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-default .uk-search-input:focus,
.uk-light .uk-search-default .uk-search-input:focus,
.uk-overlay-primary .uk-search-default .uk-search-input:focus,
.uk-section-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-default .uk-search-input:focus {
    background-color: rgba(0, 0, 0, .05)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-navbar .uk-search-input,
.uk-card-primary.uk-card-body .uk-search-navbar .uk-search-input,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-navbar .uk-search-input,
.uk-card-secondary.uk-card-body .uk-search-navbar .uk-search-input,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-navbar .uk-search-input,
.uk-light .uk-search-navbar .uk-search-input,
.uk-overlay-primary .uk-search-navbar .uk-search-input,
.uk-section-primary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-navbar .uk-search-input {
    background-color: transparent
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-large .uk-search-input,
.uk-card-primary.uk-card-body .uk-search-large .uk-search-input,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-large .uk-search-input,
.uk-card-secondary.uk-card-body .uk-search-large .uk-search-input,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-large .uk-search-input,
.uk-light .uk-search-large .uk-search-input,
.uk-overlay-primary .uk-search-large .uk-search-input,
.uk-section-primary:not(.uk-preserve-color) .uk-search-large .uk-search-input,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-large .uk-search-input,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-large .uk-search-input,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-large .uk-search-input {
    background-color: transparent
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-toggle,
.uk-card-primary.uk-card-body .uk-search-toggle,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-toggle,
.uk-card-secondary.uk-card-body .uk-search-toggle,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-toggle,
.uk-light .uk-search-toggle,
.uk-overlay-primary .uk-search-toggle,
.uk-section-primary:not(.uk-preserve-color) .uk-search-toggle,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-toggle,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-toggle,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-toggle {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-search-toggle:hover,
.uk-card-primary.uk-card-body .uk-search-toggle:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-search-toggle:hover,
.uk-card-secondary.uk-card-body .uk-search-toggle:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-search-toggle:hover,
.uk-light .uk-search-toggle:hover,
.uk-overlay-primary .uk-search-toggle:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-search-toggle:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-search-toggle:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-search-toggle:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-search-toggle:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-accordion-title,
.uk-card-primary.uk-card-body .uk-accordion-title,
.uk-card-primary>:not([class*=uk-card-media]) .uk-accordion-title,
.uk-card-secondary.uk-card-body .uk-accordion-title,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-accordion-title,
.uk-light .uk-accordion-title,
.uk-overlay-primary .uk-accordion-title,
.uk-section-primary:not(.uk-preserve-color) .uk-accordion-title,
.uk-section-secondary:not(.uk-preserve-color) .uk-accordion-title,
.uk-tile-primary:not(.uk-preserve-color) .uk-accordion-title,
.uk-tile-secondary:not(.uk-preserve-color) .uk-accordion-title {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-accordion-title:hover,
.uk-card-primary.uk-card-body .uk-accordion-title:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-accordion-title:hover,
.uk-card-secondary.uk-card-body .uk-accordion-title:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-accordion-title:hover,
.uk-light .uk-accordion-title:hover,
.uk-overlay-primary .uk-accordion-title:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-accordion-title:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-accordion-title:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-accordion-title:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-accordion-title:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-grid-divider>:not(.uk-first-column)::before,
.uk-card-primary.uk-card-body .uk-grid-divider>:not(.uk-first-column)::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-grid-divider>:not(.uk-first-column)::before,
.uk-card-secondary.uk-card-body .uk-grid-divider>:not(.uk-first-column)::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-grid-divider>:not(.uk-first-column)::before,
.uk-light .uk-grid-divider>:not(.uk-first-column)::before,
.uk-overlay-primary .uk-grid-divider>:not(.uk-first-column)::before,
.uk-section-primary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-grid-divider>:not(.uk-first-column)::before {
    border-left-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-card-primary.uk-card-body .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-card-secondary.uk-card-body .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-light .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-overlay-primary .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-section-primary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-grid-divider.uk-grid-stack>.uk-grid-margin::before {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-parent-icon>.uk-parent>a::after,
.uk-card-primary.uk-card-body .uk-nav-parent-icon>.uk-parent>a::after,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent>a::after,
.uk-card-secondary.uk-card-body .uk-nav-parent-icon>.uk-parent>a::after,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent>a::after,
.uk-light .uk-nav-parent-icon>.uk-parent>a::after,
.uk-overlay-primary .uk-nav-parent-icon>.uk-parent>a::after,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent>a::after {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20stroke-width%3D%221.1%22%20points%3D%2210%201%204%207%2010%2013%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-card-primary.uk-card-body .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-card-secondary.uk-card-body .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-light .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-overlay-primary .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-parent-icon>.uk-parent.uk-open>a::after {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20stroke-width%3D%221.1%22%20points%3D%221%204%207%2010%2013%204%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default>li>a,
.uk-card-primary.uk-card-body .uk-nav-default>li>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default>li>a,
.uk-card-secondary.uk-card-body .uk-nav-default>li>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default>li>a,
.uk-light .uk-nav-default>li>a,
.uk-overlay-primary .uk-nav-default>li>a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default>li>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default>li>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default>li>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default>li>a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default>li>a:hover,
.uk-card-primary.uk-card-body .uk-nav-default>li>a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default>li>a:hover,
.uk-card-secondary.uk-card-body .uk-nav-default>li>a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default>li>a:hover,
.uk-light .uk-nav-default>li>a:hover,
.uk-overlay-primary .uk-nav-default>li>a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default>li>a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default>li>a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default>li>a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default>li>a:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default>li.uk-active>a,
.uk-card-primary.uk-card-body .uk-nav-default>li.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default>li.uk-active>a,
.uk-card-secondary.uk-card-body .uk-nav-default>li.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default>li.uk-active>a,
.uk-light .uk-nav-default>li.uk-active>a,
.uk-overlay-primary .uk-nav-default>li.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default>li.uk-active>a {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default .uk-nav-header,
.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-header,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-header,
.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-header,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-header,
.uk-light .uk-nav-default .uk-nav-header,
.uk-overlay-primary .uk-nav-default .uk-nav-header,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-header {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default .uk-nav-divider,
.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-divider,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-divider,
.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-divider,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-divider,
.uk-light .uk-nav-default .uk-nav-divider,
.uk-overlay-primary .uk-nav-default .uk-nav-divider,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-divider {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default .uk-nav-sub a,
.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-sub a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a,
.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-sub a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a,
.uk-light .uk-nav-default .uk-nav-sub a,
.uk-overlay-primary .uk-nav-default .uk-nav-sub a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default .uk-nav-sub a:hover,
.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-sub a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a:hover,
.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-sub a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub a:hover,
.uk-light .uk-nav-default .uk-nav-sub a:hover,
.uk-overlay-primary .uk-nav-default .uk-nav-sub a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub a:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-card-primary.uk-card-body .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-card-secondary.uk-card-body .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-light .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-overlay-primary .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub li.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-default .uk-nav-sub li.uk-active>a {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary>li>a,
.uk-card-primary.uk-card-body .uk-nav-primary>li>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary>li>a,
.uk-card-secondary.uk-card-body .uk-nav-primary>li>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary>li>a,
.uk-light .uk-nav-primary>li>a,
.uk-overlay-primary .uk-nav-primary>li>a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary>li>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary>li>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary>li>a:hover,
.uk-card-primary.uk-card-body .uk-nav-primary>li>a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary>li>a:hover,
.uk-card-secondary.uk-card-body .uk-nav-primary>li>a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary>li>a:hover,
.uk-light .uk-nav-primary>li>a:hover,
.uk-overlay-primary .uk-nav-primary>li>a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary>li>a:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary>li.uk-active>a,
.uk-card-primary.uk-card-body .uk-nav-primary>li.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary>li.uk-active>a,
.uk-card-secondary.uk-card-body .uk-nav-primary>li.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary>li.uk-active>a,
.uk-light .uk-nav-primary>li.uk-active>a,
.uk-overlay-primary .uk-nav-primary>li.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary>li.uk-active>a {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary .uk-nav-header,
.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-header,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-header,
.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-header,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-header,
.uk-light .uk-nav-primary .uk-nav-header,
.uk-overlay-primary .uk-nav-primary .uk-nav-header,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-header {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary .uk-nav-divider,
.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-divider,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-divider,
.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-divider,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-divider,
.uk-light .uk-nav-primary .uk-nav-divider,
.uk-overlay-primary .uk-nav-primary .uk-nav-divider,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-divider {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary .uk-nav-sub a,
.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-sub a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a,
.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-sub a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a,
.uk-light .uk-nav-primary .uk-nav-sub a,
.uk-overlay-primary .uk-nav-primary .uk-nav-sub a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary .uk-nav-sub a:hover,
.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-sub a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a:hover,
.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-sub a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub a:hover,
.uk-light .uk-nav-primary .uk-nav-sub a:hover,
.uk-overlay-primary .uk-nav-primary .uk-nav-sub a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub a:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-card-primary.uk-card-body .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-card-secondary.uk-card-body .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-light .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-overlay-primary .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub li.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav-primary .uk-nav-sub li.uk-active>a {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-card-primary.uk-card-body .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-card-primary>:not([class*=uk-card-media]) .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-card-secondary.uk-card-body .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-light .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-overlay-primary .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-section-primary:not(.uk-preserve-color) .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-section-secondary:not(.uk-preserve-color) .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-tile-primary:not(.uk-preserve-color) .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider),
.uk-tile-secondary:not(.uk-preserve-color) .uk-nav.uk-nav-divider>:not(.uk-nav-divider)+:not(.uk-nav-header, .uk-nav-divider) {
    border-top-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-nav>li>a,
.uk-card-primary.uk-card-body .uk-navbar-nav>li>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a,
.uk-card-secondary.uk-card-body .uk-navbar-nav>li>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a,
.uk-light .uk-navbar-nav>li>a,
.uk-overlay-primary .uk-navbar-nav>li>a,
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-nav>li:hover>a,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-nav>li>a[aria-expanded=true],
.uk-card-primary.uk-card-body .uk-navbar-nav>li:hover>a,
.uk-card-primary.uk-card-body .uk-navbar-nav>li>a[aria-expanded=true],
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li:hover>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a[aria-expanded=true],
.uk-card-secondary.uk-card-body .uk-navbar-nav>li:hover>a,
.uk-card-secondary.uk-card-body .uk-navbar-nav>li>a[aria-expanded=true],
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li:hover>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a[aria-expanded=true],
.uk-light .uk-navbar-nav>li:hover>a,
.uk-light .uk-navbar-nav>li>a[aria-expanded=true],
.uk-overlay-primary .uk-navbar-nav>li:hover>a,
.uk-overlay-primary .uk-navbar-nav>li>a[aria-expanded=true],
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a[aria-expanded=true],
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a[aria-expanded=true],
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a[aria-expanded=true],
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li:hover>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a[aria-expanded=true] {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-nav>li>a:active,
.uk-card-primary.uk-card-body .uk-navbar-nav>li>a:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a:active,
.uk-card-secondary.uk-card-body .uk-navbar-nav>li>a:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li>a:active,
.uk-light .uk-navbar-nav>li>a:active,
.uk-overlay-primary .uk-navbar-nav>li>a:active,
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li>a:active {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-nav>li.uk-active>a,
.uk-card-primary.uk-card-body .uk-navbar-nav>li.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-nav>li.uk-active>a,
.uk-card-secondary.uk-card-body .uk-navbar-nav>li.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-nav>li.uk-active>a,
.uk-light .uk-navbar-nav>li.uk-active>a,
.uk-overlay-primary .uk-navbar-nav>li.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-nav>li.uk-active>a {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-item,
.uk-card-primary.uk-card-body .uk-navbar-item,
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-item,
.uk-card-secondary.uk-card-body .uk-navbar-item,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-item,
.uk-light .uk-navbar-item,
.uk-overlay-primary .uk-navbar-item,
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-item,
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-item,
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-item,
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-item {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-toggle,
.uk-card-primary.uk-card-body .uk-navbar-toggle,
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-toggle,
.uk-card-secondary.uk-card-body .uk-navbar-toggle,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-toggle,
.uk-light .uk-navbar-toggle,
.uk-overlay-primary .uk-navbar-toggle,
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-toggle,
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-toggle,
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-toggle,
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-toggle {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-toggle:hover,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-navbar-toggle[aria-expanded=true],
.uk-card-primary.uk-card-body .uk-navbar-toggle:hover,
.uk-card-primary.uk-card-body .uk-navbar-toggle[aria-expanded=true],
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-toggle:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-navbar-toggle[aria-expanded=true],
.uk-card-secondary.uk-card-body .uk-navbar-toggle:hover,
.uk-card-secondary.uk-card-body .uk-navbar-toggle[aria-expanded=true],
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-toggle:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-navbar-toggle[aria-expanded=true],
.uk-light .uk-navbar-toggle:hover,
.uk-light .uk-navbar-toggle[aria-expanded=true],
.uk-overlay-primary .uk-navbar-toggle:hover,
.uk-overlay-primary .uk-navbar-toggle[aria-expanded=true],
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-toggle:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-navbar-toggle[aria-expanded=true],
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-toggle:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-navbar-toggle[aria-expanded=true],
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-toggle:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-navbar-toggle[aria-expanded=true],
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-toggle:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-navbar-toggle[aria-expanded=true] {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav>*>:first-child,
.uk-card-primary.uk-card-body .uk-subnav>*>:first-child,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>*>:first-child,
.uk-card-secondary.uk-card-body .uk-subnav>*>:first-child,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>*>:first-child,
.uk-light .uk-subnav>*>:first-child,
.uk-overlay-primary .uk-subnav>*>:first-child,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav>*>:first-child,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>*>:first-child,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>*>:first-child,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>*>:first-child {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav>*>a:hover,
.uk-card-primary.uk-card-body .uk-subnav>*>a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>*>a:hover,
.uk-card-secondary.uk-card-body .uk-subnav>*>a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>*>a:hover,
.uk-light .uk-subnav>*>a:hover,
.uk-overlay-primary .uk-subnav>*>a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav>*>a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>*>a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>*>a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>*>a:hover {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav>.uk-active>a,
.uk-card-primary.uk-card-body .uk-subnav>.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>.uk-active>a,
.uk-card-secondary.uk-card-body .uk-subnav>.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>.uk-active>a,
.uk-light .uk-subnav>.uk-active>a,
.uk-overlay-primary .uk-subnav>.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav>.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>.uk-active>a {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-primary.uk-card-body .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-secondary.uk-card-body .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-light .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-overlay-primary .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-divider>:nth-child(n+2):not(.uk-first-column)::before {
    border-left-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav-pill>*>:first-child,
.uk-card-primary.uk-card-body .uk-subnav-pill>*>:first-child,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>*>:first-child,
.uk-card-secondary.uk-card-body .uk-subnav-pill>*>:first-child,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>*>:first-child,
.uk-light .uk-subnav-pill>*>:first-child,
.uk-overlay-primary .uk-subnav-pill>*>:first-child,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>:first-child {
    background-color: transparent;
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav-pill>*>a:hover,
.uk-card-primary.uk-card-body .uk-subnav-pill>*>a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:hover,
.uk-card-secondary.uk-card-body .uk-subnav-pill>*>a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:hover,
.uk-light .uk-subnav-pill>*>a:hover,
.uk-overlay-primary .uk-subnav-pill>*>a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:hover {
    background-color: rgba(255, 255, 255, .1);
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav-pill>*>a:active,
.uk-card-primary.uk-card-body .uk-subnav-pill>*>a:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:active,
.uk-card-secondary.uk-card-body .uk-subnav-pill>*>a:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>*>a:active,
.uk-light .uk-subnav-pill>*>a:active,
.uk-overlay-primary .uk-subnav-pill>*>a:active,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>*>a:active {
    background-color: rgba(255, 255, 255, .1);
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav-pill>.uk-active>a,
.uk-card-primary.uk-card-body .uk-subnav-pill>.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav-pill>.uk-active>a,
.uk-card-secondary.uk-card-body .uk-subnav-pill>.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav-pill>.uk-active>a,
.uk-light .uk-subnav-pill>.uk-active>a,
.uk-overlay-primary .uk-subnav-pill>.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav-pill>.uk-active>a {
    background-color: var(--background-color);
    color: var(--text-secondary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-subnav>.uk-disabled>a,
.uk-card-primary.uk-card-body .uk-subnav>.uk-disabled>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-subnav>.uk-disabled>a,
.uk-card-secondary.uk-card-body .uk-subnav>.uk-disabled>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-subnav>.uk-disabled>a,
.uk-light .uk-subnav>.uk-disabled>a,
.uk-overlay-primary .uk-subnav>.uk-disabled>a,
.uk-section-primary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-subnav>.uk-disabled>a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-breadcrumb>*>*,
.uk-card-primary.uk-card-body .uk-breadcrumb>*>*,
.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>*>*,
.uk-card-secondary.uk-card-body .uk-breadcrumb>*>*,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>*>*,
.uk-light .uk-breadcrumb>*>*,
.uk-overlay-primary .uk-breadcrumb>*>*,
.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>*>*,
.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>*,
.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>*>*,
.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>* {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-breadcrumb>*>:hover,
.uk-card-primary.uk-card-body .uk-breadcrumb>*>:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>*>:hover,
.uk-card-secondary.uk-card-body .uk-breadcrumb>*>:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>*>:hover,
.uk-light .uk-breadcrumb>*>:hover,
.uk-overlay-primary .uk-breadcrumb>*>:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>*>:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-breadcrumb>:last-child>*,
.uk-card-primary.uk-card-body .uk-breadcrumb>:last-child>*,
.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>:last-child>*,
.uk-card-secondary.uk-card-body .uk-breadcrumb>:last-child>*,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>:last-child>*,
.uk-light .uk-breadcrumb>:last-child>*,
.uk-overlay-primary .uk-breadcrumb>:last-child>*,
.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>*,
.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>*,
.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>*,
.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>:last-child>* {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-primary.uk-card-body .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-secondary.uk-card-body .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-light .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-overlay-primary .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-section-primary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-pagination>*>*,
.uk-card-primary.uk-card-body .uk-pagination>*>*,
.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>*>*,
.uk-card-secondary.uk-card-body .uk-pagination>*>*,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>*>*,
.uk-light .uk-pagination>*>*,
.uk-overlay-primary .uk-pagination>*>*,
.uk-section-primary:not(.uk-preserve-color) .uk-pagination>*>*,
.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>*>*,
.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>*>*,
.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>*>* {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-pagination>*>:hover,
.uk-card-primary.uk-card-body .uk-pagination>*>:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>*>:hover,
.uk-card-secondary.uk-card-body .uk-pagination>*>:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>*>:hover,
.uk-light .uk-pagination>*>:hover,
.uk-overlay-primary .uk-pagination>*>:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-pagination>*>:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>*>:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>*>:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>*>:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-pagination>.uk-active>*,
.uk-card-primary.uk-card-body .uk-pagination>.uk-active>*,
.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>.uk-active>*,
.uk-card-secondary.uk-card-body .uk-pagination>.uk-active>*,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>.uk-active>*,
.uk-light .uk-pagination>.uk-active>*,
.uk-overlay-primary .uk-pagination>.uk-active>*,
.uk-section-primary:not(.uk-preserve-color) .uk-pagination>.uk-active>*,
.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>.uk-active>*,
.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>.uk-active>*,
.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>.uk-active>* {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-pagination>.uk-disabled>*,
.uk-card-primary.uk-card-body .uk-pagination>.uk-disabled>*,
.uk-card-primary>:not([class*=uk-card-media]) .uk-pagination>.uk-disabled>*,
.uk-card-secondary.uk-card-body .uk-pagination>.uk-disabled>*,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-pagination>.uk-disabled>*,
.uk-light .uk-pagination>.uk-disabled>*,
.uk-overlay-primary .uk-pagination>.uk-disabled>*,
.uk-section-primary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>*,
.uk-section-secondary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>*,
.uk-tile-primary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>*,
.uk-tile-secondary:not(.uk-preserve-color) .uk-pagination>.uk-disabled>* {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-tab::before,
.uk-card-primary.uk-card-body .uk-tab::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-tab::before,
.uk-card-secondary.uk-card-body .uk-tab::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab::before,
.uk-light .uk-tab::before,
.uk-overlay-primary .uk-tab::before,
.uk-section-primary:not(.uk-preserve-color) .uk-tab::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-tab::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-tab::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-tab::before {
    border-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-tab>*>a,
.uk-card-primary.uk-card-body .uk-tab>*>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>*>a,
.uk-card-secondary.uk-card-body .uk-tab>*>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>*>a,
.uk-light .uk-tab>*>a,
.uk-overlay-primary .uk-tab>*>a,
.uk-section-primary:not(.uk-preserve-color) .uk-tab>*>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-tab>*>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-tab>*>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>*>a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-tab>*>a:hover,
.uk-card-primary.uk-card-body .uk-tab>*>a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>*>a:hover,
.uk-card-secondary.uk-card-body .uk-tab>*>a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>*>a:hover,
.uk-light .uk-tab>*>a:hover,
.uk-overlay-primary .uk-tab>*>a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-tab>*>a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-tab>*>a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-tab>*>a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>*>a:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-tab>.uk-active>a,
.uk-card-primary.uk-card-body .uk-tab>.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>.uk-active>a,
.uk-card-secondary.uk-card-body .uk-tab>.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>.uk-active>a,
.uk-light .uk-tab>.uk-active>a,
.uk-overlay-primary .uk-tab>.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-tab>.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-tab>.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-tab>.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>.uk-active>a {
    color: var(--text-negative-color);
    ;
    border-color: var(--background-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-tab>.uk-disabled>a,
.uk-card-primary.uk-card-body .uk-tab>.uk-disabled>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-tab>.uk-disabled>a,
.uk-card-secondary.uk-card-body .uk-tab>.uk-disabled>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-tab>.uk-disabled>a,
.uk-light .uk-tab>.uk-disabled>a,
.uk-overlay-primary .uk-tab>.uk-disabled>a,
.uk-section-primary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-tab>.uk-disabled>a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-slidenav,
.uk-card-primary.uk-card-body .uk-slidenav,
.uk-card-primary>:not([class*=uk-card-media]) .uk-slidenav,
.uk-card-secondary.uk-card-body .uk-slidenav,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-slidenav,
.uk-light .uk-slidenav,
.uk-overlay-primary .uk-slidenav,
.uk-section-primary:not(.uk-preserve-color) .uk-slidenav,
.uk-section-secondary:not(.uk-preserve-color) .uk-slidenav,
.uk-tile-primary:not(.uk-preserve-color) .uk-slidenav,
.uk-tile-secondary:not(.uk-preserve-color) .uk-slidenav {
    color: rgba(255, 255, 255, .7)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-slidenav:hover,
.uk-card-primary.uk-card-body .uk-slidenav:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-slidenav:hover,
.uk-card-secondary.uk-card-body .uk-slidenav:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-slidenav:hover,
.uk-light .uk-slidenav:hover,
.uk-overlay-primary .uk-slidenav:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-slidenav:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-slidenav:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-slidenav:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-slidenav:hover {
    color: rgba(255, 255, 255, .95)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-slidenav:active,
.uk-card-primary.uk-card-body .uk-slidenav:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-slidenav:active,
.uk-card-secondary.uk-card-body .uk-slidenav:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-slidenav:active,
.uk-light .uk-slidenav:active,
.uk-overlay-primary .uk-slidenav:active,
.uk-section-primary:not(.uk-preserve-color) .uk-slidenav:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-slidenav:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-slidenav:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-slidenav:active {
    color: rgba(255, 255, 255, .7)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-dotnav>*>*,
.uk-card-primary.uk-card-body .uk-dotnav>*>*,
.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>*>*,
.uk-card-secondary.uk-card-body .uk-dotnav>*>*,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>*>*,
.uk-light .uk-dotnav>*>*,
.uk-overlay-primary .uk-dotnav>*>*,
.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>*>*,
.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>*>*,
.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>*>*,
.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>*>* {
    background-color: transparent;
    border-color: rgba(255, 255, 255, .9)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-dotnav>*>:hover,
.uk-card-primary.uk-card-body .uk-dotnav>*>:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>*>:hover,
.uk-card-secondary.uk-card-body .uk-dotnav>*>:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>*>:hover,
.uk-light .uk-dotnav>*>:hover,
.uk-overlay-primary .uk-dotnav>*>:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>*>:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>*>:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>*>:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>*>:hover {
    background-color: rgba(255, 255, 255, .9);
    border-color: transparent
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-dotnav>*>:active,
.uk-card-primary.uk-card-body .uk-dotnav>*>:active,
.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>*>:active,
.uk-card-secondary.uk-card-body .uk-dotnav>*>:active,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>*>:active,
.uk-light .uk-dotnav>*>:active,
.uk-overlay-primary .uk-dotnav>*>:active,
.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>*>:active,
.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>*>:active,
.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>*>:active,
.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>*>:active {
    background-color: rgba(255, 255, 255, .5);
    border-color: transparent
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-dotnav>.uk-active>*,
.uk-card-primary.uk-card-body .uk-dotnav>.uk-active>*,
.uk-card-primary>:not([class*=uk-card-media]) .uk-dotnav>.uk-active>*,
.uk-card-secondary.uk-card-body .uk-dotnav>.uk-active>*,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-dotnav>.uk-active>*,
.uk-light .uk-dotnav>.uk-active>*,
.uk-overlay-primary .uk-dotnav>.uk-active>*,
.uk-section-primary:not(.uk-preserve-color) .uk-dotnav>.uk-active>*,
.uk-section-secondary:not(.uk-preserve-color) .uk-dotnav>.uk-active>*,
.uk-tile-primary:not(.uk-preserve-color) .uk-dotnav>.uk-active>*,
.uk-tile-secondary:not(.uk-preserve-color) .uk-dotnav>.uk-active>* {
    background-color: rgba(255, 255, 255, .9);
    border-color: transparent
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-iconnav>*>a,
.uk-card-primary.uk-card-body .uk-iconnav>*>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-iconnav>*>a,
.uk-card-secondary.uk-card-body .uk-iconnav>*>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-iconnav>*>a,
.uk-light .uk-iconnav>*>a,
.uk-overlay-primary .uk-iconnav>*>a,
.uk-section-primary:not(.uk-preserve-color) .uk-iconnav>*>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-iconnav>*>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-iconnav>*>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-iconnav>*>a {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-iconnav>*>a:hover,
.uk-card-primary.uk-card-body .uk-iconnav>*>a:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-iconnav>*>a:hover,
.uk-card-secondary.uk-card-body .uk-iconnav>*>a:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-iconnav>*>a:hover,
.uk-light .uk-iconnav>*>a:hover,
.uk-overlay-primary .uk-iconnav>*>a:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-iconnav>*>a:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-iconnav>*>a:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-iconnav>*>a:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-iconnav>*>a:hover {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-iconnav>.uk-active>a,
.uk-card-primary.uk-card-body .uk-iconnav>.uk-active>a,
.uk-card-primary>:not([class*=uk-card-media]) .uk-iconnav>.uk-active>a,
.uk-card-secondary.uk-card-body .uk-iconnav>.uk-active>a,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-iconnav>.uk-active>a,
.uk-light .uk-iconnav>.uk-active>a,
.uk-overlay-primary .uk-iconnav>.uk-active>a,
.uk-section-primary:not(.uk-preserve-color) .uk-iconnav>.uk-active>a,
.uk-section-secondary:not(.uk-preserve-color) .uk-iconnav>.uk-active>a,
.uk-tile-primary:not(.uk-preserve-color) .uk-iconnav>.uk-active>a,
.uk-tile-secondary:not(.uk-preserve-color) .uk-iconnav>.uk-active>a {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-text-lead,
.uk-card-primary.uk-card-body .uk-text-lead,
.uk-card-primary>:not([class*=uk-card-media]) .uk-text-lead,
.uk-card-secondary.uk-card-body .uk-text-lead,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-lead,
.uk-light .uk-text-lead,
.uk-overlay-primary .uk-text-lead,
.uk-section-primary:not(.uk-preserve-color) .uk-text-lead,
.uk-section-secondary:not(.uk-preserve-color) .uk-text-lead,
.uk-tile-primary:not(.uk-preserve-color) .uk-text-lead,
.uk-tile-secondary:not(.uk-preserve-color) .uk-text-lead {
    color: rgba(255, 255, 255, .8)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-text-meta,
.uk-card-primary.uk-card-body .uk-text-meta,
.uk-card-primary>:not([class*=uk-card-media]) .uk-text-meta,
.uk-card-secondary.uk-card-body .uk-text-meta,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-meta,
.uk-light .uk-text-meta,
.uk-overlay-primary .uk-text-meta,
.uk-section-primary:not(.uk-preserve-color) .uk-text-meta,
.uk-section-secondary:not(.uk-preserve-color) .uk-text-meta,
.uk-tile-primary:not(.uk-preserve-color) .uk-text-meta,
.uk-tile-secondary:not(.uk-preserve-color) .uk-text-meta {
    color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-text-muted,
.uk-card-primary.uk-card-body .uk-text-muted,
.uk-card-primary>:not([class*=uk-card-media]) .uk-text-muted,
.uk-card-secondary.uk-card-body .uk-text-muted,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-muted,
.uk-light .uk-text-muted,
.uk-overlay-primary .uk-text-muted,
.uk-section-primary:not(.uk-preserve-color) .uk-text-muted,
.uk-section-secondary:not(.uk-preserve-color) .uk-text-muted,
.uk-tile-primary:not(.uk-preserve-color) .uk-text-muted,
.uk-tile-secondary:not(.uk-preserve-color) .uk-text-muted {
    color: rgba(255, 255, 255, .6) !important
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-text-emphasis,
.uk-card-primary.uk-card-body .uk-text-emphasis,
.uk-card-primary>:not([class*=uk-card-media]) .uk-text-emphasis,
.uk-card-secondary.uk-card-body .uk-text-emphasis,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-emphasis,
.uk-light .uk-text-emphasis,
.uk-overlay-primary .uk-text-emphasis,
.uk-section-primary:not(.uk-preserve-color) .uk-text-emphasis,
.uk-section-secondary:not(.uk-preserve-color) .uk-text-emphasis,
.uk-tile-primary:not(.uk-preserve-color) .uk-text-emphasis,
.uk-tile-secondary:not(.uk-preserve-color) .uk-text-emphasis {
    color: var(--text-negative-color) !important;
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-text-primary,
.uk-card-primary.uk-card-body .uk-text-primary,
.uk-card-primary>:not([class*=uk-card-media]) .uk-text-primary,
.uk-card-secondary.uk-card-body .uk-text-primary,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-primary,
.uk-light .uk-text-primary,
.uk-overlay-primary .uk-text-primary,
.uk-section-primary:not(.uk-preserve-color) .uk-text-primary,
.uk-section-secondary:not(.uk-preserve-color) .uk-text-primary,
.uk-tile-primary:not(.uk-preserve-color) .uk-text-primary,
.uk-tile-secondary:not(.uk-preserve-color) .uk-text-primary {
    color: var(--text-negative-color) !important;
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-text-secondary,
.uk-card-primary.uk-card-body .uk-text-secondary,
.uk-card-primary>:not([class*=uk-card-media]) .uk-text-secondary,
.uk-card-secondary.uk-card-body .uk-text-secondary,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-text-secondary,
.uk-light .uk-text-secondary,
.uk-overlay-primary .uk-text-secondary,
.uk-section-primary:not(.uk-preserve-color) .uk-text-secondary,
.uk-section-secondary:not(.uk-preserve-color) .uk-text-secondary,
.uk-tile-primary:not(.uk-preserve-color) .uk-text-secondary,
.uk-tile-secondary:not(.uk-preserve-color) .uk-text-secondary {
    color: var(--text-negative-color) !important;
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-column-divider,
.uk-card-primary.uk-card-body .uk-column-divider,
.uk-card-primary>:not([class*=uk-card-media]) .uk-column-divider,
.uk-card-secondary.uk-card-body .uk-column-divider,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-column-divider,
.uk-light .uk-column-divider,
.uk-overlay-primary .uk-column-divider,
.uk-section-primary:not(.uk-preserve-color) .uk-column-divider,
.uk-section-secondary:not(.uk-preserve-color) .uk-column-divider,
.uk-tile-primary:not(.uk-preserve-color) .uk-column-divider,
.uk-tile-secondary:not(.uk-preserve-color) .uk-column-divider {
    column-rule-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-logo,
.uk-card-primary.uk-card-body .uk-logo,
.uk-card-primary>:not([class*=uk-card-media]) .uk-logo,
.uk-card-secondary.uk-card-body .uk-logo,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo,
.uk-light .uk-logo,
.uk-overlay-primary .uk-logo,
.uk-section-primary:not(.uk-preserve-color) .uk-logo,
.uk-section-secondary:not(.uk-preserve-color) .uk-logo,
.uk-tile-primary:not(.uk-preserve-color) .uk-logo,
.uk-tile-secondary:not(.uk-preserve-color) .uk-logo {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-logo:hover,
.uk-card-primary.uk-card-body .uk-logo:hover,
.uk-card-primary>:not([class*=uk-card-media]) .uk-logo:hover,
.uk-card-secondary.uk-card-body .uk-logo:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo:hover,
.uk-light .uk-logo:hover,
.uk-overlay-primary .uk-logo:hover,
.uk-section-primary:not(.uk-preserve-color) .uk-logo:hover,
.uk-section-secondary:not(.uk-preserve-color) .uk-logo:hover,
.uk-tile-primary:not(.uk-preserve-color) .uk-logo:hover,
.uk-tile-secondary:not(.uk-preserve-color) .uk-logo:hover {
    color: var(--text-negative-color);
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-card-primary.uk-card-body .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-card-primary>:not([class*=uk-card-media]) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-card-secondary.uk-card-body .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-light .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-overlay-primary .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-section-primary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-section-secondary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-tile-primary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type),
.uk-tile-secondary:not(.uk-preserve-color) .uk-logo>:not(.uk-logo-inverse):not(:only-of-type) {
    display: none
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-logo-inverse,
.uk-card-primary.uk-card-body .uk-logo-inverse,
.uk-card-primary>:not([class*=uk-card-media]) .uk-logo-inverse,
.uk-card-secondary.uk-card-body .uk-logo-inverse,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-logo-inverse,
.uk-light .uk-logo-inverse,
.uk-overlay-primary .uk-logo-inverse,
.uk-section-primary:not(.uk-preserve-color) .uk-logo-inverse,
.uk-section-secondary:not(.uk-preserve-color) .uk-logo-inverse,
.uk-tile-primary:not(.uk-preserve-color) .uk-logo-inverse,
.uk-tile-secondary:not(.uk-preserve-color) .uk-logo-inverse {
    display: block
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-striped tbody tr:nth-of-type(even):last-child,
.tm-navbar-container:not(.uk-navbar-transparent) .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-card-primary.uk-card-body .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-card-primary.uk-card-body .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-card-primary>:not([class*=uk-card-media]) .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-card-secondary.uk-card-body .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-card-secondary.uk-card-body .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-light .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-light .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-overlay-primary .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-overlay-primary .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-section-primary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-section-primary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-section-secondary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-section-secondary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-tile-primary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-tile-primary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(even):last-child,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-striped tbody tr:nth-of-type(even):last-child,
.uk-tile-secondary:not(.uk-preserve-color) .uk-table-striped>tr:nth-of-type(even):last-child {
    border-bottom-color: rgba(255, 255, 255, .2)
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-accordion-title::before,
.uk-card-primary.uk-card-body .uk-accordion-title::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-accordion-title::before,
.uk-card-secondary.uk-card-body .uk-accordion-title::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-accordion-title::before,
.uk-light .uk-accordion-title::before,
.uk-overlay-primary .uk-accordion-title::before,
.uk-section-primary:not(.uk-preserve-color) .uk-accordion-title::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-accordion-title::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-accordion-title::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-accordion-title::before {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%20%20%20%20%3Crect%20fill%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20width%3D%221%22%20height%3D%2213%22%20x%3D%226%22%20y%3D%220%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.tm-navbar-container:not(.uk-navbar-transparent) .uk-open>.uk-accordion-title::before,
.uk-card-primary.uk-card-body .uk-open>.uk-accordion-title::before,
.uk-card-primary>:not([class*=uk-card-media]) .uk-open>.uk-accordion-title::before,
.uk-card-secondary.uk-card-body .uk-open>.uk-accordion-title::before,
.uk-card-secondary>:not([class*=uk-card-media]) .uk-open>.uk-accordion-title::before,
.uk-light .uk-open>.uk-accordion-title::before,
.uk-overlay-primary .uk-open>.uk-accordion-title::before,
.uk-section-primary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::before,
.uk-section-secondary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::before,
.uk-tile-primary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::before,
.uk-tile-secondary:not(.uk-preserve-color) .uk-open>.uk-accordion-title::before {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20fill%3D%22rgba%28255,%20255,%20255,%200.8%29%22%20width%3D%2213%22%20height%3D%221%22%20x%3D%220%22%20y%3D%226%22%20%2F%3E%0A%3C%2Fsvg%3E")
}

.tm-navbar-container:not(.uk-navbar-transparent) .tm-button-default,
.uk-card-primary.uk-card-body .tm-button-default,
.uk-card-primary>:not([class*=uk-card-media]) .tm-button-default,
.uk-card-secondary.uk-card-body .tm-button-default,
.uk-card-secondary>:not([class*=uk-card-media]) .tm-button-default,
.uk-light .tm-button-default,
.uk-overlay-primary .tm-button-default,
.uk-section-primary:not(.uk-preserve-color) .tm-button-default,
.uk-section-secondary:not(.uk-preserve-color) .tm-button-default,
.uk-tile-primary:not(.uk-preserve-color) .tm-button-default,
.uk-tile-secondary:not(.uk-preserve-color) .tm-button-default {
    color: rgba(255, 255, 255, .8);
    border-color: rgba(255, 255, 255, .6)
}

.tm-navbar-container:not(.uk-navbar-transparent) .tm-button-primary,
.uk-card-primary.uk-card-body .tm-button-primary,
.uk-card-primary>:not([class*=uk-card-media]) .tm-button-primary,
.uk-card-secondary.uk-card-body .tm-button-primary,
.uk-card-secondary>:not([class*=uk-card-media]) .tm-button-primary,
.uk-light .tm-button-primary,
.uk-overlay-primary .tm-button-primary,
.uk-section-primary:not(.uk-preserve-color) .tm-button-primary,
.uk-section-secondary:not(.uk-preserve-color) .tm-button-primary,
.uk-tile-primary:not(.uk-preserve-color) .tm-button-primary,
.uk-tile-secondary:not(.uk-preserve-color) .tm-button-primary {
    background: var(--background-color) !important;
    color: var(--primary-color) !important
}

.tm-navbar-container:not(.uk-navbar-transparent) .tm-button-primary:hover,
.uk-card-primary.uk-card-body .tm-button-primary:hover,
.uk-card-primary>:not([class*=uk-card-media]) .tm-button-primary:hover,
.uk-card-secondary.uk-card-body .tm-button-primary:hover,
.uk-card-secondary>:not([class*=uk-card-media]) .tm-button-primary:hover,
.uk-light .tm-button-primary:hover,
.uk-overlay-primary .tm-button-primary:hover,
.uk-section-primary:not(.uk-preserve-color) .tm-button-primary:hover,
.uk-section-secondary:not(.uk-preserve-color) .tm-button-primary:hover,
.uk-tile-primary:not(.uk-preserve-color) .tm-button-primary:hover,
.uk-tile-secondary:not(.uk-preserve-color) .tm-button-primary:hover {
    box-shadow: 0 10px 40px var(--primary-color)
}

.tm-navbar-container:not(.uk-navbar-transparent) .tm-h4,
.tm-navbar-container:not(.uk-navbar-transparent) .tm-h5,
.tm-navbar-container:not(.uk-navbar-transparent) .tm-h6,
.uk-card-primary.uk-card-body .tm-h4,
.uk-card-primary.uk-card-body .tm-h5,
.uk-card-primary.uk-card-body .tm-h6,
.uk-card-primary>:not([class*=uk-card-media]) .tm-h4,
.uk-card-primary>:not([class*=uk-card-media]) .tm-h5,
.uk-card-primary>:not([class*=uk-card-media]) .tm-h6,
.uk-card-secondary.uk-card-body .tm-h4,
.uk-card-secondary.uk-card-body .tm-h5,
.uk-card-secondary.uk-card-body .tm-h6,
.uk-card-secondary>:not([class*=uk-card-media]) .tm-h4,
.uk-card-secondary>:not([class*=uk-card-media]) .tm-h5,
.uk-card-secondary>:not([class*=uk-card-media]) .tm-h6,
.uk-light .tm-h4,
.uk-light .tm-h5,
.uk-light .tm-h6,
.uk-overlay-primary .tm-h4,
.uk-overlay-primary .tm-h5,
.uk-overlay-primary .tm-h6,
.uk-section-primary:not(.uk-preserve-color) .tm-h4,
.uk-section-primary:not(.uk-preserve-color) .tm-h5,
.uk-section-primary:not(.uk-preserve-color) .tm-h6,
.uk-section-secondary:not(.uk-preserve-color) .tm-h4,
.uk-section-secondary:not(.uk-preserve-color) .tm-h5,
.uk-section-secondary:not(.uk-preserve-color) .tm-h6,
.uk-tile-primary:not(.uk-preserve-color) .tm-h4,
.uk-tile-primary:not(.uk-preserve-color) .tm-h5,
.uk-tile-primary:not(.uk-preserve-color) .tm-h6,
.uk-tile-secondary:not(.uk-preserve-color) .tm-h4,
.uk-tile-secondary:not(.uk-preserve-color) .tm-h5,
.uk-tile-secondary:not(.uk-preserve-color) .tm-h6 {
    color: rgba(255, 255, 255, .7)
}

@media print {

    *,
    ::after,
    ::before {
        background: 0 0 !important;
        color: #000 !important;
        box-shadow: none !important;
        text-shadow: none !important
    }

    a,
    a:visited {
        text-decoration: underline
    }

    blockquote,
    pre {
        border: 1px solid #999;
        page-break-inside: avoid
    }

    thead {
        display: table-header-group
    }

    img,
    tr {
        page-break-inside: avoid
    }

    img {
        max-width: 100% !important
    }

    @page {
        margin: .5cm
    }

    h2,
    h3,
    p {
        orphans: 3;
        widows: 3
    }

    h2,
    h3 {
        page-break-after: avoid
    }
}

.hljs {
    display: block;
    color: #333
}

.hljs-comment,
.hljs-meta {
    color: #969896
}

.hljs-emphasis,
.hljs-quote,
.hljs-string,
.hljs-strong,
.hljs-template-variable,
.hljs-variable {
    color: #f0506e
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-type {
    color: #1f34aa
}

.hljs-attribute,
.hljs-bullet,
.hljs-literal,
.hljs-symbol {
    color: #0086b3
}

.hljs-name,
.hljs-section {
    color: #63a35c
}

.hljs-tag {
    color: #333
}

.hljs-attr,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id,
.hljs-selector-pseudo,
.hljs-title {
    color: #795da3
}

.hljs-addition {
    color: #55a532;
    background-color: #eaffea
}

.hljs-deletion {
    color: #bd2c00;
    background-color: #ffecec
}

.hljs-link {
    text-decoration: underline
}

/*
@font-face {
    src: url(ProximaNova-Light-webfont.woff2) format('woff2');
    font-weight: 300;
    font-style: normal
}

@font-face {
    src: url(ProximaNova-Reg-webfont.woff2) format('woff2');
    font-weight: 400;
    font-style: normal
}

@font-face {
    src: url(ProximaNova-Sbold-webfont.woff2) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap
}

@font-face {
    src: url(montserrat-600.woff2) format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap
}

@font-face {
    src: url(roboto-mono-regular.woff2) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap
}*/

html {
    overflow-y: scroll
}

body {
    overflow: hidden;
    overflow: clip
}

.tm-sidebar-left {
    position: fixed;
    top: 80px;
    bottom: 0;
    box-sizing: border-box;
    width: 240px !important;
    padding: 40px 40px 60px 40px;
    border-right: 1px #e5e5e5 solid;
    overflow: auto
}

.tm-sidebar-right {
    position: absolute;
    top: 0;
    left: calc(100% + 0px);
    width: 200px
}

@media (min-width:960px) {
    .tm-sidebar-left+.tm-main {
        padding-left: 240px
    }
}

@media (min-width:1200px) {
    .tm-sidebar-right {
        left: calc(100% + 0px)
    }

    .tm-sidebar-left+.tm-main {
        padding-left: 40px
    }
}

@media (min-width:1400px) {
    .tm-sidebar-left {
        width: 300px !important;
        padding: 45px 45px 60px 45px
    }

    .tm-sidebar-right {
        left: calc(100% + 60px)
    }

    .tm-sidebar-left+.tm-main {
        padding-left: 40px
    }
}

.tm-navbar-container:not(.uk-navbar-transparent) {
    background: linear-gradient(to left, var(--secondary-color), var(--primary-color))
}

.tm-navbar-container .uk-navbar-item:not(.uk-logo),
.tm-navbar-container .uk-navbar-nav>li>a,
.tm-navbar-container .uk-navbar-toggle {
    height: 70px;
    font-size: 13px
}

.tm-navbar-container .uk-navbar-nav>li>a {
    position: relative
}

.tm-navbar-container .uk-navbar-nav>li>a::before {
    content: '';
    display: block;
    position: absolute;
    left: 15px;
    right: calc(102% - 15px);
    bottom: 20px;
    height: 1px;
    background-color: currentColor;
    transition: .3s ease-in-out;
    transition-property: right
}

.tm-navbar-container .uk-navbar-nav>li>a:hover::before {
    right: 15px
}

.tm-nav>li.uk-active>a {
    position: relative
}

.tm-nav>li.uk-active>a:before {
    content: "";
    position: absolute;
    top: 15px;
    left: -25px;
    width: 15px;
    border-top: 1px solid var(--primary-color)
}

.tm-nav .uk-nav-header {
    padding: 8px 0;
    border-bottom: 1px solid #e5e5e5
}

@media (min-width:960px) {
    .tm-subnav {
        margin-left: -50px
    }

    .tm-subnav>* {
        padding-left: 50px
    }
}

.tm-subnav>*>:first-child {
    text-transform: capitalize
}

.tm-label-changelog {
    width: 90px;
    margin-top: 3px
}

.tm-button-default,
.tm-button-primary {
    border-radius: 500px
}

.tm-button-large {
    line-height: 48px
}

.tm-section-primary {
    background: linear-gradient(to left top, var(--secondary-color), var(--primary-color)) 0 0 no-repeat
}

.tm-section-texture {
    /* background: url(../images/section-background.svg) 50% 17vh no-repeat, linear-gradient(to left top, var(--secondary-color), var(--primary-color)) 0 0 no-repeat */
}

.tm-section-intro {
    background: linear-gradient(to left top, var(--secondary-color), var(--primary-color)) 0 0 no-repeat, var(--background-color);
    background-size: 100% 75%
}

.tm-h4,
.tm-h5,
.tm-h6 {
    font-family: Montserrat;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #999
}

.tm-h4 {
    font-size: 14px
}

.tm-h5 {
    font-size: 12px
}

.tm-h6 {
    font-size: 11px
}

.tm-text-large {
    font-size: 18px
}

.tm-box-shadow-medium {
    box-shadow: 2px 12px 35px rgba(0, 0, 0, .1), 0 1px 6px rgba(0, 0, 0, .05)
}

.tm-box-shadow-large {
    box-shadow: -40px 40px 160px 0 var(--shadow-color-01), -8px 8px 15px 0 rgba(120, 120, 120, .04), 3px 3px 30px 0 rgba(0, 0, 0, .04)
}

.tm-box-shadow-modal {
    box-shadow: 3px 3px 40px 0 rgba(0, 0, 0, .06)
}

.tm-overlay-default {
    background: rgba(255, 255, 255, .5)
}

.tm-modal-dialog {
    background: #f8f8f8
}

.tm-modal-header {
    padding: 20px 30px
}

.tm-modal-body {
    padding: 0
}

@media (min-width:640px) {
    .tm-modal-header {
        padding: 25px 50px
    }

    .tm-modal-body {
        padding: 0 50px
    }
}

@media (min-width:1600px) {
    .tm-modal-header {
        padding: 50px 120px
    }

    .tm-modal-body {
        padding: 0 120px
    }
}

.tm-modal-close-full {
    background: 0 0;
    padding: 30px
}

@media (min-width:640px) {
    .tm-modal-close-full {
        padding: 40px
    }
}

.tm-heading-fragment>a {
    color: inherit;
    text-decoration: none
}

@media (min-width:640px) {
    h2.tm-heading-fragment>a:before {
        content: "#";
        position: absolute;
        width: 25px;
        margin-left: -25px;
        color: #999
    }
}

.tm-main .uk-container {
    padding-left: 15px;
    padding-right: 15px
}

@media (min-width:640px) {
    .tm-main .uk-container {
        padding-left: 30px;
        padding-right: 30px
    }
}

@media (min-width:960px) {
    .tm-main .uk-container {
        padding-left: 40px;
        padding-right: 40px
    }
}

@media (min-width:1200px) {
    .tm-intro-text {
        margin-top: 30px
    }
}

@media (min-width:1600px) {
    .tm-intro-text {
        margin-top: 90px
    }

    .tm-intro-image {
        margin-right: -75px
    }
}



/* Tohle je moje */

.uk-button-outlined {
    background-color: transparent !important;
    border: 1px solid;
    color: var(--text-color)
}

.uk-button-outlined.uk-button-primary {
    border-color: var(--primary-color);
}

.uk-button-outlined.uk-button-danger {
    border-color: #f0506e;
}



.uk-button-outlined.uk-button-secondary {
    border-color: var(--secondary-color);
}

.uk-button-outlined:hover {
    filter: contrast(2);
    color: var(--text-secondary-color);
}`

const UiKit_html = `<body>
<div class="uk-section ">
    <div class="uk-container uk-container-small uk-position-relative">

        <h1>Accordion</h1>
        <ul uk-accordion>
            <li class="uk-open">
                <a class="uk-accordion-title" href="#">Item 1</a>
                <div class="uk-accordion-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title" href="#">Item 2</a>
                <div class="uk-accordion-content">
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor reprehenderit.</p>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title" href="#">Item 3</a>
                <div class="uk-accordion-content">
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat proident.</p>
                </div>
            </li>
        </ul>


        <h1>Alerts</h1>
        <div class="uk-alert-primary" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <div class="uk-alert-success" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <div class="uk-alert-warning" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <div class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <h1>Badges and Labels</h1>
        <span class="uk-badge">1</span>
        <span class="uk-badge">100</span>

        <span class="uk-label">Default</span>

        <span class="uk-label uk-label-success">Success</span>

        <span class="uk-label uk-label-warning">Warning</span>

        <span class="uk-label uk-label-danger">Danger</span>




        <h1>Breadcrumb</h1>
        <ul class="uk-breadcrumb">
            <li><a href="#">Home</a></li>
            <li><a href="#">Linked Category</a></li>
            <li class="uk-disabled"><a>Disabled Category</a></li>
            <li><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</span></li>
        </ul>

        <h1>Buttons</h1>
        <h2>Zaklad</h2>
        <p uk-margin>
            <a class="uk-button uk-button-default" href="#">Link</a>
            <button class="uk-button uk-button-default">Button</button>
            <button class="uk-button uk-button-default" disabled>Disabled</button>
        </p>

        <h2>Default</h2>
        <p uk-margin>
            <button class="uk-button uk-button-default">Default</button>
            <button class="uk-button uk-button-primary">Primary</button>
            <button class="uk-button uk-button-secondary">Secondary</button>
            <button class="uk-button uk-button-danger">Danger</button>
            <button class="uk-button uk-button-text">Text</button>
            <button class="uk-button uk-button-link">Link</button>
        </p>
        <h2>Outlined</h2>
        <p uk-margin>
            <button class="uk-button uk-button-outlined uk-button-default">Default</button>
            <button class="uk-button uk-button-outlined uk-button-primary">Primary</button>
            <button class="uk-button uk-button-outlined uk-button-secondary">Secondary</button>
            <button class="uk-button uk-button-outlined uk-button-danger">Danger</button>
            <button class="uk-button uk-button-outlined uk-button-text">Text</button>
            <button class="uk-button uk-button-outlined uk-button-link">Link</button>
        </p>

        <h2>Small and large</h2>
        <p uk-margin>
            <button class="uk-button uk-button-default uk-button-small">Small button</button>
            <button class="uk-button uk-button-primary uk-button-small">Small button</button>
            <button class="uk-button uk-button-secondary uk-button-small">Small button</button>
        </p>

        <p uk-margin>
            <button class="uk-button uk-button-default uk-button-large">Large button</button>
            <button class="uk-button uk-button-primary uk-button-large">Large button</button>
            <button class="uk-button uk-button-secondary uk-button-large">Large button</button>
        </p>

        <h2>Full width</h2>
        <button class="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom">Button</button>
        <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom">Button</button>
        <button class="uk-button uk-button-secondary uk-width-1-1">Button</button>

        <h1>Card</h1>
        <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
            <div>
                <div class="uk-card uk-card-default uk-card-body">
                    <h3 class="uk-card-title">Default</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
            <div>
                <div class="uk-card uk-card-primary uk-card-body">
                    <h3 class="uk-card-title">Primary</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
            <div>
                <div class="uk-card uk-card-secondary uk-card-body">
                    <h3 class="uk-card-title">Secondary</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>

        <h1>Dividers</h1>
        <hr>
        <hr class="uk-divider-icon">

        <h1>Inputs and form validation</h1>
        <div class="uk-margin">
            <input class="uk-input uk-form-danger uk-form-width-medium" type="text" placeholder="form-danger"
                value="form-danger">
        </div>

        <div class="uk-margin">
            <input class="uk-input uk-form-success uk-form-width-medium" type="text" placeholder="form-success"
                value="form-success">
        </div>

        <div class="uk-margin">
            <input class="uk-input uk-form-width-medium" type="text" placeholder="disabled" value="disabled"
                disabled>
        </div>

        <div class="uk-margin">
            <div class="uk-inline">
                <span class="uk-form-icon" uk-icon="icon: user"></span>
                <input class="uk-input" type="text">
            </div>
        </div>

        <h1>Leaders</h1>
        <div class="uk-grid-small" uk-grid>
            <div class="uk-width-expand" uk-leader>Lorem ipsum dolor sit amet</div>
            <div>$20.90</div>
        </div>
        <div class="uk-grid-small" uk-grid>
            <div class="uk-width-expand" uk-leader="fill: -">Lorem ipsum dolor sit amet</div>
            <div>$20.90</div>
        </div>

        <h1>Modal</h1>
        <a class="uk-button uk-button-default" href="#modal-sections" uk-toggle>Open</a>

        <div id="modal-sections" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h2 class="uk-modal-title">Modal Title</h2>
                </div>
                <div class="uk-modal-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button class="uk-button uk-button-primary" type="button">Save</button>
                </div>
            </div>
        </div>

        <h1>NavBars</h1>
        <nav class="uk-navbar-container" uk-navbar>

            <div class="uk-navbar-left">

                <ul class="uk-navbar-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li>
                        <a href="#">Parent</a>
                        <div class="uk-navbar-dropdown">
                            <ul class="uk-nav uk-navbar-dropdown-nav">
                                <li class="uk-active"><a href="#">Active</a></li>
                                <li><a href="#">Item</a></li>
                                <li><a href="#">Item</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#">Item</a></li>
                </ul>

            </div>

            <div class="uk-navbar-right">

                <ul class="uk-navbar-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li>
                        <a href="#">Parent</a>
                        <div class="uk-navbar-dropdown">
                            <ul class="uk-nav uk-navbar-dropdown-nav">
                                <li class="uk-active"><a href="#">Active</a></li>
                                <li><a href="#">Item</a></li>
                                <li><a href="#">Item</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#">Item</a></li>
                </ul>

            </div>


        </nav>

        <h1>Notifications</h1>
        <p uk-margin>
            <button class="uk-button uk-button-default demo" type="button"
                onclick="UIkit.notification({message: 'Primary message...', status: 'primary'})">Primary</button>
            <button class="uk-button uk-button-default demo" type="button"
                onclick="UIkit.notification({message: 'Success message...', status: 'success'})">Success</button>
            <button class="uk-button uk-button-default demo" type="button"
                onclick="UIkit.notification({message: 'Warning message...', status: 'warning'})">Warning</button>
            <button class="uk-button uk-button-default demo" type="button"
                onclick="UIkit.notification({message: 'Danger message...', status: 'danger'})">Danger</button>
        </p>


        <h1>Offcanvas</h1>
        <button class="uk-button uk-button-default uk-margin-small-right" type="button"
            uk-toggle="target: #offcanvas-usage">Open</button>

        <a href="#offcanvas-usage" uk-toggle>Open</a>

        <div id="offcanvas-usage" uk-offcanvas>
            <div class="uk-offcanvas-bar">

                <button class="uk-offcanvas-close" type="button" uk-close></button>

                <h3>Title</h3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.</p>

            </div>
        </div>


        <h1>Spinners</h1>
        <div uk-spinner></div>
        <span uk-spinner="ratio: 3"></span>


        <h1>Switcher</h1>
        <ul class="uk-subnav uk-subnav-pill" uk-switcher>
            <li><a href="#">Item</a></li>
            <li><a href="#">Item</a></li>
            <li><a href="#">Item</a></li>
        </ul>

        <ul class="uk-switcher uk-margin">
            <li>Hello!</li>
            <li>Hello again!</li>
            <li>Bazinga!</li>
        </ul>

        <h1>Shadow</h1>
        <div class="uk-child-width-1-2@s uk-text-center" uk-grid>
            <div>
                <div class="uk-box-shadow-small uk-padding">Small</div>
            </div>

            <div>
                <div class="uk-box-shadow-medium uk-padding">Medium</div>
            </div>

            <div>
                <div class="uk-box-shadow-large uk-padding">Large</div>
            </div>

            <div>
                <div class="uk-box-shadow-xlarge uk-padding">X-Large</div>
            </div>
        </div>

    </div>
</div>

</body>`