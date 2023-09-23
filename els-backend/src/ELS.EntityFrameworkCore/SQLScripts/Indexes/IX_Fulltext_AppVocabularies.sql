USE ELSDb
GO

--create a full-text catalog
IF NOT EXISTS (
SELECT name
FROM sys.fulltext_catalogs
WHERE name = 'ELSDocFTCat'
)
CREATE FULLTEXT CATALOG ELSDocFTCat
WITH ACCENT_SENSITIVITY = ON; --If the full-text catalog is accent sensitive, then a search for 'cafe' will not match 'café', and vice versa.


--CREATE UNIQUE INDEX ui_ukDoc ON [dbo].[AppVocabularies](Id);  

IF EXISTS (
SELECT *
FROM sys.fulltext_indexes
WHERE object_id = OBJECT_ID('dbo.AppVocabularies')
)
DROP FULLTEXT INDEX ON dbo.AppVocabularies;

CREATE FULLTEXT INDEX ON [dbo].[AppVocabularies]
(  
    Term                         --Full-text index column name
    Language 2057                 --2057 is the LCID for British English  
)  
KEY INDEX [PK_AppVocabularies] ON ELSDocFTCat --Unique index  
WITH CHANGE_TRACKING AUTO            --Population type;  
GO