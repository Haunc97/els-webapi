import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { FilterProperty, LeastCorrectVocabularyListStatisticDto, QuizServiceProxy, VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { Observable, delay } from 'rxjs';
import { DateRangeTypeEnum, FilterMethodEnum, WordClassEnum } from '@shared/AppEnums';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HomeComponent extends AppComponentBase implements OnInit {

  leastCorrectVocabularies: LeastCorrectVocabularyListStatisticDto[] = [];
  thisWeekVocabularyCount = 0;
  thisWeekSentenceCount = 0;
  totalVocabularyCount = 0;
  totalSentenceCount = 0;
  totalQuizCount = 0;
  quizAccuracy = 0.00;

  leastCorrectMaxResultCount = 10;

  constructor(injector: Injector, public _vocabularyService: VocabularyServiceProxy, public _quizService: QuizServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
  
    this.loadLeastCorrectVocabulary();

    this._vocabularyService.countVocabularies(DateRangeTypeEnum.ThisWeek, this.notSentenceFilter).subscribe((data) => {
      if (data) {
        this.thisWeekVocabularyCount = data;
      }
    });

    this.countSentences(DateRangeTypeEnum.ThisWeek).subscribe((data) => {
      if (data) {
        this.thisWeekSentenceCount = data;
      }
    });

    this._vocabularyService.countVocabularies(undefined, this.notSentenceFilter).subscribe((data) => {
      if (data) {
        this.totalVocabularyCount = data;
      }
    });
    
    this.countSentences(undefined).subscribe((data) => {
      if (data) {
        this.totalSentenceCount = data;
      }
    });

    this._quizService.count().subscribe((data) => {
      if (data) {
        this.totalQuizCount = data;
      }
    });

    this._quizService.getAccurateStatistic().subscribe((data) => {
      if (data) {
        this.quizAccuracy = data;
      }
    })
  }

  loadLeastCorrectVocabulary() {
    this._vocabularyService.getLeastCorrect(this.leastCorrectMaxResultCount).subscribe((data) => {
      if (data)
      {
        this.leastCorrectVocabularies = data.items;
      }
    });
  }

  countSentences(dateRange: DateRangeTypeEnum | undefined): Observable<number> {
    let classification = FilterProperty.toFilterProperty<WordClassEnum>(WordClassEnum.Sentence, FilterMethodEnum.Equal.toString());
    return this._vocabularyService.countVocabularies(dateRange, classification);
  }

  leastCorrectMaxResultCountChange(): void {
    this.loadLeastCorrectVocabulary();
  }

  get notSentenceFilter() {
    return FilterProperty.toFilterProperty<WordClassEnum>(WordClassEnum.Sentence, FilterMethodEnum.NotEqual);
  }
}