import CrudPage from "../../interfaces/crud-page";
import ValidationUtil from "../../utils/validation-util";

export default class SuggestionComponent extends CrudPage {

  constructor(private apiService, alert) {
    super(
      {},
      {alert: alert}
    );
  }

  $onInit() {
    this.api = {
      index: () => this.apiService.get("/suggestions"),
      store: (params) => this.apiService.post("/suggestions", params),
      update: (id, params) => this.apiService.put("/suggestions/" + id, params),
      destroy: (id) => this.apiService.delete("/suggestions/" + id),
    };

    this.loadRecords();
  }

  

  protected validationRules() {
    if (this.params.group == null || this.params.group == "") this.addError('group', 'Group tidak boleh kosong');
    else if (ValidationUtil.containSpecialChar(this.params.group.replace(/:/g, ""))) this.addError('group', 'Kode permission tidak boleh mengandung spasi dan special character kecuali titik dua');
    if (this.params.item == null || this.params.item == "") this.addError('item', 'Item tidak boleh kosong');
    if (this.params.display_text == null || this.params.display_text == "") this.addError('displayText', 'Display Text tidak boleh kosong');

  }

  static Factory() {
    return {
      controller: SuggestionComponent,
      templateUrl: 'views/components/admin/suggestion.html'
    };
  }
}

SuggestionComponent.$inject = ['apiService', 'SweetAlert'];
