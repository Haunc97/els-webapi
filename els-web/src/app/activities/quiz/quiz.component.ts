import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordClass2LabelMapping } from '@shared/AppConsts';
import { WordClassEnum } from '@shared/AppEnums';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateQuizDto, CreateVocabularyQuizDto, FilterProperty, ICreateQuizDto, QuizServiceProxy, VocabularyDto, VocabularyServiceProxy } from '@shared/service-proxies/service-proxies';
import { firstValueFrom } from 'rxjs';
export class QuestionDto {
  question: string;
  options: OptionItemDto[] | undefined;
  answer: string | undefined;
  response: string[] | undefined = [];
  type: QuestionType;
  isCorrect: boolean;
  isSubmitted: boolean;
}
export class VocabularyQuestionDto extends QuestionDto {
  vocabularyId: number;
  isSentence: boolean;
  constructor(vocabulary: VocabularyDto) {
    super();
    this.vocabularyId = vocabulary.id;
    this.isSentence = vocabulary.classification === WordClassEnum.Sentence;

    let question = vocabulary.definition;
    if (vocabulary.classification !== WordClassEnum.Other
      && vocabulary.classification !== WordClassEnum.Sentence)
      question += ` (${WordClass2LabelMapping[vocabulary.classification]})`;

    super.question = question;
    super.answer = vocabulary.term;
    super.isCorrect = false;
    super.isSubmitted = false;
    
    // if (vocabulary.classification === WordClassEnum.Sentence) {
    //   super.type = QuestionType.Text;
    // }
    // else {
    //   super.type = QuestionType.SingleChoice;
    // }
  }
}
export enum QuestionType {
  SingleChoice = 1,
  MultipleChoice = 2,
  Text = 3
}
export class OptionItemDto {
  text: string;
  isCorrect: boolean;

  constructor(text: string, isCorrect: boolean) {
    this.text = text;
    this.isCorrect = isCorrect;
  }
}
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  animations: [appModuleAnimation()]
})
export class QuizComponent extends AppComponentBase implements OnInit {

  saving = false;
  isSubmitted = false;
  readonly NUMBER_OF_QUESTIONS = 5;
  questions: VocabularyQuestionDto[] = [];
  correctCount = 0;
  percentage = 0;

  constructor(
    injector: Injector,
    public _vocabularyService: VocabularyServiceProxy,
    public _quizService: QuizServiceProxy,
    public route: ActivatedRoute) {
    super(injector);

  }

  ngOnInit(): void {
    this.loadRandomList();
  }

  async loadRandomList() {
    let params = await firstValueFrom(this.route.queryParams); // Wait for the first value from the Observable
    let studySetId = params['stdsetid'];
    let wordClassTerm = params['classification.term'];
    let wordClassMethod = params['classification.method'];

    let wordClassFilter = undefined;
    
    if (wordClassTerm !== undefined)
      wordClassFilter = FilterProperty.toFilterProperty<WordClassEnum>(wordClassTerm, wordClassMethod);

    this._vocabularyService.getRandom(
      studySetId,
      wordClassFilter,
      undefined,
      this.NUMBER_OF_QUESTIONS)
      .subscribe((vocabularies) => {
        this.createQuestions(vocabularies.items);
      });
  }

  createQuestions(vocabularies: VocabularyDto[]) {
    vocabularies.forEach(vocabulary => {
      let question = new VocabularyQuestionDto(vocabulary);

      if (question.type === QuestionType.SingleChoice) {
        question.options = [];
        // the correct one
        let option = new OptionItemDto(question.answer, question.isCorrect);
        question.options.push(option)

        // the wrong options

      }
      this.questions.push(question);
    });
  }

  countWordsAndSpaces(input: string): number[] {
    // Initialize an empty array to store the output
    let output: number[] = [];

    // Loop through each character in the input string
    for (let i = 0; i < input.length; i++) {
      // If the character is not a whitespace and the previous character is either a whitespace or undefined, push the length of the current word to the output array
      if (input[i - 1] === " " || input[i - 1] === undefined) {
        // Find the index of the next whitespace or the end of the string
        let j = i + 1;
        while (j < input.length && input[j] !== " ") {
          j++;
        }
        // Calculate the length of the current word
        let wordLength = j - i;
        // Push the wordLength to the output array
        output.push(wordLength);
      }
    }

    // Return the output array
    return output;
  }

  getWidth(wordLength: number): number {
    // Use a base value of 10px
    let base = 10;
    // Add some padding of 27px
    let padding = 27;
    // Calculate the width by multiplying the base by the word length and adding the padding
    let width = base * wordLength + padding;
    // Return the width
    return width;
  }

  retry(): void {
    this.isSubmitted = false;
    this.questions.forEach(question => {
      question.isCorrect = false;
      question.isSubmitted = false;
      question.response = [];
    })
  }

  nextQuiz(): void {
    this.loadRandomList();
    this.isSubmitted = false;
    this.questions = [];
  }

  submit(): void {
    this.isSubmitted = true;

    this.questions.forEach(question => {
      let response = question.response.filter(x => x).join(" ");
      question.isCorrect = response.toLowerCase() === question.answer.toLowerCase();
      question.isSubmitted = true;
    });
    this.correctCount = this.questions.filter(x => x.isCorrect).length;
    this.percentage = this.correctCount / this.questions.length * 100;

    this.saveQuiz();
  }

  saveQuiz(): void {
    let model = new CreateQuizDto({
      title: undefined,
      totalCount: this.questions.length,
      correctCount: this.correctCount,
      percentage: this.percentage,
      createVocabularyQuizzes: []
    });

    this.questions.forEach(qn => {
      let createVocabularyQuiz = new CreateVocabularyQuizDto({
        vocabularyId: qn.vocabularyId,
        answer: qn.response.filter(x => x).join(" "),
        isCorrect: qn.isCorrect
      });
      
      model.createVocabularyQuizzes.push(createVocabularyQuiz);
    });

    this._quizService.create(model).subscribe((_data) => {
      abp.notify.success(this.l('SavedSuccessfully'));
    });
  }

  onDigitInput(event) {
    let element;

    if (event.code !== 'Backspace')
      if (event.target.value.length >= event.target.maxLength)
        element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace') {

    }

    if (element == null)
      return;
    else
      element.focus();
  }
}
