using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Uow;
using Abp.MultiTenancy;
using ELS.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Transactions;

namespace ELS.EntityFrameworkCore.Data
{
    public class EfDataQuery : IDataQuery
    {
        private readonly DbContext _dbContext;
        private readonly IServiceProvider _serviceProvider;
        //private readonly AppDbConnections _dataConnections;

        public EfDataQuery(IServiceProvider serviceProvider,
            IIocResolver iocResolver,
            IUnitOfWorkManager unitOfWorkManager)
        {
            _serviceProvider = serviceProvider;
            //var a = (IDbContextProvider<ELSDbContext>)_serviceProvider.GetService(typeof(IDbContextProvider<ELSDbContext>));
            // Inject application data connections: Csportaldb
            //_dataConnections = dataConnections;

            using (var uowManager = iocResolver.ResolveAsDisposable<IUnitOfWorkManager>())
            {
                using (var uow = uowManager.Object.Begin(TransactionScopeOption.Suppress))
                {
                    _dbContext = uowManager.Object.Current.GetDbContext<ELSDbContext>(MultiTenancySides.Host);
                }
            }
        }

        public TDataResult GetDataBySql<TDataResult>(string sql, Func<DbDataReader, TDataResult> dataMappingAction, SqlParameter[] sqlParameters = null) where TDataResult : class
        {
            var connectionString = "Server=.; Database=ELSDb; Trusted_Connection=True; TrustServerCertificate=True;";

            var connection = new SqlConnection(connectionString);
            var command = connection.CreateCommand();

            command.CommandText = sql;
            command.CommandType = CommandType.Text;

            if (sqlParameters != null && sqlParameters.Any())
            {
                command.Parameters.AddRange(sqlParameters);
            }
            try
            {
                connection.Open();
                var reader = command.ExecuteReader(CommandBehavior.SequentialAccess);
                var result = dataMappingAction(reader);

                reader.Close();

                return result;
            }
            finally
            {
                command.Dispose();
                connection.Close();
            }
        }
    }
}
