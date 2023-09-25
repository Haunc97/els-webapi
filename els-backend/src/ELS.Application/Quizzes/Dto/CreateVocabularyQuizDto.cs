namespace ELS.Quizzes.Dto
{
    public class CreateVocabularyQuizDto
    {
        public int VocabularyId { get; set; }

        public string Answer { get; set; }

        public bool IsCorrect { get; set; }
    }
}