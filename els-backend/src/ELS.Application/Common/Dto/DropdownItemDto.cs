namespace ELS.Common.Dto
{
    public class DropdownItemDto<TPrimaryKey>
    {
        public string Text { get; set; }
        public TPrimaryKey Value { get; set; }

        public DropdownItemDto(string text, TPrimaryKey value)
        {
            Text = text;
            Value = value;
        }
    }
}
