using Abp.Extensions;
using ELS.Models;
using System;

namespace ELS.Common.Extensions
{
    public static class DateTimeExtension
    {
        public static Tuple<DateTime?, DateTime?> GetDateRange(this DateRangeType? rangeType)
        {
            DateTime? dateFrom = null;
            DateTime? dateTo = null;
            switch (rangeType)
            {
                case DateRangeType.ThisWeek:
                    dateFrom = DateTime.Now.StartOfWeek(DayOfWeek.Monday);
                    dateTo = dateFrom.Value.AddDays(6);
                    break;
                case DateRangeType.LastWeek:
                    break;
                case DateRangeType.ThisMonth:
                    break;
                case DateRangeType.LastMonth:
                    break;
                default:
                    break;
            }
            return new Tuple<DateTime?, DateTime?>(dateFrom, dateTo);
        }
    }
}
