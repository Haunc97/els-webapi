import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { VocabularyLevel2LabelMapping, WordClass2LabelMapping } from '@shared/AppConsts';
import { VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateVocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-sentence-dialog',
  templateUrl: './create-sentence-dialog.component.html'
})
export class CreateSentenceDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  sentence = new CreateVocabularyDto();

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
    //set default
    this.sentence.level = VocabularyLevelEnum.Easy;
  }

  save(): void {
    this.saving = true;
    this.sentence.classification = WordClassEnum.Sentence;
    this._vocabularyService.create(this.sentence).subscribe(
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
