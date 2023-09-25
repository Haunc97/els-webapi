using System.Linq.Expressions;
using System;

namespace ELS.Common
{
    public class FilterExpression
    {
        public static Expression<Func<T, bool>> GetExpression<T, TProperty>(FilterProperty<TProperty> filter, string propertyName)
        {
            if (filter != null)
            {
                // Get the property to filter by
                var parameter = Expression.Parameter(typeof(T), "x");
                var property = Expression.Property(parameter, propertyName);

                // Get the constant value to compare with
                var value = Expression.Constant(filter.Term);

                // Create the expression based on the filter method
                Expression expression = null;
                switch (filter.Method)
                {
                    case FilterMothod.Equal:
                        expression = Expression.Equal(property, value);
                        break;
                    case FilterMothod.NotEqual:
                        expression = Expression.NotEqual(property, value);
                        break;
                    case FilterMothod.Contain:
                        // Assume the property and value are strings
                        var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                        expression = Expression.Call(property, containsMethod, value);
                        break;
                    case FilterMothod.NotContain:
                        // Assume the property and value are strings
                        var notContainsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                        var containsExpression = Expression.Call(property, notContainsMethod, value);
                        expression = Expression.Not(containsExpression);
                        break;
                    default:
                        throw new ArgumentException("Invalid filter method");
                }

                // Return the lambda expression
                return Expression.Lambda<Func<T, bool>>(expression, parameter);
            }

            return null;
        }
    }

    public class FilterProperty<T>
    {
        public T? Term { get; set; }
        public FilterMothod Method { get; set; } = FilterMothod.Equal;
    }

    public enum FilterMothod
    {
        Equal = 10,
        NotEqual = 20,
        Contain = 30,
        NotContain = 40
    }
}
