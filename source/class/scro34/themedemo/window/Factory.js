/* ************************************************************************

   Copyright:
     2024 Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dmitrii Zolotov (goldim)

************************************************************************ */

qx.Class.define("scro34.themedemo.window.Factory", {
    type: "static",

    statics: {
        getWindow(name){
            switch (name){
                case "WidgetBrowser":
                    return new scro34.themedemo.window.WidgetBrowser();
                case "WebBrowser":
                    return new scro34.themedemo.window.WebBrowser();
                case "Table":
                    return new scro34.themedemo.window.Table();
                case "Calculator":
                    return new scro34.themedemo.window.Calculator();
                case "ColorSelector":
                    return new scro34.themedemo.window.ColorChooser();
                case "AudioPlayer":
                    return new scro34.themedemo.window.Player();
            }
        }
    }
});