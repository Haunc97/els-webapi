import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { VocabularyLevel2LabelMapping, WordClass2LabelMapping } from '@shared/AppConsts';
import { VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateVocabularyDto, DropdownItemDto, SelectedStudySetDto, StudySetSelectionDto, StudySetServiceProxy, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-bulk-sentence-dialog',
  templateUrl: './create-bulk-sentence-dialog.component.html'
})
export class CreateBulkSentenceDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  sentences: CreateVocabularyDto[] = [new CreateVocabularyDto()];
  studySets: DropdownItemDto<number>[] = [];
  selectedStudySets: SelectedStudySetDto[] = [];
  keyword = '';
  loading = false;

  isCollapsed = false;

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
    //set default
    this.sentences[0].level = VocabularyLevelEnum.Medium;
    this.sentences[0].classification = WordClassEnum.Sentence;
  }

  addSentence() {
    let sentence = new CreateVocabularyDto();
    sentence.level = VocabularyLevelEnum.Medium;
    sentence.classification = WordClassEnum.Sentence;
    this.sentences.push(sentence);
  }

  deleteSentence(index: number): void {
    this.sentences.splice(index, 1);
  }

  toggleSelectStudySet(
    stdSet: DropdownItemDto<number>): void {
    if (!stdSet.isSelected) {
      this.selectedStudySets.push(new SelectedStudySetDto({ id: stdSet.value, title: stdSet.text }));
    }
    else {
      let index = this.selectedStudySets.findIndex(x => x.id == stdSet.value);
      this.selectedStudySets.splice(index, 1);
    }

    // mark item as selected/unselect
    stdSet.isSelected = !stdSet.isSelected;
  }

  unselectStudySet(
    studySet: SelectedStudySetDto): void {
    let index = this.selectedStudySets.indexOf(studySet);
    this.selectedStudySets.splice(index, 1);

    // mark item as unselect
    index = this.studySets?.findIndex(x => x.value === studySet.id) ?? -1;
    if (index !== -1)
      this.studySets[index].isSelected = false;
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
      if (this.selectedStudySets.some(x => x.id == el.value))
        el.isSelected = true;
    });
  }

  save(): void {
    this.saving = true;
    let studySetIds = this.selectedStudySets.map(x => x.id);
    this.sentences.forEach(vocab => {
      vocab.studySetIds = studySetIds;
    });
    this._vocabularyService.createBulk(this.sentences).subscribe(
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
