import { useEffect, useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";


export const SideBar = ({ tab, setHtmlComponents, projectName, setCssVariables, ReloadPage, downloadUiKit }) => {
    const [values, setValues] = useState(getFromLocalHost('values'));
    const [text, setText] = useState(getFromLocalHost('text'));
    const [components, setComponents] = useState(getFromLocalHost("components"));
    const [styles, setStyles] = useState(getFromLocalHost('styles'));
    const [animations, setanimations] = useState(getFromLocalHost('animations'));

    function getFromLocalHost(type) {
        // Ukazkový příklad: {"components": [{ code: "<button>Click me!<button/>", title: "Button - primary", id: 0 }], "animations": ...}
        try {
            var fromLocalStorage = JSON.parse(localStorage.getItem("MoreCss-" + projectName))

        } catch {

            var fromLocalStorage = UiKit
        }
        if (!fromLocalStorage) {
            let framework = null
            let projects = JSON.parse(localStorage.getItem('MoreeCss-Projekty'))
            for (let project of projects) {
                if (project.id == projectName) {
                    console.log('ASdaiusgdliaglgalidghas')
                    framework = project.framework
                    console.log(framework)
                }
            }

            console.log(framework)
            switch (framework) {
                case "uikit":
                    localStorage.setItem("MoreCss-" + projectName, JSON.stringify(UiKit))
                    break;
                case "bootstrap":
                    localStorage.setItem("MoreCss-" + projectName, JSON.stringify(bootstrap))
                    break;
            }

        }

        return fromLocalStorage[type]
    }

    function saveAndUpdateEverything(type, list) {

        switch (type) {
            case "values":
                setValues(list)
                break;
            case "text":
                setText(list)
                break;
            case "components":
                setComponents(list)
                break;
            case "styles":
                setStyles(list)
                break;
            case "animations":
                setanimations(list)
                break;
            default:
                getFromLocalHost('values')
                getFromLocalHost('text')
                getFromLocalHost("components")
                getFromLocalHost('styles')
                getFromLocalHost('animations')

        }
    }

    function saveToLocalhost(type, id, value, title) {
        var deepCopyWhole = JSON.parse(localStorage.getItem("MoreCss-" + projectName))

        let deepCopy = deepCopyWhole[type]


        // console.warn(id)


        //  Find object in list
        for (let i = 0; i < deepCopy.length; i++) {
            if (id == deepCopy[i].id) {

                deepCopy[i].title = title
                deepCopy[i].value = value

                break
            }
        }

        deepCopyWhole[type] = deepCopy
        localStorage.setItem("MoreCss-" + projectName, JSON.stringify(deepCopyWhole))



        saveAndUpdateEverything(type, deepCopy)

    }

    useEffect(() => {
        compileCss()
    }, [values, text, animations, styles])


    useEffect(() => {
        compileHtmlComponents()
    }, [components])

    function extendList(type) {
        function getNewComponentId(list) {
            let IDs = []
            for (var obj of list) {
                IDs.push(obj.id)
            }

            let number = 0
            while (true) {
                number++;
                if (!IDs.includes(number)) {
                    break
                }
            }

            return number

        }

        let list = null
        let setFunction = null

        switch (type) {
            case "components":
                list = components
                setFunction = setComponents
                break;

            case "styles":
                list = styles
                setFunction = setStyles
                break;

            case "animations":
                list = animations
                setFunction = setanimations
                break;
        }

        var deepCopyWhole = JSON.parse(localStorage.getItem("MoreCss-" + projectName))

        let idd = getNewComponentId(list)

        console.log(idd)


        let componentsCopy = list
        componentsCopy.push({ value: "", title: "New component", id: idd });
        setFunction(componentsCopy);

        deepCopyWhole[type] = componentsCopy

        localStorage.setItem("MoreCss-" + projectName, JSON.stringify(deepCopyWhole))


        ReloadPage(Math.random(50))

    }

    function compileCss() {
        let css = ":root{"
        // Compile values from the "Default Variables" and the "Text" tab
        for (var obj of values) {
            if (obj.name) {
                css += "" + obj.name + ":" + obj.value + ";"
            }
        }
        for (var obj of text) {
            if (obj.name) {
                css += "" + obj.name + ":" + obj.value + ";"
            }
        }
        css += "}"

        // Compile code from the "Styles"
        for (var obj of styles) {
            css += obj.value
        }

        // Compile animations from "Animations" tab
        for (var obj of animations) {
            css += obj.value
        }

        // Return the 
        setCssVariables(css)
        return css
    }

    function compileHtmlComponents() {
        var html = "<body style='padding:20px'>"
        for (var component of components) {
            html += "<div style='padding:20px'><h3>" + component.title + "</h3><div>" + component.value + "</div></div>"
        }
        html += "</body>"


        setHtmlComponents(html)
    }

    compileHtmlComponents()

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([compileCss()], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "variables.css";
        document.body.appendChild(element);
        element.click();
    };






    return <div className="sidebar">
        {/* Variables */}
        {tab === 0 &&
            <div>
                <h1>Default variables</h1>
                {values.map((obj) => <SideBarInput obj={obj} wheteToSave="values" setValueGlobaly={saveToLocalhost} />)}
            </div>
        }
        {/* Text */}
        {tab === 1 &&
            <div>
                <h1>Text</h1>
                {text.map((obj) => <SideBarInput defaultType="color" wheteToSave="text" obj={obj} setValueGlobaly={saveToLocalhost} />)}
            </div>
        }
        {/* Components - html */}
        {tab === 2 &&
            <div>
                <h1>Components - HTML</h1>

                {components.map((obj) => <div> {console.log(obj)}
                    <HtmlInput id={obj.id} defalutName={obj.title} defaultValue={obj.value} setValueGlobaly={saveToLocalhost} type="components" language="html" />

                </div>)}

                <h1 onClick={() => { extendList("components") }} > + </h1>
            </div>
        }
        {/* Components - style */}
        {tab === 3 &&
            <div>
                <h1>Components - Style</h1>
                {styles.map((obj) => <div>  <HtmlInput language="css" id={obj.id} defalutName={obj.title} defaultValue={obj.value} setValueGlobaly={saveToLocalhost} type="styles" /> </div>
                )}
                <h1 onClick={() => { extendList("styles") }} > + </h1>

            </div>
        }
        {/* Animations */}
        {tab === 4 &&
            <div>
                <h1>Animations and transitions</h1>
                {animations.map((obj) => <div>  <HtmlInput language="css" id={obj.id} defalutName={obj.title} defaultValue={obj.value} setValueGlobaly={saveToLocalhost} type="animations" /> </div>
                )}
                <h1 onClick={() => { extendList("animations") }} > + </h1>
            </div>
        }
        {/* Download */}
        {tab === 5 &&
            <div>
                <h1>Export</h1>

                <button onClick={() => downloadTxtFile()}>Download variables</button>
                <button onClick={() => downloadUiKit()}>Download UiKit</button>

            </div>
        }
    </div>;


}




export const SideBarInput = ({ wheteToSave, obj, defaultType, setValueGlobaly }) => {
    const [value, setValue] = useState(obj.value);
    const [type, setType] = useState(getDefaultType());

    function getDefaultType() {
        if (["string", "value", "variable", "color",].includes(defaultType)) {
            return defaultType
        } else {
            return "color"
        }

    }

    useEffect(() => {
        try {
            if (obj.type) {

                setType(obj.type)
            }
        } catch {
        }

    }, [])
    if (obj.isComment) {
        return <div>
            <h3>{obj.title}</h3>
        </div>
    }


    let id = obj.id
    let text = obj.title

    function mojeSetValueGlobaly(value) {
        setValueGlobaly(wheteToSave, id, value, text)
    }


    return <div className="sidebar-input-item">
        <p>{text} </p>


        {type == "string" &&
            <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} onBlur={(e) => mojeSetValueGlobaly(e.target.value)} />
        }


        {type == "value" &&
            <div style={{ width: "170px", alignSelf: "baseline" }}>
                <input type="number" style={{ width: "80%" }} value={value} onChange={(e) => { setValue(e.target.value) }} />
                <select style={{ width: "20%" }}>
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="rem">rem</option>

                </select>
            </div>
        }


        {type == "variable" &&
            <input type="select" value={value} onChange={(e) => { setValue(e.target.value) }} />
        }


        {type == "color" &&
            <div>
                <input type="string" style={{ width: "80%" }} value={value} onChange={(e) => { setValue(e.target.value); mojeSetValueGlobaly(e.target.value) }} />
                <input type="color" style={{ width: "20%", height: "34px" }} value={value} onChange={(e) => { setValue(e.target.value); mojeSetValueGlobaly(e.target.value) }} />
            </div>
        }


        <select className="nastavit-input-type" onChange={(e) => { setType(e.target.value) }} value={type} >
            <option value="string">String</option>
            <option value="value">Value</option>
            <option value="variable">Variable</option>
            <option value="color">Color</option>
        </select>

    </div >



}

