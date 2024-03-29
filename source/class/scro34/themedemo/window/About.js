/* ************************************************************************

   Copyright:
     2015-2024 Norbert Schröder

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)
     * Dmitrii Zolotov (goldim)

************************************************************************ */

/**
 * @asset(scro34/themedemo/blank.html)
 */
qx.Class.define("scro34.themedemo.window.About", {
  extend: scro34.themedemo.window.Window,

  construct(link) {
    this._aboutTextUrl = link;
    super();
  },

  members: {
    _aboutTextUrl: null,

    _createControls() {
      this.set({
        layout: new qx.ui.layout.VBox(0),
        caption: "About",
        contentPadding: 5,
        showMaximize: false,
        showMinimize: false,
        resizable: false,
      });

      if (!this._aboutTextUrl) {
        this._aboutTextUrl = "scro34/themedemo/blank.html";
      }

      var url = qx.util.ResourceManager.getInstance().toUri(this._aboutTextUrl);

      var textBox = new qx.ui.embed.ThemedIframe(url).set({
        width: 580,
        height: 350
      });

      this.add(textBox, { flex: 1 });
      this.add(
        new qx.ui.menu.Separator().set({
          margin: 5,
        })
      );
      this.add(this._getButtonBox());

      this.addListenerOnce("appear", this.center, this);
    },

    _getButtonBox() {
      var btnClose = new qx.ui.form.Button("Close").set({ width: 100 });
      btnClose.addState("circle");
      btnClose.addListener("execute", this.close, this);

      var container = new qx.ui.container.Composite(
        new qx.ui.layout.HBox().set({
          alignX: "center",
        })
      );
      container.add(btnClose);

      return container;
    },
  },
});
