import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { StudySetDto, StudySetDtoPagedResultDto, StudySetServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CreateStudysetDialogComponent } from './create-studyset-dialog/create-studyset-dialog.component';
import { EditStudysetDialogComponent } from './edit-studyset-dialog/edit-studyset-dialog.component';

class PagedStudySetsRequestDto extends PagedRequestDto {
  keyword: string | null;
}

@Component({
  selector: 'app-studysets',
  templateUrl: './studysets.component.html',
  animations: [appModuleAnimation()]
})
export class StudysetsComponent extends PagedListingComponentBase<StudySetDto> {
  stdSets: StudySetDto[] = [];
  keyword = '';
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _studySetService: StudySetServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedStudySetsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    this._studySetService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: StudySetDtoPagedResultDto) => {
        this.stdSets = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  editStdSet(stdSet: StudySetDto): void {
    this.showCreateOrEditStudySetDialog(stdSet.id);
  }

  createStdSet(): void {
    this.showCreateOrEditStudySetDialog();
  }

  learn(stdSet: StudySetDto): void {

  }

  protected delete(stdSet: StudySetDto): void {
    abp.message.confirm(
      this.l('StudySetDeleteWarningMessage', stdSet.title),
      undefined,
      (result: boolean) => {
        if (result) {
          this._studySetService.delete(stdSet.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditStudySetDialog(id?: number): void {
    let createOrEditStudySetDialog: BsModalRef;
    if (!id) {
      createOrEditStudySetDialog = this._modalService.show( 
        CreateStudysetDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditStudySetDialog = this._modalService.show(
        EditStudysetDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditStudySetDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}