using System.ComponentModel.DataAnnotations;

namespace ELS.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}