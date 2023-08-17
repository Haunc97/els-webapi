import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { VocabularyLevel2LabelMapping } from '@shared/AppConsts';
import { VocabularyLevelEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-sentence-dialog',
  templateUrl: './edit-sentence-dialog.component.html'
})
export class EditSentenceDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  sentence = new VocabularyDto();
  id: number;

  public VocabularyLevel2LabelMapping = VocabularyLevel2LabelMapping;
  
  vocabularyLevelOptions =
    Object
      .values(VocabularyLevelEnum)
      .filter(value => typeof value === 'number');
      
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

  save(): void {
    this.saving = true;

    this._vocabularyService.update(this.sentence).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
