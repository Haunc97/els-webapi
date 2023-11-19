import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { DateRangeType2LabelMapping, StudySetTypeConfig2LabelMapping } from '@shared/AppConsts';
import { DateRangeTypeEnum, StudySetTypeConfigEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { DropdownItemDto, SelectedVocabularyDto, StudySetDto, StudySetServiceProxy, VocabularySelectionDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-studyset-dialog',
  templateUrl: './edit-studyset-dialog.component.html',
  styleUrls: ['./edit-studyset-dialog.component.css']
})
export class EditStudysetDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  stdSet = new StudySetDto();
  id: number;
  keyword = '';
  isDataLoading = false;
  vocabularies: DropdownItemDto<number>[] = [];

  public StudySetTypeConfig2LabelMapping = StudySetTypeConfig2LabelMapping;
  public DateRangeType2LabelMapping = DateRangeType2LabelMapping;

  typeConfigOptions =
    Object
      .values(StudySetTypeConfigEnum)
      .filter(value => typeof value === 'number');

  dateRangeConfigOptions =
    Object
      .values(DateRangeTypeEnum)
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
    this._studySetService.get(this.id).subscribe((result) => {
      this.stdSet = result;
    });
  }

  save(): void {
    this.saving = true;
    this._studySetService.update(this.stdSet).subscribe(
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
      this.stdSet.vocabularies.push(new SelectedVocabularyDto({ id: vocabulary.value, term: vocabulary.text }));
    }
    else {
      let index = this.stdSet.vocabularies.findIndex(x => x.id == vocabulary.value);
      this.stdSet.vocabularies.splice(index, 1);
    }

    // mark item as selected/unselect
    vocabulary.isSelected = !vocabulary.isSelected;
  }

  unselectVocabulary(
    vocabulary: SelectedVocabularyDto
  ): void {
    
    if (this.stdSet.dateRangeConfig) return;

    let index = this.stdSet.vocabularies.indexOf(vocabulary);
    this.stdSet.vocabularies.splice(index, 1);

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
      if (this.stdSet.vocabularies.some(x => x.id == el.value))
        el.isSelected = true;
    });
  }
}
