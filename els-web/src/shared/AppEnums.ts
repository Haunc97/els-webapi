import { TenantAvailabilityState } from '@shared/service-proxies/service-proxies';


export class AppTenantAvailabilityState {
    static Available: number = TenantAvailabilityState._1;
    static InActive: number = TenantAvailabilityState._2;
    static NotFound: number = TenantAvailabilityState._3;
}

export enum WordClassEnum {
    Noun = 1,
    Verb = 2,
    Adjective = 3,
    Adverb = 4,
    PhrasalVerb = 5,
    Preposition = 6,
    Conjunction = 7,
    Pronouns = 8,
    Exclamation = 9,
    Idiom = 10,
    Other = 11,
    Sentence = -1
}

export enum VocabularyLevelEnum {
    Easy = 10,
    Medium = 20,
    Hard = 30
}

export enum StudySetTypeConfigEnum {
    SentenceOnly = 1,
    ExcludeSentence = 2
}

export enum FilterMethodEnum {
    Equal = 10,
    NotEqual = 20,
    Contain = 30,
    NotContain = 40
}

export enum DateRangeTypeEnum {
    ThisWeek = 1,
    LastWeek = 2,
    ThisMonth = 3,
    LastMonth = 4
}