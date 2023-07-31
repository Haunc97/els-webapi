import { Component, Injector } from '@angular/core';
import { VocabularyLevel2LabelMapping, WordClass2LabelMapping } from '@shared/AppConsts';
import { VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { VocabularyDtoPagedResultDto, VocabularyListDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
class PagedVocabulariesRequestDto extends PagedRequestDto {
  term: string;
  classification: WordClassEnum | null
  level: VocabularyLevelEnum | null
}
@Component({
  selector: 'app-vocabularies',
  templateUrl: './vocabularies.component.html',
  styleUrls: ['./vocabularies.component.css'],
  animations: [appModuleAnimation()]
})
export class VocabulariesComponent extends PagedListingComponentBase<VocabularyListDto> {
  vocabularies: VocabularyListDto[] = [];
  term = '';
  classification = undefined;
  level = undefined;
  advancedFiltersVisible = false;

  public WordClass2LabelMapping = WordClass2LabelMapping;
  public VocabularyLevel2LabelMapping = VocabularyLevel2LabelMapping;

  wordClassOptions =
    Object
      .values(WordClassEnum)
      .filter(value => typeof value === 'number');

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
    request.classification = this.classification;
    request.level = this.level;

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
  }

  protected delete(entity: VocabularyListDto): void {
    throw new Error('Method not implemented.');
  }
}