export const HtmlInput = ({ id, defaultValue, setValueGlobaly, defalutName, language, type }) => {
    const [value, setValue] = useState(defaultValue);
    const [name, setName] = useState(defalutName);


    console.warn(id)

    return <div>
        <div className="sidebar-input-item" style={{ paddingTop: "15px" }}>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setValueGlobaly(type, id, value, name)} />
        </div>
        <Editor
            height="200px"
            defaultLanguage={language}
            defaultValue={value}
            onChange={(e) => setValue(e)}

        />
        <div className="sidebar-input-item">
            <p></p>
            <input type="submit" onClick={() => setValueGlobaly(type, id, value, name)} />
        </div>
    </div>
}


const UiKit = {
    "values": [
        { isComment: true, title: "# Pallete" },
        { isComment: true, title: "Primary color" },
        { isComment: false, title: "Primary color", name: "--primary-color", value: "#1e87f0", id: 0, type: "color" },
        { isComment: false, title: "Primary color tone-1", name: "--primary-color-tone1", value: "#0f7ae5", id: 1, type: "color" },
        { isComment: false, title: "Primary color tone-2", name: "--primary-color-tone2", value: "#0e6dcd", id: 2, type: "color" },
        { isComment: false, title: "Primary color bg-light", name: "--primary-bg-light", value: "#d8eafc", id: 3, type: "color" },

        { isComment: true, title: "Secondary color" },
        { isComment: false, title: "Secondary color", name: "--secondary-color", value: "#222", id: 4, type: "color" },
        { isComment: false, title: "Secondary color tone-1", name: "--secondary-color-tone1", value: "#151515", id: 5, type: "color" },
        { isComment: false, title: "Secondary color tone-2", name: "--secondary-color-tone2", value: "#080808", id: 6, type: "color" },

        { isComment: true, title: "# Semafor" },
        { isComment: true, title: "Success color" },
        { isComment: false, title: "Success color", name: "--success-color", value: "#32d296", id: 7, type: "color" },
        { isComment: false, title: "Success color tone-1", name: "--success-color-tone1", value: " green", id: 8, type: "color" },
        { isComment: false, title: "Success color tone-2", name: "--success-color-tone2", value: "rgb(5, 77, 5)", id: 9, type: "color" },
        { isComment: false, title: "Success color bg-light", name: "--success-bg-light", value: "#edfbf6", id: 10, type: "color" },

        { isComment: true, title: "Warning color" },
        { isComment: false, title: "Warning color", name: "--warning-color", value: "#faa05a", id: 11, type: "color" },
        { isComment: false, title: "Warning color tone-1", name: "--warning-color-tone1", value: "orange", id: 12, type: "color" },
        { isComment: false, title: "Warning color tone-2", name: "--warning-color-tone2", value: "rgb(109, 73, 6)", id: 13, type: "color" },
        { isComment: false, title: "Warning color bg-light", name: "--warning-bg-light", value: "#fff6ee", id: 14, type: "color" },

        { isComment: true, title: "Danger color" },
        { isComment: false, title: "Danger color", name: "--danger-color", value: "#f0506e", id: 15, type: "color" },
        { isComment: false, title: "Danger color tone-1", name: "--danger-color-tone1", value: "#ee395b", id: 16, type: "color" },
        { isComment: false, title: "Danger color tone-2", name: "--danger-color-tone2", value: "#ec2147", id: 17, type: "color" },
        { isComment: false, title: "Danger color bg-light", name: "--danger-bg-light", value: "#fef4f6", id: 18, type: "color" },

        { isComment: true, title: "Scheme colors" },
        { isComment: false, title: "Body background", name: "--body-bg", value: "#fff", id: 19, type: "color" },
        { isComment: false, title: "Background color", name: "--background-color", value: "#fff", id: 20, type: "color" },

        { isComment: true, title: "# Other" },
        { isComment: false, title: "Border color", name: "--border-color", value: "#e5e5e5", id: 21, type: "color" },



    ],
    "text": [
        { isComment: false, title: "Font family", name: "--font-family", value: 'ProximaNova, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', id: 0, type: "string" },
        { isComment: true, title: "Colors" },
        { isComment: false, title: "Text color", name: "--text-color", value: "#222", id: 1, type: "color" },
        { isComment: false, title: "Text secondary color", name: "--text-secondary-color", value: "#666", id: 2, type: "color" },
        { isComment: false, title: "Text muted color", name: "--color-muted", value: "#999", id: 3, type: "color" },
        { isComment: false, title: "Text negative color", name: "--text-negative-color", value: "#fff", id: 4, type: "color" },

    ],
    "components":
        [{ "value": "<ul uk-accordion>\r\n    <li class=\"uk-open\">\r\n<a class=\"uk-accordion-title\" href=\"#\">Item 1</a>\r\n<div class=\"uk-accordion-content\">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\r\n    labore et dolore magna aliqua.</p>\r\n</div>\r\n    </li>\r\n    <li>\r\n<a class=\"uk-accordion-title\" href=\"#\">Item 2</a>\r\n<div class=\"uk-accordion-content\">\r\n<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\r\n    commodo consequat. Duis aute irure dolor reprehenderit.</p>\r\n</div>\r\n    </li>\r\n    <li>\r\n<a class=\"uk-accordion-title\" href=\"#\">Item 3</a>\r\n<div class=\"uk-accordion-content\">\r\n<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\r\n    pariatur. Excepteur sint occaecat cupidatat proident.</p>\r\n</div>\r\n    </li>\r\n</ul>\r\n", "title": "Accordion", "id": 0 }, { "value": "<div class=\"uk-alert-primary\" uk-alert>\r\n    <a class=\"uk-alert-close\" uk-close></a>\r\n    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>\r\n</div>\r\n\r\n<div class=\"uk-alert-success\" uk-alert>\r\n    <a class=\"uk-alert-close\" uk-close></a>\r\n    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>\r\n</div>\r\n\r\n<div class=\"uk-alert-warning\" uk-alert>\r\n    <a class=\"uk-alert-close\" uk-close></a>\r\n    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>\r\n</div>\r\n\r\n<div class=\"uk-alert-danger\" uk-alert>\r\n    <a class=\"uk-alert-close\" uk-close></a>\r\n    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>\r\n</div>\r\n\r\n", "title": "Alerts", "id": 1 }, { "value": "<span class=\"uk-badge\">1</span>\r\n<span class=\"uk-badge\">100</span>\r\n\r\n<span class=\"uk-label\">Default</span>\r\n\r\n<span class=\"uk-label uk-label-success\">Success</span>\r\n\r\n<span class=\"uk-label uk-label-warning\">Warning</span>\r\n\r\n<span class=\"uk-label uk-label-danger\">Danger</span>", "title": "Badges and Labels", "id": 2 }, { "value": "<h4>Zaklad</h4>\r\n<p uk-margin>\r\n    <a class=\"uk-button uk-button-default\" href=\"#\">Link</a>\r\n    <button class=\"uk-button uk-button-default\">Button</button>\r\n    <button class=\"uk-button uk-button-default\" disabled>Disabled</button>\r\n</p>\r\n\r\n<h4>Default</h4>\r\n<p uk-margin>\r\n    <button class=\"uk-button uk-button-default\">Default</button>\r\n    <button class=\"uk-button uk-button-primary\">Primary</button>\r\n    <button class=\"uk-button uk-button-secondary\">Secondary</button>\r\n    <button class=\"uk-button uk-button-danger\">Danger</button>\r\n    <button class=\"uk-button uk-button-text\">Text</button>\r\n    <button class=\"uk-button uk-button-link\">Link</button>\r\n</p>\r\n\r\n\r\n<h4>Small and large</h4>\r\n<p uk-margin>\r\n    <button class=\"uk-button uk-button-default uk-button-small\">Small button</button>\r\n    <button class=\"uk-button uk-button-primary uk-button-small\">Small button</button>\r\n    <button class=\"uk-button uk-button-secondary uk-button-small\">Small button</button>\r\n</p>\r\n\r\n<p uk-margin>\r\n    <button class=\"uk-button uk-button-default uk-button-large\">Large button</button>\r\n    <button class=\"uk-button uk-button-primary uk-button-large\">Large button</button>\r\n    <button class=\"uk-button uk-button-secondary uk-button-large\">Large button</button>\r\n</p>\r\n\r\n<h4>Full width</h4>\r\n<button class=\"uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom\">Button</button>\r\n<button class=\"uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom\">Button</button>\r\n<button class=\"uk-button uk-button-secondary uk-width-1-1\">Button</button>\r\n\r\n", "title": "Buttons", "id": 3 }, { "value": "<div class=\"uk-child-width-1-3@m uk-grid-small uk-grid-match\" uk-grid>\r\n    <div>\r\n<div class=\"uk-card uk-card-default uk-card-body\">\r\n<h3 class=\"uk-card-title\">Default</h3>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>\r\n</div>\r\n    </div>\r\n    <div>\r\n<div class=\"uk-card uk-card-primary uk-card-body\">\r\n<h3 class=\"uk-card-title\">Primary</h3>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>\r\n</div>\r\n    </div>\r\n    <div>\r\n<div class=\"uk-card uk-card-secondary uk-card-body\">\r\n<h3 class=\"uk-card-title\">Secondary</h3>\r\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>\r\n</div>\r\n    </div>\r\n</div>\r\n", "title": "Cards", "id": 4 }, { "value": "<hr>\r\n<hr class=\"uk-divider-icon\">\r\n", "title": "Dividers", "id": 5 }, { "value": "<div class=\"uk-margin\">\r\n    <input class=\"uk-input uk-form-danger uk-form-width-medium\" type=\"text\" placeholder=\"form-danger\"\r\nvalue=\"form-danger\">\r\n</div>\r\n\r\n<div class=\"uk-margin\">\r\n    <input class=\"uk-input uk-form-success uk-form-width-medium\" type=\"text\" placeholder=\"form-success\"\r\nvalue=\"form-success\">\r\n</div>\r\n\r\n<div class=\"uk-margin\">\r\n    <input class=\"uk-input uk-form-width-medium\" type=\"text\" placeholder=\"disabled\" value=\"disabled\"\r\ndisabled>\r\n</div>\r\n\r\n<div class=\"uk-margin\">\r\n    <div class=\"uk-inline\">\r\n<span class=\"uk-form-icon\" uk-icon=\"icon: user\"></span>\r\n<input class=\"uk-input\" type=\"text\">\r\n    </div>\r\n</div>\r\n", "title": "Inputs and form validation", "id": 6 }, { "value": "<div class=\"uk-grid-small\" uk-grid>\r\n    <div class=\"uk-width-expand\" uk-leader>Lorem ipsum dolor sit amet</div>\r\n    <div>$20.90</div>\r\n</div>\r\n<div class=\"uk-grid-small\" uk-grid>\r\n    <div class=\"uk-width-expand\" uk-leader=\"fill: -\">Lorem ipsum dolor sit amet</div>\r\n    <div>$20.90</div>\r\n</div>\r\n\r\n", "title": "Leaders", "id": 7 }, { "value": "<a class=\"uk-button uk-button-default\" href=\"#modal-sections\" uk-toggle>Open</a>\r\n\r\n<div id=\"modal-sections\" uk-modal>\r\n    <div class=\"uk-modal-dialog\">\r\n<button class=\"uk-modal-close-default\" type=\"button\" uk-close></button>\r\n<div class=\"uk-modal-header\">\r\n<h2 class=\"uk-modal-title\">Modal Title</h2>\r\n</div>\r\n<div class=\"uk-modal-body\">\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\r\n    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\r\n    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in\r\n    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\r\n    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\r\n</div>\r\n<div class=\"uk-modal-footer uk-text-right\">\r\n<button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">Cancel</button>\r\n<button class=\"uk-button uk-button-primary\" type=\"button\">Save</button>\r\n</div>\r\n    </div>\r\n</div>\r\n", "title": "Modal", "id": 8 }, { "value": "<nav class=\"uk-navbar-container\" uk-navbar>\r\n\r\n    <div class=\"uk-navbar-left\">\r\n\r\n<ul class=\"uk-navbar-nav\">\r\n<li class=\"uk-active\"><a href=\"#\">Active</a></li>\r\n<li>\r\n    <a href=\"#\">Parent</a>\r\n    <div class=\"uk-navbar-dropdown\">\r\n<ul class=\"uk-nav uk-navbar-dropdown-nav\">\r\n<li class=\"uk-active\"><a href=\"#\">Active</a></li>\r\n<li><a href=\"#\">Item</a></li>\r\n<li><a href=\"#\">Item</a></li>\r\n</ul>\r\n    </div>\r\n</li>\r\n<li><a href=\"#\">Item</a></li>\r\n</ul>\r\n\r\n    </div>\r\n\r\n    <div class=\"uk-navbar-right\">\r\n\r\n<ul class=\"uk-navbar-nav\">\r\n<li class=\"uk-active\"><a href=\"#\">Active</a></li>\r\n<li>\r\n    <a href=\"#\">Parent</a>\r\n    <div class=\"uk-navbar-dropdown\">\r\n<ul class=\"uk-nav uk-navbar-dropdown-nav\">\r\n<li class=\"uk-active\"><a href=\"#\">Active</a></li>\r\n<li><a href=\"#\">Item</a></li>\r\n<li><a href=\"#\">Item</a></li>\r\n</ul>\r\n    </div>\r\n</li>\r\n<li><a href=\"#\">Item</a></li>\r\n</ul>\r\n\r\n    </div>\r\n\r\n\r\n</nav>\r\n", "title": "NavBars", "id": 9 }, { "value": "<p uk-margin>\r\n    <button class=\"uk-button uk-button-default demo\" type=\"button\"\r\nonclick=\"UIkit.notification({message: 'Primary message...', status: 'primary'})\">Primary</button>\r\n    <button class=\"uk-button uk-button-default demo\" type=\"button\"\r\nonclick=\"UIkit.notification({message: 'Success message...', status: 'success'})\">Success</button>\r\n    <button class=\"uk-button uk-button-default demo\" type=\"button\"\r\nonclick=\"UIkit.notification({message: 'Warning message...', status: 'warning'})\">Warning</button>\r\n    <button class=\"uk-button uk-button-default demo\" type=\"button\"\r\nonclick=\"UIkit.notification({message: 'Danger message...', status: 'danger'})\">Danger</button>\r\n</p>\r\n", "title": "Notifications", "id": 10 }, { "value": "<button class=\"uk-button uk-button-default uk-margin-small-right\" type=\"button\"\r\n    uk-toggle=\"target: #offcanvas-usage\">Open</button>\r\n\r\n<a href=\"#offcanvas-usage\" uk-toggle>Open</a>\r\n\r\n<div id=\"offcanvas-usage\" uk-offcanvas>\r\n    <div class=\"uk-offcanvas-bar\">\r\n\r\n<button class=\"uk-offcanvas-close\" type=\"button\" uk-close></button>\r\n\r\n<h3>Title</h3>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut\r\nlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\r\nlaboris nisi ut aliquip ex ea commodo consequat.</p>\r\n\r\n    </div>\r\n</div>\r\n", "title": "Offcanvas", "id": 11 }, { "value": "<div uk-spinner></div>\r\n<span uk-spinner=\"ratio: 3\"></span>\r\n", "title": "Spinners", "id": 12 }, { "value": "<ul class=\"uk-subnav uk-subnav-pill\" uk-switcher>\r\n    <li><a href=\"#\">Item</a></li>\r\n    <li><a href=\"#\">Item</a></li>\r\n    <li><a href=\"#\">Item</a></li>\r\n</ul>\r\n\r\n<ul class=\"uk-switcher uk-margin\">\r\n    <li>Hello!</li>\r\n    <li>Hello again!</li>\r\n    <li>Bazinga!</li>\r\n</ul>\r\n\r\n", "title": "Switcher", "id": 13 }, { "value": "<div class=\"uk-child-width-1-2@s uk-text-center\" uk-grid>\r\n    <div>\r\n<div class=\"uk-box-shadow-small uk-padding\">Small</div>\r\n    </div>\r\n\r\n    <div>\r\n<div class=\"uk-box-shadow-medium uk-padding\">Medium</div>\r\n    </div>\r\n\r\n    <div>\r\n<div class=\"uk-box-shadow-large uk-padding\">Large</div>\r\n    </div>\r\n\r\n    <div>\r\n<div class=\"uk-box-shadow-xlarge uk-padding\">X-Large</div>\r\n    </div>\r\n</div>\r\n\r\n", "title": "Shadows", "id": 14 }]
    , "styles": [
        { value: "", title: "Ahoj", id: 0 }
    ],
    "animations": [

    ],

}
const bootstrap = {
    "values": [
        { isComment: true, title: "# Pallete" },
        { isComment: true, title: "Primary color" },
        { isComment: false, title: "Primary color", name: "--bs-primary", value: "#0d6efd", id: 0, type: "color" },
        { isComment: false, title: "Primary color rgb", name: "--bs-primary-rgb", value: "13, 110, 253", id: 1, type: "string" },

        { isComment: true, title: "Secondary color" },
        { isComment: false, title: "Secondary color", name: "--bs-secondary", value: "#6c757d", id: 2, type: "color" },
        { isComment: false, title: "Secondary color rgb", name: "--bs-secondary-rgb", value: "108, 117, 125", id: 3, type: "string" },

        { isComment: true, title: "Success color" },
        { isComment: false, title: "Success color", name: "--bs-success", value: "#198754", id: 4, type: "color" },
        { isComment: false, title: "Success color rgb", name: "--bs-success-rgb", value: "25, 135, 84", id: 5, type: "string" },

        { isComment: true, title: "Info color" },
        { isComment: false, title: "Info color", name: "--bs-info", value: "#0dcaf0", id: 6, type: "color" },
        { isComment: false, title: "Info color rgb", name: "--bs-info-rgb", value: "13, 202, 240", id: 7, type: "string" },

        { isComment: true, title: "Warning color" },
        { isComment: false, title: "Warning color", name: "--bs-warning", value: "#ffc107", id: 8, type: "color" },
        { isComment: false, title: "Warning color rgb", name: "--bs-warning-rgb", value: "255, 193, 7", id: 9, type: "string" },

        { isComment: true, title: "Danger color" },
        { isComment: false, title: "Danger color", name: "--bs-danger", value: "#dc3545", id: 10, type: "color" },
        { isComment: false, title: "Danger color rgb", name: "--bs-danger-rgb", value: "220, 53, 69", id: 11, type: "string" },

        { isComment: true, title: "Light color" },
        { isComment: false, title: "Light color", name: "--bs-light", value: "#f8f9fa", id: 12, type: "color" },
        { isComment: false, title: "Light color rgb", name: "--bs-light-rgb", value: "248, 249, 250", id: 13, type: "string" },

        { isComment: true, title: "Dark color" },
        { isComment: false, title: "Dark color", name: "--bs-dark", value: "#212529", id: 14, type: "color" },
        { isComment: false, title: "Dark color rgb", name: "--bs-dark-rgb", value: "33, 37, 41", id: 15, type: "string" },

        { isComment: true, title: "White color" },
        { isComment: false, title: "White color", name: "--bs-white", value: "#000", id: 16, type: "color" },
        { isComment: false, title: "White color rgb", name: "--bs-white-rgb", value: "0, 0, 0", id: 17, type: "string" },

        { isComment: true, title: "Black color" },
        { isComment: false, title: "Black color", name: "--bs-black", value: "#fff", id: 18, type: "color" },
        { isComment: false, title: "Black color rgb", name: "--bs-black-rgb", value: "255, 255, 255", id: 19, type: "string" },




        { isComment: true, title: "# Pallette" },
        { isComment: false, title: "Blue", name: "--bs-blue", value: "#0d6efd", id: 20, type: "color" },
        { isComment: false, title: "Indigo", name: "--bs-indigo", value: "#6610f2", id: 21, type: "color" },
        { isComment: false, title: "Purple", name: "--bs-purple", value: "#6f42c1", id: 22, type: "color" },
        { isComment: false, title: "Pink", name: "--bs-pink", value: "#d63384", id: 23, type: "color" },
        { isComment: false, title: "Red", name: "--bs-red", value: "#dc3545", id: 24, type: "color" },
        { isComment: false, title: "Orange", name: "--bs-orange", value: "#fd7e14", id: 25, type: "color" },
        { isComment: false, title: "Yellow", name: "--bs-yellow", value: "#ffc107", id: 26, type: "color" },
        { isComment: false, title: "Green", name: "--bs-green", value: "#198754", id: 27, type: "color" },
        { isComment: false, title: "Teal", name: "--bs-teal", value: "#20c997", id: 28, type: "color" },
        { isComment: false, title: "Cyan", name: "--bs-cyan", value: "#0dcaf0", id: 29, type: "color" },
        { isComment: false, title: "Gray", name: "--bs-gray", value: "#6c757d", id: 30, type: "color" },


        { isComment: true, title: "Gray scale" },
        { isComment: false, title: "Gray dark", name: "--bs-dark-dark", value: "#343a40", id: 31, type: "color" },
        { isComment: false, title: "Gray 100", name: "--bs-dark-100", value: "#f8f9fa", id: 32, type: "color" },
        { isComment: false, title: "Gray 200", name: "--bs-dark-200", value: "#e9ecef", id: 33, type: "color" },
        { isComment: false, title: "Gray 300", name: "--bs-dark-300", value: "#dee2e6", id: 34, type: "color" },
        { isComment: false, title: "Gray 400", name: "--bs-dark-400", value: "#ced4da", id: 35, type: "color" },
        { isComment: false, title: "Gray 500", name: "--bs-dark-500", value: "#adb5bd", id: 36, type: "color" },
        { isComment: false, title: "Gray 600", name: "--bs-dark-600", value: "#6c757d", id: 37, type: "color" },
        { isComment: false, title: "Gray 700", name: "--bs-dark-700", value: "#495057", id: 38, type: "color" },
        { isComment: false, title: "Gray 800", name: "--bs-dark-800", value: "#343a40", id: 39, type: "color" },
        { isComment: false, title: "Gray 900", name: "--bs-dark-900", value: "#212529", id: 40, type: "color" },



        { isComment: true, title: "# Border " },
        { isComment: false, title: "Border width", name: "--bs-border-widt", value: " 1px", id: 41, type: "string" },
        { isComment: false, title: "Border style", name: "--bs-border-style", value: "solid", id: 42, type: "string" },
        { isComment: false, title: "Border color", name: "--bs-border-color", value: "#dee2e6", id: 43, type: "color" },
        { isComment: false, title: "Border color - transluvent", name: "--bs-border-color-translucent", value: " rgba(0, 0, 0, 0.175)", id: 44, type: "color" },
        { isComment: false, title: "Border radius", name: "--bs-border-radius", value: " 0.375rem", id: 45, type: "string" },
        { isComment: false, title: "Border radius-sm", name: "--bs-border-radius-sm", value: "0.25rem", id: 46, type: "string" },
        { isComment: false, title: "Border radius-lg", name: "--bs-border-radius-lg", value: "0.5rem", id: 47, type: "string" },
        { isComment: false, title: "Border radius-x", name: "--bs-border-radius-x", value: " 1rem", id: 48, type: "string" },
        { isComment: false, title: "Border radius-2x", name: "--bs-border-radius-2x", value: " 2rem", id: 49, type: "string" },
        { isComment: false, title: "Border radius-pill", name: "--bs-border-radius-pill", value: "50rem", id: 50, type: "string" },


        { isComment: true, title: "# Gradient? " },
        { isComment: false, title: "Gradient", name: "--bs-gradient", value: "linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))", id: 51, type: "string" },



    ],
    "text": [
        { isComment: true, title: "# Headings" },
        { isComment: true, title: "Font" },
        { isComment: false, title: "Font sans serif", name: "--bs-font-sans-serif", value: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', id: 0, type: "string" },
        { isComment: false, title: "Font monospace", name: "--bs-font-monospace", value: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', id: 1, type: "string" },

        { isComment: false, title: "Body font family", name: "--bs-body-font-family", value: "var(--bs-font-sans-serif)", id: 2, type: "string" },

        { isComment: false, title: "Body font size", name: "--bs-body-font-size", value: "1rem", id: 3, type: "string" },
        { isComment: false, title: "Body font weight", name: "--bs-body-font-weight", value: "400", id: 4, type: "string" },
        { isComment: false, title: "Body line height", name: "--bs-body-line-height", value: "1.5", id: 5, type: "string" },


        { isComment: true, title: "Color" },
        { isComment: false, title: "Body color", name: "--bs-body-color", value: "#212529", id: 6, type: "color" },
        { isComment: false, title: "Heading color", name: "--bs-heading-color", value: " black", id: 7, type: "color" },
        { isComment: false, title: "Link color", name: "--bs-link-color", value: "#0d6efd", id: 8, type: "color" },
        { isComment: false, title: "Link hover color", name: "--bs-link-hover-color", value: "#0a58ca", id: 9, type: "color" },
        { isComment: false, title: "Code color", name: "--bs-code-color", value: "#d63384", id: 10, type: "color" },
        { isComment: false, title: "Highlight bg", name: "--bs-highlight-bg", value: "#fff3cd", id: 11, type: "color" },

    ],
    "components": [{ "title": "Accordion", "value": "<div class=\"accordion\" id=\"accordionExample\">\r\n  <div class=\"accordion-item\">\r\n    <h2 class=\"accordion-header\" id=\"headingOne\">\r\n      <button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\r\n        Accordion Item #1\r\n      </button>\r\n    </h2>\r\n    <div id=\"collapseOne\" class=\"accordion-collapse collapse show\" aria-labelledby=\"headingOne\" data-bs-parent=\"#accordionExample\">\r\n      <div class=\"accordion-body\">\r\n        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"accordion-item\">\r\n    <h2 class=\"accordion-header\" id=\"headingTwo\">\r\n      <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\r\n        Accordion Item #2\r\n      </button>\r\n    </h2>\r\n    <div id=\"collapseTwo\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingTwo\" data-bs-parent=\"#accordionExample\">\r\n      <div class=\"accordion-body\">\r\n        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"accordion-item\">\r\n    <h2 class=\"accordion-header\" id=\"headingThree\">\r\n      <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseThree\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\r\n        Accordion Item #3\r\n      </button>\r\n    </h2>\r\n    <div id=\"collapseThree\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingThree\" data-bs-parent=\"#accordionExample\">\r\n      <div class=\"accordion-body\">\r\n        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>", "id": 0 }, { "title": "Alerts", "value": "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"display: none;\">\r\n  <symbol id=\"check-circle-fill\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\r\n    <path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z\"/>\r\n  </symbol>\r\n  <symbol id=\"info-fill\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\r\n    <path d=\"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z\"/>\r\n  </symbol>\r\n  <symbol id=\"exclamation-triangle-fill\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\r\n    <path d=\"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z\"/>\r\n  </symbol>\r\n</svg>\r\n\r\n<div class=\"alert alert-primary d-flex align-items-center\" role=\"alert\">\r\n  <svg class=\"bi flex-shrink-0 me-2\" width=\"24\" height=\"24\" role=\"img\" aria-label=\"Info:\"><use xlink:href=\"#info-fill\"/></svg>\r\n  <div>\r\n    An example alert with an icon\r\n  </div>\r\n</div>\r\n<div class=\"alert alert-success d-flex align-items-center\" role=\"alert\">\r\n  <svg class=\"bi flex-shrink-0 me-2\" width=\"24\" height=\"24\" role=\"img\" aria-label=\"Success:\"><use xlink:href=\"#check-circle-fill\"/></svg>\r\n  <div>\r\n    An example success alert with an icon\r\n  </div>\r\n</div>\r\n<div class=\"alert alert-warning d-flex align-items-center\" role=\"alert\">\r\n  <svg class=\"bi flex-shrink-0 me-2\" width=\"24\" height=\"24\" role=\"img\" aria-label=\"Warning:\"><use xlink:href=\"#exclamation-triangle-fill\"/></svg>\r\n  <div>\r\n    An example warning alert with an icon\r\n  </div>\r\n</div>\r\n<div class=\"alert alert-danger d-flex align-items-center\" role=\"alert\">\r\n  <svg class=\"bi flex-shrink-0 me-2\" width=\"24\" height=\"24\" role=\"img\" aria-label=\"Danger:\"><use xlink:href=\"#exclamation-triangle-fill\"/></svg>\r\n  <div>\r\n    An example danger alert with an icon\r\n  </div>\r\n</div>", "id": 1 }, { "title": "Badge", "value": "<button type=\"button\" class=\"btn btn-primary position-relative\">\r\n  Profile\r\n  <span class=\"position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle\">\r\n    <span class=\"visually-hidden\">New alerts</span>\r\n  </span>\r\n</button>\r\n\r\n<button type=\"button\" class=\"btn btn-primary position-relative\">\r\n  Inbox\r\n  <span class=\"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger\">\r\n    99+\r\n    <span class=\"visually-hidden\">unread messages</span>\r\n  </span>\r\n</button>\r\n\r\n<button type=\"button\" class=\"btn btn-primary\">\r\n  Notifications <span class=\"badge text-bg-secondary\">4</span>\r\n</button>\r\n<h4>Example heading <span class=\"badge bg-secondary\">New</span></h4>\r\n<h5>Example heading <span class=\"badge bg-secondary\">New</span></h5>\r\n<span class=\"badge text-bg-primary\">Primary</span>\r\n<span class=\"badge text-bg-secondary\">Secondary</span>\r\n<span class=\"badge text-bg-success\">Success</span>\r\n<span class=\"badge text-bg-danger\">Danger</span>\r\n<span class=\"badge text-bg-warning\">Warning</span>\r\n<span class=\"badge text-bg-info\">Info</span>\r\n<span class=\"badge text-bg-light\">Light</span>\r\n<span class=\"badge text-bg-dark\">Dark</span>\r\n<span class=\"badge rounded-pill text-bg-primary\">Primary</span>\r\n<span class=\"badge rounded-pill text-bg-secondary\">Secondary</span>\r\n<span class=\"badge rounded-pill text-bg-success\">Success</span>\r\n<span class=\"badge rounded-pill text-bg-danger\">Danger</span>\r\n<span class=\"badge rounded-pill text-bg-warning\">Warning</span>\r\n<span class=\"badge rounded-pill text-bg-info\">Info</span>\r\n<span class=\"badge rounded-pill text-bg-light\">Light</span>\r\n<span class=\"badge rounded-pill text-bg-dark\">Dark</span>\r\n", "id": 2 }, { "title": "Breadcrumb", "value": "<nav aria-label=\"breadcrumb\">\r\n  <ol class=\"breadcrumb\">\r\n    <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\r\n    <li class=\"breadcrumb-item\"><a href=\"#\">Library</a></li>\r\n    <li class=\"breadcrumb-item active\" aria-current=\"page\">Data</li>\r\n  </ol>\r\n</nav>", "id": 3 }, { "value": "<h4>Regular</h4>\r\n<button type=\"button\" class=\"btn btn-primary\">Primary</button>\r\n<button type=\"button\" class=\"btn btn-secondary\">Secondary</button>\r\n<button type=\"button\" class=\"btn btn-success\">Success</button>\r\n<button type=\"button\" class=\"btn btn-danger\">Danger</button>\r\n<button type=\"button\" class=\"btn btn-warning\">Warning</button>\r\n<button type=\"button\" class=\"btn btn-info\">Info</button>\r\n<button type=\"button\" class=\"btn btn-light\">Light</button>\r\n<button type=\"button\" class=\"btn btn-dark\">Dark</button>\r\n\r\n<button type=\"button\" class=\"btn btn-link\">Link</button>\r\n<h4>Outlined</h4>\r\n<button type=\"button\" class=\"btn btn-outline-primary\">Primary</button>\r\n<button type=\"button\" class=\"btn btn-outline-secondary\">Secondary</button>\r\n<button type=\"button\" class=\"btn btn-outline-success\">Success</button>\r\n<button type=\"button\" class=\"btn btn-outline-danger\">Danger</button>\r\n<button type=\"button\" class=\"btn btn-outline-warning\">Warning</button>\r\n<button type=\"button\" class=\"btn btn-outline-info\">Info</button>\r\n<button type=\"button\" class=\"btn btn-outline-light\">Light</button>\r\n<button type=\"button\" class=\"btn btn-outline-dark\">Dark</button>\r\n\r\n<h4>Sizes</h4>\r\n<button type=\"button\" class=\"btn btn-primary btn-lg\">Large button</button>\r\n<button type=\"button\" class=\"btn btn-secondary btn-lg\">Large button</button>\r\n<button type=\"button\" class=\"btn btn-primary btn-sm\">Small button</button>\r\n<button type=\"button\" class=\"btn btn-secondary btn-sm\">Small button</button>\r\n<h4>Disabled</h4>\r\n<button type=\"button\" class=\"btn btn-primary\" disabled>Primary button</button>\r\n<button type=\"button\" class=\"btn btn-secondary\" disabled>Button</button>\r\n<button type=\"button\" class=\"btn btn-outline-primary\" disabled>Primary button</button>\r\n<button type=\"button\" class=\"btn btn-outline-secondary\" disabled>Button</button>\r\n<h4>Block</h4>\r\n<div class=\"d-grid gap-2\">\r\n  <button class=\"btn btn-primary\" type=\"button\">Button</button>\r\n  <button class=\"btn btn-primary\" type=\"button\">Button</button>\r\n</div>", "title": "Buttons", "id": 4 }, { "value": "<div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\r\n  <button type=\"button\" class=\"btn btn-primary\">Left</button>\r\n  <button type=\"button\" class=\"btn btn-primary\">Middle</button>\r\n  <button type=\"button\" class=\"btn btn-primary\">Right</button>\r\n</div>\r\n\r\n<div class=\"btn-group\" role=\"group\" aria-label=\"Basic outlined example\">\r\n  <button type=\"button\" class=\"btn btn-outline-primary\">Left</button>\r\n  <button type=\"button\" class=\"btn btn-outline-primary\">Middle</button>\r\n  <button type=\"button\" class=\"btn btn-outline-primary\">Right</button>\r\n</div>\r\n\r\n<div class=\"btn-group\" role=\"group\" aria-label=\"Basic radio toggle button group\">\r\n  <input type=\"radio\" class=\"btn-check\" name=\"btnradio\" id=\"btnradio1\" autocomplete=\"off\" checked>\r\n  <label class=\"btn btn-outline-primary\" for=\"btnradio1\">Radio 1</label>\r\n\r\n  <input type=\"radio\" class=\"btn-check\" name=\"btnradio\" id=\"btnradio2\" autocomplete=\"off\">\r\n  <label class=\"btn btn-outline-primary\" for=\"btnradio2\">Radio 2</label>\r\n\r\n  <input type=\"radio\" class=\"btn-check\" name=\"btnradio\" id=\"btnradio3\" autocomplete=\"off\">\r\n  <label class=\"btn btn-outline-primary\" for=\"btnradio3\">Radio 3</label>\r\n</div>", "title": "Button group", "id": 5 }, { "value": "<div class=\"card\" style=\"width: 18rem;\">\r\n  <img src=\"...\" class=\"card-img-top\" alt=\"...\">\r\n  <div class=\"card-body\">\r\n    <h5 class=\"card-title\">Card title</h5>\r\n    <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p>\r\n    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\r\n  </div>\r\n</div>\r\n<div class=\"card\">\r\n  <div class=\"card-body\">\r\n    This is some text within a card body.\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card\" style=\"width: 18rem;\">\r\n  <div class=\"card-body\">\r\n    <h5 class=\"card-title\">Card title</h5>\r\n    <h6 class=\"card-subtitle mb-2 text-muted\">Card subtitle</h6>\r\n    <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p>\r\n    <a href=\"#\" class=\"card-link\">Card link</a>\r\n    <a href=\"#\" class=\"card-link\">Another link</a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card\">\r\n  <div class=\"card-header\">\r\n    Featured\r\n  </div>\r\n  <div class=\"card-body\">\r\n    <h5 class=\"card-title\">Special title treatment</h5>\r\n    <p class=\"card-text\">With supporting text below as a natural lead-in to additional content.</p>\r\n    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\r\n  </div>\r\n</div>", "title": "Cards", "id": 6 }, { "value": "<div id=\"carouselExampleIndicators\" class=\"carousel slide\" data-bs-ride=\"true\">\r\n  <div class=\"carousel-indicators\">\r\n    <button type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide-to=\"0\" class=\"active\" aria-current=\"true\" aria-label=\"Slide 1\"></button>\r\n    <button type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide-to=\"1\" aria-label=\"Slide 2\"></button>\r\n    <button type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide-to=\"2\" aria-label=\"Slide 3\"></button>\r\n  </div>\r\n  <div class=\"carousel-inner\">\r\n    <div class=\"carousel-item active\">\r\n      <img src=\"...\" class=\"d-block w-100\" alt=\"...\">\r\n    </div>\r\n    <div class=\"carousel-item\">\r\n      <img src=\"...\" class=\"d-block w-100\" alt=\"...\">\r\n    </div>\r\n    <div class=\"carousel-item\">\r\n      <img src=\"...\" class=\"d-block w-100\" alt=\"...\">\r\n    </div>\r\n  </div>\r\n  <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide=\"prev\">\r\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n    <span class=\"visually-hidden\">Previous</span>\r\n  </button>\r\n  <button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide=\"next\">\r\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n    <span class=\"visually-hidden\">Next</span>\r\n  </button>\r\n</div>", "title": "Carousel", "id": 7 }, { "value": "<div class=\"dropdown\">\r\n  <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton1\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\r\n    Dropdown button\r\n  </button>\r\n  <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton1\">\r\n    <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\r\n    <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\r\n    <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\r\n  </ul>\r\n</div>", "title": "Dropdown", "id": 8 }, { "value": "<!-- Button trigger modal -->\r\n<button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\">\r\n  Launch demo modal\r\n</button>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Modal title</h5>\r\n        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        ...\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>", "title": "Modal", "id": 9 }, { "value": "<nav class=\"navbar navbar-expand-lg bg-light\">\r\n  <div class=\"container-fluid\">\r\n    <a class=\"navbar-brand\" href=\"#\">Navbar</a>\r\n    <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n      <ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link active\" aria-current=\"page\" href=\"#\">Home</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#\">Link</a>\r\n        </li>\r\n        <li class=\"nav-item dropdown\">\r\n          <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\r\n            Dropdown\r\n          </a>\r\n          <ul class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n            <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\r\n            <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\r\n            <li><hr class=\"dropdown-divider\"></li>\r\n            <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\r\n          </ul>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link disabled\">Disabled</a>\r\n        </li>\r\n      </ul>\r\n      <form class=\"d-flex\" role=\"search\">\r\n        <input class=\"form-control me-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\r\n        <button class=\"btn btn-outline-success\" type=\"submit\">Search</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</nav>\r\n\r\n<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\r\n  <div class=\"container-fluid\">\r\n    <a class=\"navbar-brand\" href=\"#\">Navbar</a>\r\n    <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n      <ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link active\" aria-current=\"page\" href=\"#\">Home</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#\">Link</a>\r\n        </li>\r\n        <li class=\"nav-item dropdown\">\r\n          <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\r\n            Dropdown\r\n          </a>\r\n          <ul class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n            <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\r\n            <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\r\n            <li><hr class=\"dropdown-divider\"></li>\r\n            <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\r\n          </ul>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link disabled\">Disabled</a>\r\n        </li>\r\n      </ul>\r\n      <form class=\"d-flex\" role=\"search\">\r\n        <input class=\"form-control me-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\r\n        <button class=\"btn btn-outline-success\" type=\"submit\">Search</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</nav>\r\n\r\n\r\n<nav class=\"navbar navbar-expand-lg navbar-dark bg-primary\">\r\n  <div class=\"container-fluid\">\r\n    <a class=\"navbar-brand\" href=\"#\">Navbar</a>\r\n    <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n      <span class=\"navbar-toggler-icon\"></span>\r\n    </button>\r\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n      <ul class=\"navbar-nav me-auto mb-2 mb-lg-0\">\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link active\" aria-current=\"page\" href=\"#\">Home</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link\" href=\"#\">Link</a>\r\n        </li>\r\n        <li class=\"nav-item dropdown\">\r\n          <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\r\n            Dropdown\r\n          </a>\r\n          <ul class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n            <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\r\n            <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\r\n            <li><hr class=\"dropdown-divider\"></li>\r\n            <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\r\n          </ul>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a class=\"nav-link disabled\">Disabled</a>\r\n        </li>\r\n      </ul>\r\n      <form class=\"d-flex\" role=\"search\">\r\n        <input class=\"form-control me-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\r\n        <button class=\"btn btn-outline-success\" type=\"submit\">Search</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</nav>", "title": "NavBar", "id": 10 }, { "value": "<a class=\"btn btn-primary\" data-bs-toggle=\"offcanvas\" href=\"#offcanvasExample\" role=\"button\" aria-controls=\"offcanvasExample\">\r\n  Link with href\r\n</a>\r\n<button class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"offcanvas\" data-bs-target=\"#offcanvasExample\" aria-controls=\"offcanvasExample\">\r\n  Button with data-bs-target\r\n</button>\r\n\r\n<div class=\"offcanvas offcanvas-start\" tabindex=\"-1\" id=\"offcanvasExample\" aria-labelledby=\"offcanvasExampleLabel\">\r\n  <div class=\"offcanvas-header\">\r\n    <h5 class=\"offcanvas-title\" id=\"offcanvasExampleLabel\">Offcanvas</h5>\r\n    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"offcanvas\" aria-label=\"Close\"></button>\r\n  </div>\r\n  <div class=\"offcanvas-body\">\r\n    <div>\r\n      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.\r\n    </div>\r\n    <div class=\"dropdown mt-3\">\r\n      <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-bs-toggle=\"dropdown\">\r\n        Dropdown button\r\n      </button>\r\n      <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\r\n        <li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\r\n        <li><a class=\"dropdown-item\" href=\"#\">Another action</a></li>\r\n        <li><a class=\"dropdown-item\" href=\"#\">Something else here</a></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n", "title": "Offcanvas", "id": 11 }, { "value": "<nav aria-label=\"Page navigation example\">\r\n  <ul class=\"pagination\">\r\n    <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Previous</a></li>\r\n    <li class=\"page-item\"><a class=\"page-link\" href=\"#\">1</a></li>\r\n    <li class=\"page-item active\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n    <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n    <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n  </ul>\r\n</nav>\r\n\r\n<nav aria-label=\"Page navigation example\">\r\n  <ul class=\"pagination\">\r\n    <li class=\"page-item\">\r\n      <a class=\"page-link\" href=\"#\" aria-label=\"Previous\">\r\n        <span aria-hidden=\"true\">&laquo;</span>\r\n      </a>\r\n    </li>\r\n    <li class=\"page-item\"><a class=\"page-link\" href=\"#\">1</a></li>\r\n    <li class=\"page-item active\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n    <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n    <li class=\"page-item\">\r\n      <a class=\"page-link\" href=\"#\" aria-label=\"Next\">\r\n        <span aria-hidden=\"true\">&raquo;</span>\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</nav>", "title": "Pagination", "id": 12 }, { "value": "<div class=\"card\">\r\n  <img src=\"...\" class=\"card-img-top\" alt=\"...\">\r\n\r\n  <div class=\"card-body\">\r\n    <h5 class=\"card-title\">Card title</h5>\r\n    <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the card's content.</p>\r\n    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"card\" aria-hidden=\"true\">\r\n  <img src=\"...\" class=\"card-img-top\" alt=\"...\">\r\n  <div class=\"card-body\">\r\n    <h5 class=\"card-title placeholder-glow\">\r\n      <span class=\"placeholder col-6\"></span>\r\n    </h5>\r\n    <p class=\"card-text placeholder-glow\">\r\n      <span class=\"placeholder col-7\"></span>\r\n      <span class=\"placeholder col-4\"></span>\r\n      <span class=\"placeholder col-4\"></span>\r\n      <span class=\"placeholder col-6\"></span>\r\n      <span class=\"placeholder col-8\"></span>\r\n    </p>\r\n    <a href=\"#\" tabindex=\"-1\" class=\"btn btn-primary disabled placeholder col-6\"></a>\r\n  </div>\r\n</div>", "title": "Placeholders", "id": 13 }, { "value": "<button type=\"button\" class=\"btn btn-secondary\" data-bs-container=\"body\" data-bs-toggle=\"popover\" data-bs-placement=\"top\" data-bs-content=\"Top popover\">\r\n  Popover on top\r\n</button>\r\n<button type=\"button\" class=\"btn btn-secondary\" data-bs-container=\"body\" data-bs-toggle=\"popover\" data-bs-placement=\"right\" data-bs-content=\"Right popover\">\r\n  Popover on right\r\n</button>\r\n<button type=\"button\" class=\"btn btn-secondary\" data-bs-container=\"body\" data-bs-toggle=\"popover\" data-bs-placement=\"bottom\" data-bs-content=\"Bottom popover\">\r\n  Popover on bottom\r\n</button>\r\n<button type=\"button\" class=\"btn btn-secondary\" data-bs-container=\"body\" data-bs-toggle=\"popover\" data-bs-placement=\"left\" data-bs-content=\"Left popover\">\r\n  Popover on left\r\n</button>", "title": "Popover", "id": 14 }, { "value": "<div class=\"progress\">\r\n  <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 50%\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 75%\" aria-valuenow=\"75\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" style=\"width: 10%\" aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar progress-bar-striped bg-success\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar progress-bar-striped bg-info\" role=\"progressbar\" style=\"width: 50%\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar progress-bar-striped bg-warning\" role=\"progressbar\" style=\"width: 75%\" aria-valuenow=\"75\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar progress-bar-striped bg-danger\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\r\n</div>\r\n\r\n<div class=\"progress\">\r\n  <div class=\"progress-bar progress-bar-striped progress-bar-animated\" role=\"progressbar\" aria-valuenow=\"75\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 75%\"></div>\r\n</div>", "title": "Progress", "id": 15 }, { "value": "<div class=\"spinner-border text-primary\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-border text-secondary\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-border text-success\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-border text-danger\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-border text-warning\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-border text-info\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-border text-light\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-border text-dark\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n\r\n<div class=\"spinner-grow text-primary\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-grow text-secondary\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-grow text-success\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-grow text-danger\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-grow text-warning\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-grow text-info\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-grow text-light\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>\r\n<div class=\"spinner-grow text-dark\" role=\"status\">\r\n  <span class=\"visually-hidden\">Loading...</span>\r\n</div>", "title": "Spinners", "id": 16 }, { "value": "<button type=\"button\" class=\"btn btn-primary\" id=\"liveToastBtn\">Show live toast</button>\r\n\r\n<div class=\"toast-container position-fixed bottom-0 end-0 p-3\">\r\n  <div id=\"liveToast\" class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\r\n    <div class=\"toast-header\">\r\n      <img src=\"...\" class=\"rounded me-2\" alt=\"...\">\r\n      <strong class=\"me-auto\">Bootstrap</strong>\r\n      <small>11 mins ago</small>\r\n      <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\r\n    </div>\r\n    <div class=\"toast-body\">\r\n      Hello, world! This is a toast message.\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<p>Vevím, ale asi to nefunguje ._.</p>", "title": "Toast", "id": 17 }, { "value": "<button type=\"button\" class=\"btn btn-secondary\"\r\n        data-bs-toggle=\"tooltip\" data-bs-placement=\"top\"\r\n        data-bs-custom-class=\"custom-tooltip\"\r\n        title=\"This top tooltip is themed via CSS variables.\">\r\n  Custom tooltip\r\n</button>\r\n\r\n<button type=\"button\" class=\"btn btn-secondary\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Tooltip on top\">\r\n  Tooltip on top\r\n</button>\r\n<button type=\"button\" class=\"btn btn-secondary\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Tooltip on right\">\r\n  Tooltip on right\r\n</button>\r\n<button type=\"button\" class=\"btn btn-secondary\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" title=\"Tooltip on bottom\">\r\n  Tooltip on bottom\r\n</button>\r\n<button type=\"button\" class=\"btn btn-secondary\" data-bs-toggle=\"tooltip\" data-bs-placement=\"left\" title=\"Tooltip on left\">\r\n  Tooltip on left\r\n</button>", "title": "Tooltips", "id": 18 }, { "value": "<div class=\"shadow-none p-3 mb-5 bg-light rounded\">No shadow</div>\r\n<div class=\"shadow-sm p-3 mb-5 bg-body rounded\">Small shadow</div>\r\n<div class=\"shadow p-3 mb-5 bg-body rounded\">Regular shadow</div>\r\n<div class=\"shadow-lg p-3 mb-5 bg-body rounded\">Larger shadow</div>", "title": "Shadows", "id": 19 }, { "value": "<p class=\"fw-bold\">Bold text.</p>\r\n<p class=\"fw-bolder\">Bolder weight text (relative to the parent element).</p>\r\n<p class=\"fw-semibold\">Semibold weight text.</p>\r\n<p class=\"fw-normal\">Normal weight text.</p>\r\n<p class=\"fw-light\">Light weight text.</p>\r\n<p class=\"fw-lighter\">Lighter weight text (relative to the parent element).</p>\r\n<p class=\"fst-italic\">Italic text.</p>\r\n<p class=\"fst-normal\">Text with normal font style</p>\r\n\r\n<p class=\"text-muted\">\r\n  Muted text with a <a href=\"#\" class=\"text-reset\">reset link</a>.\r\n</p>\r\n\r\n<p class=\"text-decoration-underline\">This text has a line underneath it.</p>\r\n<p class=\"text-decoration-line-through\">This text has a line going through it.</p>\r\n<a href=\"#\" class=\"text-decoration-none\">This link has its text decoration removed</a>", "title": "Text", "id": 20 }, { "value": "<select class=\"form-select\" aria-label=\"Default select example\">\r\n  <option selected>Open this select menu</option>\r\n  <option value=\"1\">One</option>\r\n  <option value=\"2\">Two</option>\r\n  <option value=\"3\">Three</option>\r\n</select>", "title": "Input", "id": 21 }],
    "styles": [
        { value: "", title: "Ahoj", id: 0 }
    ],
    "animations": [

    ],

}
