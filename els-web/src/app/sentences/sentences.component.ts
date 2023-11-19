import { Component, Injector } from '@angular/core';
import { VocabularyLevel2LabelMapping, VocabularyLevelLabelClassMapping, WordClass2LabelMapping } from '@shared/AppConsts';
import { DateRangeTypeEnum, FilterMethodEnum, VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FilterProperty, VocabularyDtoPagedResultDto, VocabularyListDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateSentenceDialogComponent } from './create-sentence-dialog/create-sentence-dialog.component';
import { EditSentenceDialogComponent } from './edit-sentence-dialog/edit-sentence-dialog.component';
import { ViewSentenceDialogComponent } from './view-sentence-dialog/view-sentence-dialog.component';
import { CreateBulkSentenceDialogComponent } from './create-bulk-sentence-dialog/create-bulk-sentence-dialog.component';
import { ActivatedRoute } from '@angular/router';
class PagedVocabulariesRequestDto extends PagedRequestDto {
  term: string;
  classification: FilterProperty<WordClassEnum> | null;
  level: FilterProperty<VocabularyLevelEnum> | null;
  dateRangeType: DateRangeTypeEnum | null;
}
@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  animations: [appModuleAnimation()]
})
export class SentencesComponent extends PagedListingComponentBase<VocabularyListDto> {
  sentences: VocabularyListDto[] = [];
  term = '';
  level = undefined;
  dateRangeType = undefined;
  advancedFiltersVisible = false;

  public WordClass2LabelMapping = WordClass2LabelMapping;
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
    private route: ActivatedRoute,
    private _vocabularyService: VocabularyServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit() {
    // let params = await firstValueFrom(this.route.queryParams); // Wait for the first value from the Observable
    // if (params['search']) {
    //   this.keyword = params['search'];
    // }

    this.route.queryParams.subscribe((_params) => {
      if (_params['search']) {
        this.term = _params['search'];
      }

      if (_params['creationdate']) {
        this.dateRangeType = _params['creationdate'];
      }

      super.ngOnInit();
    })
  }

  createSentence(): void {
    this.showCreateOrEditSentenceDialog();
  }

  createBulkSentence(): void {
    let createBulkSentenceDialog: BsModalRef;
    createBulkSentenceDialog = this._modalService.show(
      CreateBulkSentenceDialogComponent,
      {
        class: 'modal-lg',
      }
    );

    createBulkSentenceDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  clearFilters(): void {
    this.term = '';
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
    request.classification = FilterProperty.toFilterProperty<WordClassEnum>(WordClassEnum.Sentence, FilterMethodEnum.Equal);
    request.dateRangeType = this.dateRangeType;

    this._vocabularyService
      .getAll(
        request.term,
        request.classification,
        request.level,
        request.dateRangeType,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: VocabularyDtoPagedResultDto) => {
        this.sentences = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  editSentence(sentence: VocabularyListDto): void {
    this.showCreateOrEditSentenceDialog(sentence.id);
  }

  viewSentence(sentence: VocabularyListDto): void {
    this._modalService.show(
      ViewSentenceDialogComponent,
      {
        class: 'modal-lg',
        initialState: {
          id: sentence.id,
        },
      }
    );
  }

  protected delete(sentence: VocabularyListDto): void {
    abp.message.confirm(
      this.l('AreYouSureWantToDelete', `"${sentence.term}"`),
      undefined,
      (result: boolean) => {
        if (result) {
          this._vocabularyService.delete(sentence.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditSentenceDialog(id?: number): void {
    let createOrEditSentenceDialog: BsModalRef;
    if (!id) {
      createOrEditSentenceDialog = this._modalService.show(
        CreateSentenceDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditSentenceDialog = this._modalService.show(
        EditSentenceDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditSentenceDialog.content.onSave().subscribe(() => {
      debugger;
      this.refresh();
    });
  }
}
