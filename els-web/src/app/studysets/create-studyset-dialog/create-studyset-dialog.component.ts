import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { StudySetTypeConfig2LabelMapping } from '@shared/AppConsts';
import { StudySetTypeConfigEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateStudySetDto, DropdownItemDto, SelectedVocabularyDto, StudySetServiceProxy, VocabularySelectionDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-studyset-dialog',
  templateUrl: './create-studyset-dialog.component.html',
  styleUrls: ['./create-studyset-dialog.component.css']
})
export class CreateStudysetDialogComponent extends AppComponentBase
implements OnInit {
  saving = false;
  stdSet = new CreateStudySetDto();
  vocabularies: DropdownItemDto<number>[] = [];
  selectedVocabularies: SelectedVocabularyDto[] = [];
  keyword = '';
  isDataLoading = false;

  public StudySetTypeConfig2LabelMapping = StudySetTypeConfig2LabelMapping;

  typeConfigOptions =
    Object
      .values(StudySetTypeConfigEnum)
      .filter(value => typeof value === 'number');

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _studySetService: StudySetServiceProxy,
    public _vocabularyService: VocabularyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;
    this.stdSet.vocabularyIds = this.selectedVocabularies.map(x => x.id);
    this._studySetService.create(this.stdSet).subscribe(
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

  toggleSelectVocabulary(
    vocabulary: DropdownItemDto<number>
  ): void {
    if (!vocabulary.isSelected) {
      this.selectedVocabularies.push(new SelectedVocabularyDto({ id: vocabulary.value, term: vocabulary.text }));
    }
    else {
      let index = this.selectedVocabularies.findIndex(x => x.id == vocabulary.value);
      this.selectedVocabularies.splice(index, 1);
    }

    // mark item as selected/unselect
    vocabulary.isSelected = !vocabulary.isSelected;
  }

  unselectVocabulary(
    vocabulary: SelectedVocabularyDto
  ): void {
    let index = this.selectedVocabularies.indexOf(vocabulary);
    this.selectedVocabularies.splice(index, 1);
    
    // mark item as unselect
    index = this.vocabularies?.findIndex(x => x.value === vocabulary.id) ?? -1;
    if (index !== -1)
      this.vocabularies[index].isSelected = false;
  }

  searchChange(): void {
    this.isDataLoading = true;
    this._vocabularyService.getSelection(this.keyword, undefined).subscribe((result: VocabularySelectionDto) => {
      this.vocabularies = result.items;
      this.markAsSelected(this.vocabularies);
      this.isDataLoading = false;
    });
  }

  markAsSelected(dropdownItems: DropdownItemDto<number>[]) {
    dropdownItems.forEach(el => {
      if (this.selectedVocabularies.some(x => x.id == el.value))
        el.isSelected = true;
    });
  }
}