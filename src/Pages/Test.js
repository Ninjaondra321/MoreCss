import { useState } from "react";
import { Helmet } from "react-helmet";
// import "../Styles/uikit-default.css"

const Test = () => {
    return <div>

        <Helmet>
            <style>
                {`
                body {
                    background-color: white !important;
                }
            `}
            </style>
        </Helmet>

        <div class="uk-section uk-section-default">
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
                <hr />
                <hr class="uk-divider-icon" />

                <h1>Inputs and form validation</h1>
                <div class="uk-margin">
                    <input class="uk-input uk-form-danger uk-form-width-medium" type="text" placeholder="form-danger"
                        value="form-danger" />
                </div>

                <div class="uk-margin">
                    <input class="uk-input uk-form-success uk-form-width-medium" type="text" placeholder="form-success"
                        value="form-success" />
                </div>

                <div class="uk-margin">
                    <input class="uk-input uk-form-width-medium" type="text" placeholder="disabled" value="disabled"
                        disabled />
                </div>

                <div class="uk-margin">
                    <div class="uk-inline">
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                        <input class="uk-input" type="text" />
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

    </div>
}

export default Test;