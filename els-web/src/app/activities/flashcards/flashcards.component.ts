import { Component, OnInit, ViewChild } from '@angular/core';
import { WordClass2LabelMapping } from '@shared/AppConsts';
import { VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { CarouselComponent, CarouselConfig } from 'ngx-bootstrap/carousel';
import {StringHelper} from '../../../shared/helpers/AppHelpers'

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

  constructor(public _vocabularyService: VocabularyServiceProxy) { }

  ngOnInit(): void {
    this._vocabularyService.getRandom(undefined).subscribe((result) => {
      this.vocabularies = result.items;
      this.processSlides();
    });
  }

  processSlides() {
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