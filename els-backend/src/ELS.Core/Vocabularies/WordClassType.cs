using System.ComponentModel.DataAnnotations;

namespace ELS.Vocabularies
{
    public enum WordClassType
    {
        [Display(Name = "Noun")]
        Noun = 1,

        [Display(Name = "Verb")]
        Verb = 2,

        [Display(Name = "Adjective")]
        Adjective = 3,

        [Display(Name = "Adverb")]
        Adverb = 4,

        [Display(Name = "Phrasal Verb")]
        PhrasalVerb = 5,

        [Display(Name = "Preposition")]
        Preposition = 6,

        [Display(Name = "Conjunction")]
        Conjunction = 7,

        [Display(Name = "Pronouns")]
        Pronouns = 8,

        [Display(Name = "Exclamation")]
        Exclamation = 9,

        [Display(Name = "Idiom")]
        Idiom = 10,

        [Display(Name = "Other")]
        Other = 11
    }
}
