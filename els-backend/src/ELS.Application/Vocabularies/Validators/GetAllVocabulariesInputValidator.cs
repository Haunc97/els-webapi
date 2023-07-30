using ELS.Vocabularies.Dtos;
using FluentValidation;

namespace ELS.Vocabularies.Validators
{
    public class GetAllVocabulariesInputValidator : AbstractValidator<GetAllVocabulariesInput>
    {
        public GetAllVocabulariesInputValidator()
        {
            RuleFor(x => x.PageNumber).NotEmpty();
        }
    }
}