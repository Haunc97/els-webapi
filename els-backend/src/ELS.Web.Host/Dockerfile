FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/ELS.Web.Host/ELS.Web.Host.csproj", "src/ELS.Web.Host/"]
COPY ["src/ELS.Web.Core/ELS.Web.Core.csproj", "src/ELS.Web.Core/"]
COPY ["src/ELS.Application/ELS.Application.csproj", "src/ELS.Application/"]
COPY ["src/ELS.Core/ELS.Core.csproj", "src/ELS.Core/"]
COPY ["src/ELS.EntityFrameworkCore/ELS.EntityFrameworkCore.csproj", "src/ELS.EntityFrameworkCore/"]
WORKDIR "/src/src/ELS.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/ELS.Web.Host", "src/ELS.Web.Host"]
COPY ["src/ELS.Web.Core", "src/ELS.Web.Core"]
COPY ["src/ELS.Application", "src/ELS.Application"]
COPY ["src/ELS.Core", "src/ELS.Core"]
COPY ["src/ELS.EntityFrameworkCore", "src/ELS.EntityFrameworkCore"]
WORKDIR "/src/src/ELS.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "ELS.Web.Host.dll"]
