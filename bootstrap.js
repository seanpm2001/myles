const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
var oldRetriever;
var Zotero;

/*
 * Zotero runs citeproc-js synchronously within an async thread. We
 * can retrieve modules synchronously inside citeproc-js, and the
 * additional I/O will not impact the UI. Whew.
 */

function getRetriever (Zotero) {
    return function (jurisdiction, preference) {
        jurisdiction = jurisdiction.replace(/\:/g, "+");
	    var id = preference ? "juris-" + jurisdiction + "-" + preference : "juris-" + jurisdiction;
        var ret;
        try {
	        ret = Zotero.File.getContentsFromURL("chrome://myles-styles/content/" + id + ".csl");
        } catch (e) {
            ret = false;
        }
        return ret;
    }
}

var startupObserver = {
    observe: function(subject, topic, data) {
        Zotero = Cc["@zotero.org/Zotero;1"]
	        .getService(Ci.nsISupports)
	        .wrappedJSObject;
        oldRetriever = Zotero.CiteProc.CSL.retrieveStyleModule;
        Zotero.CiteProc.CSL.retrieveStyleModule = getRetriever(Zotero);
    },
    register: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"]
            .getService(Components.interfaces.nsIObserverService);
        observerService.addObserver(this, "final-ui-startup", false);
    },
    unregister: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"]
            .getService(Components.interfaces.nsIObserverService);
        observerService.removeObserver(this, "final-ui-startup");
    }
}

/*
 * Bootstrap functions
 */

function startup (data, reason) {
    startupObserver.register();
}

function shutdown (data, reason) {
    startupObserver.unregister();
    Zotero.CiteProc.CSL.retrieveStyleModule = oldRetriever;
}

function install (data, reason) {}
function uninstall (data, reason) {}
