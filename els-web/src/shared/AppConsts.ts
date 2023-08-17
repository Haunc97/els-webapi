import { StudySetTypeConfigEnum, VocabularyLevelEnum, WordClassEnum } from "./AppEnums";

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

// optional: Record type annotation guaranties that 
// all the values from the enum are presented in the mapping
export const VocabularyLevel2LabelMapping: Record<VocabularyLevelEnum, string> = {
    [VocabularyLevelEnum.Easy]: "Easy",
    [VocabularyLevelEnum.Medium]: "Medium",
    [VocabularyLevelEnum.Hard]: "Hard"
};

export const StudySetTypeConfig2LabelMapping: Record<StudySetTypeConfigEnum, string> = {
    [StudySetTypeConfigEnum.ExcludeSentence]: "Exclude Sentence",
    [StudySetTypeConfigEnum.SentenceOnly]: "Sentence Only"
};