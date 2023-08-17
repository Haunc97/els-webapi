import { Component, OnInit, ViewChild } from '@angular/core';
import { WordClass2LabelMapping } from '@shared/AppConsts';
import { FilterProperty, VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { CarouselComponent, CarouselConfig } from 'ngx-bootstrap/carousel';
import { StringHelper } from '../../../shared/helpers/AppHelpers'
import { ActivatedRoute } from '@angular/router';
import { VocabularyLevelEnum, WordClassEnum } from '@shared/AppEnums';
import { firstValueFrom, lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 0, noPause: false, showIndicators: true } }
  ],
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent
  implements OnInit {
  @ViewChild('cardCarousel') cardCarousel: CarouselComponent;
  slides = [];
  imgs = [
    'flashcard_bg1.jpg',
    'flashcard_bg2.jpg',
    'flashcard_bg3.jpg'
  ];
  noWrapSlides = false;
  showIndicator = true;

  vocabularies: VocabularyDto[] = [];
  curVocabulary: VocabularyDto | undefined;
  resultToggled: boolean = false;

  constructor(
    public _vocabularyService: VocabularyServiceProxy,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadRandomVocabularies();
  }

  async loadRandomVocabularies() {
    let params = await firstValueFrom(this.route.queryParams); // Wait for the first value from the Observable
    let studySetId = params['stdsetid'];
    let wordClassFilter = undefined;
    let vocabularyLevelFilter = undefined;

    let wordClassTerm = params['classification.term'];
    let wordClassMethod = params['classification.method'];
    let vocabularyLevelTerm = params['level.term'];
    let vocabularyLevelMethod = params['level.method'];
    if (wordClassTerm !== undefined)
      wordClassFilter = FilterProperty.toFilterProperty<WordClassEnum>(wordClassTerm, wordClassMethod);
    if (vocabularyLevelTerm !== undefined)
      vocabularyLevelFilter = FilterProperty.toFilterProperty<VocabularyLevelEnum>(vocabularyLevelTerm, vocabularyLevelMethod);

    let response = await firstValueFrom(this._vocabularyService.getRandom(
      studySetId,
      wordClassFilter,
      vocabularyLevelFilter,
      undefined
    )); // Wait for the last value from the Observable
    
    this.vocabularies = response.items;
    this.renderSlides();
  }

  renderSlides() {
    this.slides = [];
    let img = `assets/img/${StringHelper.getRandomString(this.imgs)}`;
    this.vocabularies.forEach(vocabulary => {
      this.slides.push({
        image: img,
        text: vocabulary.definition,
        subtext: WordClass2LabelMapping[vocabulary.classification],
        id: vocabulary.id
      });
    });
  }

  toggleResult(): void {
    if (this.resultToggled) {
      this.moveNext();
      return;
    }
    this.resultToggled = true;
  }

  onSlideChange(slideIndex: number): void {
    this.resultToggled = false;
    let slide = this.slides[slideIndex];
    this.curVocabulary = this.vocabularies.find(x => x.id == slide.id);
  }

  moveNext() {
    this.cardCarousel.nextSlide();
  }

  movePrev() {
    this.cardCarousel.previousSlide();
  }
}