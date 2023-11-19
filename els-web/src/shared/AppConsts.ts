import { DateRangeTypeEnum, StudySetTypeConfigEnum, VocabularyLevelEnum, WordClassEnum } from "./AppEnums";

export class AppConsts {

    static remoteServiceBaseUrl: string;
    static appBaseUrl: string;
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static localeMappings: any = [];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'ELS'
    };

    static readonly authorization = {
        encryptedAuthTokenName: 'enc_auth_token'
    };
}

// optional: Record type annotation guaranties that 
// all the values from the enum are presented in the mapping
export const WordClass2LabelMapping: Record<WordClassEnum, string> = {
    [WordClassEnum.Noun]: "Noun",
    [WordClassEnum.Verb]: "Verb",
    [WordClassEnum.Adjective]: "Adjective",
    [WordClassEnum.Adverb]: "Adverb",
    [WordClassEnum.PhrasalVerb]: "Phrasal Verb",
    [WordClassEnum.Preposition]: "Preposition",
    [WordClassEnum.Conjunction]: "Conjunction",
    [WordClassEnum.Pronouns]: "Pronouns",
    [WordClassEnum.Exclamation]: "Exclamation",
    [WordClassEnum.Idiom]: "Idiom",
    [WordClassEnum.Other]: "Other",
    [WordClassEnum.Sentence]: "Sentence"
};

export const WordClassLabelClassMapping: Record<WordClassEnum, string> = {
    [WordClassEnum.Noun]: "badge badge-pill badge-primary",
    [WordClassEnum.Verb]: "badge badge-pill badge-warning",
    [WordClassEnum.Adjective]: "badge badge-pill badge-info",
    [WordClassEnum.Adverb]: "badge badge-pill badge-success",
    [WordClassEnum.PhrasalVerb]: "badge badge-pill badge-warning",
    [WordClassEnum.Preposition]: "badge badge-pill badge-light",
    [WordClassEnum.Conjunction]: "badge badge-pill badge-light",
    [WordClassEnum.Pronouns]: "badge badge-pill badge-light",
    [WordClassEnum.Exclamation]: "badge badge-pill badge-light",
    [WordClassEnum.Idiom]: "badge badge-pill badge-light",
    [WordClassEnum.Other]: "badge badge-pill badge-secondary",
    [WordClassEnum.Sentence]: "badge badge-pill badge-light"
};

// optional: Record type annotation guaranties that 
// all the values from the enum are presented in the mapping
export const VocabularyLevel2LabelMapping: Record<VocabularyLevelEnum, string> = {
    [VocabularyLevelEnum.Easy]: "Easy",
    [VocabularyLevelEnum.Medium]: "Medium",
    [VocabularyLevelEnum.Hard]: "Hard"
};

export const VocabularyLevelLabelClassMapping: Record<VocabularyLevelEnum, string> = {
    [VocabularyLevelEnum.Easy]: "badge badge-pill badge-success",
    [VocabularyLevelEnum.Medium]: "badge badge-pill badge-warning",
    [VocabularyLevelEnum.Hard]: "badge badge-pill badge-danger"
};

export const StudySetTypeConfig2LabelMapping: Record<StudySetTypeConfigEnum, string> = {
    [StudySetTypeConfigEnum.ExcludeSentence]: "Exclude Sentence",
    [StudySetTypeConfigEnum.SentenceOnly]: "Sentence Only"
};

export const DateRangeType2LabelMapping: Record<DateRangeTypeEnum, string> = {
    [DateRangeTypeEnum.ThisWeek]: "This week",
    [DateRangeTypeEnum.LastWeek]: "Last week",
    [DateRangeTypeEnum.ThisMonth]: "This month",
    [DateRangeTypeEnum.LastMonth]: "Last month"
};