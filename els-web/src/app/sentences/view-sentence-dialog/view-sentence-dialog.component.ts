import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { WordClass2LabelMapping } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';
import { VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-sentence-dialog',
  templateUrl: './view-sentence-dialog.component.html'
})
export class ViewSentenceDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  sentence = new VocabularyDto();
  id: number;

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
      this.sentence = result;
    });
  }
}