import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { VocabularyLevel2LabelMapping } from '@shared/AppConsts';
import { VocabularyLevelEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { DropdownItemDto, StudySetDto, StudySetSelectionDto, StudySetServiceProxy, VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
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

  studySets: DropdownItemDto<number>[] = [];
  keyword = '';
  loading = false;

  public VocabularyLevel2LabelMapping = VocabularyLevel2LabelMapping;
  
  vocabularyLevelOptions =
    Object
      .values(VocabularyLevelEnum)
      .filter(value => typeof value === 'number');
      
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _vocabularyService: VocabularyServiceProxy,
    public _studySetService: StudySetServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._vocabularyService.get(this.id).subscribe((result) => {
      this.sentence = result;
    });
  }

  searchChange(): void {
    this.loading = true;
    this._studySetService.getSelection(this.keyword, undefined).subscribe((result: StudySetSelectionDto) => {
      this.studySets = result.items;
      this.markAsSelected(this.studySets);
      this.loading = false;
    });
  }

  markAsSelected(dropdownItems: DropdownItemDto<number>[]): void {
    dropdownItems.forEach(el => {
      if (this.sentence.studySets.some(x => x.id == el.value))
        el.isSelected = true;
    });
  }

  toggleSelectStudySet(
    stdSet: DropdownItemDto<number>): void {
    if (!stdSet.isSelected) {
      let studySetDto = new StudySetDto();
      studySetDto.id = stdSet.value;
      studySetDto.title = stdSet.text;
      this.sentence.studySets.push(studySetDto);
    }
    else {
      let index = this.sentence.studySets.findIndex(x => x.id == stdSet.value);
      this.sentence.studySets.splice(index, 1);
    }

    // mark item as selected/unselect
    stdSet.isSelected = !stdSet.isSelected;
  }

  unselectStudySet(
    studySet: StudySetDto): void {
    let index = this.sentence.studySets.indexOf(studySet);
    this.sentence.studySets.splice(index, 1);

    // mark item as unselect
    index = this.studySets?.findIndex(x => x.value === studySet.id) ?? -1;
    if (index !== -1)
      this.studySets[index].isSelected = false;
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
