import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { WordClass2LabelMapping } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';
import { VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-vocabulary-dialog',
  templateUrl: './view-vocabulary-dialog.component.html'
})
export class ViewVocabularyDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  vocabulary = new VocabularyDto();
  id: number;

  public WordClass2LabelMapping = WordClass2LabelMapping;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _vocabularyService: VocabularyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._vocabularyService.get(this.id).subscribe((result) => {
      this.vocabulary = result;
    });
  }
}