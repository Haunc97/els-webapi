import { Component, Injector } from '@angular/core';
import { VocabularyLevel2LabelMapping, VocabularyLevelLabelClassMapping, WordClass2LabelMapping, WordClassLabelClassMapping } from '@shared/AppConsts';
import { FilterMethodEnum, VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FilterProperty, VocabularyDtoPagedResultDto, VocabularyListDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateVocabularyDialogComponent } from './create-vocabulary-dialog/create-vocabulary-dialog.component';
import { EditVocabularyDialogComponent } from './edit-vocabulary-dialog/edit-vocabulary-dialog.component';
import { ViewVocabularyDialogComponent } from './view-vocabulary-dialog/view-vocabulary-dialog.component';
import { CreateBulkVocabularyDialogComponent } from './create-bulk-vocabulary-dialog/create-bulk-vocabulary-dialog.component';
class PagedVocabulariesRequestDto extends PagedRequestDto {
  term: string;
  classification: FilterProperty<WordClassEnum> | null
  level: FilterProperty<VocabularyLevelEnum> | null
}
@Component({
  selector: 'app-vocabularies',
  templateUrl: './vocabularies.component.html',
  animations: [appModuleAnimation()]
})
export class VocabulariesComponent extends PagedListingComponentBase<VocabularyListDto> {
  vocabularies: VocabularyListDto[] = [];
  term = '';
  classification = undefined;
  level = undefined;
  advancedFiltersVisible = false;

  public WordClass2LabelMapping = WordClass2LabelMapping;
  public WordClassLabelClassMapping = WordClassLabelClassMapping;
  public VocabularyLevel2LabelMapping = VocabularyLevel2LabelMapping;
  public VocabularyLevelLabelClassMapping = VocabularyLevelLabelClassMapping;
  public WordClassEnum = WordClassEnum;
  public FilterMethodEnum = FilterMethodEnum;

  wordClassOptions =
    Object
      .values(WordClassEnum)
      .filter(value => typeof value === 'number' && value !== WordClassEnum.Sentence);

  vocabularyLevelOptions =
    Object
      .values(VocabularyLevelEnum)
      .filter(value => typeof value === 'number');

  constructor(
    injector: Injector,
    private _vocabularyService: VocabularyServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createVocabulary(): void {
    this.showCreateOrEditVocabularyDialog();
  }

  createBulkVocabulary(): void {
    let createBulkVocabularyDialog: BsModalRef;
    createBulkVocabularyDialog = this._modalService.show(
      CreateBulkVocabularyDialogComponent,
      {
        class: 'modal-lg',
      }
    );

    createBulkVocabularyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  clearFilters(): void {
    this.term = '';
    this.classification = undefined;
    this.level = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedVocabulariesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.term = this.term;
    request.level = FilterProperty.toFilterProperty<VocabularyLevelEnum>(this.level, FilterMethodEnum.Equal);
    if (this.classification !== undefined)
      request.classification = FilterProperty.toFilterProperty<WordClassEnum>(this.classification, FilterMethodEnum.Equal);
    else
      request.classification = FilterProperty.toFilterProperty<WordClassEnum>(WordClassEnum.Sentence, FilterMethodEnum.NotEqual);

    this._vocabularyService
      .getAll(
        request.term,
        request.classification,
        request.level,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: VocabularyDtoPagedResultDto) => {
        this.vocabularies = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  editVocabulary(vocabulary: VocabularyListDto): void {
    this.showCreateOrEditVocabularyDialog(vocabulary.id);
  }

  viewVocabulary(vocabulary: VocabularyListDto): void {
    this._modalService.show(
      ViewVocabularyDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          id: vocabulary.id,
        },
      }
    );
  }

  protected delete(vocabulary: VocabularyListDto): void {
    abp.message.confirm(
      this.l('AreYouSureWantToDelete', vocabulary.term),
      undefined,
      (result: boolean) => {
        if (result) {
          this._vocabularyService.delete(vocabulary.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditVocabularyDialog(id?: number): void {
    let createOrEditVocabularyDialog: BsModalRef;
    if (!id) {
      createOrEditVocabularyDialog = this._modalService.show(
        CreateVocabularyDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditVocabularyDialog = this._modalService.show(
        EditVocabularyDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditVocabularyDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}
