/* ************************************************************************

   qooxdoo - the new era of web development

   https://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * ???

************************************************************************ */

qx.Class.define("scro34.themedemo.window.Table", {
  extend: scro34.themedemo.window.Window,

  members: {
    table: null,
    nextId: 0,

    _createControls() {
      this.set({
        layout: new qx.ui.layout.VBox(0),
        contentPadding: 3,
        caption: "Table",
        icon: scro34.themedemo.IconFactory.getInstance().getIcon("TABLE_SMALL"),
      });

      var table = this.createTable();

      this.add(this.createToolbar());
      this.add(table, { flex: 1 });

      this.addListenerOnce("appear", this.center, this);
    },

    createTable() {
      // Create the initial data
      var rowData = this.createRandomRows(50);

      // table model
      var tableModel = (this._tableModel = new qx.ui.table.model.Simple());
      tableModel.setColumns(["ID", "A number", "A date", "Boolean"]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);
      tableModel.setColumnSortable(3, false);

      // table
      var table = (this.table = new qx.ui.table.Table(tableModel));

      table.set({
        width: 600,
        height: 400,
        showCellFocusIndicator: true,
        focusCellOnPointerMove: true,
      });

      table
        .getSelectionModel()
        .setSelectionMode(
          qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION
        );

      var tcm = table.getTableColumnModel();

      // Display a checkbox in column 3
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      // use a different header renderer
      const icons = scro34.themedemo.IconFactory.getInstance();
      tcm.setHeaderCellRenderer(
        2,
        new qx.ui.table.headerrenderer.Icon(
          icons.getIcon("TABLE_CALENDAR"),
          "A date"
        )
      );

      return table;
    },

    createRandomRows(rowCount) {
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < rowCount; row++) {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([
          this.nextId++,
          Math.random() * 10000,
          date,
          Math.random() > 0.5,
        ]);
      }
      return rowData;
    },

    createToolbar() {
      var bar = new qx.ui.toolbar.ToolBar();
      var button, part, checkBox;

      part = new qx.ui.toolbar.Part();
      bar.add(part);

      const icons = scro34.themedemo.IconFactory.getInstance();

      button = new qx.ui.toolbar.Button(
        "Change row with ID 10",
        icons.getIcon("TABLE_EDIT_UNDO")
      );
      button.addListener("execute", (evt) => {
        var rowData = this.createRandomRows(1);
        for (var i = 1; i < this._tableModel.getColumnCount(); i++) {
          this._tableModel.setValue(i, 10, rowData[0][i]);
        }
        this.info("Row 10 changed");
      });
      part.add(button);

      button = new qx.ui.toolbar.Button(
        "Add 10 rows",
        icons.getIcon("TABLE_LIST_ADD")
      );
      button.addListener("execute", (evt) => {
        var rowData = this.createRandomRows(10);
        this._tableModel.addRows(rowData);
        this.info("10 rows added");
      });
      part.add(button);

      button = new qx.ui.toolbar.Button(
        "Remove 5 rows",
        icons.getIcon("TABLE_LIST_REMOVE")
      );
      button.addListener("execute", (evt) => {
        var rowCount = this._tableModel.getRowCount();
        this._tableModel.removeRows(rowCount - 5, 5);
        this.info("5 rows removed");
      });
      part.add(button);

      button = new qx.ui.toolbar.Button(
        "Show selection",
        icons.getIcon("TABLE_SHOW_SELECTION")
      );
      button.addListener("execute", (evt) => {
        var selection = [];
        this.table.getSelectionModel().iterateSelection(function (ind) {
          selection.push(ind + "");
        });
        this.showDialog("Selected rows:<br>" + selection.join(", "));
      });
      part.add(button);

      part = new qx.ui.toolbar.Part();
      bar.add(part);

      checkBox = this._checkBox1 = new qx.ui.toolbar.CheckBox("Keep first row");
      checkBox.set({
        value: this.table.getKeepFirstVisibleRowComplete(),
        toolTip: new qx.ui.tooltip.ToolTip(
          "Whether the the first visible row should " +
            "be rendered completely when scrolling."
        ),
      });
      checkBox.addListener("changeValue", () => {
        this.table.setKeepFirstVisibleRowComplete(this._checkBox1.getValue());
      });
      part.add(checkBox);

      checkBox = new qx.ui.toolbar.CheckBox("Change ID sort method");
      checkBox.set({
        value: this.table.getKeepFirstVisibleRowComplete(),
        toolTip: new qx.ui.tooltip.ToolTip(
          "Demonstrate use of alternate sorting algorithm."
        ),
      });
      checkBox.addListener("changeValue", (evt) => {
        if (evt.getData()) {
          var ascending = function (row1, row2) {
            var obj1 = row1[arguments.callee.columnIndex];
            var obj2 = row2[arguments.callee.columnIndex];
            if (obj1 % 2 == 1 && obj2 % 2 == 0) {
              return 1;
            }
            if (obj2 % 2 == 1 && obj1 % 2 == 0) {
              return -1;
            }
            return obj1 > obj2 ? 1 : obj1 == obj2 ? 0 : -1;
          };

          var descending = function (row1, row2) {
            var obj1 = row1[arguments.callee.columnIndex];
            var obj2 = row2[arguments.callee.columnIndex];
            if (obj1 % 2 == 1 && obj2 % 2 == 0) {
              return -1;
            }
            if (obj2 % 2 == 1 && obj1 % 2 == 0) {
              return 1;
            }
            return obj1 < obj2 ? 1 : obj1 == obj2 ? 0 : -1;
          };

          this.table.getTableModel().setSortMethods(0, {
            ascending: ascending,
            descending: descending,
          });
        } else {
          this.table.getTableModel().setSortMethods(0, null);
        }
      });
      part.add(checkBox);

      return bar;
    },

    showDialog(text) {
      if (!this.__dlg) {
        var dlg = (this.__dlg = new qx.ui.window.Window().set({
          modal: true,
          showMinimize: false,
          showMaximize: false,
          width: 180,
          centerOnAppear: true,
          contentPadding: [10, 10, 10, 10],
        }));

        var layout = new qx.ui.layout.Grid(15, 15);
        layout.setRowFlex(0, 1);
        layout.setColumnFlex(1, 1);
        dlg.setLayout(layout);

        dlg.add(
          new qx.ui.basic.Image(scro34.themedemo.IconFactory.getInstance().getIcon("TABLE_SHOW_DIALOG")),
          { row: 0, column: 0 }
        );

        dlg.add(
          new qx.ui.basic.Label().set({
            rich: true,
            allowGrowY: true,
          }),
          { row: 0, column: 1 }
        );

        var button = new qx.ui.form.Button("OK").set({
          alignX: "center",
          allowGrowX: false,
          padding: [2, 10],
        });

        button.addListener(
          "execute",
          function (e) {
            dlg.close();
          },
          this
        );
        dlg.add(button, { row: 1, column: 0, colSpan: 2 });
      }

      this.__dlg.getChildren()[1].setValue(text);
      this.__dlg.open();
      this.__dlg.getChildren()[2].focus();
    }
  }
});
