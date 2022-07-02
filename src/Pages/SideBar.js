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
            localStorage.setItem("MoreCss-" + projectName, JSON.stringify(UiKit))
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
        { isComment: false, title: "Primary color", name: "--primary-color", value: "#225588", id: 0, type: "color" },
        { isComment: false, title: "Primary color tone1", name: "--primary-color-tone1", value: "#225588", id: 1, type: "color" },
        { isComment: false, title: "Primary color tone2", name: "--primary-color-tone2", value: "#225588", id: 2, type: "color" },
        { isComment: true, title: "Secondary color" },
        { isComment: false, title: "Secondary color", name: "--secondary-color", value: "#225588", id: 3, type: "color" },
        { isComment: false, title: "Secondary color tone1", name: "--secondary-color-tone1", value: "#225588", id: 4, type: "color" },
        { isComment: false, title: "Secondary color tone2", name: "--secondary-color-tone2", value: "#225588", id: 5, type: "color" },
        { isComment: true, title: "Terciary color" },
        { isComment: false, title: "Terciary color", name: "--terciary-color", value: "#225588", id: 6, type: "color" },
        { isComment: false, title: "Terciary color tone1", name: "--terciary-color-tone1", value: "#225588", id: 7, type: "color" },
        { isComment: false, title: "Terciary color tone2", name: "--terciary-color-tone2", value: "#225588", id: 8, type: "color" },
        { isComment: true, title: "# Semafor colors" },
        { isComment: true, title: "Success" },
        { isComment: false, title: "Success color", name: "--success-color", value: "#225588", id: 9, type: "color" },
        { isComment: false, title: "Success color tone1", name: "--success-color-tone1", value: "#225588", id: 10, type: "color" },
        { isComment: false, title: "Success color tone2", name: "--success-color-tone2", value: "#225588", id: 11, type: "color" },
        { isComment: true, title: "Warning" },
        { isComment: false, title: "Warning color", name: "--warning-color", value: "#225588", id: 12, type: "color" },
        { isComment: false, title: "Warning color tone1", name: "--warning-color-tone1", value: "#225588", id: 13, type: "color" },
        { isComment: false, title: "Warning color tone2", name: "--warning-color-tone2", value: "#225588", id: 14, type: "color" },
        { isComment: true, title: "Danger" },
        { isComment: false, title: "Danger color", name: "--danger-color", value: "#225588", id: 15, type: "color" },
        { isComment: false, title: "Danger color tone1", name: "--danger-color-tone1", value: "#225588", id: 16, type: "color" },
        { isComment: false, title: "Danger color tone2", name: "--danger-color-tone2", value: "#225588", id: 17, type: "color" },
        { isComment: true, title: "Background" },
        { isComment: false, title: "Background color", name: "--background-color", value: "#225588", id: 22, type: "string" },
    ],
    "text": [
        { isComment: true, title: "# Headings" },
        { isComment: true, title: "Font" },
        { isComment: true, title: "" },

    ],
    "components": [
        { title: "Button - primary", value: "<button>Click me!<button/>", id: 0 },
        { title: "Button - primary", value: "<button>Click me!<button/>", id: 1 },
        { title: "Button - primary", value: "<button>Click me!<button/>", id: 2 },
        { title: "Button - primary", value: "<button>Click me!<button/>", id: 3 },
    ],
    "styles": [
        { value: "", title: "Ahoj", id: 0 }
    ],
    "animations": [

    ],

}
