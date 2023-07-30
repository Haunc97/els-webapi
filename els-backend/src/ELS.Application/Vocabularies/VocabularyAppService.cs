using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using ELS.Vocabularies.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELS.Vocabularies
{
    public class VocabularyAppService : ELSAppServiceBase, IVocabularyAppService
    {
        private readonly IRepository<Vocabulary> _vocabularyRepository;

        public VocabularyAppService(IRepository<Vocabulary> vocabularyRepository)
        {
            _vocabularyRepository = vocabularyRepository;
        }

        public async Task<VocabularyListResultDto> GetAllAsync(GetAllVocabulariesInput input)
        {
            var query = _vocabularyRepository
                .GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Term), t => t.Term.ToLower().IndexOf(input.Term.ToLower()) >= 0)
                .WhereIf(input.Classification.HasValue, t => t.Classification == input.Classification)
                .WhereIf(input.Level.HasValue, t => t.Level == input.Level)
                .OrderByDescending(t => t.CreationTime);

            var totalItems = await query.CountAsync();
            var vocabularies = await query.Skip(input.PageSize * (input.PageNumber - 1)).Take(input.PageSize).ToListAsync();          

            return new VocabularyListResultDto(
                ObjectMapper.Map<List<VocabularyListDto>>(vocabularies), totalItems, input.PageSize
            );
        }
    }
}