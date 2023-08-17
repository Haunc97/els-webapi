import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { VocabularyLevel2LabelMapping, WordClass2LabelMapping } from '@shared/AppConsts';
import { VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateVocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-vocabulary-dialog',
  templateUrl: './create-vocabulary-dialog.component.html'
})
export class CreateVocabularyDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  vocabulary = new CreateVocabularyDto();

  public WordClass2LabelMapping = WordClass2LabelMapping;
  public VocabularyLevel2LabelMapping = VocabularyLevel2LabelMapping;

  wordClassOptions =
    Object
      .values(WordClassEnum)
      .filter(value => typeof value === 'number' && value !== WordClassEnum.Sentence);

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
    this.vocabulary.level = VocabularyLevelEnum.Easy;
  }

  save(): void {
    this.saving = true;

    this._vocabularyService.create(this.vocabulary).subscribe(
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