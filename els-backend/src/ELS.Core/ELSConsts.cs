using ELS.Debugging;

namespace ELS
{
    public class ELSConsts
    {
        public const string LocalizationSourceName = "ELS";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;

        public const int VocabularyListDefaultPageSize = 20;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "4202295bf05e434fa3ef153ec2ff204f";
    }
}
