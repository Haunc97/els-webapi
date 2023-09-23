using System.Data.Common;
using System;
using System.Data.SqlClient;

namespace ELS.Data
{
    public interface IDataQuery
    {
        /// <summary>
        /// To get data from specific SQL statement.
        /// <br/>
        /// <b>It is executed via ADO.NET and ISOLATED to current EF database context.</b>
        /// </summary>
        /// <typeparam name="TDataResult"></typeparam>
        /// <param name="sql">SQL statement</param>
        /// <param name="dataMappingAction">How to mapping data returned from SQL to model</param>
        /// <param name="sqlParameters">Input parameters</param>
        /// <returns></returns>
        TDataResult GetDataBySql<TDataResult>(string sql, Func<DbDataReader, TDataResult> dataMappingAction, SqlParameter[] sqlParameters = null) where TDataResult : class;
    }
}
