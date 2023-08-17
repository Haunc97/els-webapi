import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { VocabularyLevel2LabelMapping, WordClass2LabelMapping } from '@shared/AppConsts';
import { VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-vocabulary-dialog',
  templateUrl: './edit-vocabulary-dialog.component.html'
})
export class EditVocabularyDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  vocabulary = new VocabularyDto();
  id: number;

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
    this._vocabularyService.get(this.id).subscribe((result) => {
      this.vocabulary = result;
    });
  }

  save(): void {
    this.saving = true;

    this._vocabularyService.update(this.vocabulary).subscribe(
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