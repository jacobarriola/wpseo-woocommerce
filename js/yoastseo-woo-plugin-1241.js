/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./js/src/yoastseo-woo-handle-excerpt-editors.js\n/* global YoastSEO tinyMCE jQuery */\n\n/*\n * This module handles getting the excerpt/short product description\n * from the excerpt editor and sending the updated\n * excerpt to the analysis web worker when it changes.\n *\n * Handles the Visual- as well as the Text editor.\n */\n\nconst EXCERPT_EDITOR_ID = \"excerpt\";\n\n/**\n * Returns whether or not the TinyMCE script is available on the page.\n *\n * @returns {boolean} True when TinyMCE is loaded.\n */\nfunction isTinyMCELoaded() {\n\treturn (\n\t\ttypeof tinyMCE !== \"undefined\" &&\n\t\ttypeof tinyMCE.editors !== \"undefined\" &&\n\t\ttinyMCE.editors.length >= 0\n\t);\n}\n\n/**\n * Gets content from the Text editor field by element id.\n *\n * @param {string} elementID The (HTML) id attribute of the Text editor to get the contents from.\n *\n * @returns {string} The editor's content.\n */\nfunction getTextEditorContent( elementID ) {\n\treturn document.getElementById( elementID ) && document.getElementById( elementID ).value || \"\";\n}\n\n/**\n * Returns whether or not a TinyMCE editor with the given ID is available.\n *\n * @param {string} editorID The ID of the TinyMCE editor.\n *\n * @returns {boolean} Whether TinyMCE is available.\n */\nfunction isTinyMCEAvailable( editorID ) {\n\tif ( ! isTinyMCELoaded() ) {\n\t\treturn false;\n\t}\n\tconst editor = tinyMCE.get( editorID );\n\treturn editor !== null && ! editor.isHidden();\n}\n\n/**\n * Returns the excerpt/short product description.\n *\n * @returns {string} The excerpt.\n */\nfunction getExcerpt() {\n\tif ( isTinyMCEAvailable( EXCERPT_EDITOR_ID ) ) {\n\t\t// User has Visual editor activated.\n\t\tconst excerptElement = tinyMCE.get( EXCERPT_EDITOR_ID );\n\t\treturn excerptElement.getContent();\n\t}\n\t// User has Text editor activated.\n\treturn getTextEditorContent( EXCERPT_EDITOR_ID );\n}\n\n/**\n * Sends a new short product description to the worker.\n *\n * @param {AnalysisWebWorker} worker The worker to send the the message to.\n *\n * @returns {void}\n */\nfunction handleExcerptChange( worker ) {\n\tconst excerpt = getExcerpt();\n\n\tworker.sendMessage( \"updateProductDescription\", excerpt, \"YoastWooCommerce\" );\n\n\tYoastSEO.app.refresh();\n}\n\n/**\n * Adds event handlers for when the text in the excerpt Visual editor changes.\n * A new excerpt/short product description gets sent to the web worker when it does.\n *\n * @param {AnalysisWebWorker} worker The web worker to which to send the excerpts.\n * @returns {void}\n */\nfunction addVisualEditorEventHandlers( worker ) {\n\tconst excerptElement = tinyMCE.get( EXCERPT_EDITOR_ID );\n\texcerptElement.on( \"change\", () => handleExcerptChange( worker ) );\n\texcerptElement.on( \"input\", () => handleExcerptChange( worker ) );\n}\n\n/**\n * Adds event handlers for when the text in the excerpt raw Text editor changes.\n * A new excerpt/short product description gets sent to the web worker when it does.\n *\n * @param {AnalysisWebWorker} worker The web worker to which to send the excerpts.\n * @returns {void}\n */\nfunction addTextEditorEventHandlers( worker ) {\n\tconst excerptElement = jQuery( \"#excerpt\" );\n\texcerptElement.on( \"change\", () => handleExcerptChange( worker ) );\n\texcerptElement.on( \"input\", () => handleExcerptChange( worker ) );\n}\n\n/**\n * Adds event handlers for when the excerpt/short product description changes\n * in either the Text- or the Visual editor.\n *\n * A new excerpt/short product description gets sent to the web worker when the\n * text changes.\n *\n * @param {AnalysisWebWorker} worker The analysis web worker to send messages to.\n * @returns {void}\n */\nfunction addExcerptEventHandlers( worker ) {\n\t/*\n\t  Text editor is always available, but hidden.\n\t  So we can add event handlers on startup.\n\t */\n\taddTextEditorEventHandlers( worker );\n\n\t/*\n\t  Visual editor is added / removed on switch,\n\t  so check if we are in Visual mode on startup.\n\t */\n\tif ( isTinyMCEAvailable( EXCERPT_EDITOR_ID ) ) {\n\t\taddVisualEditorEventHandlers( worker );\n\t}\n\n\tif ( isTinyMCELoaded() ) {\n\t\ttinyMCE.on( \"AddEditor\", ( event ) => {\n\t\t\t// Switched to excerpt Visual editor.\n\t\t\tif ( event.editor.id === \"excerpt\" ) {\n\t\t\t\taddVisualEditorEventHandlers( worker );\n\t\t\t}\n\t\t} );\n\t}\n}\n\n// CONCATENATED MODULE: ./js/src/yoastseo-woo-plugin.js\n/* global YoastSEO, wpseoWooL10n */\n\n\n\nconst PLUGIN_NAME = \"YoastWooCommerce\";\n\n/**\n * Counters for the setTimeouts, used to make sure we don't end up in an infinite loop.\n *\n * @type {number}\n */\nvar buttonEventCounter = 0;\nvar deleteEventCounter = 0;\n\n/**\n * Represents the Yoast Woocommerce plugin.\n */\nclass yoastseo_woo_plugin_YoastWooCommercePlugin {\n\t/**\n\t * Registers Plugin and Test for Yoast WooCommerce.\n\t *\n\t * @returns {void}\n\t */\n\tconstructor() {\n\t\tthis.loadWorkerScript();\n\n\t\tYoastSEO.app.registerPlugin( \"YoastWooCommercePlugin\", { status: \"ready\" } );\n\n\t\tthis.registerModifications();\n\n\t\tthis.bindEvents();\n\t}\n\n\t/**\n\t * Loads our worker script into the analysis worker.\n\t *\n\t * @returns {void}\n\t */\n\tloadWorkerScript() {\n\t\tif ( typeof YoastSEO === \"undefined\" || typeof YoastSEO.analysis === \"undefined\" || typeof YoastSEO.analysis.worker === \"undefined\" ) {\n\t\t\treturn;\n\t\t}\n\n\t\tconst worker = YoastSEO.analysis.worker;\n\t\tconst productDescription = getExcerpt();\n\n\t\tworker.loadScript( wpseoWooL10n.script_url )\n\t\t\t.then( () => worker.sendMessage( \"initialize\", { l10n: wpseoWooL10n, productDescription }, PLUGIN_NAME ) )\n\t\t\t.then( YoastSEO.app.refresh );\n\n\t\taddExcerptEventHandlers( worker );\n\t}\n\n\t/**\n\t * Binds events to the add_product_images anchor.\n\t *\n\t * @returns {void}\n\t */\n\tbindEvents() {\n\t\tjQuery( \".add_product_images\" ).find( \"a\" ).on( \"click\", this.bindLinkEvent.bind( this ) );\n\t}\n\n\t/**\n\t * After the modal dialog is opened, check for the button that adds images to the gallery to trigger\n\t * the modification.\n\t *\n\t * @returns {void}\n\t */\n\tbindLinkEvent() {\n\t\tif ( jQuery( \".media-modal-content\" ).find( \".media-button\" ).length === 0 ) {\n\t\t\tbuttonEventCounter++;\n\t\t\tif ( buttonEventCounter < 10 ) {\n\t\t\t\tsetTimeout( this.bindLinkEvent.bind( this ) );\n\t\t\t}\n\t\t} else {\n\t\t\tbuttonEventCounter = 0;\n\t\t\tjQuery( \".media-modal-content\" ).find( \".media-button\" ).on( \"click\", this.buttonCallback.bind( this )  );\n\t\t}\n\t}\n\n\t/**\n\t * After the gallery is added, call the analyzeTimer of the app, to add the modifications.\n\t * Also call the bindDeleteEvent, to bind the analyzerTimer when an image is deleted.\n\t *\n\t * @returns {void}\n\t */\n\tbuttonCallback() {\n\t\tYoastSEO.app.analyzeTimer();\n\t\tthis.bindDeleteEvent();\n\t}\n\n\t/**\n\t * Checks if the delete buttons of the added images are available. When they are, bind the analyzeTimer function\n\t * so when a image is removed, the modification is run.\n\t *\n\t * @returns {void}\n\t */\n\tbindDeleteEvent() {\n\t\tif ( jQuery( \"#product_images_container\" ).find( \".delete\" ).length === 0 ) {\n\t\t\tdeleteEventCounter++;\n\t\t\tif ( deleteEventCounter < 10 ) {\n\t\t\t\tsetTimeout( this.bindDeleteEvent.bind( this ) );\n\t\t\t}\n\t\t} else {\n\t\t\tdeleteEventCounter = 0;\n\t\t\tjQuery( \"#product_images_container\" ).find( \".delete\" ).on( \"click\", YoastSEO.app.analyzeTimer.bind( YoastSEO.app ) );\n\t\t}\n\t}\n\n\t/**\n\t * Registers the addImageToContent modification.\n\t *\n\t * @returns {void}\n\t */\n\tregisterModifications() {\n\t\tvar callback = this.addImageToContent.bind( this );\n\n\t\tYoastSEO.app.registerModification( \"content\", callback, \"YoastWooCommercePlugin\", 10 );\n\t}\n\n\t/**\n\t * Adds the images from the page gallery to the content to be analyzed by the analyzer.\n\t *\n\t * @param {string} data The data string that does not have the images outer html.\n\t *\n\t * @returns {string} The data string parameter with the images outer html.\n\t */\n\taddImageToContent( data ) {\n\t\tvar images = jQuery( \"#product_images_container\" ).find( \"img\" );\n\n\t\tfor ( var i = 0; i < images.length; i++ ) {\n\t\t\tdata += images[ i ].outerHTML;\n\t\t}\n\t\treturn data;\n\t}\n}\n\n/**\n * Adds eventlistener to load the Yoast WooCommerce plugin.\n */\nif ( typeof YoastSEO !== \"undefined\" && typeof YoastSEO.app !== \"undefined\" ) {\n\tnew yoastseo_woo_plugin_YoastWooCommercePlugin(); // eslint-disable-line no-new\n} else {\n\tjQuery( window ).on(\n\t\t\"YoastSEO:ready\",\n\t\tfunction() {\n\t\t\tnew yoastseo_woo_plugin_YoastWooCommercePlugin(); // eslint-disable-line no-new\n\t\t}\n\t);\n}\n\n\n//# sourceURL=webpack:///./js/src/yoastseo-woo-plugin.js_+_1_modules?");

/***/ })

/******/ });